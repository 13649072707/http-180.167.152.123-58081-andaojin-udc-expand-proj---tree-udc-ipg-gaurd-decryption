using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Entity.Enumerate
{
    /// <summary>
    /// 任务状态
    /// </summary>
    public enum JobAction
    {
        新增 = 1,
        删除 = 2,
        修改 = 3,
        暂停 = 4,
        停止,
        开启,
        立即执行
    }
}
