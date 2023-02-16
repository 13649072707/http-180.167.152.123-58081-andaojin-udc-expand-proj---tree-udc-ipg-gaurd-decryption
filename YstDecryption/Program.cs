using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Furion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EDoc2.Ext.Dto;
using System.Net.Http;
using EDoc2.Extensions;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Text;
using EDoc2.Api;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using EDoc2.Core.QuartzWorks;
using Serilog;

namespace YstDecryption
{
    public class Program
    {
        public static ConfigInfo AppConfig { get; set; }
        public static async Task Main(string[] args)
        {
            /*
              服务启动时需要环境变量配置以下环境变量： 
                 1、UdcUrl:UDC服务ip地址
             */
#if DEBUG
            Environment.SetEnvironmentVariable("UdcUrl", "https://testpan.sokon.com/udcmgt");
#endif
            var host = CreateHostBuilder(args).Build();
            AppConfig = host.Services.GetRequiredService<IOptions<ConfigInfo>>().Value;

            if (!await CheckRun(AppConfig))
            {
                return;
            }

            await ExtUtilities.EnableConfig(AppConfig.Code, true);

            /*
             * 模拟测试新增、获取和删除配置
                await ExtUtilities.AddConfig(new SystemConfigDto { Key = "addconfigtest", Value = "addconfigtest" });
                await ExtUtilities.GetConfig("addconfigtest");
                await ExtUtilities.DeleteConfig("addconfigtest");

            */

            host.Run();
        }
        static string serilogOutputTemplate = "{NewLine}{Timestamp:yyyy-MM-dd HH:mm:ss:fff} {Level} {Message}{Exception} {SourceContext}";
        static IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(System.IO.Directory.GetCurrentDirectory())
            .AddJsonFile(path: "serilog.json", optional: false, reloadOnChange: true)
            .Build();

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.Inject().UseKestrel(options =>
                    {
                        options.ListenAnyIP(HostServiceConfig.HttpPort);
                    })
                    .UseStartup<Startup>();
                })
                .ConfigureServices((HostContext, service) =>
                {
                    service.AddHostedService<DockingTimeTaskCenter>();
                })
               .UseSerilogDefault(config =>
               {
                   config.ReadFrom.Configuration(configuration)
                   .WriteTo.Console(outputTemplate: serilogOutputTemplate, restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Debug)
                   .WriteTo.File("wwwroot/logs/log.log", retainedFileCountLimit: 3, fileSizeLimitBytes: 1024 * 1024 * 2, rollingInterval: RollingInterval.Day, rollOnFileSizeLimit: true, restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Debug);

               });


        #region 服务检查

        /// <summary>
        /// 检查扩展服务运行条件是否满足
        /// </summary>
        /// <returns></returns>
        static async Task<bool> CheckRun(ConfigInfo dto)
        {
            bool checkResult = true;
            try
            {
                if (string.IsNullOrWhiteSpace(ExtUtilities.UdcUrl))
                {
                    checkResult = false;
                    Console.WriteLine("尚未配置UDC服务地址");
                }
                else if (string.IsNullOrWhiteSpace(dto.Code))
                {
                    checkResult = false;
                    Console.WriteLine("扩展服务名称不能为空");
                }

                var nacosCfg = await ExtUtilities.GetNacosConfigFromUdc();
                if (nacosCfg == null)
                {
                    checkResult = false;
                    Console.WriteLine("获取Nacos配置信息失败");
                }

                //是否存在服务配置
                if (!await ExtUtilities.IsExistedConfig(dto.Code))
                {
                    //发布配置
                    if (await ExtUtilities.PublishConfig(dto))
                    {
                        Console.WriteLine("配置发布成功");
                    }
                    else
                    {
                        Console.WriteLine("配置发布失败");
                    }
                }
            }
            catch (Exception ex)
            {
                checkResult = false;
                Console.WriteLine($"ext service({dto.Code}) CheckRun failt:{ex.Message}");
            }


            return checkResult;
        }
        #endregion

    }
}
