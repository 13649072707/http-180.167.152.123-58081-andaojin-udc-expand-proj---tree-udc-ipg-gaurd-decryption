using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Data.ThirdEntity.FanweiEntity
{
    [SugarTable("hrmjobcall")]
    public class FanweiUserGroup
    {
        /// <summary>
        /// 用户组编号
        /// </summary>
        [SugarColumn(ColumnName = "id")]
        public int Code { get; set; }

        /// <summary>
        /// 用户组名
        /// </summary>
        [SugarColumn(ColumnName = "name")]
        public string Name { get; set; }
        /// <summary>
        /// 用户组注释
        /// </summary>
        [SugarColumn(ColumnName = "description")]
        public string Remark { get; set; }
        //your code
        //添加需要的字段
    }
}
