using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    /// <summary>
    /// 存储器用户关系表
    /// </summary>
    public class StorageUserPositionDto
    {
        /// <summary>
        /// 用户编号
        /// </summary>
        public string UserCode { get; set; }
        /// <summary>
        /// 组织Code
        /// </summary>
        public string OrgCode { get; set; }
        /// <summary>
        /// 是否主职位
        /// </summary>
        public bool IsMain { set; get; }
    }
}
