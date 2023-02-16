using System;
using Furion;
using Furion.DependencyInjection;
using System.Threading.Tasks;
using SqlSugar;
using System.Linq;
using System.Collections.Generic;

namespace MacrowingProjectdocking.Data
{
    public class UserDataProvider : ITransient
    {
        private readonly ISqlSugarRepository<EcmUser> _repository; // 仓储对象：封装简单的CRUD
        //private readonly SqlSugarClient db;
        public UserDataProvider(ISqlSugarRepository<EcmUser> repository)
        {
            _repository = repository;
        }


        public async Task<string> GetNameByAcconutAsync(string account)
        {
           return (await _repository.Entities.FirstAsync(f => f.UserAccount == account))?.UserName;
        }

        public async Task<EcmUser> GetEcmUserByAccountAsync(string account)
        {
            var model = await _repository.Entities.FirstAsync(f => f.UserAccount == account);
            return model;
        }

        public async Task<EcmUser> GetEcmUserInfoByIdentityIDAsync(int identityID)
        {
            var model = await _repository.Entities.FirstAsync(f => f.UserIdentityID == identityID);
            return model;
        }

        public async Task<EcmUser> GetEcmUserInfoByUserIDAsync(string userID)
        {
            var model = await _repository.Entities.FirstAsync(f => f.UserId == userID);
            return model;
        }

        public async Task<EcmUser> GetEcmUserByThirdPartIdAsync(string thirdPartId)
        {
            var model = await _repository.Entities.FirstAsync(f => f.UserThirdPartId == thirdPartId);
            return model;
        }

        public async Task<EcmUser> GetEcmUserByCodeAsync(string account)
        {
            var model = await _repository.Entities.FirstAsync(f => f.UserCode == account);
            return model;
        }
        public async Task<EcmUser> GetEcmUserByEmailAsync(string email)
        {
            var model = await _repository.Entities.FirstAsync(f => f.UserEmail == email);
            return model;
        }
        public async Task<EcmUser> GetEcmUserByMobileAsync(string mobile)
        {
            var model = await _repository.Entities.FirstAsync(f => f.UserMobile == mobile);
            return model;
        }
        /// <summary>
        /// 获取当前用户量
        /// </summary>
        /// <returns></returns>
        public async Task<long> GetTharUserCount()
        {
            return await _repository.Entities.CountAsync(c=>c.UserStatus == 0 && c.UserRole == 0);
        }
        /// <summary>
        /// 更新第三方id
        /// </summary>
        /// <param name="useraccount"></param>
        /// <param name="userThirdPartId"></param>
        /// <returns></returns>
        public async Task<int> UpdateUserThirdPartIdAsync(string useraccount, string userThirdPartId)
        {
            var model = await _repository.Entities.FirstAsync(f => f.UserAccount == useraccount);
            if (userThirdPartId == model.UserThirdPartId)// 一样不需要修改
            {
                return 1;
            }
            model.UserThirdPartId = userThirdPartId;
            return await _repository.UpdateAsync(model);
        }
        /// <summary>
        /// 自动分页获取所有用户
        /// </summary>
        /// <returns></returns>
        public async Task<List<EcmUser>> GetEcmUsersAutoPageAsync()
        {
            List<EcmUser> ecmUsers = new List<EcmUser>();
            int index = 1;
            int total = 4000;
            while (true)
            {
                var list = await _repository.Where(w => w.UserRole == 0).ToPagedListAsync(index, total);
                if (list.Items.Count() > 0)
                {
                    ecmUsers.AddRange(list.Items);
                    index++;
                }
                else
                {
                    break;
                }
            }
            return ecmUsers;
        }
        /// <summary>
        /// 批量创建用户
        /// </summary>
        /// <param name="ecmUsers"></param>
        /// <returns></returns>
        public async Task<bool> CreateUsersAsync(List<EcmUser> ecmUsers)
        {
            var result = await _repository.InsertAsync(ecmUsers);
            return result > 0;
        }
    }
}
