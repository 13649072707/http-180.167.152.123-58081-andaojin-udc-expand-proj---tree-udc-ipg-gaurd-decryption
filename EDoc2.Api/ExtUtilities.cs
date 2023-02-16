using EDoc2.Api.Entity;
using EDoc2.Ext.Dto;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Api
{
    public static class ExtUtilities
    {
        /// <summary>
        /// UDC地址
        /// </summary>
        public static string UdcUrl { get; set; }

        public static string ServiceCode { get; set; }
        public static NacosConfig NacosCfg { get; set; }
        public static MiddlewareConfig MiddlewareCfg { get; set; }
        private static HttpClient Client = new HttpClient();
        
        static ExtUtilities()
        {
            Client.DefaultRequestHeaders.Add("token", "00008a3efccf57434373a2f098153376ca8f");
            UdcUrl = Environment.GetEnvironmentVariable("UdcUrl");
            Console.WriteLine("UdcUrl:"+ UdcUrl);
            if (!string.IsNullOrWhiteSpace(UdcUrl))
            {
                try
                {
                    NacosCfg = GetNacosConfigFromUdc().Result;
                    MiddlewareCfg = GetMiddlewareConfigFromUdc().Result;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            }
            else
            {
                Console.WriteLine("尚未配置UDC地址。。。。。。。");
            }
        }

        /// <summary>
        /// 从UDC获取nacos配置信息
        /// </summary>
        /// <returns></returns>
        public static async Task<NacosConfig> GetNacosConfigFromUdc()
        {

            var response = await Client.GetAsync($"{UdcUrl}/api/config/nacos");
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
        public static async Task<MiddlewareConfig> GetMiddlewareConfigFromUdc()
        {

            var response = await Client.GetAsync($"{UdcUrl}/api/config/middleware");
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
        public static async Task<bool> IsExistedConfig(string serviceName)
        {
            var response = await Client.GetAsync($"{UdcUrl}/api/config/existed?serviceName={serviceName}");
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

        public static async Task<bool> PublishConfig(ConfigInfo dto)
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
        public static async Task<int> IsExtServiceRegistered(string udcUrl, string serviceName)
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
        /// <summary>
        /// 启用或禁用插件配置
        /// </summary>
        /// <param name="serviceCode"></param>
        /// <param name="enable"></param>
        /// <returns></returns>
        public static async Task<bool> RegisterPlugin(PluginDto dto)
        {
            var requestContent = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
            var response = await Client.PostAsync($"{UdcUrl}/api/pluginservice/register", requestContent);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrWhiteSpace(content))
                {
                    JObject co = JObject.Parse(content);
                    if (co.ContainsKey("result"))
                    {
                        var rtnResult = JsonConvert.DeserializeObject<ReturnValueResult<int>>(co["result"].ToString());
                        if (rtnResult != null)
                        {
                            return rtnResult.Result == 0;
                        }
                    }
                }
            }

            return false;
        }
        /// <summary>
        /// 调用UDC接口写日志
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static async Task<bool> WriteLog(IntegrationLogDto logDto)
        {
            var requestContent = new StringContent(JsonConvert.SerializeObject(logDto), Encoding.UTF8, "application/json");
            var response = await Client.PostAsync($"{UdcUrl}/api/integrationlog/add", requestContent);
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
                            return rtnResult.Result == 0;
                        }
                    }
                }
            }

            return false;
        }
        /// <summary>
        /// 启用或禁用插件配置
        /// </summary>
        /// <param name="serviceCode"></param>
        /// <param name="enable"></param>
        /// <returns></returns>
        public static async Task<bool> EnableConfig(string serviceCode, bool enable)
        {
            var requestContent = new StringContent("", Encoding.UTF8, "application/json");
            var response = await Client.PostAsync($"{UdcUrl}/api/config/enable?serviceCode={serviceCode}&enable={enable}", requestContent);
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
        /// 新增配置项
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public static async Task<bool> AddConfig(SystemConfigDto dto)
        {
            var requestContent = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
            var response = await Client.PostAsync($"{UdcUrl}/api/systemconfig/add", requestContent);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrWhiteSpace(content))
                {
                    JObject co = JObject.Parse(content);
                    if (co.ContainsKey("result"))
                    {
                        var rtnResult = JsonConvert.DeserializeObject<ReturnValueResult<int>>(co["result"].ToString());
                        if (rtnResult != null)
                        {
                            return rtnResult.Data > 0;
                        }
                    }
                }
            }

            return false;
        }

        /// <summary>
        /// 获取配置项
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static async Task<string> GetConfig(string key)
        {
            var response = await Client.GetAsync($"{UdcUrl}/api/systemconfig/get?key={key}");
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                if (!string.IsNullOrWhiteSpace(content))
                {
                    JObject co = JObject.Parse(content);
                    if (co.ContainsKey("result"))
                    {
                        var rtnResult = JsonConvert.DeserializeObject<ReturnValueResult<string>>(co["result"].ToString());
                        if (rtnResult != null)
                        {
                            return rtnResult.Data;
                        }
                    }
                }
            }

            return "";
        }
        /// <summary>
        /// 删除配置项
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static async Task<bool> DeleteConfig(string key)
        {
            var requestContent = new StringContent("", Encoding.UTF8, "application/json");
            var response = await Client.PostAsync($"{UdcUrl}/api/systemconfig/del?key={key}", requestContent);
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
                            return rtnResult.Data;
                        }
                    }
                }
            }

            return false;
        }
    }
}
