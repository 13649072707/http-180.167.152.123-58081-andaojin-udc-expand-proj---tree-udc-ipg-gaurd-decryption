using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Entity
{
    /// <summary>
    /// 存储器职位实体
    /// </summary>
    public class StoragePositionDto
    {

        /// <summary>
        ///     职位编号
        /// </summary>
        public  string Code { get; set; }

        /// <summary>
        ///     第三方ID
        /// </summary>
        public  string ThirdPartId { get; set; }

        /// <summary>
        ///     上级职位
        /// </summary>
        public  string ParentId { get; set; }

        /// <summary>
        ///     职位名称
        /// </summary>
        public  string Name { get; set; }

     
        /// <summary>
        ///     排序
        /// </summary>
        public  int Sort { get; set; }
        /// <summary>
        ///     备注
        /// </summary>
        public  string Remark { get; set; }

        /// <summary>
        /// 是否删除?为true会删除这条数据，为false不删除，非差量计算使用,默认:false
        /// </summary>
        /// <value>false</value>
        public bool IsDelete { get; set; } = false;
    }
}
