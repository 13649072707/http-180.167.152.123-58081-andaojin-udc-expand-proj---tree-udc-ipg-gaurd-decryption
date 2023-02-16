using EDoc2.Entity;
using MacrowingProjectdocking.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Api
{
    public interface IOrgSyncServices
    {
        /// <summary>
        /// 同步初始化
        /// </summary>
        /// <returns></returns>
        Task OrgSyncStart(SyncConfigDto syncConfig,OrgSyncSetting orgSyncSetting);
        /// <summary>
        /// 同步前作的事
        /// </summary>
        /// <returns></returns>
        Task OrgSyncInit();
        /// <summary>
        /// 获取部门
        /// </summary>
        /// <returns></returns>
        Task GetDepartment();
        /// <summary>
        /// 获取职位
        /// </summary>
        /// <returns></returns>
        Task GetPosition();
        /// <summary>
        /// 获取用户
        /// </summary>
        /// <returns></returns>
        Task GetUser();
        /// <summary>
        /// 获取用户组
        /// </summary>
        /// <returns></returns>
        Task GetUserGroup();
        /// <summary>
        /// 获取用户关联关系
        /// </summary>
        /// <returns></returns>
        Task GetUserPosition();
        /// <summary>
        /// 开始同步
        /// </summary>
        /// <returns></returns>
        Task ActionSyncAsync();
    }
}
