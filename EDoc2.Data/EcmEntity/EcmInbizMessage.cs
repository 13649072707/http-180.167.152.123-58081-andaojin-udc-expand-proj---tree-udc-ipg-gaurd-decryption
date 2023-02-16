using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Data.EcmEntity
{
    /// <summary>
    /// inbiz 消息实体类
    /// </summary>
    [SugarTable("inbiz_message")]
    public class EcmInbizMessage
    {
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true, ColumnName = "id")]
        public int InbizMsgId { get; set; }
        [SugarColumn(ColumnName = "groupid")]
        public int InbizMsgGroupId { get; set; }
        [SugarColumn(ColumnName = "groupname")]
        public string InbizMsgGroupName { get; set; }
        [SugarColumn(ColumnName = "msgtitle")]
        public string InbizMsgTitle { get; set; }
        [SugarColumn(ColumnName = "msgcontent")]
        public string InbizMsgContent { get; set; }
        [SugarColumn(ColumnName = "userid")]
        public string InbizMsgUserId { get; set; }
        [SugarColumn(ColumnName = "senduserid")]
        public string InbizMsgSendUserId { get; set; }
        [SugarColumn(ColumnName = "msgtime")]
        public DateTime InbizMsgTime { get; set; }
        [SugarColumn(ColumnName = "msgread")]
        public int InbizMsgReadId { get; set; }
        [SugarColumn(ColumnName = "readtime")]
        public DateTime InbizMsgReadTime { get; set; }
        [SugarColumn(ColumnName = "websiteid")]
        public string InbizMsgWebsiteId { get; set; }
     
    }

}
