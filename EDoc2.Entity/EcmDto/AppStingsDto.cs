using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    public class AppStingsDto
    {
        /// <summary>
        /// ID
        /// </summary>
        public int InstanceId { set; get; }
        /// <summary>
        /// 配置key
        /// </summary>
        public string Key { set; get; }
        /// <summary>
        /// 配置内容
        /// </summary>
        public string ConfigJson { get; set; }

    }
}
