using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// ecm职位实体
    /// </summary>
    [SugarTable("org_position")]
    public class EcmPosition
    {
        /// <summary>
        ///     ID
        /// </summary>
        [SugarColumn(ColumnName = "position_id")]
        public virtual string ID { get; set; }

        /// <summary>
        /// 职位id
        /// </summary>
        [SugarColumn(ColumnName = "position_identityID", IsPrimaryKey = true, IsIdentity = true,OracleSequenceName = "S_org_position_sequence")]
        public virtual int IdentityId { get; set; }

        /// <summary>
        ///     职位编号
        /// </summary>
        [SugarColumn(ColumnName = "position_code", Length = 100)]
        public virtual string Code { get; set; }

        /// <summary>
        ///     第三方ID
        /// </summary>
        [SugarColumn(ColumnName = "position_thirdPartId", Length = 200)]
        public virtual string ThirdPartId { get; set; }

        /// <summary>
        ///     上级职位
        /// </summary>
        [SugarColumn(ColumnName = "position_parentId", Length = 100)]
        public virtual string ParentId { get; set; }

        /// <summary>
        ///     职位名称
        /// </summary>
        [SugarColumn(ColumnName = "position_name", Length = 200)]
        public virtual string Name { get; set; }

        /// <summary>
        ///     职等
        /// </summary>
        [SugarColumn(ColumnName = "position_levelId")]
        public virtual int LevelId { get; set; }

        /// <summary>
        ///     职位类型
        /// </summary>
        [SugarColumn(ColumnName = "position_type")]
        public virtual int PositionType { get; set; }

        /// <summary>
        ///     排序
        /// </summary>
        [SugarColumn(ColumnName = "position_sort")]
        public virtual int Sort { get; set; }

        /// <summary>
        ///     创建时间
        /// </summary>
        [SugarColumn(ColumnName = "position_createTime")]
        public virtual DateTime? CreateTime { get; set; }

        /// <summary>
        ///     启用时间
        /// </summary>
        [SugarColumn(ColumnName = "position_enableTime")]
        public virtual DateTime? EnableTime { get; set; }

        /// <summary>
        ///     过期时间
        /// </summary>
        [SugarColumn(ColumnName = "position_expirationTime")]
        public virtual DateTime? ExpirationTime { get; set; }


        /// <summary>
        ///     备注
        /// </summary>
        [SugarColumn(ColumnName = "position_remark", Length = 500)]
        public virtual string Remark { get; set; }

        /// <summary>
        ///     部门Id
        /// </summary>
        [SugarColumn(ColumnName = "dept_id", Length = 100)]
        public virtual string DeptId { get; set; }

        /// <summary>
        ///     父职位对应的部门ID
        /// </summary>
        [SugarColumn(ColumnName = "dept_parentId",Length = 100)]
        public virtual string ParentDeptId { get; set; }

        /// <summary>
        ///     职位路径
        /// </summary>
        [SugarColumn(ColumnName = "position_path", Length = 8000)]
        public virtual string PositionPath { get; set; }
        /// <summary> 
        ///     部门路径
        /// </summary>
        [SugarColumn(ColumnName = "dept_path", Length = 1000)]
        public virtual string DepartmentPath { get; set; }

    }
}
