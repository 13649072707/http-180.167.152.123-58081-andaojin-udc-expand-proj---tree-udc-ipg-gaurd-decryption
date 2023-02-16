using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    /// <summary>
    /// 存储器用户实体
    /// </summary>
    public  class StorageUserDto
    {
        /// <summary>
        /// 账号
        /// </summary>
        public string UserAccount { get; set; }
        /// <summary>
        /// 编号
        /// </summary>
        public string UserCode { get; set; }
        /// <summary>
        /// 邮箱
        /// </summary>
        public string UserEmail { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string  UserName { get; set; }
        /// <summary>
        /// 性别:1男|2女|0未知
        /// </summary>
        public int UserGender { get; set; }
        /// <summary>
        /// 生日
        /// </summary>
        public DateTime? UserBirthday { get; set; }
        /// <summary>
        /// 座机号码
        /// </summary>
        public string UserTelephone { get; set; }
        /// <summary>
        /// 手机号机
        /// </summary>
        public string UserMobile { get; set; }
        /// <summary>
        /// 用户状态
        /// </summary>
        public UserStatus UserStatus { get; set; }
        /// <summary>
        /// 用户传真
        /// </summary>
        public string UserFax { get; set; }
        /// <summary>
        /// 职位Code
        /// </summary>
        public string PositionCode { get; set; }
        /// <summary>
        /// 部门Code
        /// </summary>
        public string DepartmentCode { get; set; }
        /// <summary>
        /// 第三方ID
        /// </summary>
        public string UserThirdPartId { get; set; }
        /// <summary>
        /// 用户备注
        /// </summary>
        public string UserRemark { get; set; }
        /// <summary>
        /// 是否删除?为true会删除这条数据，为false不删除，非差量计算使用,默认:false
        /// </summary>
        /// <value>false</value>
        public bool IsDelete { get; set; } = false;
    }
}
