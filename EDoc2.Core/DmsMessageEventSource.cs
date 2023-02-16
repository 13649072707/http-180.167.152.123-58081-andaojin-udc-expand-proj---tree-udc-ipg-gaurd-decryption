using Furion.EventBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EDoc2.Core
{
    public class DmsMessageEventSource : IEventSource
    {
        public string EventId  {get;set;}

        public object Payload { get; set; }

        public DateTime CreatedTime { get; } = DateTime.UtcNow;

        public CancellationToken CancellationToken { get; }
    }


    public class ExceptLogEventSource<T> : IEventSource
    {
        public ExceptLogEventSource(string eventId,string key, T exceptTaskLogType, object payload)
        {
            EventId = eventId;
            Key = key;
            Payload = payload;
            ExceptTaskLogType = exceptTaskLogType;
        }
        public string EventId { get; set; }

        public string Key { set; get; }
        public object Payload { get; set; }

        public T ExceptTaskLogType { get; set; }
        public DateTime CreatedTime { get; } = DateTime.UtcNow;

        public CancellationToken CancellationToken { get; }

    }
    /// <summary>
    /// 文档处理
    /// </summary>
    public class ExceptFileProcessingEventSource : IEventSource
    {
        public ExceptFileProcessingEventSource(string eventId, string key, ExceptTaskProcessingType exceptTaskProcessingType, object payload)
        {
            EventId = eventId;
            Key = key;
            Payload = payload;
            ExceptTaskProcessingType = exceptTaskProcessingType;
        }
        public string EventId { get; set; }

        public string Key { set; get; }
        public object Payload { get; set; }

        public ExceptTaskProcessingType ExceptTaskProcessingType { get; set; }
        public DateTime CreatedTime { get; } = DateTime.UtcNow;

        public CancellationToken CancellationToken { get; }

    }



    public enum ExceptTaskProcessingType
    {
        /// <summary>
        /// 转档
        /// </summary>
        TransferFile =0,
        /// <summary>
        /// 文件拆分
        /// </summary>
        SplitFile=1,
        /// <summary>
        /// 文件合并
        /// </summary>
        MergeFile=2

    }
    /// <summary>
    /// 导出日志任务类型
    /// </summary>
    public enum ExceptTaskLogType
    {
        /// <summary>
        /// 登录日志
        /// </summary>
        SignLog = 0,
        /// <summary>
        /// 文档日志
        /// </summary>
        DocLog = 1,
        /// <summary>
        /// 用户
        /// </summary>
        User = 2,
        /// <summary>
        /// 最后登录日志
        /// </summary>
        LastSignLog = 3
    }

    public class DocProcessEventSource
    { 
     
    
    }
}
