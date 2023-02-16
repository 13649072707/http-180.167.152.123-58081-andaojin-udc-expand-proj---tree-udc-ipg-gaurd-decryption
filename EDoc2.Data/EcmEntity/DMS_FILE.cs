using System;
using System.Linq;
using System.Text;
using SqlSugar;

namespace MacrowingProjectdocking.Data
{
    ///<summary>
    ///
    ///</summary>
    [SugarTable("dms_file")]
    public partial class DMS_FILE
    {
           public DMS_FILE(){


           }
           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:False
           /// </summary>           
           [SugarColumn(IsPrimaryKey=true,IsIdentity=true,ColumnName="file_id")]
           public int FILE_ID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="instance_id")]
           public int? INSTANCE_ID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="folder_id")]
           public int? FOLDER_ID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_curVerId")]
           public int? FILE_CURVERID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_curVerNumStr")]
           public string FILE_CURVERNUMSTR {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_curSize")]
           public long? FILE_CURSIZE {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_curCode")]
           public string FILE_CURCODE {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_curRemark")]
           public string FILE_CURREMARK {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_lastVerId")]
           public int? FILE_LASTVERID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_lastVerNumStr")]
           public string FILE_LASTVERNUMSTR {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_lastSize")]
           public long? FILE_LASTSIZE {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_lastCode")]
           public string FILE_LASTCODE {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_lastRemark")]
           public string FILE_LASTREMARK {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_guid")]
           public string FILE_GUID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_path")]
           public string FILE_PATH {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_name")]
           public string FILE_NAME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_extName")]
           public string FILE_EXTNAME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_totalSize")]
           public long? FILE_TOTALSIZE {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="securityLevel_id")]
           public int? SECURITYLEVEL_ID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_state")]
           public int? FILE_STATE {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_currentOperatorId")]
           public int? FILE_CURRENTOPERATORID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_ownerId")]
           public int? FILE_OWNERID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_createType")]
           public int? FILE_CREATETYPE {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_createTime")]
           public DateTime? FILE_CREATETIME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_createOperator")]
           public int? FILE_CREATEOPERATOR {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_modifyTime")]
           public DateTime? FILE_MODIFYTIME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_modifyOperator")]
           public int? FILE_MODIFYOPERATOR {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_archiveTime")]
           public DateTime? FILE_ARCHIVETIME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="inc_id")]
           public string INC_ID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_remark")]
           public string FILE_REMARK {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_type")]
           public int? FILE_TYPE {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_lastVerName")]
           public string FILE_LASTVERNAME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_lastVerExtName")]
           public string FILE_LASTVEREXTNAME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_effectiveTime")]
           public DateTime? FILE_EFFECTIVETIME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_expirationTime")]
           public DateTime? FILE_EXPIRATIONTIME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_cipherText")]
           public byte? FILE_CIPHERTEXT {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_offlinePermission")]
           public int? FILE_OFFLINEPERMISSION {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_modifyOperatorName")]
           public string FILE_MODIFYOPERATORNAME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_createOperatorName")]
           public string FILE_CREATEOPERATORNAME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_deleteTime")]
           public DateTime? FILE_DELETETIME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:0
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_deleteOperator")]
           public int? FILE_DELETEOPERATOR {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_purgeTime")]
           public DateTime? FILE_PURGETIME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:0
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_purgeOperator")]
           public int? FILE_PURGEOPERATOR {get;set;}

           /// <summary>
           /// Desc:
           /// Default:0
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_isDeleted")]
           public byte? FILE_ISDELETED {get;set;}

           /// <summary>
           /// Desc:
           /// Default:0
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_isCascadeDelete")]
           public byte? FILE_ISCASCADEDELETE {get;set;}

           /// <summary>
           /// Desc:
           /// Default:0
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_isolation")]
           public byte? FILE_ISOLATION {get;set;}

           /// <summary>
           /// Desc:
           /// Default:0
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_indexState")]
           public int? FILE_INDEXSTATE {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_currentOperatorName")]
           public string FILE_CURRENTOPERATORNAME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_deleteOperatorName")]
           public string FILE_DELETEOPERATORNAME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_purgeOperatorName")]
           public string FILE_PURGEOPERATORNAME {get;set;}

           /// <summary>
           /// Desc:
           /// Default:
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_rootFolderId")]
           public int? FILE_ROOTFOLDERID {get;set;}

           /// <summary>
           /// Desc:
           /// Default:0
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_fuseBackup")]
           public int? FILE_FUSEBACKUP {get;set;}

           /// <summary>
           /// Desc:
           /// Default:0
           /// Nullable:True
           /// </summary>           
           [SugarColumn(ColumnName="file_securityscan")]
           public int? FILE_SECURITYSCAN {get;set;}

    }
}
