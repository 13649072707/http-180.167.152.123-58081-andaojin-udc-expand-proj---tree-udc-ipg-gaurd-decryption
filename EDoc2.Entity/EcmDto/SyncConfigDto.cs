using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    public class SyncConfigDto
    {
        /// <summary>
        /// id
        /// </summary>
        public int ConfigId { get; set; }
        /// <summary>
        /// 同步类型
        /// </summary>
        public int ConfigSynctype { get; set; }
        /// <summary>
        /// 标题
        /// </summary>
        public string ConfigTitle { get; set; }
        /// <summary>
        /// 配置结构
        /// </summary>
        public string ConfigValuejson { get; set; }
        /// <summary>
        /// 是否启动
        /// </summary>
        public int ConfigIsstart { set; get; }
        /// <summary>
        /// 同步状态
        /// </summary>
        public int ConfigType { get; set; }
        /// <summary>
        /// 当前版本
        /// </summary>
        public int Versions { set; get; }
        /// <summary>
        /// 上个版本
        /// </summary>
        public int Lastversions { set; get; }
    }
}
