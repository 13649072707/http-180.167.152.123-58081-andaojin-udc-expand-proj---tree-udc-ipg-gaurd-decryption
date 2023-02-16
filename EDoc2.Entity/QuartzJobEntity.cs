using System;

namespace EDoc2.Entity
{
    public class QuartzJobEntity
    {
        public string jobName { get; set; }

        public string jobGroup { get; set; }

        public string jobCron { get; set; }

        public string jobTriggerName { get; set; }

    }
}
