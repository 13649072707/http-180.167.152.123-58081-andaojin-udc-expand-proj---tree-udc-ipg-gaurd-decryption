using EDoc2.Ext.Template.Config;
using Microsoft.Extensions.DependencyInjection;
using Nacos.AspNetCore.V2;
using Nacos.V2.DependencyInjection;
using System;
using System.Collections.Generic;

namespace EDoc2.Ext.Template
{
    public static class NacosServiceCollectionExtensions
    {
        public static IServiceCollection AddEDoc2ExtServiceConfig(this IServiceCollection services)
        {
            try
            {
                ////配置nacos服务
                //services.AddNacosV2Config(x =>
                //{
                //    x.ServerAddresses = new System.Collections.Generic.List<string> { NacosConfigHelper.ServerAddresses };
                //    x.EndPoint = "";
                //    x.Namespace = NacosConfigHelper.DefaultNamespace;
                //    x.UserName = "nacos";
                //    x.Password = "nacos";
                //    x.NamingUseRpc = false;
                //    x.ConfigUseRpc = false;
                //});

                //services.AddNacosV2Naming(x =>
                //{
                //    x.ServerAddresses = new System.Collections.Generic.List<string> { NacosConfigHelper.ServerAddresses };
                //    x.EndPoint = "";
                //    x.Namespace = NacosConfigHelper.DefaultNamespace;
                //    x.NamingUseRpc = false;
                //    x.ConfigUseRpc = false;
                //});


                //////创建扩展服务

                //注册扩展服务实例
                services.AddNacosAspNet(x =>
                {
                    x.ServerAddresses = new List<string> { Program.NacosCfg.ServerAddresses };
                    x.EndPoint = "";
                    x.Namespace =Program.NacosCfg.DefaultNamespace; 
                    x.ServiceName = Program.ServiceName;
                    x.GroupName = Program.NacosCfg.DefaultGroup;
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
                    //元数据
                    x.Metadata.Add("ServiceNameCN", "扩展服务中文名");
                });
            }
            catch(Exception ex)
            {

            }
            

            return services;
        }

    }
}
