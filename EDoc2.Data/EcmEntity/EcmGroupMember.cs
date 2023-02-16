using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// ECM用户和组关联关系表
    /// </summary>
    [SugarTable("org_groupMember")]
    public class EcmGroupMember
    {
        /// <summary>
        /// ID
        /// </summary>
        [SugarColumn(ColumnName = "id",IsIdentity = true,IsPrimaryKey = true,OracleSequenceName = "S_org_groupMember_sequence")]
        public int ID { get; set; }

        /// <summary>
        /// 用户组ID
        /// </summary>
        [SugarColumn(ColumnName ="group_id", Length = 100)]
        public string GroupId { get; set; }

        /// <summary>
        /// 成员guid ID
        /// </summary>
        [SugarColumn(ColumnName ="member_id",Length = 100)]
        public string MemberId { get; set; }

        /// <summary>
        /// 成员类型
        /// </summary>
        [SugarColumn(ColumnName ="member_type")]
        public int MemberType { get; set; }
    }
}
