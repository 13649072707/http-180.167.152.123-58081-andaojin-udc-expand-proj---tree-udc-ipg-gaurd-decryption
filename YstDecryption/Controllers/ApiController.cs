using Microsoft.AspNetCore.Mvc;
using Furion.DynamicApiController;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using EDoc2.Api;
using EDoc2.Ext.Dto;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;

namespace YstDecryption.Controllers
{
    public class ApiController : IDynamicApiController
    {
        private readonly IConfiguration _configuration;
        public ApiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        /// <summary>
        /// 获取配置
        /// </summary>
        /// <returns></returns>
        [HttpGet("/api/getconfig")]
        public async Task<dynamic> GetConfigAsync([FromQuery] string key)
        {
            var jsonConfig = await ExtUtilities.GetConfig(key);
            return jsonConfig;
        }
        /// <summary>
        /// 设置配置
        /// </summary>
        /// <returns></returns>
        [HttpPost("/api/settingconfig")]
        public async Task<dynamic> SetConfigAsync(SystemConfigDto configDto)
        {
            return await ExtUtilities.AddConfig(configDto);
        }

        /// <summary>
        /// 健康检查接口
        /// </summary>
        /// <returns></returns>
        [HttpGet("/api/values")]
        public async Task<IActionResult> Get()
        {
            return new ContentResult { Content = $"LocalIpAddress:127.0.0.1" };
        }
        /// <summary>
        /// map的接口
        /// </summary>
        /// <returns></returns>
        [HttpGet("/map")]
        [NonUnify]
        public async Task<dynamic> Index()
        {
            var mapFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "prod.json");
            var data = string.Empty;
            JObject mapJsonObject = new JObject();
            JObject projectJsonObject = new JObject();
            if (System.IO.File.Exists(mapFilePath))
            {
                StreamReader mapFile = System.IO.File.OpenText(mapFilePath);
                JsonTextReader mapReader = new JsonTextReader(mapFile);
                mapJsonObject = (JObject)JToken.ReadFrom(mapReader);
            }

            data = JsonConvert.SerializeObject(mapJsonObject);
            var projectFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "map.json");
            if (System.IO.File.Exists(projectFilePath))
            {
                StreamReader projectFile = System.IO.File.OpenText(projectFilePath);
                JsonTextReader projectReader = new JsonTextReader(projectFile);
                projectJsonObject = (JObject)JToken.ReadFrom(projectReader);
            }

            if (projectJsonObject.Count > 0)
            {
#if DEBUG
                projectJsonObject.Merge(mapJsonObject);
#endif
                data = JsonConvert.SerializeObject(projectJsonObject);
            }

            data = data.Replace(",", ",\r\n").Replace("{", "{\r\n").Replace("}", "\r\n}");
            return data;
        }
    }
}
