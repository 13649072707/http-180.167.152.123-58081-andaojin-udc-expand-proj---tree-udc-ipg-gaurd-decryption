using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// ecm用户组实体
    /// </summary>
    [SugarTable("org_group")]
    public class EcmGroup
    {
        /// <summary>
        /// 用户组id
        /// </summary>
        [SugarColumn(ColumnName = "group_identityID", IsPrimaryKey =true,IsIdentity = true,OracleSequenceName = "S_org_group_sequence")]
        public int IdentityId { get; set; }

        /// <summary>
        ///     ID
        /// </summary>
        [SugarColumn(ColumnName = "group_id", Length = 100)]
        public string ID { get; set; }

        /// <summary>
        ///     用户组编号
        /// </summary>
        [SugarColumn(ColumnName = "group_code",Length = 100)]
        public string Code { get; set; }

        /// <summary>
        ///     第三方ID
        /// </summary>
        [SugarColumn(ColumnName = "group_thirdPartId", Length = 500)]
        public string ThirdPartId { get; set; }

        /// <summary>
        ///     用户组名称
        /// </summary>
        [SugarColumn(ColumnName = "group_name", Length = 200)]
        public string Name { get; set; }
        /// <summary>
        /// 用户组类型
        /// </summary>
        [SugarColumn(ColumnName = "group_type")]
        public int GroupType { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        [SugarColumn(ColumnName = "group_createTime")]
        public DateTime CreateTime { get; set; }

        /// <summary>
        ///     创建人
        /// </summary>
        [SugarColumn(ColumnName = "group_creatorId", Length = 200)]
        public string Creator { get; set; }

        /// <summary>
        ///     排序
        /// </summary>
        [SugarColumn(ColumnName = "group_sort")]
        public int Sort { get; set; }

        /// <summary>
        ///     备注
        /// </summary>
        [SugarColumn(ColumnName = "group_remark", Length = 500)]
        public string Remark { get; set; }
    }
}
