using EDoc2.Ext.Dto;
using Microsoft.AspNetCore.Mvc;
using nacos.ext.Nacos;
using nacos.ext.Nacos.Config;
using Nacos.V2;
using Nacos.V2.Naming.Dtos;
using System;
using System.Threading.Tasks;

namespace nacos.ext.Controllers
{
    /// <summary>
    /// 扩展服务接口
    /// </summary>
    [Route("api/extension")]
    [ApiController]
    public class ExtensionController : ControllerBase
    {
        private readonly INacosNamingService _nacosClient;
        public ExtensionController(INacosNamingService client)
        {
            _nacosClient = client;
        }

        [HttpGet("existed")]
        public async Task<ReturnValueResult<bool>> Existed(string serviceName)
        {
            ReturnValueResult<bool> rtnValue = new ReturnValueResult<bool>();
            try
            {
                if (string.IsNullOrWhiteSpace(serviceName))
                {
                    rtnValue.Result = ExtResposeCode.InvalidParameter;
                    rtnValue.Message = "扩展服务名称不能为空";
                    rtnValue.Data = false;
                    return rtnValue;
                }

                var service = await _nacosClient.QueryService(serviceName, NacosConfigHelper.DefaultGroupName);
                if (service == null)
                {
                    rtnValue.Result = ExtResposeCode.ServiceNotRegistered;
                    rtnValue.Message = "服务未注册";
                }
                else
                {
                    rtnValue.Result =ExtResposeCode.ServiceRegistered;
                    rtnValue.Message = "服务已注册";
                }
                
            }
            catch (Exception ex)
            {
                rtnValue.Message = ex.Message;
            }

            return rtnValue;
        }

        /// <summary>
        /// 注册扩展服务
        /// </summary>
        /// <param name="serviceName">服务名称</param>
        /// <param name="ip">服务IP地址</param>
        /// <param name="port">服务端口号(默认80)</param>
        /// <returns></returns>
        [HttpGet("Register")]
        public async Task<ReturnValueResult<bool>> RegisterInstance(string serviceName, string ip, int port)
        {
            return await RegisterInstance(new InstanceInfo() { ServiceName = serviceName, Ip = ip, Port = port });
        }

        /// <summary>
        /// 注册扩展服务
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost("Register")]
        public async Task<ReturnValueResult<bool>> RegisterInstance(InstanceInfo dto)
        {
            ReturnValueResult<bool> rtnValue = new ReturnValueResult<bool>();
            try
            {
                if (dto == null)
                {
                    rtnValue.Result = (int)ExtResposeCode.InvalidParameter;
                    rtnValue.Message = "无效的注册参数,dto is null";
                    return rtnValue;
                }

                rtnValue = ValidateParam(dto);
                if (dto.Port <= 0) dto.Port = 80;

                var instance = new Instance
                {
                    Ip = dto.Ip,
                    Ephemeral = false,
                    Port = dto.Port,
                    ServiceName = dto.ServiceName,
                };

                await _nacosClient.RegisterInstance(dto.ServiceName, instance).ConfigureAwait(false);
                rtnValue.Result = (int)ExtResposeCode.Success;
                rtnValue.Message = "已注册";
            }
            catch (Exception ex)
            {
                rtnValue.Message = ex.Message;
            }

            return rtnValue;
        }


