using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    /// <summary>
    /// 部门实体
    /// </summary>
    public class EcmDepartmentDto
    {
        /// <summary>
        /// 部门id
        /// </summary>
        public int IdentityId { get; set; }

        /// <summary>
        ///     ID
        /// </summary>
        public string ID { get; set; }

        /// <summary>
        ///     部门编号
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        ///     第三方ID
        /// </summary>
        public string ThirdPartId { get; set; }

        /// <summary>
        ///     部门主管职位ID
        /// </summary>
        public string MasterPositionId { get; set; }

        /// <summary>
        ///     部门主管职位IdentityId
        /// </summary>
        public int MasterPositionIdentityId { get; set; }

        /// <summary>
        ///     部门名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///     排序
        /// </summary>
        public int Sort { get; set; }

        /// <summary>
        ///     创建时间
        /// </summary>
        public DateTime? CreateTime { get; set; }

        /// <summary>
        ///     启用时间
        /// </summary>
        public DateTime? EnableTime { get; set; }

        /// <summary>
        ///     过期时间
        /// </summary>
        public DateTime? ExpirationTime { get; set; }

        /// <summary>
        ///  部门路径
        /// </summary>
        public string DeptPath { get; set; }

        /// <summary>
        ///  上级部门
        /// </summary>
        public string ParentId { get; set; }

        /// <summary>
        ///  上级部门IdentityId
        /// </summary>
        public int ParentIdentityId { get; set; }

        /// <summary>
        ///     备注
        /// </summary>
        public string Remark { get; set; }
    }
}
