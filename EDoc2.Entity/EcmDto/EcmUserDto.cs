using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    /// <summary>
    /// 用户实体
    /// </summary>
    public  class EcmUserDto
    {
        public int UserIdentityID { get; set; }
        /// <summary>
        /// guid
        /// </summary>
        public string UserId { get; set; }
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
        /// 用户类型：0
        /// </summary>
        public int UserRole { get; set; }
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
        /// 创建时间
        /// </summary>
        public DateTime UserCreateTime { get; set; }
        /// <summary>
        /// 修改时间
        /// </summary>
        public DateTime UserChangeTime { get; set; }
        /// <summary>
        /// 主职位id
        /// </summary>
        public string UserMainpid { get; set; }
        /// <summary>
        /// 主部门id
        /// </summary>
        public string UserMaindid { get; set; }
        /// <summary>
        /// 用户来源:0系统创建|1数据库|2ldap域|3AD域|4中间表
        /// </summary>
        public int UserOrigin { get; set; }
        /// <summary>
        /// 是否登录过：0未登录|1已登录
        /// </summary>
        public int UserSigned { get; set; }
        /// <summary>
        /// 第三方ID
        /// </summary>
        public string UserThirdPartId { get; set; }
        /// <summary>
        /// 用户备注
        /// </summary>
        public string UserRemark { get; set; }
        /// <summary>
        ///  密级等级ID
        /// </summary>
        public int SecLevel { get; set; }
        // <summary>
        /// 头像修改时间
        /// </summary>
        public string AvatarChangeTime { get; set; }

        // <summary>
        /// googleSecretKey
        /// </summary>
        public string SecretKey { get; set; } = Guid.NewGuid().ToString("N").ToUpper();

        /// <summary>
        ///  是否绑定google双因子
        /// </summary>
        public bool GAStatus { get; set; } = false;
        /// <summary>
        ///     个人内容库最大空间
        /// </summary>
        public int UserMaxFolderSzie { get; set; }
        /// <summary>
        ///     个人多语言
        /// </summary>
        public string UserLang { get; set; }

        /// <summary>
        ///     个人内容库id
        /// </summary>
        public int UserPersonalFolderId { get; set; }
        /// <summary>
        ///     是否启用个人内容库
        /// </summary>
        public bool UserEnablePersonFolder { get; set; }


        /// <summary>
        ///     过期时间
        /// </summary>
        public DateTime? UserExpirationTime { get; set; }

        /// <summary>
        ///     创建人
        /// </summary>
        public string UserCreator { get; set; }

        /// 启用时间
        /// </summary>
        public DateTime? UserEnableTime { get; set; }

        /// <summary>
        ///     密码修改时间
        /// </summary>
        public DateTime UserPasswordChangeTime { get; set; }
        /// <summary>
        ///密码
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// 密码错误次数
        /// </summary>
        public int UserPasswordWrongCount { get; set; }
    }
}
