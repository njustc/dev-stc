package com.njustc.service;

import com.njustc.framework.mybatis.DeleteAuthorizationMapper;
import com.njustc.framework.mybatis.EditAuthorizationMapper;
import com.njustc.framework.mybatis.QueryAuthorizationMapper;
import com.njustc.framework.mybatis.RoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService
{
	@Autowired
	private QueryAuthorizationMapper queryAuthorizationMapper;
	
	@Autowired
	private DeleteAuthorizationMapper deleteAuthorizationMapper;
	
	@Autowired
	private EditAuthorizationMapper editAuthorizationMapper;

	@Autowired
	private RoleMapper roleMapper;

	public List<String> getOrganizationIdsByUserId(String userId)
	{
		return roleMapper.getOrganizationIdsByUserId(userId);
	}

	public List<String> getQueryAuthorizedOrganizationIds(String userId)
	{
		return queryAuthorizationMapper.getAuthorizedOrganizationIds(userId);
	}

	public List<String> getEditAuthorizedOrganizationIds(String userId)
	{
		return editAuthorizationMapper.getAuthorizedOrganizationIds(userId);
	}

	public List<String> getDeleteAuthorizedOrganizationIds(String userId)
	{
		return deleteAuthorizationMapper.getAuthorizedOrganizationIds(userId);
	}

}
