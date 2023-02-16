using EDoc2.Api;
using EDoc2.Core;
using EDoc2.Core.Ipg;
using EDoc2.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace YstDecryption.Controllers
{
    public class IpgaurdDecryptionController : Controller
    {
        private readonly AuthenticationService _authenticationService;
        private readonly IpgDecryptService _ipgDecryptService;
        public IpgaurdDecryptionController(AuthenticationService authenticationService, IpgDecryptService ipgDecryptService) 
        {
            _authenticationService = authenticationService;
            _ipgDecryptService = ipgDecryptService;
        }

        /// <summary>
        /// 下载文件并用ipg解密
        /// </summary>
        /// <param name="docDto"></param>
        /// <returns></returns>
        [HttpPost("/IpgaurdDecryption/DownloadAndDecrypt")]
        [NonUnify, AllowAnonymous]
        public async Task<IActionResult> DownloadAndDecrypt([FromForm]DecryptFiledRequest docDto) 
        {
            try
            {
                //获取环境变量
                string ecmUrl = Environment.GetEnvironmentVariable("EcmFileUrl");
                if (string.IsNullOrWhiteSpace(ecmUrl))
                {
                    return Content($"未配置环境变量,EcmFileUrl");
                }
                var tokenRes = await _authenticationService.UserLoginIntegrationByUserLoginNameAsync("admin", "127.0.0.1", docDto.IntegrationKey, ecmUrl);
                if (tokenRes.result != 0 || string.IsNullOrWhiteSpace(tokenRes.token)) 
                {
                    return Content($"token获取失败,请核实ECM集成登录密钥-{tokenRes.result}");
                }
                //文件集合
                List<FileItem> fileList = new List<FileItem>();
                List<long> fileIds = new List<long>();
                if (!string.IsNullOrWhiteSpace(docDto.FileId))
                {
                    fileIds = docDto.FileId.Split(',').ToList().ConvertAll(s => long.Parse(s));
                }
                if (!string.IsNullOrWhiteSpace(docDto.FolderIds))
                {
                    //获取文件夹下所有文件id
                    var relust = _ipgDecryptService.GetDmsFoldersList(ecmUrl,docDto.FolderIds, tokenRes.token);
                    if (!relust.Item1)
                    {
                        return Content($"获取文件夹下的文件失败！");
                    }
                    fileIds.AddRange(relust.Item3);
                }
                // 初始化ipg解密
                var chuShiHua = _ipgDecryptService.InitializeDecrypt();
                if (!chuShiHua)
                {
                    return Content("初始化ipg解密接口未成功！");
                }
                //生成文件保存路径
                TimeSpan ts = TimeUtil.GetCstDateTime() - new DateTime(1970, 1, 1, 0, 0, 0, 0);
                var sjc = Convert.ToInt64(ts.TotalSeconds);                
                var path = $"FlieSeva/{sjc.ToString()}";
                var dicPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, path);
                if (!Directory.Exists(dicPath))
                {
                    Directory.CreateDirectory(dicPath);
                }        
                foreach (var item in fileIds)
                {
                    var fileInfo = _ipgDecryptService.GetDmsFileInfo(ecmUrl,item, tokenRes.token);
                    if (!fileInfo.Item1)
                    {
                        return Content($"文件id：{item},获取文件信息失败，{fileInfo.Item2}！");
                    }
                    var taskDownload = await _ipgDecryptService.NewDownLoadFile(ecmUrl, tokenRes.token, dicPath, item, fileInfo.Item3.FileName);
                    FileItem fileDto = new FileItem()
                    {
                        FileId = fileInfo.Item3.FileId,
                        FileName = taskDownload.Item2,
                        FileUrl = taskDownload.Item3
                    };
                    // 检测文件是否密文
                    var bresFile1 = _ipgDecryptService.IsEncryptedFileById(fileDto.FileUrl, fileDto.FileName);
                    if (!bresFile1.Item1)
                    {
                        //文件发生未知错误
                        return Content($"检测文件是否密文发生错误,{bresFile1.Item3}");
                    }
                    if (!bresFile1.Item2)
                    {
                        //不是加密文件,不需要解密,不做处理
                        fileList.Add(fileDto);
                        continue;
                    }
                    // 密文进行解密
                    var resStatus = _ipgDecryptService.DownloadEcmDocentitybyIpg(fileDto.FileName, fileDto.FileUrl, dicPath);
                    // 解密处理后更新进度,删除源密文文件

                    if (!resStatus.Item1)
                    {
                        //解密失败
                        return Content($"解密文件时发生错误,{resStatus.Item2}");
                    }
                    //解密完成,添加文件
                    fileList.Add(resStatus.Item3);
                }
                if (fileList.Count == 1)
                {
                    //单文件直接下载
                    var danTupRes = _ipgDecryptService.GenerateFileStream(fileList[0].FileUrl);
                    if (danTupRes.Item1)
                    {
                        return File(danTupRes.Item2, "application/octet-stream", fileList[0].FileName);
                    }
                    else
                    {
                        return Content($"文件下载失败！");
                    }
                }
                else if (fileList.Count > 1)
                {
                    //多文件打包下载
                    var zipName = $"下载文件_{sjc.ToString()}.zip";
                    var tupRes = _ipgDecryptService.ZipFiles(zipName, fileList, dicPath);
                    return File(tupRes.ZipBty, "application/octet-stream", tupRes.ZipName);
                }
                else 
                {
                    return Content($"文件下载失败！");
                }                
            }
            catch (Exception ex)
            {
                return Content($"下载解密异常,{ex.Message}");
            }
        }
    }
}
