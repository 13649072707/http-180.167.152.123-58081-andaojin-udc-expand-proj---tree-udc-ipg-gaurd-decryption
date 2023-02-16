using System;

namespace MacrowingProjectdocking.Entity.ElasticsearchEntity
{
    /// <summary>
    /// 实体索引元数据特性
    /// </summary>
    public class EntityIndexMetadataAttribute : Attribute
    {
        /// <summary>
        /// 别名
        /// </summary>
        public string Alias { get; set; }
        /// <summary>
        /// 实体类型
        /// </summary>
        public string EntityType { get; set; } = "_doc";
    }
}
