using EDoc2.Api;
using EDoc2.Entity;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EDoc2.Core.QuartzWorks
{
    /// <summary>
    /// 定时任务调度中心
    /// </summary>[
    public class DockingTimeTaskCenter : BackgroundService
    {
        List<QuartzJobEntity> jobNames = new List<QuartzJobEntity>();
        private static QuartzHelper _quartzHelper;
        public DockingTimeTaskCenter(QuartzHelper quartzHelper)
        {
            _quartzHelper = quartzHelper;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var jsonConfig = await ExtUtilities.GetConfig("DOCKING_ORGSYNCWORKKEY_fs");
            try
            {
                
                    jobNames.Add(new QuartzJobEntity
                    {
                        jobName = "OrgSyncWorkJob",
                        jobGroup = "group",
                        jobCron = "0 0/20 * * * ? *",
                        jobTriggerName = "orgsyncTrigger"
                    });
                    var aluJson = JsonConvert.SerializeObject(jobNames);
                    await ExtUtilities.AddConfig(new Ext.Dto.SystemConfigDto { Key = "DOCKING_ORGSYNCWORKKEY_fs", Value = aluJson });
                
                foreach (var item in jobNames)
                {
                    await _quartzHelper.AddJob(item);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