        /// <summary>
        /// 取消扩展服务注册
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpDelete("Deregister")]
        public async Task<ReturnValueResult<bool>> DeregisterInstance(string serviceName, string ip, int port)
        {

            ReturnValueResult<bool> rtnValue = ValidateParam(serviceName, ip);
            if (rtnValue.Result == ExtResposeCode.InvalidParameter)
                return rtnValue;
            try
            {
                var instance = new Instance
                {
                    Ip = ip,
                    Port = port,
                    ServiceName = serviceName
                };

                await _nacosClient.DeregisterInstance(serviceName, instance).ConfigureAwait(false);
                rtnValue.Result = ExtResposeCode.Success;
            }
            catch (Exception ex)
            {
                rtnValue.Result = ExtResposeCode.Error;
                rtnValue.Message = ex.Message;
                rtnValue.StackTrace = ex.StackTrace;

                Console.WriteLine(ex);
            }

            return rtnValue;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="serviceName"></param>
        /// <returns></returns>
        [HttpGet("Select")]
        public async Task<ReturnValueResult<ExtServiceInfo>> Select(string serviceName)
        {
            ReturnValueResult<ExtServiceInfo> rtnValue = new ReturnValueResult<ExtServiceInfo>();
            if (string.IsNullOrWhiteSpace(serviceName))
            {
                rtnValue.Result = ExtResposeCode.InvalidParameter;
                rtnValue.Message = "服务名称不能为空";
                return rtnValue;
            }

            try
            {
                var instance = await _nacosClient.SelectOneHealthyInstance(serviceName);

                if (instance == null)
                {
                    rtnValue.Result = ExtResposeCode.NoHealthyInstance;
                }
                else
                {
                    rtnValue.Result = ExtResposeCode.Success;
                    rtnValue.Data = new ExtServiceInfo() { };
                }
            }
            catch (Exception ex)
            {
                rtnValue.Result = ExtResposeCode.Error;
                rtnValue.Message = ex.Message;
                Console.WriteLine(ex);
            }

            return rtnValue;
        }

        /// <summary>
        /// 上下线服务
        /// </summary>
        /// <param name="serviceName"></param>
        /// <param name="ip"></param>
        /// <param name="port"></param>
        /// <returns></returns>
        [HttpPut("Enable")]
        public async Task<ReturnValueResult<bool>> Put(string serviceName, string ip, int port, bool enabled)
        {
            var rtnResult = ValidateParam(serviceName, ip);
            if (rtnResult.Result == ExtResposeCode.InvalidParameter)
                return rtnResult;

            try
            {
                if (port <= 0) port = 80;

                Instance targetInstance = null;
                var instances = await _nacosClient.GetAllInstances(serviceName);
                if (instances != null)
                {

                    foreach (var instance in instances)
                    {
                        if (instance.Ip == ip && instance.Port == port)
                        {
                            targetInstance = instance;
                            break;
                        }
                    }
                }

                if (targetInstance == null)
                {
                    rtnResult.Result = ExtResposeCode.InstanceNotExisted;
                    rtnResult.Message = "未找到对应的服务实例";
                    return rtnResult;
                }

                targetInstance.Enabled = enabled;
                await _nacosClient.UpdateInstance(serviceName, targetInstance);
                rtnResult.Result = ExtResposeCode.Success;
            }
            catch (Exception ex)
            {
                rtnResult.Result = ExtResposeCode.Error;
                rtnResult.Message = ex.Message;
            }

            return rtnResult;
        }


        ///// <summary>
        ///// 获取所有已注册的服务
        ///// </summary>
        ///// <returns></returns>
        //[HttpGet("GetAllService")]
        //public async Task<ReturnValueResult<List<ExtServiceInfo>>> GetAllService(int pageIndex, int pageSize)
        //{
        //    ReturnValueResult<List<ExtServiceInfo>> rtnValue = new ReturnValueResult<List<ExtServiceInfo>>();
        //    if (pageIndex <= 0) pageIndex = 1;
        //    if (pageSize <= 0) pageSize = 10;
        //    var list = _nacosClient.GetServicesOfServer(pageIndex, pageSize);
        //}


        private ReturnValueResult<bool> ValidateParam(string serviceName, string ip)
        {
            ReturnValueResult<bool> rtnValue = new ReturnValueResult<bool>();
            if (string.IsNullOrWhiteSpace(serviceName))
            {
                rtnValue.Result = (int)ExtResposeCode.InvalidParameter;
                rtnValue.Message = "注册服务名称不能为空";
            }
            else if (string.IsNullOrWhiteSpace(ip))
            {
                rtnValue.Result = (int)ExtResposeCode.InvalidParameter;
                rtnValue.Message = "注册服务IP不能为空";
            }
            return rtnValue;
        }

        private ReturnValueResult<bool> ValidateParam(InstanceInfo dto)
        {
            return ValidateParam(dto.ServiceName, dto.Ip);
        }
    }
}
