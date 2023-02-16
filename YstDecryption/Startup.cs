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
            //����ע�ἰ�����ϱ�
            services.AddEDoc2ExtServiceConfig(appConfig);

            //ע��Ԥ������
            services.AddHostedService<ExtHostedService>();
            services.AddTransient<ISchedulerFactory, StdSchedulerFactory>();
            //��ӽ������
            services.AddHealthChecks();

            //ע��httpģ������

            services.AddHttpClient(string.Empty).SetHandlerLifetime(TimeSpan.FromMinutes(2)).ConfigurePrimaryHttpMessageHandler(a =>
            { // https aspnetcore ע������ſ�
                return new System.Net.Http.HttpClientHandler()
                {

                    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true

                };
            });

            services.AddControllersWithViews()
                    .AddInjectWithUnifyResult<XnRestfulResultProvider>() //��ӹ淶���ų��淶�ڷ�������Ӹñ�ǣ�[NonUnify]
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
                // ����¼�ִ����
                buidler.AddExecutor<RetryEventHandlerExecutor>();
                // ����ע���¼�������
                buidler.AddSubscribers(typeof(AuthController).Assembly, typeof(EcmDocProcessEventSubscriber).Assembly).UnobservedTaskExceptionHandler = (obj, args) =>
                {
                    Console.WriteLine("AddSubscribers ����:" + args.Exception.ToString());
                };
            });
        }
        /// <summary>
        /// ������ݿ�
        /// </summary>
        /// <returns></returns>
        private List<ConnectionConfig> AddDatabase()
        {
            // =====���ö��=====
            List<ConnectionConfig> connectConfigList = new List<ConnectionConfig>();

            // =====���õ���=====

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
                case "4"://dm����
                    dbType = DbType.Dm;
                    connectionString = $"Server={databaseServerName}; User Id={databaseUserName}; PWD={databasePassword};DATABASE={databaseName}";
                    break;
                case "5"://PostgreSQL
                    dbType = DbType.PostgreSQL;
                    connectionString = $"PORT={databaseServerPort};DATABASE={databaseName};HOST={databaseServerPort};PASSWORD={databasePassword};USER ID={databaseUserName}";
                    break;
                case "6"://�˴���
                    dbType = DbType.Kdbndp;
                    connectionString = $"Server={databaseServerName};Port={databaseServerPort};UID={databaseUserName};PWD={databasePassword};database={databaseName}";
                    break;
                default:
                    break;
            }
            connectConfigList.Add(new ConnectionConfig
            {
                ConnectionString = connectionString,//���ӷ��ִ�
                DbType = dbType,
                IsAutoCloseConnection = true,
                InitKeyType = InitKeyType.Attribute,//�����Զ�ȡ����������Ϣ
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
