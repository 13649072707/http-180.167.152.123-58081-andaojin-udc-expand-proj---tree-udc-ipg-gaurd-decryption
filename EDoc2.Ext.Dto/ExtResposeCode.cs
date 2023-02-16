namespace EDoc2.Ext.Dto
{
    /// <summary>
    /// 扩展服务响应状态码
    /// </summary>
    public static class ExtResposeCode
    {
        /// <summary>
        /// 执行成功
        /// </summary>
        public static int Success = 0;
        /// <summary>
        /// 参数无效
        /// </summary>
        public static int InvalidParameter =  1;

        //服务常量索引
        private static int serviceIndex = 100;

        /// <summary>
        /// 服务尚未注册
        /// </summary>
        public static int ServiceNotRegistered = serviceIndex+1;

        /// <summary>
        /// 服务已注册
        /// </summary>
        public static int ServiceRegistered = serviceIndex+2;

        //服务实例常量索引
        private static int instanceIndex = 200;
        /// <summary>
        /// 不存在的服务实例
        /// </summary>
        public static int InstanceNotExisted = instanceIndex+1;

        /// <summary>
        /// 没有健康服务实例
        /// </summary>
        public static int NoHealthyInstance = instanceIndex+2;

        //服务实例常量索引
        private static int configIndex = 300;
        /// <summary>
        /// 配置已存在
        /// </summary>
        public static int ConfigExisted = configIndex + 1;

        /// <summary>
        /// 配置不存在
        /// </summary>
        public static int ConfigNotExisted=configIndex + 2;

        /// <summary>
        /// 配置发布成功
        /// </summary>
        public static int ConfigPublishSuccessed = configIndex + 3;

        /// <summary>
        /// 配置发布失败
        /// </summary>
        public static int ConfigPublishFaild = configIndex + 4;

        /// <summary>
        /// 执行出错
        /// </summary>
        public static int Error = 500;
    }
}
