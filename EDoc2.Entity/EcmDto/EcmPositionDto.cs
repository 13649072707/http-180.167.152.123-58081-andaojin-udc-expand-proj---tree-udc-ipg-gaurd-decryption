using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    /// <summary>
    /// 职位实体
    /// </summary>
    public class EcmPositionDto
    {
        /// <summary>
        ///     ID
        /// </summary>
        public  string ID { get; set; }

        /// <summary>
        /// 职位id
        /// </summary>
        public  int IdentityId { get; set; }

        /// <summary>
        ///     职位编号
        /// </summary>
        public  string Code { get; set; }

        /// <summary>
        ///     第三方ID
        /// </summary>
        public  string ThirdPartId { get; set; }

        /// <summary>
        ///     上级职位
        /// </summary>
        public  string ParentId { get; set; }

        /// <summary>
        ///     职位名称
        /// </summary>
        public  string Name { get; set; }

        /// <summary>
        ///     职等
        /// </summary>
        public  int LevelId { get; set; }

        /// <summary>
        ///     职位类型
        /// </summary>
        public  int PositionType { get; set; }

        /// <summary>
        ///     排序
        /// </summary>
        public  int Sort { get; set; }

        /// <summary>
        ///     创建时间
        /// </summary>
        public  DateTime? CreateTime { get; set; }

        /// <summary>
        ///     启用时间
        /// </summary>
        public  DateTime? EnableTime { get; set; }

        /// <summary>
        ///     过期时间
        /// </summary>
        public  DateTime? ExpirationTime { get; set; }


        /// <summary>
        ///     备注
        /// </summary>
        public  string Remark { get; set; }

        /// <summary>
        ///     部门Id
        /// </summary>
        public  string DeptId { get; set; }

        /// <summary>
        ///     父职位对应的部门ID
        /// </summary>
        public  string ParentDeptId { get; set; }

        /// <summary>
        ///     职位路径
        /// </summary>
        public  string PositionPath { get; set; }
        /// <summary> 
        ///     部门路径
        /// </summary>
        public  string DepartmentPath { get; set; }
    }
}
