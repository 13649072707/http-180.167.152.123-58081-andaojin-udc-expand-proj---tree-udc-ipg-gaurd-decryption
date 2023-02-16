namespace EDoc2.Ext.Dto
{
    /// <summary>
    /// 响应结果
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ReturnValueResult<T>
    {

        /// <summary>
        /// 响应状态值
        /// </summary>
        public int Result { get; set; }

        /// <summary>
        /// 响应信息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 响应数据
        /// </summary>
        public T Data { get; set; }

        /// <summary>
        /// 执行出错时堆栈信息
        /// </summary>
        public string StackTrace { get; set; }

    }
}
