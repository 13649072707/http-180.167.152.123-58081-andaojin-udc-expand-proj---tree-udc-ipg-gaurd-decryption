using EDoc2.Core;
using EDoc2.Core.EventSubscriber;
using EDoc2.Core.QuartzWorks;
using EDoc2.Entity;
using EDoc2.Entity.EcmDocReruenDto;
using Furion.EventBus;
using Furion.FriendlyException;
using MacrowingProjectdocking.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace YstDecryption.Controllers
{
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly AuthenticationService _authenticationService;
        private readonly IEventPublisher _eventPublisher;
        private readonly IMemoryCache _memoryCache;

        public AuthController(IConfiguration configuration
            , AuthenticationService authenticationService
            , IEventPublisher eventPublisher
            , IMemoryCache memoryCache
            )
        {
            _configuration = configuration;
            _memoryCache = memoryCache;
            _eventPublisher = eventPublisher;
            _authenticationService = authenticationService;
        }


        #region 外发下载解密
        /// <summary>
        /// 下载ECM文档至集成平台目录（集成亿赛通） yst-1
        /// </summary>
        /// <param name="docDto"></param>
        /// <returns></returns>
        [HttpPost("/auth/downloadecmdocentitybyyst")]
        [NonUnify, AllowAnonymous]
        public async Task<dynamic> downloadecmdocentitybyyst(DownloadDocData docDto)
        {
            #region 测试参数
            //docDto.fileIds = "24";
            //docDto.integrationKey = "190f8c60-7370-42cb-aea2-f27e97caa9dd";
            //docDto.zipName = "test.docx";
            //docDto.code = "Ab1ee403174d74d40bcfe2ea806e13fd6";
            //docDto.codekey = Cryptography.Md5Encrypt("94FB8E8B");
            #endregion

            #region 参数验证

            if (string.IsNullOrWhiteSpace(docDto.integrationKey))
            {
                return new ExceptLogsOutputDto { ExceptKey = "", Status = "1", Message = "集成登录密钥不正确" };
            }
            if (string.IsNullOrWhiteSpace(docDto.zipName))
            {
                return new ExceptLogsOutputDto { ExceptKey = "", Status = "1", Message = "文件名不正确" };
            }
            if (docDto.fileIds.Split(',').Count() > 1 || string.IsNullOrWhiteSpace(docDto.fileIds))
            {
                //downType = "downloadmoredoccheck";
                return new ExceptLogsOutputDto { ExceptKey = "", Status = "1", Message = "文件id不正确" };
            }
            #endregion

            string ecmUrl = "http://nginx";
#if DEBUG
            ecmUrl = Environment.GetEnvironmentVariable("EcmFileUrl");
#endif
            // 获取token
            var tokenRes = await _authenticationService.UserLoginIntegrationByUserLoginNameAsync("admin", "127.0.0.1", docDto.integrationKey, ecmUrl);
            if (tokenRes.result != 0 || string.IsNullOrWhiteSpace(tokenRes.token))
                return new ExceptLogsOutputDto { ExceptKey = "", Status = "1", Message = "token获取失败,请核实ECM集成登录密钥" };

            // 验证文件是否存在
            var fileis = await _authenticationService.IsExistFileByFileId(tokenRes.token, docDto.fileIds, ecmUrl);
            Console.WriteLine("验证文件是否存在:"+ fileis.token);
            if (fileis.token.Equals("False"))
                return new ExceptLogsOutputDto { ExceptKey = "", Status = "1", Message = "文件id不正确,文件不存在" };

            //获取该文件的剩余下载次数(需提qc加入接口) // TODO
            //var filetiime = await _authenticationService.GetPublishFileDownloadTime(tokenRes.token,docDto.code,docDto.fileIds, ecmUrl);

            docDto.token = tokenRes.token;
            string key = $"DOWNLOADDOCCHECK_{Guid.NewGuid().ToString("N")}";
            _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 0, TaskStatus = "begin" }, DateTime.Now.AddDays(1));
            await _eventPublisher.PublishAsync(new ExceptLogEventSource<DocProcessTaskLogType>("ECM:DownloadEcmDoc", key, DocProcessTaskLogType.DownloadFileByyst, docDto));
            //返回任务key 用于查询任务进度
            return new ExceptLogsOutputDto { ExceptKey = key, Status = "0", Message = "创建Job成功" };
        }
        #endregion

        #region 普通下载解密
        /// <summary>
        /// 普通下载解密
        /// </summary>
        /// <param name="docDto"></param>
        /// <returns></returns>
        [HttpPost("/auth/downloadecmdocentitybyystpu")]
        [NonUnify, AllowAnonymous]
        public async Task<dynamic> downloadecmdocentitybyystpu(DownloadDocData docDto)
        {
            #region 测试参数
            //docDto.fileIds = "34";
            //docDto.integrationKey = "190f8c60-7370-42cb-aea2-f27e97caa9dd";
            //docDto.zipName = "test.pptx";
            #endregion
            #region 参数验证
            if (string.IsNullOrWhiteSpace(docDto.zipName))
            {
                return new ExceptLogsOutputDto { ExceptKey = "", Status = "1", Message = "文件名不正确" };
            }

            if (docDto.fileIds.Split(',').Count() > 1 || string.IsNullOrWhiteSpace(docDto.fileIds))
            {
                //downType = "downloadmoredoccheck";
                return new ExceptLogsOutputDto { ExceptKey = "", Status = "1", Message = "文件id不正确" };
            }
            #endregion

            string ecmUrl = "http://nginx";
#if DEBUG
            ecmUrl = Environment.GetEnvironmentVariable("EcmFileUrl");
#endif
            // 获取token
            var tokenRes = await _authenticationService.UserLoginIntegrationByUserLoginNameAsync("admin", "127.0.0.1", docDto.integrationKey, ecmUrl);
            if (tokenRes.result != 0 || string.IsNullOrWhiteSpace(tokenRes.token))
                return new ExceptLogsOutputDto { ExceptKey = "", Status = "1", Message = "token获取失败,请核实ECM集成登录密钥" };

            // 验证文件是否存在
            var fileis = await _authenticationService.IsExistFileByFileId(tokenRes.token, docDto.fileIds, ecmUrl);
            Console.WriteLine("验证文件是否存在:" + fileis.token);
            if (fileis.token.Equals("False"))
                return new ExceptLogsOutputDto { ExceptKey = "", Status = "1", Message = "文件id不正确,文件不存在" };

            docDto.token = tokenRes.token;
            string key = $"DOWNLOADDOCCHECK_{Guid.NewGuid().ToString("N")}";
            _memoryCache.Set(key, new TaskStatusInfo { TaskName = "downloadecmdoc", TaskSpeed = 0, TaskStatus = "begin" }, DateTime.Now.AddDays(1));
            await _eventPublisher.PublishAsync(new ExceptLogEventSource<DocProcessTaskLogType>("ECM:DownloadEcmDoc", key, DocProcessTaskLogType.DownloadFile, docDto));
            //返回任务key 用于查询任务进度
            return new ExceptLogsOutputDto { ExceptKey = key, Status = "0", Message = "创建Job成功" };
        }
        #endregion

        #region 检查文档下载状态
        /// <summary>
        /// 检查文档下载状态
        /// </summary>
        /// <param name="jobKey">第三步返回的key</param>
        /// <returns></returns>
        [HttpGet("/auth/checkdocdownloadstatus")]
        [NonUnify]
        [AllowAnonymous]
        public async Task<dynamic> checkdocdownloadstatus(string jobKey)
        {
            Console.WriteLine("jobKey="+jobKey);
            try
            {
                ExceptLogsStatusOutputDto exceptLogsStatusOutputDto = new ExceptLogsStatusOutputDto();
                if (_memoryCache.TryGetValue<TaskStatusInfo>(jobKey, out var taskStatusInfo))//没有任务抛出异常
                {
                    Console.WriteLine(JsonConvert.SerializeObject(taskStatusInfo));
                    exceptLogsStatusOutputDto = new ExceptLogsStatusOutputDto()
                    {
                        DownFilePath = taskStatusInfo.TaskInfo,
                        Status = taskStatusInfo.TaskStatus,
                        Message = taskStatusInfo.TaskRemark,
                        Speed = taskStatusInfo.TaskSpeed
                    };
                    return exceptLogsStatusOutputDto;
                }
                else
                {
                    throw (Oops.Oh(ErrorCodes.NotTaskFound));
                }
            }
            catch (Exception ex)
            {
                throw (Oops.Oh(ErrorCodes.DocDownloadError, ex.Message));
            }
        }
        #endregion

    }
}
