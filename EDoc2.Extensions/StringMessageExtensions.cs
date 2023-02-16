using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Extensions
{
    /// <summary>
    /// 字符串同步消息扩展
    /// </summary>
    public static class StringMessageExtensions
    {
        /// <summary>
        /// 字符串同步消息扩展
        /// </summary>
        /// <param name="this">当前消息体</param>
        /// <param name="syncName">同步服务名</param>
        /// <param name="isError">是否异常消息,默认是false</param>

        public static void SyncMessageAppend(this string @this,string syncName, bool isError = false)
        {
            //ConcurrentQueueHelper<SyncMessageInfo>.Append(new SyncMessageInfo
            //{
            //     IsError = isError,
            //     Message = @this,
            //     SyncName = syncName,
            //});

        }
    }
}
