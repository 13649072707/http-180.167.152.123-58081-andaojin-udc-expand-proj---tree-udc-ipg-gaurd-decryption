using EDoc2.Ext.Dto;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using nacos.ext.Nacos;
using Nacos.V2.DependencyInjection;
using System.Reflection;

namespace nacos.ext
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
            services.AddControllers();

            object p = services.AddSwaggerGen(options =>
            {

                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {

                    Version = "v1",
                    Title = "Nacos API Test"
                });
            });

            //services.AddNacosAspNet(Configuration, "NacosConfig");
            services.AddAutoMapper(Assembly.GetAssembly(typeof(Startup)));


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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "SDK V1");
                options.RoutePrefix = "nacos";
            });


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
