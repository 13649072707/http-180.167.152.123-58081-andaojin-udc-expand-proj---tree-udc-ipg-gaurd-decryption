using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Entity.EcmDocReruenDto
{
    /// <summary>
    ///文档下载检查 
    /// </summary>
    public class DownloadCheck
    {
        /// <summary>
        /// 状态码
        /// </summary>
        public int nResult { get; set; }
        /// <summary>
        /// 提示信息
        /// </summary>
        public string msg { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int RegionId { get; set; }
        /// <summary>
        /// 1-主区域
        /// </summary>
        public int RegionType { get; set; }
        /// <summary>
        /// hash值
        /// </summary>
        public string RegionHash { get; set; }
        /// <summary>
        /// 分区域id
        /// </summary>
        public string RegionUrl { get; set; }

    }

    /// <summary>
    /// 文档下载状态
    /// </summary>
    public class DocDownloadState
    {
        public int nResult { get; set; }
        public string pTaskId { get; set; }
    }
    /// <summary>
    /// 文档压缩状态
    /// </summary>
    public class DocZipProcess
    {
        /// <summary>
        /// 结果状态
        /// </summary>
        public int result { get; set; }
        /// <summary>
        /// 任务id
        /// </summary>
        public string pTaskId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string currentFileName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ex { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string remainTime { get; set; }
        /// <summary>
        /// Complete-完成  ziping-压缩中  begin-开始
        /// </summary>
        public string status { get; set; }
        /// <summary>
        /// 压缩包名称
        /// </summary>
        public string zipName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int percent { get; set; }
    }

}
