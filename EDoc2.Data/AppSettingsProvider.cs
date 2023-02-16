using EDoc2.Data.Entity;
using Furion.DependencyInjection;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Data
{
    public class AppSettingsProvider : ITransient
    {
        private readonly ISqlSugarRepository<AppSettings> _sqlSugarRepository;
        public AppSettingsProvider(ISqlSugarRepository<AppSettings> sqlSugarRepository)
        {
            _sqlSugarRepository = sqlSugarRepository;
        }

        /// <summary>
        /// 根据key获取ECM系统配置
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<AppSettings> GetAppSettingsByKeyAsync(string key)
        {
            var model = await _sqlSugarRepository.Entities.FirstAsync(f => f.Key == key && f.InstanceId == 1);
            return model;
        }
    }
}
