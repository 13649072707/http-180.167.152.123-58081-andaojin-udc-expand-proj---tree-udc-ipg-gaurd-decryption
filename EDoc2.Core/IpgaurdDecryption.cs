using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Core
{
    public class IpgaurdDecryption
    {
        public readonly static int HEADERSIZE = 4096;
        /// <summary>
        /// 初始化方法
        /// </summary>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public static extern long TSD_Initialize(string szServerIP, int nPort, string szName, string szPassword);

        /// <summary>
        /// 反初始化
        /// </summary>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public extern static long TSD_Finalize();

        /// <summary>
        /// 是否是明文文件
        /// </summary>
        /// <param name="lpContent"></param>
        /// <param name="nLen"></param>
        /// <param name="pbReply"></param>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public static extern long TSD_IsSdFile2(byte[] lpContent, int nLen, bool pbReply);

        /// <summary>
        /// 通过文件内容，判断一个文件是否加密文件，是否授权加密，以及加密文件头的大小（主要用于授权加密文件）。
        /// 原型：long TSD_CheckSdFile2(void* lpszContent, int nLen, bool* pbIsSdFile,bool* p bIsAuthSd, int* pnSdAttrSize long* pnOriSize)
        /// </summary>
        /// <param name="lpszContent">[in]输入文件的前 4k 内容</param>
        /// <param name="nLen">[in]输入内容的实际长度</param>
        /// <param name="pbIsSdFile">[out]是否加密文件</param>
        /// <param name="pbIsAuthSd">[out]是否授权加密文件</param>
        /// <param name="pnSdAttrSize">[out]加密属性的大小（即加密头大小）</param>
        /// <param name="pnOriSize">[out]原始明文的大小</param>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public extern static long TSD_CheckSdFile2(byte[] lpszContent, int nLen, ref bool pbIsSdFile, ref bool pbIsAuthSd, ref int pnSdAttrSize, ref long pnOriSize);


        /// <summary>
        /// 通过文件内容获取加密文件的文档属性
        /// 原型：long TSD_ GetFile SdAttr2(void* lpContent, int nLen, void* lpSdAttr , int* pnAttrLength);
        /// </summary>
        /// <param name="lpszContent">[in]输入文件的加密属性头(即：加密头)的内容，大小通过TSD_CheckSdFile2获得</param>
        /// <param name="nLen">[in]输入lpszContent内容的实际长度</param>
        /// <param name="lpSdAttr">[out]返回获取的文档属性内容</param>
        /// <param name="pnAttrLength">[in][out]指向文档属性大小，输入时是文档属性空间分配大小，返回时是文档属性的实际大小，注意[in]的时候，大小可以通过TSD_CheckSdFile2获取</param>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public extern static long TSD_GetFileSdAttr2(byte[] lpszContent, int nLen, IntPtr lpSdAttr, ref int pnAttrLength);

        /// <summary>
        /// 加密Init
        /// </summary>
        /// <param name="nAllLen"></param>
        /// <param name="lpSdAttr"></param>
        /// <param name="nAttrLength"></param>
        /// <param name="phEncrypt"></param>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public unsafe extern static long TSD_EncryptDataInit(long nAllLen, IntPtr lpSdAttr, int nAttrLength, char** phEncrypt);

        /// <summary>
        /// 加密Update
        /// </summary>
        /// <param name="hEncrypt"></param>
        /// <param name="pln"></param>
        /// <param name="nInLen"></param>
        /// <param name="pOut"></param>
        /// <param name="pnOutlen"></param>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public unsafe extern static long TSD_EncryptDataUpdate(char* hEncrypt, byte[] pln, int nInLen, IntPtr pOut, ref int pnOutlen);

        /// <summary>
        /// 加密final
        /// </summary>
        /// <param name="hEncrypt"></param>
        /// <param name="pOut"></param>
        /// <param name="pnOutLen"></param>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public unsafe extern static long TSD_EncryptDataFinal(char* hEncrypt, IntPtr pOut, ref int pnOutLen);
        /// <summary>
        /// 解密初始化
        /// 原型：long TSD_DecryptDataInit( long n AllLen, void ** phDecrypt
        /// </summary>
        /// <param name="nAllLen"></param>
        /// <param name="phDecrypt"></param>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public unsafe extern static long TSD_DecryptDataInit(long nAllLen, char** phDecrypt);

        /// <summary>
        /// 解密数据
        /// </summary>
        /// <param name="hDecrypt">解密 初始化的句柄</param>
        /// <param name="pIn">输入的数据流指针</param>
        /// <param name="nInLen">输入的数据流的长度（字节）</param>
        /// <param name="pout">返回的解密数据，空间需要由调用者分配</param>
        /// <param name="pnOutLen">输入时是 out 数据空间的长度；</param>
        /// <remarks>
        /// 原型：l ong TSD_DecryptDataUpdate(void* hDecrypt,char* pIn, int nInLen, char* pOut, int* pnOutLen);
        /// </remarks>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public unsafe extern static long TSD_DecryptDataUpdate(char* phDecrypt, byte[] lpszContent, int nInLen, IntPtr lpszUpdateReply, ref int pnOutLen);

        /// <summary>
        /// 解密结束
        /// </summary>
        /// <param name="hDecrypt">解密初始化的句柄</param>
        /// <param name="pout">返回的解密数据</param>
        /// <param name="pnOutLen">数据空间长度</param>
        /// <remarks>
        /// 原型：long TSD_DecryptDataFinal(void* hDecrypt , char* pOut, int* pnOutLen);
        /// </remarks>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public unsafe extern static long TSD_DecryptDataFinal(char* hDecryp, IntPtr pout, ref int pnOutLen);

        /// <summary>
        /// 设置输出日志信息
        /// </summary>
        /// <param name="path">日志信息输出的目录，不指定默认为程序运行的目录</param>
        /// <param name="nLevel">设置日志输出的级别，可以设置以下值</param>
        /// <remarks>
        /// 原型：long TSD_SetLogInfo(char* szLogFile, int nLevel);
        /// </remarks>
        /// <returns></returns>
        [DllImport("DWSvc.so")]
        public unsafe extern static long TSD_SetLogInfo(string path, int nLevel);
        // 解释返回错误结果的函数
        public static string GetErrorText(long nError)
        {
            switch (nError)
            {
                case 0: return "成功";
                case 1: return "参数：错误";
                case 2: return "未初始化";
                case 3: return "创建/打开源文件失败";
                case 4: return "创建/打开目标文件失败";
                case 5: return "获取源文件属性失败";
                case 6: return "获取目标文件属性失败";
                case 7: return "初始化加密文档标签失败";
                case 8: return "初始化加密文档的加密头失败";
                case 9: return "初始化外发文档标签失败";
                case 10: return "初始化外发文档加密头失败";
                case 11: return "获取正文的加密算法及密钥失败";
                case 12: return "不支持的加密算法";
                case 13: return "读文件数据失败";
                case 14: return "写文件数据失败";
                case 15: return "读(加密文档的)文件头失败";
                case 16: return "写(加密文档的)文件头失败";
                case 17: return "加密数据失败";
                case 18: return "解密数据失败";
                case 19: return "加密(加密文档的)基本属性数据块失败";
                case 20: return "加密(加密文档的)安全属性数据块失败";
                case 21: return "加密(加密文档的)安全属性数据块失败";
                case 22: return "解密(加密文档的)安全属性数据块失败";
                case 23: return "加密(外发文档的)基本属性数据块失败";
                case 24: return "解密(外发文档的)基本属性数据块失败";
                case 25: return "读源文件数据失败";
                case 26: return "写数据到目标文件失败";
                case 27: return "密钥错误";
                case 28: return "验证数据失败";
                case 29: return "非法源文件名";
                case 30: return "非法目标文件名";
                case 31: return "不支持的加密文档";
                case 32: return "内部错误";
                case 33: return "内存不足";
                case 34: return "源文件不是加密文档";
                case 35: return "源文件不是外发加密文档";
                case 36: return "创建临时文件失败";
                case 37: return "设置目标文件大小失败";
                case 38: return "创建备份文件失败";
                case 39: return "移动临时文件失败";
                case 40: return "移动备份文件失败";
                case 41: return "释放的路径太长";
                case 42: return "源文件是加密文档";
                case 43: return "离线过期 ID 不支持";
                case 44: return "初始化加密文档的加密 sess 头失败";
                case 45: return "移动损坏的加密文件";
                case 46: return "通知用户已备份文档";
                case 47: return "压缩数据失败";
                case 48: return "加密文件失败";
                case 49: return "不支持的加密文件版本";
                case 50: return "不支持的加密文件版本";

                case 64: return "文件不存在";
                case 65: return "只处理普通文件";
                case 66: return "不对 ELF 文件类型进行处理";
                case 67: return "获取共享内存失败";
                case 68: return "没有安全区域信息";
                case 69: return "缺少或是未找到文档创建者";
                case 70: return "未找到对应的用户";
                case 71: return "未找到对应安全区域或安全级别";
                case 72: return "正在同步信息，请稍后再尝试";

                case 73: return "内容长度超出限制";
                case 74: return "打开次数和修改权限不能一起设置";
                case 75: return "获取加密头失败";
                case 76: return "获取加密头失败";
                case 77: return "删除用户的加密权限失败";
                case 78: return "设置用户的加密权限失败";
                case 79: return "获取路径失败";
                case 80: return "查询 ID 失败";
                case 65537: return "没有访问该加密文档的权限";
                case 65538: return "没有设置该加密文档的权限";
                case 65539: return "加密文档访问密码错误";
                case 65540: return "设置权限的密码错误";
                case 65541: return "加密文档已过期";
                case 65542: return "已超过最大打开次数";
                case 65543: return "加密文档禁止离线访问";
                case 65544: return "外发文档禁止还原";
                case 65545: return "禁止解密大于 4G 的加密文件";
                case 65546: return "解压数据失败";
                case 65547: return "文件的有效长度不正确";
                case 65548: return "错误信息最大总数";
                case 86016: return "打开了加密文档";
                case 86017: return "为了防止泄密，禁止图片查看器保存文件";
                case 61441: return "不支持指定的功能";
                case 61442: return "参数错误";
                case 61443: return "没有权限错误";
                case 61444: return "数据错误";
                case 61445: return "操作正在进行中";
                case 61446: return "产品 ID 不匹配";
                case 61447: return "没有指定的管理者";
                case 61448: return "密码错误";
                case 61520: return "自定义错误";
                case 61521: return "该账户名称已存在";
                case 61536: return "连接子服务器失败";
                case 61537: return "识别码不正确";
                case 61538: return "(远程修改注册信息)写入失败";
                case 61539: return "PinKey 不匹配";
                case 61540: return "客户端连上了更优的中继服务器";
                case 61541: return "产品授权不正确";
                default: return "未知错误";
            }
        }
    }
}
