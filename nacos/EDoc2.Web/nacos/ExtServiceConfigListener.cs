using EDoc2.Ext.Dto;
using Nacos.V2;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EDoc2.Web.nacos
{
    /// <summary>
    /// 扩展服务配置监听者
    /// </summary>
    public class ExtServiceConfigListener
    {
        private bool _inited = false;
        private readonly INacosNamingService _nacosClient;
        private readonly INacosConfigService _config;
        ConcurrentDictionary<string, ServiceInfo> _configDic = new ConcurrentDictionary<string, ServiceInfo>();
        ConcurrentDictionary<string, ExtServiceConfigListen> _listens = new ConcurrentDictionary<string, ExtServiceConfigListen>();
        public ExtServiceConfigListener(INacosNamingService nacosClient, INacosConfigService config)
        {
            _nacosClient = nacosClient;
            _config = config;
            Init();

        }


        public async Task<bool> EnableExt(string serviceName)
        {
            ServiceInfo serviceInfo = await QueryConfig(serviceName);
            if (serviceInfo == null) return false;

            return serviceInfo.Enabled;
        }


        public async Task<ServiceInfo> QueryConfig(string serviceName)
        {
            if (_nacosClient == null || _config == null) return null;

            if (string.IsNullOrWhiteSpace(serviceName))
            {
                return null;
            }

            if (_configDic.TryGetValue(serviceName, out var _s))
            {
                return _s;
            }

            var content = await _config.GetConfig($"did-{serviceName}", "", 5 * 1000);
            if (string.IsNullOrWhiteSpace(content))
                return null;

            var service = Parse(content);
            _configDic.AddOrUpdate(service.Code, service, (o, n) => service);
            ExtServiceConfigListen listen = new ExtServiceConfigListen(this);
            _listens.AddOrUpdate(service.Code, listen, (o, n) => listen);
            return service;
        }

        public async Task<bool> UpdateConfig(string content)
        {
            if (_nacosClient == null || _config == null) return false;
            ServiceInfo service = Parse(content);
            _configDic.AddOrUpdate(service.Code, service, (o, n) => service);
            return true;
        }

        /// <summary>
        /// 从nacos中获取已有的配置，初始化监听
        /// </summary>
        void Init()
        {
            _ = Task.Run(async () =>
            {
                Thread.Sleep(10 * 1000);
                try
                {
                    if (_inited) return;
                    var list = await LoadAllConfig();
                    foreach (var item in list)
                    {
                        _configDic.AddOrUpdate(item.Code, item, (o, n) => item);
                        if(!_listens.TryGetValue(item.Code, out var listens))
                        {
                            ExtServiceConfigListen listen = new ExtServiceConfigListen(this);
                            _listens.AddOrUpdate(item.Code, listen, (o, n) => listen);
                            await _config.AddListener($"did-{item.Code}", NacosConfigHelper.DefaultGroupName, listen);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }

                _inited = true;

            });
        }

        async Task<List<ServiceInfo>> LoadAllConfig()
        {
            List<ServiceInfo> list = new List<ServiceInfo>();
            string configJson = await _config.GetConfig(1, 99999, "", 5 * 1000);
            if (!string.IsNullOrWhiteSpace(configJson))
            {
                JObject content = JObject.Parse(configJson);

                if (content.ContainsKey("pageItems"))
                {
                    foreach (var item in content["pageItems"].Children())
                    {
                        ServiceInfo service = Parse(item["content"].ToString());
                        list.Add(service);
                    }
                }
            }

            return list;
        }

        ServiceInfo Parse(string content)
        {
            ServiceInfo service = new ServiceInfo();
            JObject c = JObject.Parse(content);
            if (c.ContainsKey("servicename"))
            {
                service.Code = c["servicename"].ToString();
            }
            if (c.ContainsKey("tags"))
            {
                service.Tags = c["tags"].ToString();
            }

            if (c.ContainsKey("enabled") && bool.TryParse(c["enabled"].ToString(), out bool _b))
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

            return service;
        }
    }
}
