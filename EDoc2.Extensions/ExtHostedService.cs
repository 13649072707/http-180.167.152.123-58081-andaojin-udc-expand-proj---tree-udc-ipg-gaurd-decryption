using EDoc2.Api;
using EDoc2.Ext.Dto;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EDoc2.Extensions
{
    public class ExtHostedService : IHostedService
    {

        private readonly IOptions<ConfigInfo> _appConfig;
        public ExtHostedService(IHostApplicationLifetime appLifetime, IOptions<ConfigInfo> appConfig)
        {
            try
            {
                _appConfig = appConfig;
                ConfigInfo config = appConfig.Value;
                appLifetime.ApplicationStarted.Register(async () =>
                {
                    //todo:调用UDC接口往插件表写入数据
                    Console.WriteLine("服务已启动，往udc插件表插入数据begin....");
                    await ExtUtilities.RegisterPlugin(new PluginDto
                    {
                        IndexUrl = config.IndexUrl,
                        DetailUrl = config.DetailUrl,
                        ServiceName = config.Name,
                        ServiceCode = config.Code,
                        ServiceVersion = config.Version,
                        ServiceType = "1",
                        Remark = config.Description,
                        UniqueId = config.Guid
                    });
                    Console.WriteLine("服务已启动，往udc插件表插入数据end....");
                });
            }
            catch (Exception)
            {
                Console.WriteLine();
            }
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            //todo:服务挂掉时调用预警接口发送预警
            try
            {
                Console.WriteLine("服务即将停止服务，调用UDC接口写预警日志 begin......");
                await ExtUtilities.WriteLog(new IntegrationLogDto
                {
                    LogType = 1,
                    OptContent = "",
                    OptTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                    OptUserId = "",
                    OptUserName = ""
                });

                Console.WriteLine("服务即将停止服务，调用UDC接口写预警日志 end......");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
