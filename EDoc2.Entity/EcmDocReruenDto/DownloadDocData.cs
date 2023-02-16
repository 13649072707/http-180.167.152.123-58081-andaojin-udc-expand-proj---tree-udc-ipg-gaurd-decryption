using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Entity.EcmDocReruenDto
{
    public class DownloadDocData
    {
        /// <summary>
        /// 文件id 多个用英文逗号隔开
        /// </summary>
        public string fileIds { get; set; } 
        /// <summary>
        /// 文件件id 多个用英文逗号隔开
        /// </summary>
        public string folderIds { get; set; }
        /// <summary>
        /// 外发code
        /// </summary>
        public string code { get; set; } 
        /// <summary>
        /// 外发code
        /// </summary>
        public string codekey { get; set; } 
        /// <summary>
        /// 系统令牌
        /// </summary>
        public string token { get; set; } 
        /// <summary>
        /// 压缩包名称 ,单文件下载传递文件名称
        /// </summary>
        public string zipName { get; set; }
        /// <summary>
        /// 系统令牌
        /// </summary>
        public string integrationKey { get; set; } 

    }

    public class ZipDataDto
    {
        /// <summary>
        /// 任务key
        /// </summary>
        public string JobKey { get; set; }
        /// <summary>
        /// 外发code
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 压缩包名称 ,单文件下载传递文件名称
        /// </summary>
        public string ZipName { get; set; }
        /// <summary>
        /// 系统令牌
        /// </summary>
        public string Token { get; set; }
    }

    public class DecryptYst
    {
        public string key { get; set; }
        public string fileName { get; set; }
    }
}
