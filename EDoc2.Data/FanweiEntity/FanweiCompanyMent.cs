using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Data.ThirdEntity
{
    [SugarTable("HrmSubCompany")]
    public class FanweiCompanyMent
    {
        /// <summary>
        /// 部门编号
        /// </summary>
        [SugarColumn(ColumnName = "id")]
        public int Code { set; get; }
        /// <summary>
        /// 部门名字
        /// </summary>
        [SugarColumn(ColumnName = "subcompanyname")]
        public string Name { get; set; }
        /// <summary>
        /// 上级id
        /// </summary>
        [SugarColumn(ColumnName = "supsubcomid")]
        public int ParentId { get; set; }
        
    }
}
