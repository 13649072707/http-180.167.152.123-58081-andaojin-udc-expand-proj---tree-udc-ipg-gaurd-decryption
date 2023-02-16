using Microsoft.Extensions.DependencyInjection;
using Nacos.AspNetCore.V2;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using EDoc2.Ext.Dto;
using EDoc2.Api;

namespace EDoc2.Extensions
{
    public static class NacosServiceCollectionExtensions
    {
        public static IServiceCollection AddEDoc2ExtServiceConfig(this IServiceCollection services,ConfigInfo appConfig)
        {
            try
            {
                //注册扩展服务实例
                services.AddNacosAspNet(x =>
                {
                    x.ServerAddresses = new List<string> { ExtUtilities.NacosCfg.ServerAddresses };
                    x.EndPoint = "";
                    x.Namespace = ExtUtilities.NacosCfg.DefaultNamespace;
                    x.ServiceName = appConfig.Code;
                    x.GroupName = ExtUtilities.NacosCfg.DefaultGroup;
                    //x.ClusterName = ""; //扩展服务集群名称,此扩展服务部署多个实例时，ClusterName、ServiceName设置同样的值
                    x.Ip = HostServiceConfig.LocalIP;
                    x.PreferredNetworks = "";
                    x.Port = HostServiceConfig.HttpPort;//扩展服务端口号,默认80可环境变量配置
                    x.Weight = 100;
                    x.RegisterEnabled = true;
                    x.InstanceEnabled = true;
                    x.Ephemeral = true;
                    x.Secure = false;

                    // swich to use http or rpc
                    x.NamingUseRpc = false;
                });
            }
            catch (Exception ex)
            {

            }


            return services;
        }
    }
}
