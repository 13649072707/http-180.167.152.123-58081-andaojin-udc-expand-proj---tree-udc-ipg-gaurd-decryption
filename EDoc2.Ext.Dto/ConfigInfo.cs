using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace EDoc2.Ext.Dto
{
    public class ConfigInfo
    {

        public ConfigInfo()
        {

        }

        public ConfigInfo(string content)
        {
            if (string.IsNullOrWhiteSpace(content)) return;
            try
            {
                var config = JsonConvert.DeserializeObject<ConfigInfo>(content);
                if (config != null)
                {
                    this.Code = config.Code;
                    this.Category = config.Category;
                    this.Description = config.Description;
                    this.DetailUrl = config.DetailUrl;
                    this.Enabled = config.Enabled;
                    this.IndexUrl = config.IndexUrl;
                    this.Metadata = config.Metadata ?? new Dictionary<string, string>();
                    this.Name = config.Name;
                    this.Version = config.Version;
                    this.Guid = config.Guid;
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        /// <summary>
        /// 插件唯一标识
        /// </summary>
        public string Guid { get; set; }

        /// <summary>
        /// 配置编码
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 配置描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 配置名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 所属分类
        /// </summary>
        public string Category { get; set; }

        /// <summary>
        /// 是否啓用
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// 版本号
        /// </summary>
        public string Version { get; set; }

        /// <summary>
        /// 插件主页地址
        /// </summary>
        public string IndexUrl { get; set; }

        /// <summary>
        /// 插件详细页面地址
        /// </summary>
        public string DetailUrl { get; set; }

        /// <summary>
        /// 元数据
        /// </summary>
        public Dictionary<string, string> Metadata { get; set; } = new Dictionary<string, string>();
    }
}
