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
              ��������ʱ��Ҫ���������������»��������� 
                 1��UdcUrl:UDC����ip��ַ
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
             * ģ�������������ȡ��ɾ������
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


        #region ������

        /// <summary>
        /// �����չ�������������Ƿ�����
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
                    Console.WriteLine("��δ����UDC�����ַ");
                }
                else if (string.IsNullOrWhiteSpace(dto.Code))
                {
                    checkResult = false;
                    Console.WriteLine("��չ�������Ʋ���Ϊ��");
                }

                var nacosCfg = await ExtUtilities.GetNacosConfigFromUdc();
                if (nacosCfg == null)
                {
                    checkResult = false;
                    Console.WriteLine("��ȡNacos������Ϣʧ��");
                }

                //�Ƿ���ڷ�������
                if (!await ExtUtilities.IsExistedConfig(dto.Code))
                {
                    //��������
                    if (await ExtUtilities.PublishConfig(dto))
                    {
                        Console.WriteLine("���÷����ɹ�");
                    }
                    else
                    {
                        Console.WriteLine("���÷���ʧ��");
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
