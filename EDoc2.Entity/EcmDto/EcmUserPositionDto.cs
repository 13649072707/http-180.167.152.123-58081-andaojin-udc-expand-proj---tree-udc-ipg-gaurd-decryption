using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    /// <summary>
    /// 用户关系表
    /// </summary>
    public class EcmUserPositionDto
    {
        /// <summary>
        /// 用户id
        /// </summary>
        public string UserId { get; set; }
        /// <summary>
        /// 职位id
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// 是否主职位
        /// </summary>
        public bool IsMain { set; get; }
    }
}
