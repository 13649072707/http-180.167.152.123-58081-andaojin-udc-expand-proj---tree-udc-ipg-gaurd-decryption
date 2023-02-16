using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EDoc2.Data;
using Furion.DependencyInjection;
using MacrowingProjectdocking.Api;
using MacrowingProjectdocking.Data;
using MacrowingProjectdocking.Entity;
using MapsterMapper;
using Microsoft.Extensions.Caching.Memory;

namespace EDoc2.Core
{
    /// <summary>
    /// 配置服务类
    /// </summary>
    public class AppSettinsService:ITransient
    {
        private readonly AppSettingsProvider _appSettingsProvider;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _memoryCache;
        public AppSettinsService(AppSettingsProvider appSettingsProvider
            , IMapper mapper
            , IMemoryCache memoryCache)
        {
            _appSettingsProvider = appSettingsProvider;
            _mapper = mapper;
            _memoryCache = memoryCache;
        }
        /// <summary>
        /// 根据key获取配置
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<AppStingsDto> GetAppStingsByKeyAsync(string key)
        {
            var objVal = _memoryCache.Get<AppStingsDto>(key);
            if (objVal != null)
            {
                if (string.IsNullOrWhiteSpace(objVal.ConfigJson))
                {
                    return null;
                }
                return objVal;
            }
            var model = await _appSettingsProvider.GetAppSettingsByKeyAsync(key);
            var appsetting = _mapper.Map<AppStingsDto>(model);
            _memoryCache.Set(key, appsetting??new AppStingsDto(), DateTime.Now.AddHours(1));            
            return appsetting;
        }
        public async Task<dynamic> GetFileJson(string filepath)
        {
            string json = string.Empty;
            await using (FileStream fs = new FileStream(filepath, FileMode.Open, System.IO.FileAccess.Read, FileShare.ReadWrite))
            {
                using (StreamReader sr = new StreamReader(fs, Encoding.GetEncoding("gb2312")))
                {
                    json = sr.ReadToEnd().ToString();
                }
            }
            return json;
        }
        /// <summary>
        /// 清空缓存
        /// </summary>
        /// <param name="key">key</param>
        /// <returns></returns>
        public async Task RemoveCacheByKeyAsync(string key)
        {
            _memoryCache.Remove(key);
        }
    }
}
