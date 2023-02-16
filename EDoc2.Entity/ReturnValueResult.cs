using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    public class ReturnValueResult<T>
    {
        /// <summary>
        /// 默认构造函数
        /// </summary>
        public ReturnValueResult()
        {
            data = default(T);
            dataDescription = string.Empty;
            result = 1;
            message = string.Empty;
        }

        /// <summary>
        /// 返回结果数据体
        /// </summary>
        public T data { get; set; }
        /// <summary>
        /// 对数据体进行简单描述,复杂的通过`response`标签内嵌内容进行描述
        /// </summary>
        public string dataDescription { get; set; }
        /// <summary>
        /// 结果状态值,0表示调用接口成功,1表示未知错误，其他错误码参考[错误编号对照表](/swagger/help-doc/index.html#sdk-error-code)
        /// </summary>
        public int result { get; set; }
        /// <summary>
        /// 结果消息
        /// </summary>
        public string message { get; set; }
    }
}
