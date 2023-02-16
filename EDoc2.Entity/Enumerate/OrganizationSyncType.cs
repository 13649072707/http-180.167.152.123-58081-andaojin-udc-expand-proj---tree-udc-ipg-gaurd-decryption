using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Entity.Enumerate
{
    /// <summary>
    /// 同步方式
    /// </summary>
    public enum OrganizationSyncType
    {
        /// <summary>
        /// 中间表
        /// </summary>
        IntermediateTable = 0,
        /// <summary>
        /// sdk接口
        /// </summary>
        Sdk = 1
    }
}
