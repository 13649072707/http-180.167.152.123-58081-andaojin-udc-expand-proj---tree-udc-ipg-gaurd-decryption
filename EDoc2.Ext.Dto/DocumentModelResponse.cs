using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Ext.Dto
{
    public class DocumentModelResponse
    {
        /// <summary>
        /// 
        /// </summary>
        public Data data { get; set; }
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
    public class FilesInfoItem
    {
        /// <summary>
        /// 
        /// </summary>
        public long FileId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public long ParentFolderId { get; set; }
        /// <summary>
        /// 第二批加密文件
        /// </summary>
        public string ParentFolderName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileCurVerNumStr { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileCurSize { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileCurCode { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileCurRemark { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileLastVerNumStr { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileLastSize { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileLastCode { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileLastRemark { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileGuid { get; set; }
        /// <summary>
        /// Encrypt_0012临沂.jpg
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileExtName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileContentType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileCurVerId { get; set; }
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
        public int FileTotalSize { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int SecurityLevelId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileState { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileCurrentOperatorId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileCurrentOperatorName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileCreateOperatorName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileCreateTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileCreateOperator { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileModifyTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileModifyOperator { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileModifyOperatorName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileLastVerId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileArchiveTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileArchiveOperator { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileCreateType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FilePermData { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileOtherValue { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileDeletedTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileDeletedBy { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileRelativePath { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FileType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileRemark { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsDeleted { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileLastVerExtName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileTagContent { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SearchContent { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsFavorite { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int SharePermission { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CommentCount { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CurrentOperator { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int SourceEntryType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SourceEntryPath { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SourceEntryNamePath { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int SourceEntryEntryId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SourceEntryEntryName { get; set; }
    }

    public class InfoItemsItem
    {
        /// <summary>
        /// 
        /// </summary>
        public string DataType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Title { get; set; }
    }

    public class Settings
    {
        /// <summary>
        /// 
        /// </summary>
        public int PageNum { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int PageSize { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int TotalCount { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ViewMode { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int DocViewId { get; set; }
    }

    public class ThisFolder
    {
        /// <summary>
        /// 
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 第二批加密文件
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int Size { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int AlertSize { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ForbiddenFileExtensions { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int MaxFolderSize { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int MaxFileSize { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CreateTime { get; set; }
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
        public string Code { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int State { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ModifyTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int SecurityLevel { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int ChildFolderCount { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int ChildFileCount { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Path { get; set; }
        /// <summary>
        /// !!!加密文件
        /// </summary>
        public string ParentFolderName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int ParentFolderId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int Permission { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string NeedDownloadDesc { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int FolderType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int UploadType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string isfavorite { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string EditorName { get; set; }
    }

    public class Data
    {
        /// <summary>
        /// 
        /// </summary>
        public string EnabledOutSend { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<FilesInfoItem> FilesInfo { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<string> FoldersInfo { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<InfoItemsItem> InfoItems { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsArchive { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string MustOnline { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SecurityEnable { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Settings Settings { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public ThisFolder ThisFolder { get; set; }
    }
}
