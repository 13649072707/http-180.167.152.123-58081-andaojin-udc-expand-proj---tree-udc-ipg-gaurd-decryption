using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Api.Entity
{
    /// <summary>
    /// 标准平台集成登录配置
    /// </summary>
    public class InstantMessagingAuthSetting
    {
        /// <summary>
        /// ecm地址
        /// </summary>
        public string EcmUrl { get; set; }
        /// <summary>
        /// 应用appID
        /// </summary>
        public string Appid { set; get; }
        /// <summary>
        /// Agentid
        /// </summary>
        public string Agentid { set; get; }
        /// <summary>
        /// 应用appSecret
        /// </summary>
        public string AppSecret { get; set; }
        /// <summary>
        /// 免登录集成KEY
        /// </summary>
        public string IntegrationKey { get; set; }
        /// <summary>
        /// 回调地址|不填写会原路返回
        /// </summary>
        public string ReturnUrl { get; set; }
        /// <summary>
        /// 关联方式
        /// 1 组织同步实现帐号关联">自动关联</option>
        /// 2 首次登录人为关联">手动关联</option>
        /// </summary>
        public string AssociationMode { get; set; } = "1";

    }

}
