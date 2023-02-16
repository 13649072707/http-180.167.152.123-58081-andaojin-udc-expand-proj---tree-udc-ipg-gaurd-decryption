using Furion;
using Furion.EventBus;
using EDoc2.Entity;
using EDoc2.Entity.EcmDocReruenDto;
using EDoc2.Extensions;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EDoc2.DockingHttpClient;
using System.IO;
using System.Linq;

namespace EDoc2.Core.EventSubscriber
{
    /// <summary>
    /// ECM 文档下载
    /// </summary>
    public class EcmDocProcessEventSubscriber : IEventSubscriber
    {
        private readonly ILogger<EcmDocProcessEventSubscriber> _logger;
        private readonly IMemoryCache _memoryCache;
        private readonly IDockingHttpClient _dockingHttp;
        private readonly AuthenticationService _authenticationService;
        private readonly IEventPublisher _eventPublisher;
        public EcmDocProcessEventSubscriber(ILogger<EcmDocProcessEventSubscriber> logger
            , IMemoryCache memoryCache
            , IDockingHttpClient dockingHttp
            , AuthenticationService authenticationService
            , IEventPublisher eventPublisher
            )
        {
            _logger = logger;
            _eventPublisher = eventPublisher;
            _memoryCache = memoryCache;
            _dockingHttp = dockingHttp;
            _authenticationService = authenticationService;
        }
        /// <summary>
        /// 下载文档至集成平台的目录下 yst-2
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        [EventSubscribe("ECM:DownloadEcmDoc")]
        public async Task DownloadEcmDoc(EventHandlerExecutingContext context)
        {
            ExceptLogEventSource<DocProcessTaskLogType> eventSource = (ExceptLogEventSource<DocProcessTaskLogType>)context.Source;
            string key = eventSource.Key;

            switch (eventSource.ExceptTaskLogType)
            {
                case DocProcessTaskLogType.DownloadFile:
                    DownloadDocData fileDto = (DownloadDocData)eventSource.Payload;
                    await DocFileProcessAsync(key, fileDto);
                    break;
                case DocProcessTaskLogType.DownloadFileByyst:
                    DownloadDocData fileByystDto = (DownloadDocData)eventSource.Payload;
                    await DocFileByystProcessAsync(key, fileByystDto);// yst-3
                    break;
                default:
                    break;
            }
        }


