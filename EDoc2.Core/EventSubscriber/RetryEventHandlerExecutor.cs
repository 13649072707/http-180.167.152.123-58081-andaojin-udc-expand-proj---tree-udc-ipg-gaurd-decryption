using Furion.EventBus;
using System;
using System.Threading.Tasks;

namespace EDoc2.Core.EventSubscriber
{
    public class RetryEventHandlerExecutor : IEventHandlerExecutor
    {
        public async Task ExecuteAsync(EventHandlerExecutingContext context, Func<EventHandlerExecutingContext, Task> handler)
        {
            // 如果执行失败，每隔 1s 重试，最多三次
            await Furion.FriendlyException.Retry.Invoke(async () => {
                await handler(context);
            }, 3, 1000);
        }

        //private Task Retry(Func<Task> p, int v1, int v2)
        //{
        // return Task.FromResult(  p.Invoke());
        //}
    }
}
