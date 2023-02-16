using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    /// <summary>
    /// 用户表
    /// </summary>
    [SugarTable("org_user")]
    public class EcmUser
    {
        [SugarColumn(ColumnName = "user_identityID", IsPrimaryKey = true, OracleSequenceName = "S_org_user_sequence")]
        public int UserIdentityID { get; set; }
        /// <summary>
        /// guid
        /// </summary>
        [SugarColumn(ColumnName = "user_id")]
        public string UserId { get; set; }
        /// <summary>
        /// 账号
        /// </summary>
        [SugarColumn(ColumnName = "user_account")]
        public string UserAccount { get; set; }
        /// <summary>
        /// 编号
        /// </summary>
        [SugarColumn(ColumnName = "user_code")]
        public string UserCode { get; set; }
        /// <summary>
        /// 邮箱
        /// </summary>
        [SugarColumn(ColumnName = "user_email")]
        public string UserEmail { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        [SugarColumn(ColumnName = "user_name")]
        public string  UserName { get; set; }
        /// <summary>
        /// 性别:1男|2女|0未知
        /// </summary>
        [SugarColumn(ColumnName = "user_gender")]
        public int UserGender { get; set; }
        /// <summary>
        /// 用户类型：0
        /// </summary>
        [SugarColumn(ColumnName = "user_role")]
        public int UserRole { get; set; }
        /// <summary>
        /// 生日
        /// </summary>
        [SugarColumn(ColumnName = "user_birthday")]
        public DateTime? UserBirthday { get; set; }
        /// <summary>
        /// 座机号码
        /// </summary>
        [SugarColumn(ColumnName = "user_telephone")]
        public string UserTelephone { get; set; }
        /// <summary>
        /// 手机号机
        /// </summary>
        [SugarColumn(ColumnName = "user_mobile")]
        public string UserMobile { get; set; }
        /// <summary>
        /// 用户状态
        /// </summary>
        [SugarColumn(ColumnName = "user_status")]
        public int UserStatus { get; set; }
        /// <summary>
        /// 用户传真
        /// </summary>
        [SugarColumn(ColumnName = "user_fax")]
        public string UserFax { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        [SugarColumn(ColumnName = "user_createTime")]
        public DateTime UserCreateTime { get; set; }
        /// <summary>
        /// 修改时间
        /// </summary>
        [SugarColumn(ColumnName = "user_changeTime")]
        public DateTime UserChangeTime { get; set; }
        /// <summary>
        /// 主职位id
        /// </summary>
        [SugarColumn(ColumnName = "user_mainpid")]
        public string UserMainpid { get; set; }
        /// <summary>
        /// 主部门id
        /// </summary>
        [SugarColumn(ColumnName = "user_maindid")]
        public string UserMaindid { get; set; }
        /// <summary>
        /// 用户来源:0系统创建|1数据库|2ldap域|3AD域|4中间表
        /// </summary>
        [SugarColumn(ColumnName = "user_origin")]
        public int UserOrigin { get; set; }
        /// <summary>
        /// 是否登录过：0未登录|1已登录
        /// </summary>
        [SugarColumn(ColumnName = "user_signed")]
        public int UserSigned { get; set; }
        /// <summary>
        /// 第三方ID
        /// </summary>
        [SugarColumn(ColumnName = "user_thirdPartId")]
        public string UserThirdPartId { get; set; }
        /// <summary>
        /// 用户备注
        /// </summary>
        [SugarColumn(ColumnName = "user_remark")]
        public string UserRemark { get; set; }
        /// <summary>
        ///  密级等级ID
        /// </summary>
        [SugarColumn(ColumnName = "user_seclevel")]
        public int SecLevel { get; set; }
        // <summary>
        /// 头像修改时间
        /// </summary>
        [SugarColumn(ColumnName = "user_avatartime", Length = 20)]
        public string AvatarChangeTime { get; set; }

        // <summary>
        /// googleSecretKey
        /// </summary>
        [SugarColumn(ColumnName = "user_secretkey", Length = 64)]
        public string SecretKey { get; set; } = Guid.NewGuid().ToString("N").ToUpper();

        /// <summary>
        ///  是否绑定google双因子
        /// </summary>
        [SugarColumn(ColumnName = "user_gastatus")]
        public bool GAStatus { get; set; } = false;


        /// <summary>
        ///     个人内容库最大空间
        /// </summary>
        [SugarColumn(ColumnName = "user_maxfolderszie")]
        public  long UserMaxFolderSzie { get; set; }

        
        /// <summary>
        ///     个人多语言
        /// </summary>
        [SugarColumn(ColumnName = "user_lang", Length = 100)]
        public  string UserLang { get; set; }

        /// <summary>
        ///     个人内容库id
        /// </summary>
        [SugarColumn(ColumnName = "user_personalfolderid")]
        public  int UserPersonalFolderId { get; set; }



    
        /// <summary>
        ///     是否启用个人内容库
        /// </summary>
        [SugarColumn(ColumnName = "user_enablepersonfolder")]
        public  bool UserEnablePersonFolder { get; set; }


        /// <summary>
        ///     过期时间
        /// </summary>
        [SugarColumn(ColumnName = "user_expirationTime")]
        public  DateTime? UserExpirationTime { get; set; }

        /// <summary>
        ///     创建人
        /// </summary>
        [SugarColumn(ColumnName = "user_creatorId", Length = 50)]
        public  string UserCreator { get; set; }

        /// 启用时间
        /// </summary>
        [SugarColumn(ColumnName = "user_enableTime")]
        public  DateTime? UserEnableTime { get; set; }



        /// <summary>
        ///     密码修改时间
        /// </summary>
        [SugarColumn(ColumnName = "user_passwordChangeTime")]
        public  DateTime UserPasswordChangeTime { get; set; }
        /// <summary>
        ///密码
        /// </summary>
        [SugarColumn(ColumnName = "user_password")]
        public string Password { get; set; }

        /// <summary>
        /// 密码错误次数
        /// </summary>
        [SugarColumn(ColumnName = "user_passwordWrongCount")]
        public  int UserPasswordWrongCount { get; set; }

    }
}
