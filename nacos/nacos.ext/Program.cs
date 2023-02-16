using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace nacos.ext
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                //配置nacos
                //.ConfigureAppConfiguration((content, builder) => {
                //    var c = builder.SetBasePath(Directory.GetCurrentDirectory())
                //                   .AddJsonFile("appsettings.json")
                //                   .Build();
                //    // 从配置文件读取Nacos相关配置
                //    // 默认会使用JSON解析器来解析存在Nacos Server的配置
                //    var cfg = c.GetSection("NacosConfig");
                //    object p = builder.AddNacosV2Configuration(cfg);
                //})
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
