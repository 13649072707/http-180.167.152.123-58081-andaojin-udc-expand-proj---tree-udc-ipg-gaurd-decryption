using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Data
{


    /// <summary>
    /// 部门表
    /// </summary>
    [SugarTable("org_department")]
    public class EcmDepartment
    {
        /// <summary>
        /// 部门id
        /// </summary>
        [SugarColumn(ColumnName = "dept_identityID", IsPrimaryKey = true, IsIdentity = true,OracleSequenceName = "S_org_department_sequence")]
        public  int IdentityId { get; set; }

        /// <summary>
        ///     ID
        /// </summary>
        [SugarColumn(ColumnName = "dept_id")]
        public  string ID { get; set; }

        /// <summary>
        ///     部门编号
        /// </summary>
        [SugarColumn(ColumnName = "dept_code", Length = 100)]
        public  string Code { get; set; }

        /// <summary>
        ///     第三方ID
        /// </summary>
        [SugarColumn(ColumnName = "dept_thirdPartId", Length = 100)]
        public  string ThirdPartId { get; set; }

        /// <summary>
        ///     部门主管职位ID
        /// </summary>
        [SugarColumn(ColumnName = "dept_masterPositionId", Length = 100)]
        public  string MasterPositionId { get; set; }

        /// <summary>
        ///     部门主管职位IdentityId
        /// </summary>
        [SugarColumn(ColumnName = "dept_masterPositionIdentityId")]
        public  int MasterPositionIdentityId { get; set; }

        /// <summary>
        ///     部门名称
        /// </summary>
        [SugarColumn(ColumnName = "dept_name", Length = 200)]
        public  string Name { get; set; }

        /// <summary>
        ///     排序
        /// </summary>
        [SugarColumn(ColumnName = "dept_sort")]
        public  int Sort { get; set; }

        /// <summary>
        ///     创建时间
        /// </summary>
        [SugarColumn(ColumnName = "dept_createTime")]
        public  DateTime? CreateTime { get; set; }

        /// <summary>
        ///     启用时间
        /// </summary>
        [SugarColumn(ColumnName = "dept_enableTime")]
        public  DateTime? EnableTime { get; set; }

        /// <summary>
        ///     过期时间
        /// </summary>
        [SugarColumn(ColumnName = "dept_expirationTime")]
        public  DateTime? ExpirationTime { get; set; }

        /// <summary>
        ///  部门路径
        /// </summary>
        [SugarColumn(ColumnName = "dept_path", Length = 1000)]
        public  string DeptPath { get; set; }

        /// <summary>
        ///  上级部门
        /// </summary>
        [SugarColumn(ColumnName = "dept_parentid", Length = 100)]
        public  string ParentId { get; set; }

        /// <summary>
        ///  上级部门IdentityId
        /// </summary>
        [SugarColumn(ColumnName = "dept_parentidentityId")]
        public  int ParentIdentityId { get; set; }

        /// <summary>
        ///     备注
        /// </summary>
        [SugarColumn(ColumnName = "dept_remark", Length = 500)]
        public  string Remark { get; set; }
    }
}
