using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using EDoc2.Api.DockingHttp;
using Furion.DependencyInjection;
using Newtonsoft.Json;
using System.Diagnostics;
using Microsoft.Extensions.Logging;

namespace EDoc2.Core.DockingHttp
{
    /// <summary>
    /// httpClient
    /// </summary>
    public class DockingHttpClient : IDockingHttpClient, ITransient
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<DockingHttpClient> _logger;
        public DockingHttpClient(HttpClient httpClient
            , ILogger<DockingHttpClient> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _httpClient.Timeout = TimeSpan.FromMinutes(5);
        }
        /// <summary>
        /// POST请求泛型
        /// </summary>
        /// <param name="url"></param>
        /// <param name="httpContent"></param>
        /// <param name="heads"></param>
        /// <returns></returns>
        public async Task<T> PostEntityAsync<T>(string url, HttpContent httpContent, Dictionary<string, string> heads = null)
        {
            var client = _httpClient;
            if (heads == null)
            {
                heads = new Dictionary<string, string>();
            }
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, url);
            foreach (var head in heads)
            {
                httpRequestMessage.Headers.Add(head.Key, head.Value);
            }
            httpRequestMessage.Content = httpContent;
            var resultPost = await client.SendAsync(httpRequestMessage);
            if (!resultPost.IsSuccessStatusCode)
            {
                string msg = $"请求出错:{resultPost?.RequestMessage}|content:{resultPost?.Content?.ReadAsStringAsync()}|code:{resultPost.StatusCode}";
                _logger.LogError("POST请求出错:" + msg);
                throw new Exception(msg);
            }
            string readJson = await resultPost.Content.ReadAsStringAsync();
            if (readJson.Contains("Token失效"))
            {
                _logger.LogError("POST请求ECM出错:" + readJson);
                throw new JsonWriterException();
            }
            return JsonConvert.DeserializeObject<T>(readJson);
        }

        /// <summary>
        /// GET请求泛型
        /// </summary>
        /// <param name="url"></param>
        /// <param name="parameter">参数</param>
        /// <param name="heads">头部参数</param>
        /// <returns></returns>
        public async Task<T> GetEntityAsync<T>(string url, Dictionary<string, string> parameter = null, Dictionary<string, string> heads = null)
        {
            var client = _httpClient;
            if (heads == null)
            {
                heads = new Dictionary<string, string>();
            }

            if (parameter != null)
            {
                foreach (var item in parameter)
                {
                    if (url.Contains("?"))
                    {
                        url += $"&{item.Key}={item.Value}";
                    }
                    else
                    {
                        url += $"?{item.Key}={item.Value}";
                    }
                }
            }
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url);
            foreach (var head in heads)
            {
                httpRequestMessage.Headers.Add(head.Key, head.Value);
            }
            var resultGet = await client.SendAsync(httpRequestMessage);
            if (!resultGet.IsSuccessStatusCode)
            {
                string msg = $"请求出错:{resultGet?.RequestMessage}|httpRequestMessage.Content:{await httpRequestMessage?.Content?.ReadAsStringAsync()}|content:{await resultGet?.Content?.ReadAsStringAsync()}|code:{resultGet.StatusCode}";

                _logger.LogError("GET请求出错:" + msg);
                throw new Exception(msg);
            }
            return JsonConvert.DeserializeObject<T>((await resultGet.Content.ReadAsStringAsync()));
        }
        /// <summary>
        /// POST请求
        /// </summary>
        /// <param name="url"></param>
        /// <param name="httpContent"></param>
        /// <param name="heads"></param>
        /// <returns></returns>
        public async Task<object> PostAsync(string url, HttpContent httpContent, Dictionary<string, string> heads = null)
        {
            var client = _httpClient;
            if (heads == null)
            {
                heads = new Dictionary<string, string>();
            }
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, url);
            foreach (var head in heads)
            {
                httpRequestMessage.Headers.Add(head.Key, head.Value);
            }
            httpRequestMessage.Content = httpContent;
            var resultPost = await client.SendAsync(httpRequestMessage);
            if (!resultPost.IsSuccessStatusCode)
            {
                string msg = $"请求出错:{resultPost?.RequestMessage}|httpContent:{await httpContent.ReadAsStringAsync()}|content:{await resultPost?.Content?.ReadAsStringAsync()}|code:{resultPost.StatusCode}";
                _logger.LogError("POST请求出错:" + msg);
                throw new Exception(msg);
            }
            return await resultPost.Content.ReadAsStringAsync();
        }

        /// <summary>
        /// GET请求
        /// </summary>
        /// <param name="url"></param>
        /// <param name="parameter">参数</param>
        /// <param name="heads">头部参数</param>
        /// <returns></returns>
        public async Task<object> GetAsync(string url, Dictionary<string, string> parameter = null, Dictionary<string, string> heads = null)
        {
            var client = _httpClient;
            if (heads == null)
            {
                heads = new Dictionary<string, string>();
            }

            if (parameter != null)
            {
                foreach (var item in parameter)
                {
                    if (url.Contains("?"))
                    {
                        url += $"&{item.Key}={item.Value}";
                    }
                    else
                    {
                        url += $"?{item.Key}={item.Value}";
                    }
                }
            }
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url);
            foreach (var head in heads)
            {
                httpRequestMessage.Headers.Add(head.Key, head.Value);
            }
            var resultGet = await client.SendAsync(httpRequestMessage);
            
            if (!resultGet.IsSuccessStatusCode)
            {
                var requestContent = httpRequestMessage?.Content?.ReadAsStringAsync();
                string msg = $"请求出错:{resultGet?.RequestMessage}|content:{await resultGet?.Content?.ReadAsStringAsync()}|code:{resultGet.StatusCode}";
                if (requestContent != null)
                {
                    // 只有在Task或Task<T>对象不为null时，才进行await.避免这里抛出NullReferenceException异常
                    msg += $"|httpRequestMessage.Content:{ await requestContent }";
                }

                _logger.LogError("GET请求出错:" + msg);
                throw new Exception(msg);
            }
            return await resultGet.Content.ReadAsStringAsync();
        }

        public Task<T> PostEntityToFormAsync<T>(string url, Dictionary<string, string> parameter, Dictionary<string, string> heads = null)
        {
            if (parameter == null)
            {
                parameter = new Dictionary<string, string>();
            }
            HttpContent httpContent = new FormUrlEncodedContent(parameter);
            return PostEntityAsync<T>(url, httpContent, heads);
        }

        public Task<object> PostToFormAsync(string url, Dictionary<string, string> parameter, Dictionary<string, string> heads = null)
        {
            if (parameter == null)
            {
                parameter = new Dictionary<string, string>();
            }
            HttpContent httpContent = new FormUrlEncodedContent(parameter);
            return PostAsync(url, httpContent, heads);
        }

        public Task<T> PostEntityToJsonAsync<T>(string url, string json, Dictionary<string, string> heads = null)
        {
            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            return PostEntityAsync<T>(url, httpContent, heads);
        }

        public Task<object> PostToJsonAsync(string url, string json, Dictionary<string, string> heads = null)
        {
            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            return PostAsync(url, httpContent, heads);
        }

        public Task<T> PostEntityToXmlAsync<T>(string url, string xml, Dictionary<string, string> heads = null)
        {
            HttpContent httpContent = new StringContent(xml, Encoding.UTF8, "application/xml");
            return PostEntityAsync<T>(url, httpContent, heads);
        }

        public Task<object> PostToXmlAsync(string url, string xml, Dictionary<string, string> heads = null)
        {
            HttpContent httpContent = new StringContent(xml, Encoding.UTF8, "application/xml");
            return PostAsync(url, httpContent, heads);
        }
    }
}
