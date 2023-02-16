using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Ext.Dto
{
    /// <summary>
    /// 注册插件服务
    /// </summary>
    public class PluginDto
    {
        /// <summary>
        /// 唯一Id
        /// </summary>
        public string UniqueId { get; set; }

        public string IndexUrl { get; set; }

        public string ServiceCode { get; set; }
        /// <summary>
        /// 服务名称
        /// </summary>
        public string ServiceName { get; set; }

        /// <summary>
        /// 服务类型（0：采集插件；1：集成插件；2：服务插件；3：数据插件）
        /// </summary>
        public string ServiceType { get; set; }

        /// <summary>
        /// 服务版本
        /// </summary>
        public string ServiceVersion { get; set; }

        /// <summary>
        /// 详情地址
        /// </summary>
        public string DetailUrl { get; set; }

        /// <summary>
        /// 插件描述
        /// </summary>
        public string Remark { get; set; }


    }
}
