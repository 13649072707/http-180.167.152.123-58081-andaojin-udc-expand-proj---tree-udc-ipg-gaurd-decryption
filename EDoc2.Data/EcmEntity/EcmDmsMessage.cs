using System;
using System.Linq;
using System.Text;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    ///<summary>
    ///
    ///</summary>
    [SugarTable("dms_message")]
    public partial class EcmDmsMessage
    {
        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:False
        /// </summary>           
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true, ColumnName = "msg_id")]
        public int MsgId { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_instanceId")]
        public int InstanceId { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_type")]
        public int MsgType { get; set; }


        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_optType")]
        public int MsgOptType { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_notifyType")]
        public int MsgNotifyType { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_userId")]
        public int MsgUserId { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_userName")]
        public string MsgUserName { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_optOperatorId")]
        public int MsgOptOperatorId { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_optSourceId")]
        public int MsgOptSourceId { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_optSourceName")]
        public string MsgOptSourceName { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_optParentId")]
        public int MsgOptParentId { get; set; }


        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_optParentName")]
        public string MsgOptParentName { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_optDestId")]
        public int MsgOptDestId { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_optDestName")]
        public string MsgOptDestName { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_content")]
        public string MsgContent { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_teamname")]
        public string TeamName { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_isRead")]
        public bool MsgRead { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:True
        /// </summary>           
        [SugarColumn(ColumnName = "msg_time")]
        public DateTime MsgTime { get; set; }

    }
}
