using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Core
{
    /// <summary>
    /// 文档业务处理
    /// </summary>
    public enum DocProcessTaskLogType
    {
        /// <summary>
        /// 下载多个文件或者文件夹
        /// </summary>
        DownloadMoreDoc = 0,
        /// <summary>
        /// 下载文件流到本地目录
        /// </summary>
        DownloadDocStreamToLocal = 1,
        /// <summary>
        /// 下载单个文件
        /// </summary>
        DownloadFile = 2,

        /// <summary>
        /// 下载单个亿赛通加密文件
        /// </summary>
        DownloadFileByyst = 3

    }
}
