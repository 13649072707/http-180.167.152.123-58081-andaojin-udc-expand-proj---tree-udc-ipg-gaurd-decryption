using SqlSugar;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// 用户关联表
    /// </summary>
    [SugarTable("sync_userposition")]
    public class SyncUserPositionModel
    {
        /// <summary>
        /// 自增长id
        /// </summary>
        [SugarColumn(ColumnName = "id", IsPrimaryKey = true, IsIdentity = true,OracleSequenceName = "sync_userposition_sequence")]
        public virtual int ID { get; set; }
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
        /// 自身编号|可为空
        /// </summary>
        [SugarColumn(ColumnName = "up_upid")]
        public virtual string UpUpid { get; set; } = "";
        /// <summary>
        /// 用户账号|请给用户的账号
        /// </summary>
        [SugarColumn(ColumnName = "up_userid")]
        public virtual string UpUserid { get; set; }
        /// <summary>
        /// 职位编号
        /// </summary>
        [SugarColumn(ColumnName = "up_positionid")]
        public virtual string UpPositionid { get; set; }
        /// <summary>
        /// 是否主职位|1或者true是主职位，0或者false是副职位
        /// </summary>
        [SugarColumn(ColumnName = "up_ismain")]
        public virtual string UpIsmain { get; set; }
    }
}
