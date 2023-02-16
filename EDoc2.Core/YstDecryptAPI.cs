using System.Runtime.InteropServices;

namespace EDoc2.Core
{
    /// <summary>
    /// 亿赛通解密API
    /// </summary>
    public class YstDecryptAPI
    {
        /// <summary>
        /// 初始化
        /// </summary>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public extern static int EstInitKeys();

        /// <summary>
        /// 初始化保存
        /// </summary>
        /// <returns></returns>
        [DllImport("DWSvc.so")]  
        public extern static bool EstSaveKeys(string key);

        /// <summary>
        /// 检查文件是否为加密文件
        /// </summary>
        /// <param name="pFileName">/home/test/1.c 文件绝对路径</param>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public extern static bool EstIsEncryptLockFile(string pFileName);
        /// <summary>
        /// 按文件路径解密接口
        /// </summary>
        /// <param name="pFileName">/home/test/1.c 文件绝对路径</param>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public extern static bool EstDecryptLockFile(string pFileName);

        ///// <summary>
        ///// 判断文件是否有权限解密
        ///// </summary>
        ///// <param name="pFileName">/home/test/1.c 文件绝对路径</param>
        ///// <returns></returns>
        //[DllImport("DWSvc.so")]
        //public extern static bool EstIsCanDecryptLockFile(string pFileName);

    }
}
