using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{

    /// <summary>
    /// 存储器用户组关联关系表
    /// </summary>
    public class StorageGroupMember
    {
        /// <summary>
        /// 用户组ID
        /// </summary>
        public string GroupId { get; set; }

        /// <summary>
        /// 成员guid ID|请传递用户的编号
        /// </summary>
        public string MemberCode { get; set; }
    }
}
