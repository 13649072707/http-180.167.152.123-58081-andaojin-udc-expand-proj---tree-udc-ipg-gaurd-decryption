using EDoc2.Entity.Enumerate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Entity
{
    public class OrgSyncSetting
    {
        /// <summary>
        /// 类型:0接口|1数据库.........其他往后
        /// </summary>
        public int OrgType { get; set; } = 0;
        /// <summary>
        /// 状态:0关闭|1启动
        /// </summary>
        public int OrgStatus { get; set; } = 0;
        /// <summary>
        /// 组织节点
        /// </summary>
        public string OrgId { set; get; } = "";
        /// <summary>
        /// 服务名称
        /// </summary>
        public string ServiceName { get; set; } = "";
        /// <summary>
        /// 同步任务cron表达式
        /// </summary>
        public string OrgsyncCron { get; set; } = "";
        /// <summary>
        /// 组织同步操作人账号
        /// </summary>
        public string OperatorAccount { get; set; } = "admin";
        /// <summary>
        /// 是否同步用户组
        /// </summary>
        public bool? IsSyncGroup { get; set; } = false;
        /// <summary>
        /// 是否差量计算删除
        /// </summary>
        public bool? IsDiscrepancyDel { set; get; } = false;
        /// <summary>
        /// 当前ecm版本
        /// </summary>
        public int EcmVersions { get; set; } = (int)EcmVersion.v5_17_0;
        /// <summary> 
        /// 同步其他配置
        /// </summary>
        public object OrgsyncJsonValue { get; set; }
        /// <summary>
        /// 同步方式
        /// </summary>
        public OrganizationSyncType? OrganizationSyncType { get; set; }
        /// <summary>
        /// 免登录集成KEY
        /// </summary>
        public string IntegrationKey { get; set; }

        /*其他配置*/
        /// <summary>
        /// 同步第三方接口地址
        /// </summary>
        public string BaseUrl { get; set; }

        /// <summary>
        /// 第三方appId
        /// </summary>
        public string Appid { get; set; }
        /// <summary>
        /// 第三方密钥
        /// </summary>
        public string AppSecret { get; set; }
        /// <summary>
        /// 来源版本
        /// </summary>
        public string ExtensionKey { get; set; } = "";
        /// <summary>
        /// 第三方数据库类型
        /// </summary>
        public int ThirdDatabaseType { get; set; } = 0;

        /// <summary>
        /// 第三方数据库链接字符串
        /// </summary>
        public string ThirdDataBaseConnectStr { get; set; } = "";
    }
}
