using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Ext.Dto
{
    /// <summary>
    /// 集成日志实体
    /// </summary>
    public class IntegrationLogDto
    {
        /// <summary>
        /// 操作人Id
        /// </summary>
        public string OptUserId { get; set; }

        /// <summary>
        /// 操作人
        /// </summary>
        public string OptUserName { get; set; }

        /// <summary>
        /// 操作时间
        /// </summary>
        public string OptTime { get; set; }

        /// <summary>
        /// 操作内容
        /// </summary>
        public string OptContent { get; set; }

        public int LogType { get; set; }
    }
}
