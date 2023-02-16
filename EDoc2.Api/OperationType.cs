using System;
using System.Collections.Generic;
using System.Linq;
using MacrowingProjectdocking.Api.Attributes;
using System.Threading.Tasks;

namespace MacrowingProjectdocking.Api
{
    /// <summary>
    /// 操作类型
    /// </summary>
    public enum OperationType
    {
        [EnumLabel(Lable = "op_type_addGroup")]
        AddGroup = 1,

        [EnumLabelAttribute(Lable = "op_type_deleteGroup")]
        DeleteGroup,

        [EnumLabelAttribute(Lable = "op_type_modifyGroup")]
        ModifyGroup,

        [EnumLabelAttribute(Lable = "op_type_addUser")]
        AddUser,

        [EnumLabelAttribute(Lable = "op_type_logoutUser")]
        LogoutUser,

        [EnumLabelAttribute(Lable = "op_type_modifyUser")]
        ModifyUser,

        [EnumLabelAttribute(Lable = "op_type_addDeparment")]
        AddDeparment,

        [EnumLabelAttribute(Lable = "op_type_deleteDeparment")]
        DeleteDeparment,

        [EnumLabelAttribute(Lable = "op_type_modifyDeparment")]
        ModifyDeparment,

        [EnumLabelAttribute(Lable = "op_type_addPosition")]
        AddPosition,

        [EnumLabelAttribute(Lable = "op_type_deletePosition")]
        DeletePosition,

        [EnumLabelAttribute(Lable = "op_type_modifyPosition")]
        ModifyPosition,

        [EnumLabelAttribute(Lable = "op_type_addLeaderPosition")]
        AddLeaderPosition,

        [EnumLabelAttribute(Lable = "op_type_removeLeaderPosition")]
        RemoveLeaderPosition,

        [EnumLabelAttribute(Lable = "op_type_addUserToPosition")]
        AddUserToPosition,

        [EnumLabelAttribute(Lable = "op_type_removeUserFromPosition")]
        RemoveUserFromPosition,

        [EnumLabelAttribute(Lable = "op_type_addMemberToGroup")]
        AddMemberToGroup,

        [EnumLabelAttribute(Lable = "op_type_removeMemberFromGroup")]
        RemoveMemberFromGroup,

        [EnumLabelAttribute(Lable = "op_type_modifyPasswordStrategy")]
        ModifyPasswordStrategy,

        [EnumLabelAttribute(Lable = "op_type_lockUser")]
        LockUser,

        [EnumLabelAttribute(Lable = "op_type_activateUser")]
        ActivateUser,

        [EnumLabelAttribute(Lable = "op_type_resetPassword")]
        ResetPassword,

        [EnumLabelAttribute(Lable = "op_type_modifyLoginStrategy")]
        ModifyLoginStrategy,
        [EnumLabelAttribute(Lable = "op_type_createSecret")]
        CreateSecret,
        [EnumLabelAttribute(Lable = "op_type_modifySecret")]
        ModifySecret,
        [EnumLabelAttribute(Lable = "op_type_removeSecret")]
        RemoveSecret,
    }
}
