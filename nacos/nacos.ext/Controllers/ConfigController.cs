using EDoc2.Ext.Dto;
using Microsoft.AspNetCore.Mvc;
using nacos.ext.Nacos;
using Nacos.V2;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace nacos.ext.Controllers
{
    [Route("api/config")]
    [ApiController]
    public class ConfigController : ControllerBase
    {
        private readonly INacosNamingService _nacosClient;
        private readonly INacosConfigService _svc;
        public ConfigController(INacosNamingService nacosClient, INacosConfigService svc)
        {
            _nacosClient = nacosClient;
            _svc = svc;
        }

        [HttpGet("nacos")]
        public async Task<ReturnValueResult<NacosConfig>> GetNacosConfig()
        {
            ReturnValueResult<NacosConfig> rtnValue = new ReturnValueResult<NacosConfig>();
            rtnValue.Data = new NacosConfig
            {

                ServerAddresses = NacosConfigHelper.ServerAddresses,
                DefaultNamespace = NacosConfigHelper.DefaultNamespace,
                DefaultGroup = NacosConfigHelper.DefaultGroupName,
                UserName = "nacos",
                Password = "nacos"
            };

            return rtnValue;
        }

        [HttpGet("middleware")]
        public async Task<ReturnValueResult<MiddlewareConfig>> GetMiddlewareConfig()
        {
            ReturnValueResult<MiddlewareConfig> rtnValue = new ReturnValueResult<MiddlewareConfig>();
            MiddlewareConfig config = new MiddlewareConfig();
            config.Ceph_HealthUrl = Environment.GetEnvironmentVariable("Ceph_HealthUrl");
            config.Ceph_Url = Environment.GetEnvironmentVariable("Ceph_Url");

            //database
            config.DatabaseName = Environment.GetEnvironmentVariable("DatabaseName") ?? "edoc2v5";
            config.DatabaseServerName = Environment.GetEnvironmentVariable("DatabaseServerName") ?? "mysql";
            config.DatabaseServerPort = Convert(Environment.GetEnvironmentVariable("DatabaseServerPort"), 3306);
            config.DatabaseType = Convert(Environment.GetEnvironmentVariable("DatabaseType"), 3);
            if (config.DatabaseType == 3)
            {
                config.DatabaseUserName = "user";
                config.DatabasePassword = "1qaz2WSX";
            }
            else
            {
                config.DatabaseUserName = Environment.GetEnvironmentVariable("DatabaseUserName");
                config.DatabasePassword = Environment.GetEnvironmentVariable("DatabasePassword");
            }
            //es
            config.ESURL = Environment.GetEnvironmentVariable("ESURL") ?? "http://es:9200";

            //mq
            config.MQVHostName = Environment.GetEnvironmentVariable("MQVHostName") ?? "/";
            config.MQEndPoint = Environment.GetEnvironmentVariable("MQEndPoint");
            config.MQSupplier = Environment.GetEnvironmentVariable("MQSupplier");
            config.MQUserName = Environment.GetEnvironmentVariable("MQUserName") ?? "admin";
            config.MQPwd = Environment.GetEnvironmentVariable("MQPwd") ?? "edoc2";

            //redis

            config.RedisHostID = Environment.GetEnvironmentVariable("RedisHostID") ?? "";
            config.RedisHostName = Environment.GetEnvironmentVariable("RedisHostName") ?? "redis";
            config.RedisPassword = Environment.GetEnvironmentVariable("RedisPassword") ?? "ZgDSvOoY5Q";
            config.RedisHostID1 = Environment.GetEnvironmentVariable("RedisHostID1") ?? "redis1";
            config.RedisHostID2 = Environment.GetEnvironmentVariable("RedisHostID2") ?? "redis2";
            config.RedisHostID3 = Environment.GetEnvironmentVariable("RedisHostID3") ?? "redis3";
            config.RedisMasterName = Environment.GetEnvironmentVariable("RedisMasterName") ?? "mymaster";

            config.RedisPort = Convert(Environment.GetEnvironmentVariable("RedisPort"), 6379);
            config.RedisPoolSize = Convert(Environment.GetEnvironmentVariable("RedisPoolSize"), 2000);
            config.RedisPoolMinSize = Convert(Environment.GetEnvironmentVariable("RedisPoolMinSize"), 50);
            config.PoolReleaseInterval = Convert(Environment.GetEnvironmentVariable("PoolReleaseInterval"), 30);
            config.RedisPort1 = Convert(Environment.GetEnvironmentVariable("RedisPort1"), 26379);
            config.RedisPort2 = Convert(Environment.GetEnvironmentVariable("RedisPort2"), 26379);
            config.RedisPort3 = Convert(Environment.GetEnvironmentVariable("RedisPort3"), 26379);


            rtnValue.Data = config;
            rtnValue.Result = ExtResposeCode.Success;
            return rtnValue;
        }

        /// <summary>
        /// 配置是否存在
        /// </summary>
        /// <param name="serviceName"></param>
        /// <returns></returns>
        [HttpGet("existed")]
        public async Task<ReturnValueResult<bool>> ExistedConfig(string serviceName)
        {
            ReturnValueResult<bool> rtnValue = new ReturnValueResult<bool>();
            if (string.IsNullOrEmpty(serviceName))
            {
                rtnValue.Result = ExtResposeCode.InvalidParameter;
                rtnValue.Message = "配置名称不能为空";
                return rtnValue;
            }

            var cfg = await _svc.GetConfig(dataId: $"dataid-{serviceName}", NacosConfigHelper.DefaultGroupName, 5 * 1000);
            if (cfg != null)
            {
                rtnValue.Result = ExtResposeCode.ConfigExisted;
                rtnValue.Message = "配置已存在";
            }
            else
            {
                rtnValue.Result = ExtResposeCode.ConfigNotExisted;
                rtnValue.Message = "配置不存在存在";
            }
            return rtnValue;
        }

        /// <summary>
        /// 新增配置
        /// </summary>
        /// <returns></returns>
        [HttpPost("publish")]
        public async Task<ReturnValueResult<bool>> Publish(ConfigInfo dto)
        {
            ReturnValueResult<bool> rtnValue = new ReturnValueResult<bool>();
            try
            {
                if (dto == null)
                {
                    rtnValue.Result = ExtResposeCode.InvalidParameter;
                    rtnValue.Message = "配置信息为空";
                    return rtnValue;
                }

                dto.Metadata.TryAdd("servicename", dto.Code);
                dto.Metadata.TryAdd("tags", dto.Tags);
                //新增配置默认不启用，需要ECM中勾选是否启用
                if (dto.Metadata.TryGetValue("enabled", out string _t))
                {
                    dto.Metadata["enabled"] = "false";
                }
                else
                {
                    dto.Metadata.TryAdd("enabled", "false");
                }


                string content = Newtonsoft.Json.JsonConvert.SerializeObject(dto.Metadata);
                bool published = await _svc.PublishConfig(dataId: $"did-{dto.Code}", NacosConfigHelper.DefaultGroupName, content);
                if (published)
                {
                    rtnValue.Result = ExtResposeCode.ConfigPublishSuccessed;
                    rtnValue.Message = "配置发布成功";
                }
                else
                {
                    rtnValue.Result = ExtResposeCode.ConfigPublishFaild;
                    rtnValue.Message = "配置发布失败";

                }
            }
            catch (Exception ex)
            {
                rtnValue.Result = ExtResposeCode.Error;
                rtnValue.Message = ex.Message;
                Console.WriteLine(ex);
            }


            return rtnValue;
        }

        /// <summary>
        /// 获取配置列表
        /// </summary>
        /// <returns></returns>
        [HttpGet("list")]
        public async Task<ReturnValueResult<ConfigPageResult>> List(int pageNo, int pageSize)
        {
            ReturnValueResult<ConfigPageResult> rtnValue = new ReturnValueResult<ConfigPageResult>();
            try
            {
                rtnValue.Data = new ConfigPageResult();
                string configJson = await _svc.GetConfig(pageNo, pageSize, "", 5 * 1000);
                if (!string.IsNullOrWhiteSpace(configJson))
                {
                    JObject content = JObject.Parse(configJson);
                    if (content.ContainsKey("totalCount") && Int32.TryParse(content.GetValue("totalCount").ToString(), out int _t))
                    {

                        rtnValue.Data.TotalCount = _t;
                    }

                    if (content.ContainsKey("pageNumber") && Int32.TryParse(content.GetValue("pageNumber").ToString(), out int _n))
                    {

                        rtnValue.Data.PageNumber = _n;
                    }

                    if (content.ContainsKey("pageItems"))
                    {
                        foreach (var item in content["pageItems"].Children())
                        {
                            JObject  c =JObject.Parse(item["content"].ToString());
                            ServiceInfo service = new ServiceInfo();
                            if (c.ContainsKey("servicename"))
                            {
                                service.Code = c["servicename"].ToString();
                            }
                            if (c.ContainsKey("tags"))
                            {
                                service.Tags = c["tags"].ToString();
                            }

                            if (c.ContainsKey("enabled")&&bool.TryParse(c["enabled"].ToString(),out bool _b))
                            {

                                service.Enabled = _b;
                            }

                            if (c.ContainsKey("cnname"))
                            {
                                service.Names.Add("cnname", c["cnname"].ToString());
                            }

                            if (c.ContainsKey("twname"))
                            {
                                service.Names.Add("twname", c["twname"].ToString());
                            }
                            if (c.ContainsKey("enname"))
                            {
                                service.Names.Add("enname", c["enname"].ToString());
                            }

                            if (c.ContainsKey("jpname"))
                            {
                                service.Names.Add("jpname", c["jpname"].ToString());
                            }

                            rtnValue.Data.Items.Add(service);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                rtnValue.Result = ExtResposeCode.Error;
                rtnValue.Message = ex.Message;
                Console.WriteLine(ex);
            }
            return rtnValue;
        }

        int Convert(string environmentValue, int defaultValue)
        {
            if (!string.IsNullOrWhiteSpace(environmentValue))
            {
                if (Int32.TryParse(environmentValue, out int _tempValue))
                {
                    defaultValue = _tempValue;
                }
            }


            return defaultValue;
        }
    }
}
