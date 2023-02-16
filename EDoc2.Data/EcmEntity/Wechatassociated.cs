using System;
using System.Linq;
using System.Text;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    ///<summary>
    ///企业微信与 org_uesr 关联
    ///</summary>
    [SugarTable("wechatassociated")]
    public  class Wechatassociated
    {
           public Wechatassociated(){


           }
           /// <summary>
           /// Desc:主键
           /// Default:
           /// Nullable:False
           /// </summary>           
           [SugarColumn(IsPrimaryKey=true)]
           public string Id {get;set;}

        /// <summary>
        /// Desc:企业微信id
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string WeChatName {get;set;}

        /// <summary>
        /// Desc:org_uesr user_account
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Account {get;set;}

        /// <summary>
        /// Desc:类型 dingding  企业微信 飞书
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Type {get;set;}

    }
    ///类型 dingding  企业微信 飞书
    public enum WechatassociatedType {
        QiyeWeixin=2001,
        DingDing= 2002,
        FeiShu= 2003,
        HuWeiWelink=2004
    }
}
