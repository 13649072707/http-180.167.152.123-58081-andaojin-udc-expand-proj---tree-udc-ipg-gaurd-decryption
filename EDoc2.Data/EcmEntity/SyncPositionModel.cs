using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// 数据库同步职位表实体
    /// </summary>
    [SugarTable("sync_position")]
    public class SyncPositionModel
    {
        /// <summary>
        /// 自增长id
        /// </summary>
        [SugarColumn(ColumnName = "id", IsPrimaryKey = true, IsIdentity = true,OracleSequenceName = "sync_position_sequence")]
        public virtual int id { get; set; }
        /// <summary>
        /// 同步版本
        /// </summary>
        [SugarColumn(ColumnName = "versions")]
        public virtual int Versions { get; set; }
        /// <summary>
        /// 同步配置外键
        /// </summary>
        [SugarColumn(ColumnName = "type")]
        public virtual int Type { get; set; }
        /// <summary>
        /// 职位编号
        /// </summary>
        [SugarColumn(ColumnName = "position_code")]
        public virtual string PositionCode { get; set; }
        /// <summary>
        /// 职位上级code
        /// </summary>
        [SugarColumn(ColumnName = "position_parent_code")]
        public virtual string PositionParentCode { get; set; }
        /// <summary>
        /// 职位名称
        /// </summary>
        [SugarColumn(ColumnName = "position_name")]
        public virtual string PositionName { get; set; }
        /// <summary>
        /// 职位描述
        /// </summary>
        [SugarColumn(ColumnName = "position_remark")]
        public virtual string PositionRemark { get; set; }
    }
}
