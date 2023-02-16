using System.Collections.Generic;

namespace nacos.ext.Nacos.Config
{
    public class ExtServiceInfo
    {
        /// <summary>
        /// 服务实例ID
        /// </summary>
        //[Newtonsoft.Json.JsonProperty("instanceId")]
        public string InstanceId { get; set; }

        /// <summary>
        /// 服务IP地址
        /// </summary>
        //[Newtonsoft.Json.JsonProperty("ip")]
        public string Ip { get; set; }

        /// <summary>
        ///服务端口
        /// </summary>
        //[Newtonsoft.Json.JsonProperty("port")]
        public int Port { get; set; }

        /// <summary>
        /// 服务权重
        /// </summary>
       // [Newtonsoft.Json.JsonProperty("weight")]
        public double Weight { get; set; } = 1.0D;

        /// <summary>
        /// 服务是否健康
        /// </summary>
        //[Newtonsoft.Json.JsonProperty("healthy")]
        public bool Healthy { get; set; } = true;

        /// <summary>
        /// 服务是否启用
        /// </summary>
        //[Newtonsoft.Json.JsonProperty("enabled")]
        public bool Enabled { get; set; } = true;

        /// <summary>
        /// If instance is ephemeral.
        /// </summary>
        //[Newtonsoft.Json.JsonProperty("ephemeral")]
        public bool Ephemeral { get; set; } = true;

        /// <summary>
        /// 集群名称
        /// </summary>
        //[Newtonsoft.Json.JsonProperty("clusterName")]
        public string ClusterName { get; set; }

        /// <summary>
        ///  服务名称
        /// </summary>
        //[Newtonsoft.Json.JsonProperty("serviceName")]
        public string ServiceName { get; set; }

        /// <summary>
        /// 服务元数据
        /// </summary>
        //[Newtonsoft.Json.JsonProperty("metadata")]
        public Dictionary<string, string> Metadata { get; set; } = new Dictionary<string, string>();

    }
}
