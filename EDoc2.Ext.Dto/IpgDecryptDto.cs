using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Ext.Dto
{
    public class IpgDecryptDto
    {
    }

    public class FiledModelDto
    {
        /// <summary>
        /// 
        /// </summary>
        public int FileId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileSize { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileModifyTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string EditorName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileCreateTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CreatorId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CreatorName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileCreateOperatorName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CurrentOperator { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CurrentOperatorId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CurrentVersionId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int LastVersionId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileCurVerNumStr { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileLastVerNumStr { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileState { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileRemark { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int ParentFolderId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FilePath { get; set; }
        /// <summary>
        /// PublicRoot\!!!加密文件\第二批加密文件
        /// </summary>
        public string FileNamePath { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IncId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileArchiveTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int Permission { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsDeleted { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int SecurityLevelId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SecLevelName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int SecLevelDegree { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string EffectiveTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ExpirationTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsFavorite { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileCipherText { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsCodeRules { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileExtName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int RelateMode { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CanPreview { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CanDownload { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CanDeleteFile { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int AttachType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileLastVerExtName { get; set; }
    }

    public class ResFiledDto
    {
        /// <summary>
        /// 
        /// </summary>
        public FiledModelDto data { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string dataDescription { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int result { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string message { get; set; }
    }
    public class ReturnDowInfo
    {
        public bool IsSuccess { get; set; }

        public string Msg { get; set; }

        public string FiledName  { get; set; }

        public string FilePath { get; set; }
    }

    /// <summary>
    /// 打包文件对象
    /// </summary>
    public class ZipFileItem
    {
        /// <summary>
        /// 文件名称
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// 文件路径
        /// </summary>
        public string FileUrl { get; set; }
    }
    /// <summary>
    /// 返回压缩包信息
    /// </summary>
    public class ResZipFileDto
    {
        /// <summary>
        /// 是否成功
        /// </summary>
        public bool IsSuccess { get; set; }
        /// <summary>
        /// 其他信息
        /// </summary>
        public string Msg { get; set; }
        /// <summary>
        /// 压缩包名
        /// </summary>
        public string ZipName { get; set; }
        /// <summary>
        /// 文件体
        /// </summary>
        public byte[] ZipBty { get; set; }
        /// <summary>
        /// 文件路径
        /// </summary>
        public string ZipPath { get; set; }
    }

}
