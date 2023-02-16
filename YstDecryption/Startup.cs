using EDoc2.Api;
using EDoc2.Core.EventSubscriber;
using EDoc2.Core.Ipg;
using EDoc2.Ext.Dto;
using EDoc2.Extensions;
using Furion.EventBus;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Quartz;
using Quartz.Impl;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YstDecryption.Controllers;

namespace YstDecryption
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigInfo appConfig = new ConfigInfo();
            Configuration.GetSection("AppInfo").Bind(appConfig);
            services.Configure<ConfigInfo>(Configuration.GetSection("AppInfo").Bind);
            //服务注册及健康上报
            services.AddEDoc2ExtServiceConfig(appConfig);

            //注册预警服务
            services.AddHostedService<ExtHostedService>();
            services.AddTransient<ISchedulerFactory, StdSchedulerFactory>();
            //添加健康检查
            services.AddHealthChecks();

            //注入http模拟请求

            services.AddHttpClient(string.Empty).SetHandlerLifetime(TimeSpan.FromMinutes(2)).ConfigurePrimaryHttpMessageHandler(a =>
            { // https aspnetcore 注意这里放开
                return new System.Net.Http.HttpClientHandler()
                {

                    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true

                };
            });

            services.AddControllersWithViews()
                    .AddInjectWithUnifyResult<XnRestfulResultProvider>() //添加规范，排除规范在方法上添加该标记：[NonUnify]
                    .AddNewtonsoftJson(options =>
                    {
                        options.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm:ss";
                        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    });

            var connectConfigList = AddDatabase();
            services.AddSqlSugar(connectConfigList.ToArray());
            services.AddRazorPages();
            services.AddEventBus(buidler =>
            {
                // 添加事件执行器
                buidler.AddExecutor<RetryEventHandlerExecutor>();
                // 批量注册事件订阅者
                buidler.AddSubscribers(typeof(AuthController).Assembly, typeof(EcmDocProcessEventSubscriber).Assembly).UnobservedTaskExceptionHandler = (obj, args) =>
                {
                    Console.WriteLine("AddSubscribers 出错:" + args.Exception.ToString());
                };
            });
        }
        /// <summary>
        /// 添加数据库
        /// </summary>
        /// <returns></returns>
        private List<ConnectionConfig> AddDatabase()
        {
            // =====配置多库=====
            List<ConnectionConfig> connectConfigList = new List<ConnectionConfig>();

            // =====配置单库=====

            var databaseUserName = Environment.GetEnvironmentVariable("DatabaseUserName") ?? "user";
            var databasePassword = Environment.GetEnvironmentVariable("DatabasePassword") ?? "1qaz2WSX";
            var databaseServerName = Environment.GetEnvironmentVariable("DatabaseServerName") ?? "mysql";
            var databaseServerPort = Environment.GetEnvironmentVariable("DatabaseServerPort") ?? "3306";
            var databaseName = Environment.GetEnvironmentVariable("DatabaseName") ?? "edoc2v5";
            var databaseType = Environment.GetEnvironmentVariable("DatabaseType") ?? "3";
            DbType dbType = DbType.MySql;
            string connectionString = $"Server={databaseServerName};Port={databaseServerPort};Database={databaseName};Uid={databaseUserName};Pwd={databasePassword};SslMode=None;AllowLoadLocalInfile=true;";
            switch (databaseType)
            {
                case "1"://SqlServer
                    dbType = DbType.SqlServer;
                    connectionString = $"Server={databaseServerName};Database={databaseName};uid={databaseUserName};pwd={databasePassword}";
                    break;
                case "2"://oracle
                    dbType = DbType.Oracle;
                    break;
                case "4"://dm达梦
                    dbType = DbType.Dm;
                    connectionString = $"Server={databaseServerName}; User Id={databaseUserName}; PWD={databasePassword};DATABASE={databaseName}";
                    break;
                case "5"://PostgreSQL
                    dbType = DbType.PostgreSQL;
                    connectionString = $"PORT={databaseServerPort};DATABASE={databaseName};HOST={databaseServerPort};PASSWORD={databasePassword};USER ID={databaseUserName}";
                    break;
                case "6"://人大金仓
                    dbType = DbType.Kdbndp;
                    connectionString = $"Server={databaseServerName};Port={databaseServerPort};UID={databaseUserName};PWD={databasePassword};database={databaseName}";
                    break;
                default:
                    break;
            }
            connectConfigList.Add(new ConnectionConfig
            {
                ConnectionString = connectionString,//连接符字串
                DbType = dbType,
                IsAutoCloseConnection = true,
                InitKeyType = InitKeyType.Attribute,//从特性读取主键自增信息
                ConfigId = "0",
                AopEvents = new AopEvents
                {
                }
            });

            return connectConfigList;
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseRouting();

            //app.UseAuthorization();
            app.UseInject("apidoc");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHealthChecks("/health");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
