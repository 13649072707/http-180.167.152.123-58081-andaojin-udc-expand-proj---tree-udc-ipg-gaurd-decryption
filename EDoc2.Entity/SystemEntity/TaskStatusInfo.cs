using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Entity
{

    /// <summary>
    /// 任务进度状态实体
    /// </summary>
    public class TaskStatusInfo
    {
        /// <summary>
        /// 任务名字
        /// </summary>
        public  string TaskName { get; set; }
        /// <summary>
        /// 状态：Start|Progress|Complete|Error
        /// 开始
        /// 进行
        /// 完成
        /// 出错
        /// </summary>
        public string TaskStatus { get; set; }

        /// <summary>
        /// 进度进度|百分比
        /// </summary>
        public  double TaskSpeed { get; set; }
        /// <summary>
        /// 任务备注
        /// </summary>
        public  string TaskRemark { set; get; }
        /// <summary>
        /// 任务内容|可存一些信息
        /// </summary>
        public string TaskInfo { set; get; }
        /// <summary>
        /// 下载路径
        /// </summary>
        public string FilePath { get; set; }
    }
}
