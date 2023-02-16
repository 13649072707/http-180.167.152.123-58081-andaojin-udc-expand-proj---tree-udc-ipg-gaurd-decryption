using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Furion.DependencyInjection;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// 持久token数据层
    /// </summary>
    public class AppIntegrationDataProvider:ITransient
    {
        private readonly ISqlSugarRepository<EcmAppintegration> _repository;
        public AppIntegrationDataProvider(ISqlSugarRepository<EcmAppintegration> repository)
        {
            _repository = repository;
        }
        /// <summary>
        /// 创建一个持久token
        /// </summary>
        /// <param name="account">账号</param>
        /// <param name="userId">用户ID</param>
        /// <returns>返回token</returns>
        public async Task<string> InsertAppInteration(string account,string userId)
        {
            var newToken = $"{34:0000}{Guid.NewGuid():N}";
            int result = await _repository.InsertAsync(new EcmAppintegration
            {
                 IntegAccount = account,
                 IntegAppid  =  "org_docking_sync_"+account,
                 IntegAppip="",
                 IntegAppname ="集成平台组织同步",
                 IntegCreatetime = DateTime.Now,
                 IntegCreatorId ="system",
                 IntegEnableweb = false,
                 IntegId = Guid.NewGuid().ToString("N"),
                 IntegRemark ="同步专用",
                 IntegToken = newToken,
                 IntegUserid = userId                 
            });
            if (result>0)
            {
                return newToken;
            }
            return string.Empty;
        }
        /// <summary>
        /// 根据账号获取持久token
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task<string> GetAppInterationTokenByAccountAsync(string account)
        {
            try
            {
                var model = await _repository.Entities.FirstAsync(f => f.IntegAccount == account);
                if (model == null)
                {
                    return string.Empty;
                }
                return model.IntegToken;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
