using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Entity
{
    /// <summary>
    /// 日志导出输出实体|可类中类
    /// </summary>
    public class ExceptLogsOutputDto
    {
        /// <summary>
        /// 导出任务key
        /// </summary>
        public string ExceptKey { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        public string Status { get; set; } = "-1";

        /// <summary>
        /// 消息
        /// </summary>
        public string Message { get; set; } = "";
    }
    /// <summary>
    /// 导出状态输出实体
    /// </summary>
    public class ExceptLogsStatusOutputDto
    {
        /// <summary>
        /// 状态
        /// </summary>
        public string Status { get; set; }
        /// <summary>
        /// 进度
        /// </summary>
        public double Speed { get; set; }
        /// <summary>
        /// 下载地址
        /// </summary>
        public string DownFilePath { get; set; }
        /// <summary>
        /// 进度消息
        /// </summary>
        public string Message { get; set; }
    }
}
