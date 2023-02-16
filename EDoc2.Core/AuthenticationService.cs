using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Furion.DependencyInjection;
using EDoc2.Api.Entity;
using EDoc2.Ext.Dto;
using EDoc2.Core.DockingHttp;
using EDoc2.Entity.EcmDocReruenDto;
using EDoc2.Entity;
using Microsoft.Extensions.Caching.Memory;
using Furion.EventBus;
using EDoc2.Core.EventSubscriber;

namespace EDoc2.Core
{
    /// <summary>
    /// 集成登录
    /// </summary>
    public class AuthenticationService : ITransient
    {
        private string BaseUrl = "http://nginx";
        private readonly string UserLoginUrl = "/api/services/Org/UserLogin";
        private readonly string UserLoginIntegrationUrl = "/api/services/Org/UserLoginIntegrationByUserLoginName";
        private readonly IHttpClientFactory _clientFactory;
        private readonly DockingHttpClient _dockingHttpClient;
        private readonly IMemoryCache _memoryCache;
        public AuthenticationService(IHttpClientFactory httpClient
            , DockingHttpClient dockingHttpClient
            , IMemoryCache memoryCache
            )
        {
            _clientFactory = httpClient;
            _memoryCache = memoryCache;
            _dockingHttpClient = dockingHttpClient;
            string HTTP_PROTOCOL_TYPE = Environment.GetEnvironmentVariable("HTTP_PROTOCOL_TYPE") ?? "";
            if (HTTP_PROTOCOL_TYPE.Equals("https", StringComparison.OrdinalIgnoreCase))
            {
                BaseUrl = "https://nginx/";
            }
        }


        #region 
        /// <summary>
        /// 验证token是否为空
        /// </summary>
        /// <param name="token"></param>
        /// <param name="checkToken">当前cheecToken</param>
        /// <param name="baseUrl">请求ecm地址|http://&lt;host&gt;:<port></param>
        /// <returns></returns>
        public async Task<bool> CheckUserTokenValidity(string token, string checkToken, string baseUrl = "")
        {
            if (!string.IsNullOrWhiteSpace(baseUrl))
            {
                BaseUrl = baseUrl;
            }
            Dictionary<string, string> pairs = new Dictionary<string, string>();
            pairs.Add("module", "WebClient");
            pairs.Add("fun", "GetCurrentUser");
            var content = new FormUrlEncodedContent(pairs);
            var result = await _dockingHttpClient.PostAsync($"{BaseUrl.TrimEnd('/')}/WebCore?token={token}&checkToken={checkToken}", content);
            string json = result + "";
            if (json.Contains("errorCode") && (json.Contains("ErrorCode4") || json.Contains("Token失效")))
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        /// <summary>
        ///  验证token是否正常
        /// </summary>
        /// <param name="token"></param>
        /// <param name="baseUrl"></param>
        /// <returns></returns>
        public async Task<bool> CheckUserTokenValid(string token, string baseUrl = "")
        {
            if (!string.IsNullOrWhiteSpace(baseUrl))
            {
                BaseUrl = baseUrl;
            }
#if DEBUG
            BaseUrl = Environment.GetEnvironmentVariable("TESTORGSYNCURL") ?? "http://192.168.251.67";
#endif

            var result = await _dockingHttpClient.GetAsync($"{BaseUrl.TrimEnd('/')}/api/services/Org/CheckUserTokenValidity?token={token}", null, null);
            string json = result + "";
            if (json.Contains("true"))
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 注销登录
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<bool> LogoffEcmAsync(string token, string baseUrl = "")
        {
            if (!string.IsNullOrWhiteSpace(baseUrl))
            {
                BaseUrl = baseUrl;
            }
            Dictionary<string, string> dicPost = new Dictionary<string, string>();
            dicPost.Add("module", "OrgnizationManager");
            dicPost.Add("fun", "UserLogout");
            try
            {
                await _dockingHttpClient.PostAsync($"{BaseUrl.TrimEnd('/')}/WebCore?token={token}", new FormUrlEncodedContent(dicPost));
            }
            catch (Exception)
            {

                return false;
            }

            return true;
        }

        /// <summary>
        /// 判断文件是否存在
        /// </summary>
        /// <param name="token"></param>
        /// <param name="fileId"></param>
        /// <param name="baseUrl"></param>
        /// <returns></returns>
        public async Task<(int result, string token, string message)> IsExistFileByFileId(string token, string fileId, string baseUrl)
        {
            if (!string.IsNullOrWhiteSpace(baseUrl))
            {
                BaseUrl = baseUrl;
            }
            var result = await _dockingHttpClient.GetAsync($"{BaseUrl.TrimEnd('/')}/api/services/File/IsExistFileByFileId?token={token}&fileId={fileId}", null, null);
            if (result == null)
            {
                return (1, "", "");
            }
            var res = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, object>>(result.ToString());

            return (0, res["data"].ToString(), "");
        }


        /// <summary>
        /// 获取外发文件下载次数
        /// </summary>
        /// <param name="token"></param>
        /// <param name="code"></param>
        /// <param name="fileId"></param>
        /// <param name="baseUrl"></param>
        /// <returns></returns>
        public async Task<(int result, string token, string message)> GetPublishFileDownloadTime(string token, string code, string fileId, string baseUrl)
        {
            if (!string.IsNullOrWhiteSpace(baseUrl))
            {
                BaseUrl = baseUrl;
            }
            var result = await _dockingHttpClient.GetAsync($"{BaseUrl.TrimEnd('/')}/api/services/DocPublish/GetPublishFileDownloadTime?token={token}&code={code}&fileId={fileId}", null, null);
            if (result == null)
            {
                return (1, "", "");
            }
            var res = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string,object>>(Newtonsoft.Json.JsonConvert.SerializeObject(result));
           
            return (0, res["data"].ToString(), "");
        }
        /// <summary>
        /// 免密码集成登录
        /// </summary>
        /// <param name="account"></param>
        /// <param name="IPAddress"></param>
        /// <param name="IntegrationKey"></param>
        /// <returns></returns>
        public async Task<(int result, string token, string message)> UserLoginIntegrationByUserLoginNameAsync(string account, string IPAddress, string IntegrationKey, string baseUrl = "")
        {
            if (!string.IsNullOrWhiteSpace(baseUrl))
            {
                BaseUrl = baseUrl;
            }
           
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(new { LoginName = account, IPAddress = IPAddress, IntegrationKey = IntegrationKey });
            var returnValueResult = await _dockingHttpClient.PostEntityAsync<ReturnValueResult<string>>(BaseUrl.TrimEnd('/') + UserLoginIntegrationUrl, new StringContent(json, System.Text.Encoding.UTF8, "application/json"));
            //var returnValueResult = await _dockingHttpClient.PostEntityAsync<ReturnValueResult<string>>("https://testpan.sokon.com" + UserLoginIntegrationUrl, new StringContent(json, System.Text.Encoding.UTF8, "application/json"));
            if (returnValueResult != null)
            {
                return (returnValueResult.Result, returnValueResult.Data, returnValueResult.Message);
            }
            return (1, "", "");
        }

        #endregion

    }
}
