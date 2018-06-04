package com.sinosteel.framework.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT User.ID FROM TBL_SYS_USERS User"
            + "WHERE EXISTS "
            + "(SELECT role_user.user_id FROM TBL_SYS_ROLE_USERS role_user) "
            + "WHERE User.ID = role_user.user_id "
            + "AND role_user.role_id = #{RoleId}"
    )
    List<String> getUserIdsByRoleId(@Param("RoleId")String RoleId);
}
