using EDoc2.Entity;
using EDoc2.Entity.Enumerate;
using Furion.DependencyInjection;
using Quartz;
using Quartz.Impl;
using Quartz.Impl.Matchers;
using Quartz.Impl.Triggers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Core.QuartzWorks
{
    public class QuartzHelper : ITransient
    {
        private IScheduler sched = null;            //创建一个调度器    
        private CronTriggerImpl trigger = null;     //新建一个触发器  
        List<QuartzJobEntity> jobTasks = new List<QuartzJobEntity>();
        JobDetailImpl jobDetail = new JobDetailImpl();      //新建一个任务 
        public readonly ISchedulerFactory _schedulerFactory;
        public QuartzHelper(ISchedulerFactory schedulerFactory)
        {
            _schedulerFactory = schedulerFactory;
        }

        public async Task<bool> TriggerAction(string taskName, string groupName, OrgSyncSetting orgSyncSetting, JobAction action)
        {

            IScheduler scheduler = await _schedulerFactory.GetScheduler();
            List<JobKey> jobKeys = scheduler.GetJobKeys(GroupMatcher<JobKey>.GroupEquals(groupName)).Result.ToList();
            if (jobKeys == null || jobKeys.Count() == 0)
            {
                Console.WriteLine($"任务：{taskName}不存在！");
                return false;
            }
            JobKey jobKey = jobKeys.Where(s => scheduler.GetTriggersOfJob(s).Result.Any(x => (x as CronTriggerImpl).Name == taskName)).FirstOrDefault();
            if (jobKey == null)
            {
                Console.WriteLine($"任务：{taskName}不存在！");
                return false;
            }
            var triggers = await scheduler.GetTriggersOfJob(jobKey);
            ITrigger trigger = triggers?.Where(x => (x as CronTriggerImpl).Name == taskName).FirstOrDefault();
            if (trigger == null)
            {
                Console.WriteLine($"任务：{taskName}未运行！");
                return false;
            }
            switch (action)
            {
                case JobAction.删除:
                case JobAction.修改:
                    await scheduler.PauseTrigger(trigger.Key);
                    await scheduler.UnscheduleJob(trigger.Key);// 移除触发器
                    await scheduler.DeleteJob(trigger.JobKey);
                    await AddJob(new QuartzJobEntity { jobCron = orgSyncSetting.OrgsyncCron, jobGroup = groupName, jobName = taskName, jobTriggerName = "orgsyncTrigger" });
                    break;
                case JobAction.暂停:
                case JobAction.停止:
                case JobAction.开启:
                    if (action == JobAction.暂停)
                    {
                        await scheduler.PauseTrigger(trigger.Key);
                    }
                    else if (action == JobAction.开启)
                    {
                        await scheduler.ResumeTrigger(trigger.Key);
                    }
                    else
                    {
                        await scheduler.Shutdown();
                    }
                    break;
                case JobAction.立即执行:
                    await scheduler.TriggerJob(jobKey);
                    break;
            }
            return true;
            //"完成";


        }

        public async Task<object> AddJob(QuartzJobEntity item)
        {
            try
            {
                trigger = new CronTriggerImpl(item.jobName, item.jobTriggerName);
                jobDetail = new JobDetailImpl();
                jobDetail.Name = item.jobName;
                jobDetail.Group = item.jobGroup;
                jobDetail.JobType = typeof(OrgSyncWorkJob);
                trigger.StartTimeUtc = DateTimeOffset.Now.AddSeconds(10);
                trigger.CronExpressionString = item.jobCron;
                //解决调度任务就会执行任务的问题，改成按照定时任务配置的时间来执行
                ((CronTriggerImpl)trigger).MisfireInstruction = MisfireInstruction.CronTrigger.DoNothing;
                sched = _schedulerFactory.GetScheduler().Result;
                // 调度容器设置JobDetail和Trigger
                var datetimeTrigger = await sched.ScheduleJob(jobDetail, trigger);
                // 启动
                if (!sched.IsShutdown)
                {
                    await sched.Start();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"定时任务出错，{ex.Message}");
            }
            return jobTasks;
        }
    }
}
