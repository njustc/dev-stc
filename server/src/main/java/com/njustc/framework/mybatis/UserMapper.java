package com.njustc.framework.mybatis;

import com.njustc.domain.Organization;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT User.ID FROM TBL_SYS_USERS User "
            + "WHERE EXISTS "
            + "(SELECT role_user.user_id FROM TBL_SYS_ROLE_USERS role_user "
            + "WHERE User.ID = role_user.user_id "
            + "AND role_user.role_id = #{RoleId})"
    )
    List<String> getUserIdsByRoleId(@Param("RoleId")String RoleId);

    @Result
    @Select("SELECT * FROM TBL_SYS_ORGANIZATION WHERE ID IN "
            + "(SELECT ORGANIZATION_ID FROM TBL_SYS_ORGANIZATION_USER WHERE USER_ID IN "
            + "(SELECT ID FROM TBL_SYS_USER WHERE USERNAME = #{username}))")
    List<Organization> getOrganizations(String username);

    @Select("SELECT org.ID FROM TBL_SYS_ORGANIZATION org "
            + "WHERE EXISTS "
            + "(SELECT 1 FROM TBL_SYS_ORGANIZATION_USER org_user "
            + "WHERE org.ID = org_user.ORGANIZATION_ID "
            + "AND org_user.USER_ID = #{userId})")
    List<String> getOrganizationIdsByUserId(@Param("userId")String userId);
}
