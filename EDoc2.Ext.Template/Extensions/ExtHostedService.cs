using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EDoc2.Ext.Template.Extensions
{
    public class ExtHostedService : IHostedService
    {
        public Task StartAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
           //todo:服务挂掉时调用预警接口发送预警
            try
            {

            }
            catch(Exception ex)
            {

            }

            return Task.CompletedTask;
        }
    }
}
