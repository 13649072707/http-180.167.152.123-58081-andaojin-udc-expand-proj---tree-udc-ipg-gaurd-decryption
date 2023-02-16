using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Entity
{
    /// <summary>
    /// 
    /// </summary>
    public class DecryptFiledRequest
    {
        /// <summary>
        /// 集成秘钥
        /// </summary>
        public string IntegrationKey { get;set;}
        public string FileDownloadType { get; set; }
        /// <summary>
        /// 文件夹id
        /// </summary>
        public string FolderIds { get; set; }
        /// <summary>
        /// 文件夹id,多文件逗号分隔
        /// </summary>
        public string FileId { get; set; }
        public string WFcode { get; set; }

        public string WFpwd { get; set; }
        public string ZipName { get; set; }
    }


    /// <summary>
    /// 文件对象
    /// </summary>
    public class FileItem
    {
        /// <summary>
        /// 文件id
        /// </summary>
        public long FileId { get; set; }
        /// <summary>
        /// 文件名称
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// 文件路径
        /// </summary>
        public string FileUrl { get; set; }
        /// <summary>
        /// 文件
        /// </summary>
        public byte[] FileByte { get; set; }
    }
}
