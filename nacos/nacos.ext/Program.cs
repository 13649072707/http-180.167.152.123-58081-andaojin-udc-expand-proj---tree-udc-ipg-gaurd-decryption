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
                //����nacos
                //.ConfigureAppConfiguration((content, builder) => {
                //    var c = builder.SetBasePath(Directory.GetCurrentDirectory())
                //                   .AddJsonFile("appsettings.json")
                //                   .Build();
                //    // �������ļ���ȡNacos�������
                //    // Ĭ�ϻ�ʹ��JSON����������������Nacos Server������
                //    var cfg = c.GetSection("NacosConfig");
                //    object p = builder.AddNacosV2Configuration(cfg);
                //})
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
