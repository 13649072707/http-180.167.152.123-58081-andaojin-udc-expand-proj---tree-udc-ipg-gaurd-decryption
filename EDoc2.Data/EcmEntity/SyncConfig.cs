using System;
using System.Collections.Generic;
using System.Text;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    [SugarTable("sync_config")]
    public class SyncConfig
    {
        /// <summary>
        /// id
        /// </summary>
        [SugarColumn(ColumnName = "config_id", IsPrimaryKey = true, IsIdentity = true,OracleSequenceName = "sync_configs_sequence")]
        public int ConfigId { get; set; }
        /// <summary>
        /// 同步类型
        /// </summary>
        [SugarColumn(ColumnName = "config_synctype")]
        public int ConfigSynctype { get; set; }
        /// <summary>
        /// 标题
        /// </summary>
        [SugarColumn(ColumnName = "config_title")]
        public string ConfigTitle { get; set; }
        /// <summary>
        /// 配置结构
        /// </summary>
        [SugarColumn(ColumnName = "config_valuejson")]
        public string ConfigValuejson { get; set; }
        /// <summary>
        /// 是否启动
        /// </summary>
        [SugarColumn(ColumnName = "config_isstart")]
        public int ConfigIsstart { set; get; }
        /// <summary>
        /// 同步状态
        /// </summary>
        [SugarColumn(ColumnName = "config_type")]
        public int ConfigType { get; set; }
        /// <summary>
        /// 当前版本
        /// </summary>
        [SugarColumn(ColumnName = "versions")]
        public int Versions { set; get; }
        /// <summary>
        /// 上个版本
        /// </summary>
        [SugarColumn(ColumnName = "lastversions")]
        public int Lastversions{set; get;}

    }
}
