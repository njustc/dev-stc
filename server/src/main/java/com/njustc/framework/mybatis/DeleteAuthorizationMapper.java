package com.njustc.framework.mybatis;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DeleteAuthorizationMapper
{
	@Select("SELECT delete_auth.ORGANIZATION_ID FROM TBL_SYS_DELETE_AUTHORIZATION delete_auth "
			+ "WHERE EXISTS "
			+ "(SELECT 1 FROM TBL_SYS_ROLE_USER role_user "
			+ "WHERE role_user.ROLE_ID = delete_auth.ROLE_ID "
			+ "AND role_user.USER_ID = #{userId})")
	List<String> getAuthorizedOrganizationIds(@Param("userId")String userId);
	
	@Select("SELECT ORGANIZATION_ID FROM TBL_SYS_DELETE_AUTHORIZATION "
			+ "WHERE ROLE_ID = #{roleId}")
	List<String> getAuthorizedOrganizationIdsByRoleId(@Param("roleId")String roleId);
	
	@Insert("INSERT INTO TBL_SYS_DELETE_AUTHORIZATION(ROLE_ID, ORGANIZATION_ID) VALUES (#{roleId}, #{organizationId})")
	void addAuthorization(@Param("roleId")String roleId, @Param("organizationId")String organizationId);
	
	@Delete("DELETE FROM TBL_SYS_DELETE_AUTHORIZATION WHERE ROLE_ID = #{roleId} AND ORGANIZATION_ID = #{organizationId}")
	void deleteAuthorization(@Param("roleId")String roleId, @Param("organizationId")String organizationId);
	
	@Delete("DELETE FROM TBL_SYS_DELETE_AUTHORIZATION WHERE ROLE_ID = #{roleId}")
	void deleteAuthorizationByRoleId(@Param("roleId")String roleId);
	
	@Delete("DELETE FROM TBL_SYS_DELETE_AUTHORIZATION WHERE ORGANIZATION_ID = #{organizationId}")
	void deleteAuthorizationByOrganizationId(@Param("organizationId")String organizationId);
}
