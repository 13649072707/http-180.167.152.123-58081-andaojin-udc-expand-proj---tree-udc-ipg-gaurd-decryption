using System;
using System.Collections.Generic;
using System.Text;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// 数据库同步用户表实体
    /// </summary>
    [SugarTable("sync_user")]
    public class SyncUserModel
    {
        /// <summary>
        /// 自增长id
        /// </summary>
        [SugarColumn(ColumnName = "id", IsPrimaryKey = true, IsIdentity = true,OracleSequenceName = "sync_user_sequence")]
        public virtual int ID { get; set; }

        /// <summary>
        /// 同步版本
        /// </summary>
        [SugarColumn(ColumnName = "versions")]
        public virtual int Versions { get; set; } = 0;
        /// <summary>
        /// 同步配置外键
        /// </summary>
        [SugarColumn(ColumnName = "type")]
        public virtual int Type { get; set; } = 0;
        /// <summary>
        /// 用户编号
        /// </summary>
        [SugarColumn(ColumnName = "user_code")]
        public virtual string UserCode { get; set; } = "";

        /// <summary>
        /// 登录账号
        /// </summary>
        [SugarColumn(ColumnName = "user_account")]
        public virtual string UserAccount { get; set; } = "";
        /// <summary>
        /// 用户名称或昵称
        /// </summary>
        [SugarColumn(ColumnName = "user_name")]
        public virtual string UserName { get; set; } = "";
        /// <summary>
        /// 用户邮箱
        /// </summary>
        [SugarColumn(ColumnName = "user_email")]
        public virtual string UserEmail { get; set; } = "";
        /// <summary>
        /// 性别
        /// </summary>
        [SugarColumn(ColumnName = "user_gender")]
        public virtual string UserGender { get; set; } = "";
        /// <summary>
        /// 座机号码
        /// </summary>
        [SugarColumn(ColumnName = "user_telphone")]
        public virtual string UserTelphone { get; set; } = "";
        /// <summary>
        /// 手机号码
        /// </summary>
        [SugarColumn(ColumnName = "user_mobile")]
        public virtual string UserMobile { get; set; } = "";
        /// <summary>
        /// 状态
        /// </summary>
        [SugarColumn(ColumnName = "user_status")]
        public virtual string UserStatus { get; set; } = "";
        /// <summary>
        /// 备注
        /// </summary>
        [SugarColumn(ColumnName = "user_remark")]
        public virtual string UserRemark { get; set; } = "";
        /// <summary>
        /// 用户职称AD专用
        /// </summary>
        [SugarColumn(ColumnName = "user_title")]
        public virtual string UserTitle { get; set; } = "";
        /// <summary>
        /// 用户和部门或职位关联code
        /// </summary>
        [SugarColumn(ColumnName = "user_deptcode")]
        public virtual string UserDeptcode { get; set; } = "";
        /// <summary>
        /// 用户组关联|5.12版本才有
        /// </summary>
        [SugarColumn(ColumnName = "user_groups")]
        public virtual string UserGroups { get; set; } = "";

    }
}
