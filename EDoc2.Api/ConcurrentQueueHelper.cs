using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Api
{
    public class ConcurrentQueueHelper<T>
    {

        private static ConcurrentQueue<T> concurrentQueue = new ConcurrentQueue<T>();//定义一个消息队列

        private static int QueueMaxLenght = 20000;//队列最大值
        public static T OutT;
        public ConcurrentQueueHelper(int maxCapacity)
        {
            QueueMaxLenght = maxCapacity;
        }
        /// <summary>
        /// 清空缓存
        /// </summary>
        public static bool Clear()
        {
            int count = Query().Count;
            for (int i = 0; i < count; i++)
            {
                if (!concurrentQueue.TryDequeue(out OutT))
                {
                    return false;
                }

            }
            return true;
        }
        /// <summary>
        /// 根据队列设置的最大值判断
        /// 超过最大值，移除队列第一条，队列末尾添加一条
        /// 没超过最大值，一直在队列尾部添加
        /// </summary>
        /// <param name="info"></param>
        public static void Append(T t)
        {
            concurrentQueue.Enqueue(t);
            if (concurrentQueue.Count > QueueMaxLenght)
            {
                concurrentQueue.TryDequeue(out _);
            }
        }
        /// <summary>
        /// 获取队列中元素的个数
        /// </summary>
        /// <returns></returns>
        public static int GetCount()
        {
            return concurrentQueue.Count;
        }
        /// <summary>
        /// 判断队列是否为空
        /// </summary>
        /// <returns></returns>
        public static bool GetEmpty()
        {
            return concurrentQueue.IsEmpty;
        }
        /// <summary>
        /// 尝试移除并返回并发队列开头处的对象
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        public static bool RemoveQueue()
        {
            //Dequeue
            return concurrentQueue.TryDequeue(out OutT);
        }
        /// <summary>
        /// 查询列表
        /// </summary>
        /// <returns></returns>
        public static List<T> Query()
        {
            return concurrentQueue.ToList();
        }

        /// <summary>
        /// 获取最后一条数据
        /// </summary>
        /// <returns></returns>
        public static T GetLastOrDefault()
        {
            return concurrentQueue.LastOrDefault<T>();
        }

        /// <summary>
        /// 获取第一条数据,但是不会移除第一条记录
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public static T GetFirstOrDefault()
        {
            concurrentQueue.TryPeek(out OutT);
            return OutT;
        }
        /// <summary>
        /// 读取消费
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        public static bool ReadConcurrentQueue(out T t)
        {
            return concurrentQueue.TryDequeue(out t);
        }
    }
}
