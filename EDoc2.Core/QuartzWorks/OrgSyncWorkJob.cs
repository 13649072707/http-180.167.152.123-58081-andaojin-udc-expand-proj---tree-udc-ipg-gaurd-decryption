using EDoc2.Api;
using EDoc2.Entity;
using EDoc2.Entity.Enumerate;
using Furion;
using Furion.DependencyInjection;
using MacrowingProjectdocking.Data;
using MacrowingProjectdocking.Entity;
using MacrowingProjectdocking.Extensions;
using MapsterMapper;
using Newtonsoft.Json;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Core.QuartzWorks
{
    /// <summary>
    /// 组织同步定时任务
    /// </summary>
    public class OrgSyncWorkJob : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
        }

    }
}
