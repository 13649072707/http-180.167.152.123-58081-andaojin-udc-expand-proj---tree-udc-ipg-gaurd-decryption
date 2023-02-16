using EDoc2.Ext.Dto;
using EDoc2.Web.nacos;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Nacos.V2;
using Nacos.V2.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EDoc2.Web
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
            services.AddControllersWithViews();


            services.AddNacosV2Config(x =>
            {
                x.ServerAddresses = new System.Collections.Generic.List<string> { NacosConfigHelper.ServerAddresses };
                x.EndPoint = "";
                x.Namespace = NacosConfigHelper.DefaultNamespace;
                x.UserName = "nacos";
                x.Password = "nacos";

                //// this sample will add the filter to encrypt the config with AES.
                //x.ConfigFilterAssemblies = new System.Collections.Generic.List<string> { "App3" };

                //// swich to use http or rpc
                x.NamingUseRpc = false;
                x.ConfigUseRpc = false;
            });

            services.AddNacosV2Naming(x =>
            {
                x.ServerAddresses = new System.Collections.Generic.List<string> { NacosConfigHelper.ServerAddresses };
                x.EndPoint = "";
                x.Namespace = NacosConfigHelper.DefaultNamespace;

                // swich to use http or rpc
                x.NamingUseRpc = false;
                x.ConfigUseRpc = false;
            });

            services.AddSingleton<ExtServiceConfigListener>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //var nacosConfigService = app.ApplicationServices.GetRequiredService<INacosConfigService>();

            var lintener = app.ApplicationServices.GetRequiredService<ExtServiceConfigListener>();

            //nacosConfigService.AddListener("edoc2ext.login", "edoc2ext", listen);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); 
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
               // app.UseHsts();
            }
            //app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
