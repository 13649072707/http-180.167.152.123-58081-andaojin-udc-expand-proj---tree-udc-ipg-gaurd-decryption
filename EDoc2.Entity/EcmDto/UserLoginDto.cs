using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    public class UserLoginDto
    {
        /// <summary>
        /// 帐号
        /// </summary>
        public string UserName { set; get; }
        /// <summary>
        /// 密码
        /// </summary>
        public string Password { set; get; }
        /// <summary>
        /// IP地址
        /// </summary>
        public string DomainIp { set; get; }
        /// <summary>
        /// 设备ID
        /// </summary>
        public string DeviceId { set; get; }
        /// <summary>
        /// 微信名称
        /// </summary>
        public string WeChatName { set; get; }
        /// <summary>
        /// 是否是微信登录
        /// </summary>
        public string IsWechatType { set; get; }
        /// <summary>
        /// 客户端类型 可以跳转到[此页面](/swagger/help-doc/index.html#sdk-ClientType)看ClientType参数的值
        /// </summary>
        public string ClientType { set; get; }

        /// <summary>
        /// 用户IP地址
        /// </summary>
        public string UserHostAddress { set; get; }
        /// <summary>
        /// 验证码
        /// </summary>
        public string ValidateCodeSms { get; set; }

        /// <summary>
        /// 用户名/密码是否加密
        /// </summary>
        public bool Secure { get; set; }
    }
}
