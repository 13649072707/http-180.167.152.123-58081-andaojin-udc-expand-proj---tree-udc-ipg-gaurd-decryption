using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// 数据库同步部门表实体
    /// </summary>
    [SugarTable("sync_department")]
    public class SyncDepartmentModel
    {
        /// <summary>
        /// 自增长id
        /// </summary>
        [SugarColumn(ColumnName = "id", IsPrimaryKey = true, IsIdentity = true,OracleSequenceName = "sync_dept_sequence")]
        public virtual int ID { get; set; }
        /// <summary>
        /// 同步版本
        /// </summary>
        [SugarColumn(ColumnName = "versions")]
        public virtual int Versions { get; set; }
        /// <summary>
        /// 同步配置外键
        /// </summary>
        [SugarColumn(ColumnName = "sync_type")]
        public virtual int SyncType { get; set; }
        /// <summary>
        /// 部门编号
        /// </summary>
        [SugarColumn(ColumnName = "dept_code")]
        public virtual  string DeptCode { get; set; }
        /// <summary>
        /// 部门上级code
        /// </summary>
        [SugarColumn(ColumnName = "dept_parent_code")]
        public virtual string DeptParentCode { get; set; }
        /// <summary>
        /// 部门名称
        /// </summary>
        [SugarColumn(ColumnName = "dept_name")]
        public virtual string DeptName { get; set; }
        /// <summary>
        /// 部门描述
        /// </summary>
        [SugarColumn(ColumnName = "dept_remark")]
        public virtual  string DeptRemark { get; set; }
    }
}
