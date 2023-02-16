using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Api.DockingHttp
{
    public interface IDockingHttpClient
    {
        /// <summary>
        /// POST请求泛型数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="url">地址</param>
        /// <param name="httpContent">参数</param>
        /// <param name="heads">头部数据</param>
        /// <returns></returns>
        Task<T> PostEntityAsync<T>(string url, HttpContent httpContent, Dictionary<string, string> heads = null);
        /// <summary>
        /// Form表单POST请求泛型接口
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="url"></param>
        /// <param name="parameter"></param>
        /// <param name="heads"></param>
        /// <returns></returns>
        Task<T> PostEntityToFormAsync<T>(string url, Dictionary<string, string> parameter, Dictionary<string, string> heads = null);
        /// <summary>
        /// Form表单POST请求
        /// </summary>
        /// <param name="url"></param>
        /// <param name="parameter"></param>
        /// <param name="heads"></param>
        /// <remarks>
        /// 请求参数使用字典
        /// </remarks>
        /// <returns></returns>
        Task<object> PostToFormAsync(string url, Dictionary<string, string> parameter, Dictionary<string, string> heads = null);
        /// <summary>
        /// Json参数POST请求泛型接口
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="url"></param>
        /// <param name="json"></param>
        /// <param name="heads"></param>
        /// <returns></returns>
        Task<T> PostEntityToJsonAsync<T>(string url, string json, Dictionary<string, string> heads = null);
        /// <summary>
        /// Json参数POST请求
        /// </summary>
        /// <param name="url"></param>
        /// <param name="json"></param>
        /// <param name="heads"></param>
        /// <returns></returns>
        Task<object> PostToJsonAsync(string url, string json, Dictionary<string, string> heads = null);
        /// <summary>
        /// Xml参数POST请求泛型接口
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="url"></param>
        /// <param name="parameter"></param>
        /// <param name="heads"></param>
        /// <returns></returns>
        Task<T> PostEntityToXmlAsync<T>(string url, string xml, Dictionary<string, string> heads = null);
        /// <summary>
        /// Xml参数POST请求
        /// </summary>
        /// <param name="url"></param>
        /// <param name="xml"></param>
        /// <param name="heads"></param>
        /// <returns></returns>
        Task<object> PostToXmlAsync(string url, string xml, Dictionary<string, string> heads = null);
        /// <summary>
        /// GET请求泛型数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="url">地址</param>
        /// <param name="parameter">参数</param>
        /// <param name="heads">头部数据</param>
        /// <returns></returns>
        Task<T> GetEntityAsync<T>(string url, Dictionary<string, string> parameter = null, Dictionary<string, string> heads = null);
        /// <summary>
        /// POST请求
        /// </summary>
        /// <param name="url"></param>
        /// <param name="httpContent"></param>
        /// <param name="heads"></param>
        /// <returns></returns>
        Task<object> PostAsync(string url, HttpContent httpContent, Dictionary<string, string> heads = null);
        /// <summary>
        /// GET请求
        /// </summary>
        /// <param name="url"></param>
        /// <param name="parameter"></param>
        /// <param name="heads"></param>
        /// <returns></returns>
        Task<object> GetAsync(string url, Dictionary<string, string> parameter = null, Dictionary<string, string> heads = null);

    }
}
