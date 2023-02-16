using SqlSugar;
using System;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// 持久token
    /// </summary>
    [SugarTable("org_appintegration")]
    public class EcmAppintegration
    {
        [SugarColumn(ColumnName = "integ_id", IsPrimaryKey = true)]
        public string IntegId { get; set; }
        [SugarColumn(ColumnName = "integ_account", Length = 100)]
        public string IntegAccount { get; set; }
        [SugarColumn(ColumnName = "integ_token", Length = 100)]
        public string IntegToken { get; set; }
        [SugarColumn(ColumnName = "integ_userid", Length = 100)]
        public string IntegUserid { get; set; }
        [SugarColumn(ColumnName = "integ_appid", Length = 64)]
        public string IntegAppid { get; set; }
        [SugarColumn(ColumnName = "integ_appname", Length = 50)]
        public string IntegAppname { get; set; }
        [SugarColumn(ColumnName = "integ_remark", Length = 200)]
        public string IntegRemark { get; set; }
        [SugarColumn(ColumnName = "integ_createtime")]
        public DateTime IntegCreatetime { get; set; }
        [SugarColumn(ColumnName = "integ_creatorId")]
        public string IntegCreatorId { get; set; }
        [SugarColumn(ColumnName = "integ_appip", IsNullable = true)]
        public string IntegAppip { get; set; }
        [SugarColumn(ColumnName = "integ_enableweb")]
        public bool IntegEnableweb { get; set; }

    }
}
