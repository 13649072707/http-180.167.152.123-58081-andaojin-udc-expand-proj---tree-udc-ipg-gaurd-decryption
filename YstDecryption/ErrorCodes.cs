using Furion.FriendlyException;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Entity
{
    /// <summary>
    /// 错误码
    /// </summary>
    [ErrorCodeType]
    public enum ErrorCodes
    {
        [ErrorCodeItemMetadata("正常")]
        M0 = 0,
        [ErrorCodeItemMetadata("密码错误")]
        M10001 = 3721,
        [ErrorCodeItemMetadata("未配置自定义界面登录，无法使用")]
        M30001 = 30001,
        [ErrorCodeItemMetadata("用户已注销")]
        M30002 = 30002,
        [ErrorCodeItemMetadata("用户已锁定")]
        M30003 = 30003,
        [ErrorCodeItemMetadata("用户未找到")]
        M30004 = 30004,
        [ErrorCodeItemMetadata("密码过期")]
        M30005 = 30005,
        [ErrorCodeItemMetadata("密码错误")]
        M30006 = 30006,
        [ErrorCodeItemMetadata("登录异常")]
        M30007 = 30007,
        [ErrorCodeItemMetadata("未添加自定义请求")]
        M30008 = 30008,
        [ErrorCodeItemMetadata("{0}")]
        M30009 = 30009,
        [ErrorCodeItemMetadata("未找到返回结果:{0}")]
        M30010 = 30010,
        [ErrorCodeItemMetadata("操作人未找到")]
        M30011 = 30011,
        [ErrorCodeItemMetadata("保存配置异常")]
        M30012 = 30012,
        [ErrorCodeItemMetadata("同步组织节点不存在")]
        M50011 = 50001,
        [ErrorCodeItemMetadata("512以上版本请在安全管理登录验证中开启持久集成")]
        M80001 = 80001,
        [ErrorCodeItemMetadata("token 失效")]
        M4444 = 4444,
        [ErrorCodeItemMetadata("{0}参数内容不正确")]
        M5050 = 5050,

        #region 继承平台组织同步配置
        /// <summary>
        /// 组织接口未配置
        /// </summary>
        [ErrorCodeItemMetadata("组织接口未配置")]
        NotAppSetting = 7001,

        /// <summary>
        /// appid不存在
        /// </summary>
        [ErrorCodeItemMetadata("appid不存在")]
        AccessTokenNotAppidError = 9001,
        /// <summary>
        /// AppSecret密钥不正确
        /// </summary>
        [ErrorCodeItemMetadata("AppSecret密钥不正确")]
        AccessTokenNotEqualsAppSecretError = 9002,
        /// <summary>
        /// 应用appidS已过期
        /// </summary>
        [ErrorCodeItemMetadata("应用appidS已过期")]
        AccessTokenExpireTimeAppSecretError = 9003,
        #endregion

        #region 部门Enum(3000+)
        /// <summary>
        /// 部门已经存在
        /// </summary>
        [ErrorCodeItemMetadata("部门已经存在")]
        DepartmentExists = 3001,
        /// <summary>
        /// 部门未找到
        /// </summary>
        [ErrorCodeItemMetadata("部门未找到")]
        DepartmentNotExists = 3002,
        /// <summary>
        /// 部门编号未找到
        /// </summary>
        [ErrorCodeItemMetadata("部门编号:{0}未找到")]
        DepartmentCodeNotExists = 3003,
        /// <summary>
        /// 部门上级编号未找到
        /// </summary>
        [ErrorCodeItemMetadata("部门上级编号:{0}未找到")]
        DepartmentParentCodeNotExists = 3004,

        /// <summary>
        /// 部门编号已存在
        /// </summary>
        [ErrorCodeItemMetadata("部门编号:{0}已存在")]
        DepartmentCodeExists = 3005,
        /// <summary>
        /// 部门创建失败
        /// </summary>
        [ErrorCodeItemMetadata("部门创建失败，错误编号:{0},错误:{1}")]
        CreateDepartmentError = 3006,
        /// <summary>
        /// 部门修改失败
        /// </summary>
        [ErrorCodeItemMetadata("部门修改失败，错误编号:{0},错误:{1}")]
        ChageDepartmentError = 3007,
        /// <summary>
        /// 部门删除失败
        /// </summary>
        [ErrorCodeItemMetadata("部门删除失败，错误编号:{0},错误:{1}")]
        DelDepartmentError = 3008,
        #endregion

        #region 职位Enum(4000+)
        /// <summary>
        /// 职位已经存在
        /// </summary>
        [ErrorCodeItemMetadata("职位编号:{0}已存在")]
        PositionExists = 4001,
        /// <summary>
        /// 职位未找到
        /// </summary>
        [ErrorCodeItemMetadata("职位编号:{0}不存在")]
        PositionNotExists = 4002,
        /// <summary>
        /// 上级职位未找到
        /// </summary>
        [ErrorCodeItemMetadata("上级职位编号:{0}不存在")]
        ParentPositionNotExists = 4003,
        /// <summary>
        /// 创建职位出错
        /// </summary>
        [ErrorCodeItemMetadata("职位创建失败，错误编号:{0},错误:{1}")]
        CreatePositionError = 4004,
        /// <summary>
        /// 职位修改失败
        /// </summary>
        [ErrorCodeItemMetadata("职位修改失败，错误编号:{0},错误:{1}")]
        ChagePositionError = 4005,
        /// <summary>
        /// 职位删除失败
        /// </summary>
        [ErrorCodeItemMetadata("职位删除失败，错误编号:{0},错误:{1}")]
        DelPositionError = 4006,
        #endregion

        #region 用户Enum(5000+)
        /// <summary>
        /// 用户部门或者职位必须传递一个
        /// </summary>
        [ErrorCodeItemMetadata("用户部门或者职位必须传递一个")]
        UserNotDeptAndPosition = 5001,
        /// <summary>
        /// 用户职位未找到
        /// </summary>
        [ErrorCodeItemMetadata("用户职位:{0}未找到")]
        UserPositionNotExists = 5002,
        /// <summary>
        /// 用户部门未找到
        /// </summary>
        [ErrorCodeItemMetadata("用户部门:{0}未找到")]
        UserDepartmentNotExists = 5003,
        /// <summary>
        /// 用户登录账号已经存在
        /// </summary>
        [ErrorCodeItemMetadata("用户登录账号:{0}已经存在")]
        UserAccountExists = 5004,
        /// <summary>
        /// 用户编号已经存在
        /// </summary>
        [ErrorCodeItemMetadata("用户编号:{0}已经存在")]
        UserCodeExists = 5005,
        /// <summary>
        /// 用户邮箱已经存在
        /// </summary>
        [ErrorCodeItemMetadata("用户邮箱:{0}已经存在")]
        UserMailExists = 5006,
        /// <summary>
        /// 用户手机已经存在
        /// </summary>
        [ErrorCodeItemMetadata("用户手机:{0}已经存在")]
        UserMobileExists = 5007,
        /// <summary>
        /// 用户创建失败
        /// </summary>
        [ErrorCodeItemMetadata("创建用户失败，错误编号:{0}，错误信息:{1}")]
        CreateUserError = 5008,

        /// <summary>
        /// 修改用户失败
        /// </summary>
        [ErrorCodeItemMetadata("修改用户失败，错误编号:{0}，错误信息:{1}")]
        ChangeUserError = 5009,
        /// <summary>
        /// 用户登录账号不存在
        /// </summary>
        [ErrorCodeItemMetadata("用户登录账号:{0}不存在")]
        UserAccountNotExists = 5010,

        /// <summary>
        /// 用户编号不存在
        /// </summary>
        [ErrorCodeItemMetadata("用户编号:{0}不存在")]
        UserCodeNotExists = 5011,
        /// <summary>
        /// 用户注销失败
        /// </summary>
        [ErrorCodeItemMetadata("用户注销失败,错误编号:{0},错误内容:{1}")]
        UserLogffError = 5012,
        #endregion

        #region 用户组Enum(6000+)
        /// <summary>
        /// 用户组编号不存在
        /// </summary>
        [ErrorCodeItemMetadata("用户组编号:{0}不存在")]
        UserGroupCodeNotExists = 6001,
        /// <summary>
        /// 用户组编号已存在
        /// </summary>
        [ErrorCodeItemMetadata("用户组编号:{0}已存在")]
        UserGroupCodeExists = 6002,
        /// <summary>
        /// 用户组创建失败
        /// </summary>
        [ErrorCodeItemMetadata("用户组创建失败，错误编号:{0},错误:{1}")]
        CreateUserGroupError = 6003,
        /// <summary>
        /// 用户组修改失败
        /// </summary>
        [ErrorCodeItemMetadata("用户组修改失败，错误编号:{0},错误:{1}")]
        UpdateUserGroupError = 6004,
        /// <summary>
        /// 用户组删除失败
        /// </summary>
        [ErrorCodeItemMetadata("用户组删除失败，错误编号:{0},错误:{1}")]
        DelUserGroupError = 6005,
        #endregion

        #region 组织同步定时任务调度提醒(7000+)
        [ErrorCodeItemMetadata("立即同步操作异常:{0}")]
        OrgSyncJobNowRunError = 7001,

        [ErrorCodeItemMetadata("任务尚未开启,无法立即执行任务同步")]
        OrgSyncJobNotRun = 7002,

        [ErrorCodeItemMetadata("时间表达式选择有误，请重新选择！")]
        OrgSyncCronError = 7003,

        [ErrorCodeItemMetadata("任务不存在或数据异常！")]
        OrgSyncJobNotExist = 7004,
        #endregion

        #region ip错误信息
        [ErrorCodeItemMetadata("IP地址{0}格式错误!")]
        IPFormatException,
        #endregion

        #region 消息推送提示
        [ErrorCodeItemMetadata("消息重发失败：{0}！")]
        MessageRetryError = 9001,
        [ErrorCodeItemMetadata("消息重发失败，找不到操作的消息内容。：{0}！")]
        MessageRetryMessageNotFound = 9002,
        [ErrorCodeItemMetadata("消息跳转地址异常。：{0}！")]
        MessageJumpAddressError = 9003,
        [ErrorCodeItemMetadata("消息配置信息异常。")]
        MessageConfigInfoError = 9004,
        [ErrorCodeItemMetadata("消息配置信息异常,消息体内用户信息不存在")]
        MessageTargetUserInfoNotExist = 9005,
        [ErrorCodeItemMetadata("获取第三方平台用户信息出错,{0}！")]
        GetThirduserError = 9006,
        [ErrorCodeItemMetadata("{0}测试推送消息异常,{1}！")]
        MessageTestPushError = 9007,
        #endregion

        #region 任务错误 10000+
        [ErrorCodeItemMetadata("没有找到任务:{0}")]
        NotTaskFound = 10000,
        [ErrorCodeItemMetadata("文档下载失败:{0}")]
        DocDownloadError = 10001,
        [ErrorCodeItemMetadata("{0}不是一个有效的cron")]
        NotCronError = 10002,
        [ErrorCodeItemMetadata("{0}类不存在，请检查")]
        JobNotFound = 10003,
        [ErrorCodeItemMetadata("保存任务出现异常，请检查")]
        SaveTaskError = 10004,
        #endregion

        #region Token兑换Jwt
        [ErrorCodeItemMetadata("自动登录,当前ECM用户没有管理权限,请手动输入管理员账号登录！")]
        TokenNoAdmin = 10010,
        #endregion


        #region 300 数据报表
        [ErrorCodeItemMetadata("{0}时间格式不对")]
        TimeNotStyle = 301,
        [ErrorCodeItemMetadata("token参数未传递")]
        TokenNotFound = 302
        #endregion
    }
}