        /// <summary>
        /// 下载单个文件
        /// </summary>
        /// <param name="key"></param>
        /// <param name="docDto"></param>
        /// <returns></returns>
        private async Task DocFileProcessAsync(string key, DownloadDocData docDto)
        {
            string ecmUrl = "http://nginx";
#if DEBUG
            ecmUrl = Environment.GetEnvironmentVariable("EcmFileUrl");
#endif
            string url = $"{ecmUrl}/download/DownLoadCheck?fileIds={docDto.fileIds}&async=true&folderIds={docDto.folderIds}&token={docDto.token}&r=12121";
            var checkResult = await CheckDownloadDoc(url, key, docDto);
            if (checkResult == null)
            {
                return;
            }
            string regionUrl = checkResult.RegionType != 1 ? checkResult.RegionUrl : ecmUrl;
            _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 0, TaskStatus = "Progress", TaskInfo = JsonConvert.SerializeObject(checkResult), TaskRemark = regionUrl + "|" + docDto.fileIds }, DateTime.Now.AddDays(1));
            //yst-5
            await DocStreamDownloadAsync(key, docDto);
        }

        /// <summary>
        /// 下载单个亿赛通加密文件并进行解密 yst-4
        /// </summary>
        /// <param name="key"></param>
        /// <param name="docDto"></param>
        /// <returns></returns>
        private async Task DocFileByystProcessAsync(string key, DownloadDocData docDto)
        {
            string ecmUrl = "http://nginx";
#if DEBUG
            ecmUrl = Environment.GetEnvironmentVariable("EcmFileUrl");
#endif
            string url = $"{ecmUrl}/download/DownLoadCheck?fileIds={docDto.fileIds}&async=true&folderIds={docDto.folderIds}&code={docDto.code}&codekey={docDto.codekey}&r=12121";
            var checkResult = await CheckDownloadDoc(url, key, docDto);
            if (checkResult == null)
            {
                return;
            }

            string regionUrl = checkResult.RegionType != 1 ? checkResult.RegionUrl : ecmUrl;
            _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 0, TaskStatus = "success", TaskInfo = JsonConvert.SerializeObject(checkResult), TaskRemark = regionUrl + "|" + docDto.fileIds }, DateTime.Now.AddDays(1));

            //yst-5
            await DocStreamDownloadAsync(key, docDto);
        }


        /// <summary>
        /// 下载文档数据流到本地 yst-5
        /// </summary>
        /// <param name="key"></param>
        /// <param name="docDto"></param>
        /// <returns></returns>
        private async Task DocStreamDownloadAsync(string key, DownloadDocData docDto)
        {
            try
            {
                if (_memoryCache.TryGetValue<TaskStatusInfo>(key, out var taskStatusInfo))
                {
                    if (taskStatusInfo.TaskName == "downloadecmdoc")
                    {
                        var docInfo = JsonConvert.DeserializeObject<DownloadCheck>(taskStatusInfo.TaskInfo);
                        int filed = 0;
                        int.TryParse(taskStatusInfo.TaskRemark?.Split('|')[1], out filed);
                        // yst-6
                        await DownDoc(key, docDto.zipName, filed, taskStatusInfo.TaskRemark.Split('|')[0], docInfo.RegionHash, docDto.token, docDto.code);
                        return;
                    }
                    await DownMoreDoc(key, taskStatusInfo, docDto.zipName);
                }
                else
                {
                    _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 0, TaskStatus = "error", TaskInfo = $"任务解析失败或不存在{key}" }, DateTime.Now.AddDays(1));
                }
            }
            catch (Exception ex)
            {
                _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 0, TaskStatus = "error", TaskInfo = ex.Message }, DateTime.Now.AddDays(1));
            }
        }

        /// <summary>
        /// 下载多文件和多文件夹
        /// </summary>
        /// <param name="taskStatusInfo"></param>
        /// <param name="docName"></param>
        /// <returns></returns>
        public async Task DownMoreDoc(string key, TaskStatusInfo taskStatusInfo, string docName)
        {
            _memoryCache.Set(key, new TaskStatusInfo { TaskName = "DownMoreDoc", TaskSpeed = 0, TaskStatus = "start" }, DateTime.Now.AddDays(1));
            var clientUrl = taskStatusInfo.TaskRemark?.Split('|')[0];//存在分区域地址
            var docFileStream = await _dockingHttp.GetToStreamAsync($"{clientUrl}/downLoad/GetFile?fileName=" + docName);
            await DownDocToLocalByFileStream(key, docName, docFileStream);
        }

        /// <summary>
        /// 检测下载文档信息
        /// </summary>
        /// <param name="url"></param>
        /// <param name="key"></param>
        /// <param name="queryDto"></param>
        /// <returns></returns>
        private async Task<DownloadCheck> CheckDownloadDoc(string url, string key, DownloadDocData queryDto)
        {
            var checkResult = await _dockingHttp.GetEntityAsync<DownloadCheck>(url);
            if (checkResult.nResult != 0)
            {
                _memoryCache.Set(key, new TaskStatusInfo { TaskName = "CheckDownloadDoc", TaskSpeed = 100, TaskStatus = "error", TaskInfo = JsonConvert.SerializeObject(checkResult) }, DateTime.Now.AddDays(1));
                return null;
            }
            return checkResult;
        }


        /// <summary>
        /// 下载单文件 yst-6
        /// </summary>
        /// <param name="filedId">文件id</param>
        /// <param name="url">请求地址</param>
        /// <param name="regionHash"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task DownDoc(string key, string fileName, int fileId, string url, string regionHash, string token, string code)
        {
            _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 0, TaskStatus = "Progress" }, DateTime.Now.AddDays(1));
            var docFileStream = await _dockingHttp.GetToStreamAsync($"{url}/downLoad/index?regionHash={regionHash}&fileIds={fileId}&code={code}&Token={token}");
            //  yst-7
            await DownDocToLocalByFileStream(key, fileName, docFileStream);
        }

        /// <summary>
        /// 下载文件流到本地目录 yst-7
        /// </summary>
        /// <param name="docName"></param>
        /// <param name="docFileStream"></param>
        /// <returns></returns>
        private async Task DownDocToLocalByFileStream(string key, string docName, Stream docFileStream)
        {
            Console.WriteLine("DownDocToLocalByFileStream");
            _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 0, TaskStatus = "Progress" }, DateTime.Now.AddDays(1));
            string dirPath = Path.Combine(App.WebHostEnvironment.WebRootPath, "docking", "webstaticfiles", "ecmdoc", key);
            Console.WriteLine(dirPath);
            Console.WriteLine("是否存在路径" + Directory.Exists(dirPath));
            if (!Directory.Exists(dirPath))
            {
                Directory.CreateDirectory(dirPath);
            }
            string fileName = Path.Combine(dirPath, docName);
            int count = 0;
            long hasRead = 0;
            int bufferSize = 1024 * 10;
            byte[] buf = new byte[bufferSize];
            double downSpeed = 0;
            using (FileStream fileStream = new FileStream(fileName, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.ReadWrite))
            {
                while ((count = docFileStream.Read(buf, 0, buf.Length)) > 0)
                {
                    fileStream.Write(buf, 0, count);
                    hasRead += count;
                    float value = (float)hasRead / (float)docFileStream.Length;
                    downSpeed = Convert.ToDouble((value * 100).ToString("F2"));
                    _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = downSpeed, TaskStatus = "Progress", TaskInfo = fileName }, DateTime.Now.AddDays(1));
                }
                fileStream.Close();
                Console.WriteLine("TaskSpeed:" + downSpeed + " count:" + count);
            }
            //TODO 判断当前文件是否明文
            var isming = false;
            if (true)
            {
                // 直接推 然后页面下载
            }
            else
            {
                // 走解密接口流程
            }

            // yst-8
            var IsOffDecrypt = Environment.GetEnvironmentVariable("IsOffDecrypt");
            Console.WriteLine("是否开启文件解密：" + IsOffDecrypt);
            if (!string.IsNullOrWhiteSpace(IsOffDecrypt))
            {
                Console.WriteLine("不为空");
                if (IsOffDecrypt.Equals("1"))
                {
                    await DecryptYstFile(key, fileName);
                }
                else
                {
                    Console.WriteLine("100_" + fileName);
                    _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 100, TaskStatus = "Complete", TaskRemark = "文件下载成功", TaskInfo = fileName }, DateTime.Now.AddDays(1));
                }
            }
            else
            {
                Console.WriteLine("100_" + fileName);
                _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 100, TaskStatus = "Complete", TaskRemark = "文件下载成功", TaskInfo = fileName }, DateTime.Now.AddDays(1));
            }
        }
        /// <summary>
        /// 解密 yst-8
        /// </summary>
        /// <param name="key"></param>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public async Task DecryptYstFile(string key, string filePath)
        {
            _memoryCache.TryGetValue<TaskStatusInfo>(key, out var taskStatusInfo);
            Console.WriteLine("DecryptYstFile:" + taskStatusInfo.TaskSpeed);
            if (taskStatusInfo.TaskSpeed == 100)
            {
                string estReultData = "{\"allKeys\":\"JLJKELOIHADPCJMGKGHAHAKJLOKLDICG\",\"allMastkey\":\"null\",\"authorityKey\":\"JLJKELOIHADPCJMGKGHAHAKJLOKLDICG\",\"authorityName\":\"test\",\"curAllKeys\":\"JLJKELOIHADPCJMGKGHAHAKJLOKLDICG\",\"curKey\":\"JLJKELOIHADPCJMGKGHAHAKJLOKLDICG\",\"mastkey\":\"\",\"secLevel\":\"10\"}";

                #region json处理
                var resultData = JsonConvert.DeserializeObject<EstReultData>(estReultData);
                //Console.WriteLine("resultData="+ resultData);

                var resultDataStr = JsonConvert.SerializeObject(resultData);
                //Console.WriteLine("resultDataStr=" + resultDataStr);
                #endregion

                // 注册保存key
                bool bresFile = YstDecryptAPI.EstSaveKeys(resultDataStr);
                //Console.WriteLine("bresFile=" + bresFile);

                // 初始化key
                int ces = YstDecryptAPI.EstInitKeys();
                Console.WriteLine("ces=" + ces);

                // 已加密文件验证            
                bool bresFile1 = false, resStatus = false;

                // 检测文件是否密文
                bresFile1 = YstDecryptAPI.EstIsEncryptLockFile(filePath);
                Console.WriteLine("bresFile1=" + bresFile1);
                if (bresFile1)
                {
                    // 密文进行解密
                    resStatus = YstDecryptAPI.EstDecryptLockFile(filePath);
                    Console.WriteLine("resStatus=" + resStatus);
                    // 解密处理后更新进度
                    if (resStatus)
                    {
                        _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 100, TaskStatus = "Complete", TaskInfo = filePath, TaskRemark = "文件解密成功" }, DateTime.Now.AddDays(1));
                        // 外发下载后需更新外发文件下载次数 提qc 加接口
                        // TODO
                    }
                    else
                    {
                        _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 0, TaskStatus = "ErrorDecrypt", TaskRemark = "文件解密失败" }, DateTime.Now.AddDays(1));
                    }
                }
                else
                {
                    _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 0, TaskStatus = "ErrorDecrypt", TaskRemark = "不是加密文件" }, DateTime.Now.AddDays(1));
                }

            }
        }
    }
}
