using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Data.ThirdEntity
{
    [SugarTable("HrmDepartment")]
    public class FanweiDepartMent
    {
        /// <summary>
        /// 部门编号
        /// </summary>
        [SugarColumn(ColumnName = "id")]
        public string Code { set; get; }
        /// <summary>
        /// 部门名字
        /// </summary>
        [SugarColumn(ColumnName = "departmentname")]
        public string Name { get; set; }
        /// <summary>
        /// 上级部门id,此字段为空,则上级部门使用分部id
        /// </summary>
        [SugarColumn(ColumnName = "supdepid")]
        public int? ParentDeptId { get; set; }
        /// <summary>
        /// 上级分部id
        /// </summary>
        [SugarColumn(ColumnName = "subcompanyid1")]
        public int ParentCompanyId { get; set; }
    }
}
