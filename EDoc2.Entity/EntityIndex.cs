using Nest;
using System;
using System.Reflection;

namespace MacrowingProjectdocking.Entity.ElasticsearchEntity
{
    /// <summary>
    /// 索引实体
    /// </summary>
    [ElasticsearchType]
    public class EntityIndex
    {
        
        /// <summary>
        /// 获取实体索引元数据特性
        /// </summary>
        /// <returns></returns>
        public virtual EntityIndexMetadataAttribute GetEntityIndexMetadata()
        {
            return GetType().GetCustomAttribute<EntityIndexMetadataAttribute>(true);
            //.GetAttribute<EntityIndexMetadataAttribute>();
        }
    }

    /// <summary>
    /// 具有Id的索引实体
    /// </summary>
    [ElasticsearchType(IdProperty = nameof(Id))]
    public class EntityIndexHasId : EntityIndex
    {
        /// <summary>
        /// id
        /// </summary>
        [Keyword(Name = "id")]
        public string Id { get; set; }
    }

    /// <summary>
    /// 具有审计的索引实体
    /// </summary>
    [ElasticsearchType]
    public class EntityIndexHasAudit : EntityIndex 
    {
        /// <summary>
        /// 创建时间
        /// </summary>
        [Date(Name = "created_time")]
        public virtual DateTime? CreatedTime { get; set; }

        /// <summary>
        /// 更新时间
        /// </summary>
        [Date(Name = "updated_time")]
        public virtual DateTime? UpdatedTime { get; set; }

        /// <summary>
        /// 创建者Id
        /// </summary>
        [Number(Name = "created_user_id")]
        public virtual long? CreatedUserId { get; set; }

        /// <summary>
        /// 创建者名称
        /// </summary>
        [Keyword(Name = "created_user_name")]
        public virtual string CreatedUserName { get; set; }

        /// <summary>
        /// 修改者Id
        /// </summary>
        [Number(Name = "updated_user_id")]
        public virtual long? UpdatedUserId { get; set; }

        /// <summary>
        /// 修改者名称
        /// </summary>
        [Number(Name = "updated_user_name")]
        public virtual string UpdatedUserName { get; set; }
    }

    /// <summary>
    /// 完整的索引实体
    /// </summary>
    [ElasticsearchType(IdProperty = nameof(Id))]
    public class FullEntityIndex : EntityIndex 
    {
        /// <summary>
        /// id
        /// </summary>
        [Keyword(Name = "id")]
        public string Id { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Date(Name = "created_time")]
        public virtual DateTime? CreatedTime { get; set; }

        /// <summary>
        /// 更新时间
        /// </summary>
        [Date(Name = "updated_time")]
        public virtual DateTime? UpdatedTime { get; set; }

        /// <summary>
        /// 创建者Id
        /// </summary>
        [Number(Name = "created_user_id")]
        public virtual long? CreatedUserId { get; set; }

        /// <summary>
        /// 创建者名称
        /// </summary>
        [Keyword(Name = "created_user_name")]
        public virtual string CreatedUserName { get; set; }

        /// <summary>
        /// 修改者Id
        /// </summary>
        [Number(Name = "updated_user_id")]
        public virtual long? UpdatedUserId { get; set; }

        /// <summary>
        /// 修改者名称
        /// </summary>
        [Number(Name = "updated_user_name")]
        public virtual string UpdatedUserName { get; set; }
    }
}
