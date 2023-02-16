using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// 用户组
    /// </summary>
    [SugarTable("sync_usergroup")]
    public class SyncUserGroupModel
    {
        /// <summary>
        /// 自增长id
        /// </summary>
        [SugarColumn(ColumnName = "id", IsPrimaryKey = true, IsIdentity = true,OracleSequenceName = "sync_usergroup_sequence")]
        public virtual int ID { get; set; }
        /// <summary>
        /// 同步版本
        /// </summary>
        [SugarColumn(ColumnName = "versions")]
        public virtual int Versions { get; set; }
        /// <summary>
        /// 外键id
        /// </summary>
        [SugarColumn(ColumnName = "type")]
        public virtual int Type { get; set; }
        /// <summary>
        /// 用户组编号|能和用户中的用户组编号关联上
        /// </summary>
        [SugarColumn(ColumnName = "group_groupid")]
        public virtual string GroupGroupid { get; set; } = "";
        /// <summary>
        /// 用户组名称
        /// </summary>
        [SugarColumn(ColumnName = "group_groupname")]
        public virtual string GroupGroupname { get; set; } = "";
    }
}
