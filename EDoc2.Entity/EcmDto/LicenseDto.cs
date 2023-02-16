using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    public class LicenseDto
    {
        /// <summary>
        /// lic是否可用
        /// </summary>
        public string VerifiedOk { get; set; }
        /// <summary>
        /// 授权名
        /// </summary>
        public string CustomerName { get; set; }
        /// <summary>
        /// 实例名
        /// </summary>
        public string InstanceName { get; set; }
        /// <summary>
        /// 语言
        /// </summary>
        public string Sn { get; set; }
        /// <summary>
        /// code
        /// </summary>
        public string MachineCode { get; set; }
        /// <summary>
        /// 过期时间
        /// </summary>
        public string ExpiredTime { get; set; }
        /// <summary>
        /// 最大用户量
        /// </summary>
        public int MaxUsers { get; set; }
        /// <summary>
        /// 最大认证用户
        /// </summary>
        public int MaxSignedInUsers { get; set; }
        /// <summary>
        /// sign
        /// </summary>
        public string AllowSimulSignIn { get; set; }
        /// <summary>
        /// 最大文件数量
        /// </summary>
        public int MaxFileSize { get; set; }
    }

    public class LicenseResultEntity
    {
        /// <summary>
        /// 
        /// </summary> 
        /// 
        public LicenseDto License { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string MachineModel { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SoftwareVersion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CurrentDate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string jumpAddress { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int result { get; set; }
    }
}
