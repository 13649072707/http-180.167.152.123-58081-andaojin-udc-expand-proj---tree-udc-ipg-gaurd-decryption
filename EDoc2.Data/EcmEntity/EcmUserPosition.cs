using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// 关联表
    /// </summary>
    [SugarTable("org_userPosition")]
    public class EcmUserPosition
    {
        /// <summary>
        ///     id
        /// </summary>
        [SugarColumn(ColumnName = "id", IsPrimaryKey = true, IsIdentity = true,OracleSequenceName = "S_org_userPosition_sequence")]
        public int ID { get; set; }

        /// <summary>
        ///     用户id
        /// </summary>
        [SugarColumn(ColumnName = "user_id", Length = 100)]
        public string UserId { set; get; }

        /// <summary>
        ///     职位id
        /// </summary>
        [SugarColumn(ColumnName = "position_id", Length = 100)]
        public string PositionId { set; get; }

        /// <summary>
        ///     是否主职位
        /// </summary>
        [SugarColumn(ColumnName = "main")]
        public bool Main { set; get; }
    }
}
