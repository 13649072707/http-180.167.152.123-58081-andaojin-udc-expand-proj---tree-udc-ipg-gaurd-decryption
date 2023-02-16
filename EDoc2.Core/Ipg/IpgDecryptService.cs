using EDoc2.Data.Entity;
using EDoc2.Entity;
using EDoc2.Ext.Dto;
using Furion.DependencyInjection;
using ICSharpCode.SharpZipLib.Zip;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.ExceptionServices;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Core.Ipg
{
    public class IpgDecryptService : ITransient
    {
        private readonly ILogger<IpgDecryptService> _logger;
        private readonly IHttpClientFactory _clientFactory;
        private int _connections = 1;
        public IpgDecryptService(IHttpClientFactory httpClient, ILogger<IpgDecryptService> logger) 
        {
            _clientFactory = httpClient;
            _logger = logger;
        }

        /// <summary>
        /// 初始化ipg解密接口
        /// </summary>
        /// <returns></returns>
        public bool InitializeDecrypt()
        {
            try
            {
                _logger.LogInformation("Ipgaurd初始化开始...");
                string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ipglogpath");
                _logger.LogInformation($"Ipgaurd初始化日志目录=========>>{path}");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }               
                var log = IpgaurdDecryption.TSD_SetLogInfo(path, 0xFF);
                _logger.LogInformation($"日志初始化结果：{log},path:{path},long 返回结果。成功返回 0，如果不为 0 则表示错误代码。");
                var result = InitDecrypt();
                _logger.LogInformation($"IpgaurdServer--EndInit-Result:{result}");
                if (result != 0) {
                    var errorMessage = IpgaurdDecryption.GetErrorText(result);
                    _logger.LogError($"Ipgaurd初始化结果：TSD_Initialize = {result}，IPGuard初始化失败,error:{errorMessage}");
                    return false;
                }
                _logger.LogInformation("Ipgaurd初始化结束,初始化成功");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Ipgaurd初始化异常=======>>{ex.Message}", ex);
                return false;
            }
        }
        /// <summary>
        /// 初始化
        /// </summary>
        /// <returns></returns>
        private long InitDecrypt()
        {
            try
            {
                var IpgaurdServerIP = Environment.GetEnvironmentVariable("IPG_ServerIP");
                if (string.IsNullOrWhiteSpace(IpgaurdServerIP))
                {
                    _logger.LogInformation($"未配置环境,IPG_ServerIP");
                    return 1;
                }
                var IpgaurdServerName = Environment.GetEnvironmentVariable("IPG_ServerName");
                if (string.IsNullOrWhiteSpace(IpgaurdServerName))
                {
                    _logger.LogInformation($"未配置环境,IpgaurdServerName");
                    return 1;
                }
                var IpgaurdServerPassword = Environment.GetEnvironmentVariable("IPG_ServerPwd");
                if (string.IsNullOrWhiteSpace(IpgaurdServerPassword))
                {
                    _logger.LogInformation($"未配置环境,IpgaurdServerPassword");
                    return 1;
                }
                var IpgaurdServerPort = Environment.GetEnvironmentVariable("IPG_ServerPort");
                if (string.IsNullOrWhiteSpace(IpgaurdServerPort))
                {
                    _logger.LogInformation($"未配置环境,IpgaurdServerPort");
                    return 1;
                }
                int IpgaurdPort = int.Parse(IpgaurdServerPort);
                _logger.LogInformation($"IpgaurdServer---BeginInitIpgaurdServer---BeginInit---server:{IpgaurdServerIP}:{IpgaurdServerPort};admin:{IpgaurdServerName}");
                var result = IpgaurdDecryption.TSD_Initialize(IpgaurdServerIP, IpgaurdPort, IpgaurdServerName, IpgaurdServerPassword);
                _logger.LogInformation($"IpgaurdServer---EndInit---Result:{result}");
                if (_connections == 5)
                {
                    return result;
                }
                if (result == 61464)
                {
                    //61464 不允许重复登录（同一管理者不允许同时重复登录）
                    _logger.LogInformation($"result={result},不允许重复登录（同一管理者不允许同时重复登录）");
                    return 0;
                }
                if (result != 0)
                {
                    int intervalTimes = 1000 * 10;
                    _logger.LogInformation($"TSD_Initialize = {result}，IPGuard初始化失败,第{_connections}次尝试重新连接,{intervalTimes / 1000}秒后重试...");
                    System.Threading.Thread.Sleep(intervalTimes);
                    _connections++;
                    InitDecrypt();
                }             
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Ipgaurd初始化异常:{ex.Message}", ex);
                return 1;
            } 
        }

        /// <summary>
        /// 获取文件和文件夹列表
        /// </summary>
        /// <param name="baseDomain"></param>
        /// <param name="fileId"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public Tuple<bool, string, List<long>> GetDmsFoldersList(string baseDomain, string folderId, string token)
        {
            List<long> relust = new List<long>();
            try
            {
                var uri = $"{baseDomain}/api/services/Doc/GetFileAndFolderList?token={token}&folderId={folderId}&pageNum=1&pageSize=99&sortDesc=false&noCalcPerm=false";
                var apiRes = uri.GetJsonFromUrl();
                _logger.LogInformation($"GetDmsFileInfo===>>获取文件和文件夹列表,{apiRes}");
                var resDto = Newtonsoft.Json.JsonConvert.DeserializeObject<DocumentModelResponse>(apiRes);
                if (resDto.result != 0)
                {
                    return Tuple.Create(false, $"获取文件夹id：({folderId})信息失败：{resDto.message}", relust);
                }
                var filesInfo = resDto.data.FilesInfo;
                relust = filesInfo.Select(iw => iw.FileId).ToList();
                return Tuple.Create(true, "", relust);
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetDmsFileInfo===>>获取文件和文件夹列表,{ex.Message}", ex);
                return Tuple.Create(false, $"获取文件夹id({folderId})信息失败：{ex.Message}", relust);
            }
        }

        /// <summary>
        /// 获取文件信息
        /// </summary>
        /// <param name="baseDomain"></param>
        /// <param name="fileId"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public Tuple<bool, string, FiledModelDto> GetDmsFileInfo(string baseDomain, long fileId,string token)
        {
            FiledModelDto relust = new FiledModelDto();
            try
            {
                var uri = $"{baseDomain}/api/services/File/GetFileInfoById?fileId={fileId}&token={token}";
                var apiRes = uri.GetJsonFromUrl();
                _logger.LogInformation($"GetDmsFileInfo===>>获取文件信息,{apiRes}");
                var resDto = Newtonsoft.Json.JsonConvert.DeserializeObject<ResFiledDto>(apiRes);
                if (resDto.result != 0)
                {
                    return Tuple.Create(false, $"获取文件({fileId})信息失败：{resDto.message}", relust);
                }
                return Tuple.Create(true,"", resDto.data);
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetDmsFileInfo===>>获取文件信息,{ex.Message}",ex);
                return Tuple.Create(false, $"获取文件({fileId})信息失败：{ex.Message}", relust);
            }
        }
        /// <summary>
        /// 文件下载
        /// </summary>
        /// <param name="fileId">文件id</param>
        /// <param name="savePath">保存路径</param>
        /// <param name="fileName">文件名称</param>
        /// <returns></returns>
        public async Task<Tuple<bool, string, string>> NewDownLoadFile(string baseDomain,string token ,string savePath, long fileId, string fileName)
        {
            try
            {
                var url_get = $"{baseDomain}/downLoad/index?fileIds={fileId}&token={token}";
                _logger.LogInformation($"NewDownLoadFile====>>文件：{fileName},下载地址：{url_get},savePath:{savePath}");
                var httpclientHandler = new HttpClientHandler();
                httpclientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, error) => true;
                var client = new HttpClient(httpclientHandler);
                HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url_get);
                var resultGet = await client.SendAsync(httpRequestMessage);
                _logger.LogInformation($"NewDownLoadFile====>>downLoad/index 请求体信息：{resultGet}");
                if (!resultGet.IsSuccessStatusCode)
                {
                    var requestContent = httpRequestMessage?.Content?.ReadAsStringAsync();
                    string msg = $"请求出错:{resultGet?.RequestMessage}|content:{await resultGet?.Content?.ReadAsStringAsync()}|code:{resultGet.StatusCode}";
                    if (requestContent != null)
                    {
                        // 只有在Task或Task<T>对象不为null时，才进行await.避免这里抛出NullReferenceException异常
                        msg += $"|httpRequestMessage.Content:{ await requestContent }";
                    }
                    _logger.LogInformation($"NewDownLoadFile====>>GET请求出错:{msg}");
                    return Tuple.Create(false, $"请求出错：{msg}", "");
                }

                var requestReq = await resultGet.Content.ReadAsStreamAsync();
                _logger.LogInformation($"NewDownLoadFile====>>downLoad/index 请求结果：{requestReq}");
                var filePath = Path.Combine(savePath, fileName);
                using (FileStream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
                {
                    requestReq.CopyTo(fileStream);
                    fileStream.Close();
                }
                _logger.LogInformation($"NewDownLoadFile====>>文件夹下载成功。");
                return Tuple.Create(true, fileName, filePath);
            }
            catch (Exception ex)
            {
                _logger.LogError($"NewDownLoadFile====>>文件夹下载失败,{ex.Message}", ex);
                return Tuple.Create(false, $"{ex.Message}", "1");
            }
        }

        /// <summary>
        /// 判断文件是否是密文
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public Tuple<bool, bool, string> IsEncryptedFileById(string filePath,string fileName)
        {
            try
            {
                byte[] arrByte = null;
                using (var fileStream = File.OpenRead(filePath))
                {
                    arrByte = new byte[fileStream.Length];
                    fileStream.Read(arrByte, 0, arrByte.Length);
                }
                _logger.LogInformation($"IsEncryptedFileById===>>IsEncryptFileByStream headerBuffer 长度：{arrByte.Length}");
                bool pbIsSdFile = false;
                bool pbIsAuthSd = false;//是否授权加密文件
                int pnSdAttrSize = 0;
                long pnOriSize = 0;
                //通过文件内容，判断一个文件是否加密文件，是否授权加密，以及加密文件头的大小（主要用于授权加密文件）。
                long result = IpgaurdDecryption.TSD_CheckSdFile2(arrByte, IpgaurdDecryption.HEADERSIZE, ref pbIsSdFile, ref pbIsAuthSd, ref pnSdAttrSize, ref pnOriSize);
                _logger.LogInformation($"IsEncryptedFileById===>>TSD_IsSdFile2 结果：{result};pbIsSdFile={pbIsSdFile},long 接口调用成功为 0，如果不为 0 则表示错误代码");
                if (result == 0)
                {
                    _logger.LogInformation($"IsEncryptedFileById===>>文件名：{fileName},判断文件是否是密文结果：文件是{(pbIsSdFile ? "密文" : "明文")}");
                    return Tuple.Create(true, pbIsSdFile, $"文件返回结果：文件是{(pbIsSdFile ? "密文" : "明文")}");
                }
                else
                {
                    var errorMessage = IpgaurdDecryption.GetErrorText(result);
                    _logger.LogError($"IsEncryptedFileById===>>文件名：{fileName},文件检查失败：{errorMessage}");
                    return Tuple.Create(false, false, $"文件检查失败,{errorMessage}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"IsEncryptedFileById===>>文件名：{fileName},判断文件是否是密文发生了异常:{ex.Message}", ex);
                return Tuple.Create(false, false, $"判断文件是否是密文发生了异常,{ex.Message}");
            }
        }

        /// <summary>
        /// ipg解密
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="filePath"></param>
        /// <param name="newFilePath"></param>
        /// <returns></returns>
        public unsafe Tuple<bool,string,FileItem> DownloadEcmDocentitybyIpg(string fileName, string filePath,string newFilePath)
        {
            try
            {
                _logger.LogInformation($"DownloadEcmDocentitybyIpg=======>>>ipg解密开始===========>>>>>>>");
                //转为文件流
                using (Stream fileStream = File.OpenRead(filePath))
                {
                    var byteArry = DecStream(0, fileStream);
                    if (byteArry != null)
                    {
                        // 写入文件
                        var newFileName = $"{newFilePath}/解密文件_{fileName}";                      
                        using (FileStream fs = new FileStream(newFileName, FileMode.CreateNew, FileAccess.Write))
                        {
                            try
                            {
                                fs.Write(byteArry.ToArray());
                            }
                            catch (Exception ex)
                            {
                                if (fs != null)
                                {
                                    fs.Close();
                                    fs.Dispose();
                                }
                                _logger.LogError($"DownloadEcmDocentitybyIpg===>>Decrypt系统异常,{ex.Message}", ex);
                            }
                        }
                        _logger.LogInformation($"DownloadEcmDocentitybyIpg===>>删除密文文件：{filePath}");
                        File.Delete(filePath);
                        return Tuple.Create(true, $"解密完成", new FileItem { FileId = 0, FileName = $"解密文件_{fileName}", FileByte = byteArry, FileUrl = newFileName });
                    }
                    else
                    {
                        _logger.LogInformation($"DownloadEcmDocentitybyIpg=====>>>解密失败,DecStream值为：{byteArry},删除密文文件：{filePath}");
                        File.Delete(filePath);
                        return Tuple.Create(false, $"ipg解密失败！", new FileItem());
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"DownloadEcmDocentitybyIpg===>>解密发生了异常,{ex.Message}", ex);
                return Tuple.Create(false, $"文件解密发生了异常,{ex.Message}",new FileItem());
            }
        }
        /// <summary>
        /// 文件解析
        /// </summary>
        /// <param name="fileVerId"></param>
        /// <param name="fileStream"></param>
        /// <returns></returns>
        [HandleProcessCorruptedStateExceptions]
        private unsafe byte[] DecStream(long fileVerId, Stream fileStream)
        {
            _logger.LogInformation($"DecStream===>>>解密开始....");
            byte[] byteArray = null;
            List<byte> lrs = new List<byte>();//返回值
            if (fileStream.Length > 0)
            {
                fileStream.Position = 0;//重置读取位置
                byte[] headerBuffer = new byte[IpgaurdDecryption.HEADERSIZE];
                fileStream.Read(headerBuffer, 0, IpgaurdDecryption.HEADERSIZE);
                bool pbIsSdFile = false;
                bool pbIsAuthSd = false;//是否授权加密文件
                int pnSdAttrSize = 0;
                long pnOriSize = 0;
                long result = IpgaurdDecryption.TSD_CheckSdFile2(headerBuffer, IpgaurdDecryption.HEADERSIZE, ref pbIsSdFile, ref pbIsAuthSd, ref pnSdAttrSize, ref pnOriSize);
                _logger.LogInformation($"DecStream===>>>TSD_IsSdFile2： fileVerId= {fileVerId},result={result},pbIsSdFile={pbIsSdFile}");
                if (pbIsSdFile)
                {
                    char* hDecrypt = null;
                    result = IpgaurdDecryption.TSD_DecryptDataInit(fileStream.Length, &hDecrypt);
                    _logger.LogInformation($"DecStream===>>>解密初始化,fileVerId= {fileVerId}, result={result};");
                    if (result != 0)
                    {
                        _logger.LogInformation($"DecStream===>>>初始化解密失败:fileVerId= {fileVerId},result={result}");
                    }
                    else
                    {
                        //解密文件
                        byteArray = DecStream(fileStream, hDecrypt);
                        if (byteArray != null)
                        {
                            lrs.AddRange(byteArray.ToList());

                            byte[] finalBuff = new byte[1024 * 8];
                            GCHandle hFinaleObject = GCHandle.Alloc(finalBuff, GCHandleType.Pinned);
                            IntPtr pFinalBuf = hFinaleObject.AddrOfPinnedObject();
                            int finalLength = 0;
                            result = IpgaurdDecryption.TSD_DecryptDataFinal(hDecrypt, pFinalBuf, ref finalLength);
                            _logger.LogInformation($"TSD_DecryptDataFinal====>1 fileVerId= {fileVerId}, result={result};finalLength={finalLength}");
                            if (result == 75 && finalLength > 0)
                            {
                                finalBuff = new byte[finalLength];
                                var hFinaleObject2 = GCHandle.Alloc(finalBuff, GCHandleType.Pinned);
                                pFinalBuf = hFinaleObject2.AddrOfPinnedObject();
                                finalLength = 0;
                                result = IpgaurdDecryption.TSD_DecryptDataFinal(hDecrypt, pFinalBuf, ref finalLength);
                                _logger.LogInformation($"TSD_DecryptDataFinal====>2 fileVerId= {fileVerId}, result={result};finalLength={finalLength}");
                                lrs.AddRange(finalBuff.ToList());
                                hFinaleObject2.Free();
                            }
                            else if (finalLength > 0 && result == 0)
                            {
                                lrs.AddRange(finalBuff.ToList());
                            }
                            else
                            {
                                _logger.LogInformation($"DecStream===>>>解密结束：fileVerId= {fileVerId},{result}");
                            }
                            hFinaleObject.Free();
                        }
                        else // 解密结束
                        {
                            _logger.LogInformation($"DecStream===>>>解密失败:fileVerId= {fileVerId}");
                        }
                    }

                }
            }
            return lrs.ToArray();
        }

        /// <summary>
        ///【测试示例】 解密文件流 -update模块
        /// </summary>
        /// <param name="fileStream"></param>
        /// <param name="intPtr"></param>
        /// <returns></returns>
        [HandleProcessCorruptedStateExceptions]
        private unsafe byte[] DecStream(Stream fileStream, char* intPtr)
        {
            List<byte> lrs = new List<byte>();
            try
            {
                if (fileStream.Length > 0)
                {
                    //int DefaultBlockSize = 1 * 1024;//默认读取块大小
                    int DefaultBlockSize = GetDecryptPushBlockLength(fileStream.Length);// 5 * 1024 * 1024;//默认读取块大小
                    fileStream.Position = 0;//重置读取位置

                    while (fileStream.Position < fileStream.Length)
                    {
                        long blockSize = fileStream.Length - fileStream.Position;// (int)Math.Min(fileStream.Length - fileStream.Position, DefaultBlockSize);

                        //读取等待解密的数据
                        byte[] fileBuff = new byte[blockSize];
                        int realSize = fileStream.Read(fileBuff, 0, (int)blockSize);
                        //if(DefaultBlockSize>= 1024000 * 10)
                        //{
                        //    realSize = DefaultBlockSize;
                        //}
                        //处理输出参数
                        int lpdwReplyLength = (int)realSize + (1024 * 4);
                        byte[] fileBuff2 = new byte[lpdwReplyLength];

                        GCHandle hObject2 = GCHandle.Alloc(fileBuff2, GCHandleType.Pinned);
                        IntPtr pBuf = hObject2.AddrOfPinnedObject();
                        _logger.LogInformation($"DecStream===>>待解密的数据流长度：fileBuff={fileBuff.Length};realSize={realSize};lpdwReplyLength={lpdwReplyLength}");
                        var rs = IpgaurdDecryption.TSD_DecryptDataUpdate(intPtr, fileBuff, fileBuff.Length, pBuf, ref lpdwReplyLength);
                        _logger.LogInformation($"DecStream===>>解密数据结果A rs={rs};lpdwReplyLength={lpdwReplyLength}");
                        hObject2.Free();
                        _logger.LogInformation($"DecStream===>>解密数据结果A  hObject2 释放完毕");
                        if (lpdwReplyLength > 0 && rs == 75)
                        {
                            fileBuff2 = new byte[lpdwReplyLength];
                            _logger.LogInformation($"DecStream===>>解密数据结果B  kaishi");
                            var hObject3 = GCHandle.Alloc(fileBuff2, GCHandleType.Pinned);
                            _logger.LogInformation($"DecStream===>>解密数据结果B  fenpeikongjian");
                            pBuf = hObject3.AddrOfPinnedObject();
                            _logger.LogInformation($"DecStream===>>解密数据结果B  1111");
                            rs = IpgaurdDecryption.TSD_DecryptDataUpdate(intPtr, fileBuff, fileBuff.Length, pBuf, ref lpdwReplyLength);
                            _logger.LogInformation($"DecStream===>>解密数据结果B  rs={rs};");
                            hObject3.Free();
                            _logger.LogInformation($"DecStream===>>解密数据结果B rs={rs};lpdwReplyLength={lpdwReplyLength}");
                        }
                        //存入容器
                        if (lpdwReplyLength > 0)
                        {
                            lrs.AddRange(fileBuff2.Take(lpdwReplyLength).ToList());
                        }
                        if (lpdwReplyLength < 0)
                        {
                            _logger.LogInformation($"DecStream===>>lpdwReplyLength {lpdwReplyLength}<0");
                            return null;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"DecStream===>>DecStream系统异常,{ex.Message}", ex);
                return null;
            }
            return lrs.ToArray();
        }

        /// <summary>
        /// 解密块大小处理
        /// </summary>
        /// <param name="fileLength"></param>
        /// <returns></returns>
        private static int GetDecryptPushBlockLength(long fileLength)
        {
            //1000M以上文件每次推100M
            if (fileLength > 1024000 * 1000)
                return 1024000 * 100;
            //100M以上文件每次50M
            if (fileLength > 1024000 * 100)
                return 1024000 * 50;
            //10M以上文件每次10M
            if (fileLength > 1024000 * 10)
                return 1024000 * 10;
            return (int)fileLength;//10M以下文件全部推完
        }

        /// <summary>
        /// 打包文件
        /// </summary>
        /// <param name="zipName">压缩文件名称</param>
        /// <param name="fileList">文件列表</param>
        /// <param name="savepath">保存路径</param>
        public ResZipFileDto ZipFiles(string zipName, List<FileItem> fileList, string savepath)
        {
            try
            {
                //登出ipg用户
                var fan = IpgaurdDecryption.TSD_Finalize();
                _logger.LogInformation($"IpgaurdServer---EndInit---反初始化返回结果:{fan}");              
                string newSavePath = $"{savepath}/{zipName}";
                _logger.LogInformation($"ZipFiles===>>打包文件路径：{savepath}");
                using (ZipOutputStream zipStream = new ZipOutputStream(File.Create(newSavePath)))
                {
                    zipStream.SetLevel(9);   //压缩级别0-9  
                    foreach (var item in fileList)
                    {
                        byte[] buffer = new WebClient().DownloadData(item.FileUrl);
                        ZipEntry entry = new ZipEntry(item.FileName);
                        entry.DateTime = DateTime.Now;
                        entry.Size = buffer.Length;
                        zipStream.PutNextEntry(entry);
                        zipStream.Write(buffer, 0, buffer.Length);
                        //删除文件
                        File.Delete(item.FileUrl);
                    }
                }
                byte[] arrByte = null;
                using (var fileStream = File.OpenRead(newSavePath))
                {
                    arrByte = new byte[fileStream.Length];
                    fileStream.Read(arrByte, 0, arrByte.Length);
                }
                //删除压缩包
                _logger.LogInformation($"ZipFiles===>>删除压缩包：{newSavePath}");
                File.Delete(newSavePath);
                //删除文件夹
                _logger.LogInformation($"ZipFiles===>>删除文件夹：{savepath}");
                Directory.Delete(savepath);
                return new ResZipFileDto { IsSuccess = true, ZipName = zipName, ZipPath = newSavePath, ZipBty = arrByte };
            }
            catch (Exception ex)
            {
                _logger.LogError($"ZipFiles===>>文件压缩异常：{ex.Message}",ex);
                return new ResZipFileDto { IsSuccess = false,Msg= $"文件压缩失败,{ex.Message}" };
            }

        }

        /// <summary>
        /// 生成文件流
        /// </summary>
        /// <param name="tmpUrl"></param>
        /// <returns></returns>
        public Tuple<bool, byte[]> GenerateFileStream(string tmpUrl)
        {
            byte[] arrByte = null;
            try
            {
                using (var fileStream = File.OpenRead(tmpUrl))
                {
                    arrByte = new byte[fileStream.Length];
                    fileStream.Read(arrByte, 0, arrByte.Length);
                }
                return Tuple.Create(true, arrByte);
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"生成文件流,{ex.Message}", ex);
                return Tuple.Create(false, arrByte);
            }
        }


    }
}
