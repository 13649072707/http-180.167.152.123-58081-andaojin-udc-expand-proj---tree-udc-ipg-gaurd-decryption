using EDoc2.Ext.Dto;
using EDoc2.Ext.Template.Config;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Ext.Template
{
    public class Program
    {

        /// <summary>
        /// 扩展服务名
        /// </summary>
        public static string ServiceName { get; set; }

        /// <summary>
        /// 扩展服务中文名称
        /// </summary>
        public static string ServiceNameCN { get; set; }

        /// <summary>
        /// UDC地址
        /// </summary>
        public static string UdcUrl { get; set; }

        public static async Task Main(string[] args)
        {
            try
            {
                /*
                  服务启动时需要环境变量配置以下环境变量： 
                     1、UdcUrl:UDC服务ip地址
                     2、ExtServiceName：此扩展服务的名称
                 */
#if DEBUG
                Environment.SetEnvironmentVariable("UdcUrl", "http://localhost:8081");
                Environment.SetEnvironmentVariable("ExtServiceName", "dingdingauth");
#endif

                UdcUrl = Environment.GetEnvironmentVariable("UdcUrl");
                ServiceName = Environment.GetEnvironmentVariable("ExtServiceName");

                //校验服务配置是否存在
                ConfigInfo configDto = new ConfigInfo() { Code = ServiceName, Name = "钉钉认证", Description = "集成登录钉钉认证", Tags = "集成登录" };
                configDto.Metadata.Add("cnname", "钉钉认证");
                configDto.Metadata.Add("enname", "dingdingauth");
                configDto.Metadata.Add("twname", "钉钉认证");
                configDto.Metadata.Add("jpname", "钉钉认证");
                if (!await CheckRun(UdcUrl, configDto))
                {
                    return;
                }
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                    .UseKestrel(options =>
                    {
                        options.ListenAnyIP(HostServiceConfig.HttpPort);
                    })
                    .UseStartup<Startup>();
                });


        #region 服务检查

        public static NacosConfig NacosCfg { get; set; }
        public static MiddlewareConfig MiddlewareCfg { get; set; }
        private static HttpClient Client = new HttpClient();
        /// <summary>
        /// 检查扩展服务运行条件是否满足
        /// </summary>
        /// <returns></returns>
        static async Task<bool> CheckRun(string udcUrl, ConfigInfo dto)
        {
            bool checkResult = true;
            try
            {
                if (string.IsNullOrWhiteSpace(udcUrl))
                {
                    checkResult = false;
                    Console.WriteLine("尚未配置UDC服务地址");
                }
                else if (string.IsNullOrWhiteSpace(dto.Code))
                {
                    checkResult = false;
                    Console.WriteLine("扩展服务名称不能为空");
                }

                NacosCfg = await GetNacosConfigFromUdc(udcUrl);
                if (NacosCfg == null)
                {
                    checkResult = false;
                    Console.WriteLine("获取Nacos配置信息失败");
                }

                MiddlewareCfg = await GetMiddlewareConfigFromUdc(udcUrl);


                //是否存在服务配置
                if (!await IsExistedConfig())
                {
                    //发布配置
                    if (await PublishConfig(dto))
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


        /// <summary>
        /// 从UDC获取nacos配置信息
        /// </summary>
        /// <returns></returns>
        static async Task<NacosConfig> GetNacosConfigFromUdc(string udcUrl)
        {

            var response = await Client.GetAsync($"{udcUrl}/api/config/nacos");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrWhiteSpace(content))
                {
                    JObject co = JObject.Parse(content);
                    if (co.ContainsKey("result"))
                    {
                        return JsonConvert.DeserializeObject<NacosConfig>(co["result"]["data"].ToString());
                    }
                }
            }

            return null;
        }

        /// <summary>
        /// 从UDC获取ECM中间件配置信息
        /// </summary>
        /// <returns></returns>
        static async Task<MiddlewareConfig> GetMiddlewareConfigFromUdc(string udcUrl)
        {

            var response = await Client.GetAsync($"{udcUrl}/api/config/middleware");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrWhiteSpace(content))
                {
                    JObject co = JObject.Parse(content);
                    if (co.ContainsKey("result"))
                    {
                        return JsonConvert.DeserializeObject<MiddlewareConfig>(co["result"]["data"].ToString());
                    }
                }
            }

            return null;
        }

        /// <summary>
        /// 配置是否存在
        /// </summary>
        /// <returns></returns>
        static async Task<bool> IsExistedConfig()
        {
            var response = await Client.GetAsync($"{UdcUrl}/api/config/existed?serviceName={ServiceName}");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrWhiteSpace(content))
                {
                    JObject co = JObject.Parse(content);
                    if (co.ContainsKey("result"))
                    {
                        var rtnResult = JsonConvert.DeserializeObject<ReturnValueResult<bool>>(co["result"].ToString());
                        if (rtnResult != null)
                        {
                            return rtnResult.Result == ExtResposeCode.ConfigExisted;
                        }
                    }
                }
            }

            return false;
        }

        static async Task<bool> PublishConfig(ConfigInfo dto)
        {
            var requestContent = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
            var response = await Client.PostAsync($"{UdcUrl}/api/config/publish", requestContent);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrWhiteSpace(content))
                {
                    JObject co = JObject.Parse(content);
                    if (co.ContainsKey("result"))
                    {
                        var rtnResult = JsonConvert.DeserializeObject<ReturnValueResult<bool>>(co["result"].ToString());
                        if (rtnResult != null)
                        {
                            return rtnResult.Result == ExtResposeCode.ConfigPublishSuccessed;
                        }
                    }
                }
            }

            return false;
        }

        /// <summary>
        /// 检查是否已注册该扩展服务
        /// </summary>
        /// <param name="config"></param>
        /// <returns></returns>
        static async Task<int> IsExtServiceRegistered(string udcUrl, string serviceName)
        {
            var response = await Client.GetAsync($"{udcUrl}/api/extension/existed?serviceName={serviceName}");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrWhiteSpace(content))
                {
                    var rtnResult = JsonConvert.DeserializeObject<ReturnValueResult<bool>>(content);
                    if (rtnResult != null)
                    {
                        return rtnResult.Result;
                    }
                }
            }

            return ExtResposeCode.ServiceNotRegistered;
        }
        #endregion

    }
}
