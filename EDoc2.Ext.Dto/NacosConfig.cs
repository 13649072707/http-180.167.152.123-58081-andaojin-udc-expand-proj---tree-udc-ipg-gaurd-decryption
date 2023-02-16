using System;

namespace EDoc2.Ext.Dto
{
    /// <summary>
    /// Nacos配置文件
    /// </summary>
    public class NacosConfig
    {
        /// <summary>
        /// nacos服务地址
        /// </summary>
        public string ServerAddresses { get; set; }

        /// <summary>
        /// nacos用户名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// nacos用户密码
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// 默认命名空间
        /// </summary>
        public string DefaultNamespace { get; set; }

        /// <summary>
        /// 默认组
        /// </summary>
        public string DefaultGroup { get; set; }
    }
}
