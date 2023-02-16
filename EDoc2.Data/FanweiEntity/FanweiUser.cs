using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Data.ThirdEntity.FanweiEntity
{
    /// <summary>
    /// 第三方用户
    /// </summary>
    [SugarTable("t_km_user_info")]
    public class FanweiUser
    {
        /// <summary>
        /// 用户编号
        /// </summary>
        [SugarColumn(ColumnName = "id")]
        public string Code { get; set; }
        /// <summary>
        /// 用户登录名
        /// </summary>
        [SugarColumn(ColumnName = "loginid")]
        public string Account { get; set; }
        /// <summary>
        /// 显示名
        /// </summary>
        [SugarColumn(ColumnName = "lastname")]
        public string Name { get; set; }
        /// <summary>
        /// 第三方id
        /// </summary>
        [SugarColumn(ColumnName = "open_id")]
        public string ThirdId { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        [SugarColumn(ColumnName = "mobile")]
        public string Mobile { get; set; }
        /// <summary>
        /// 座机号
        /// </summary>
        [SugarColumn(ColumnName = "telephone")]
        public string Telephone { get; set; }
        /// <summary>
        /// 邮箱
        /// </summary>
        [SugarColumn(ColumnName = "email")]
        public string Email { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        [SugarColumn(ColumnName = "sex")]
        public string Gender { get; set; }
        /// <summary>
        /// 用户状态
        /// </summary>
        [SugarColumn(ColumnName = "status")]
        public int Status { get; set; }
        /**以下是额外字段**/
        /// <summary>
        /// 部门ID
        /// </summary>
        [SugarColumn(ColumnName = "departmentid")]
        public int DeptId { get; set; }
        /// <summary>
        /// 所在用户组
        /// </summary>
        [SugarColumn(ColumnName = "jobcall")]
        public string GroupId { get; set; }
        /// <summary>
        /// 职位id
        /// </summary>
        [SugarColumn(ColumnName = "jobtitle")]
        public string PositionId { get; set; }
        /// <summary>
        /// 是否负责人
        /// </summary>
        [SugarColumn(ColumnName = "is_partjob")]
        public string IsPartjob { get; set; }
    }
}
