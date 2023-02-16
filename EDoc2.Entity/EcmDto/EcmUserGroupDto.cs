using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    /// <summary>
    /// 用户组实体
    /// </summary>
    public class EcmUserGroupDto
    {
        /// <summary>
        /// 用户组编号
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        ///     用户组备注信息
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        ///    用户组名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///     用户组Id
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        ///     用户组排序字段:从小到大进行排序
        /// </summary>
        public int Sort { get; set; }
       
    }
}
