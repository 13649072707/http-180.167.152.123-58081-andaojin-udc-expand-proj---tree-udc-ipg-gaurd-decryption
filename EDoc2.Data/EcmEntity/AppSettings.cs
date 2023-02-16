using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// 本地配置
    /// </summary>
    [SugarTable("dms_instancecfg")]
    public class AppSettings
    {
        /// <summary>
        /// ID
        /// </summary>
        [SugarColumn(ColumnName = "instance_id")]
        public int InstanceId { set; get; }
        /// <summary>
        /// 配置key
        /// </summary>
        [SugarColumn(ColumnName = "cfg_name", IsPrimaryKey = true)]
        public  string Key { set; get; }
        /// <summary>
        /// 配置内容
        /// </summary>
        [SugarColumn(ColumnName = "cfg_value")]
        public string ConfigJson { get; set; }
        
    }
}
