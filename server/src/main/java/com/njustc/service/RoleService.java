package com.njustc.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.njustc.domain.Function;
import com.njustc.domain.Role;
import com.njustc.domain.User;
import com.njustc.framework.mybatis.DeleteAuthorizationMapper;
import com.njustc.framework.mybatis.EditAuthorizationMapper;
import com.njustc.framework.mybatis.QueryAuthorizationMapper;
import com.njustc.framework.utils.json.JsonUtil;
import com.njustc.framework.utils.list.ListUtil;
import com.njustc.repository.FunctionRepository;
import com.njustc.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class RoleService extends BaseService<Role>
{
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private FunctionRepository functionRepository;
	
	@Autowired
	private QueryAuthorizationMapper queryAuthorizationMapper;
	
	@Autowired
	private DeleteAuthorizationMapper deleteAuthorizationMapper;
	
	@Autowired
	private EditAuthorizationMapper editAuthorizationMapper;
	
	public JSONArray getAllRoles()
	{
		List<Role> allRoles = roleRepository.findAll();
		JSONArray allRolesJsonArray = JsonUtil.toJSONArray(allRoles);
		
		for(int i = 0; i < allRolesJsonArray.size(); i++)
		{
			JSONObject roleJson = allRolesJsonArray.getJSONObject(i);
			String roleId = roleJson.getString("id");
			
			List<String> queryAuthorizations = queryAuthorizationMapper.getAuthorizedOrganizationIdsByRoleId(roleId);
			roleJson.put("queryAuthorizations", queryAuthorizations);
			
			List<String> editAuthorizations = editAuthorizationMapper.getAuthorizedOrganizationIdsByRoleId(roleId);
			roleJson.put("editAuthorizations", editAuthorizations);
			
			List<String> deleteAuthorizations = deleteAuthorizationMapper.getAuthorizedOrganizationIdsByRoleId(roleId);
			roleJson.put("deleteAuthorizations", deleteAuthorizations);
		}
		
		return allRolesJsonArray;
	}
	
	public void addRole(JSONObject params, User user)
	{	
		Role role = JSONObject.toJavaObject(params, Role.class);
		
		String roleId = UUID.randomUUID().toString();
		role.setId(roleId);

		JSONArray queryAuthorizations = params.getJSONArray("queryAuthorizations");
		if(queryAuthorizations != null)
		{
			this.setQueryAuthorizations(roleId, queryAuthorizations);
		}
		
		JSONArray deleteAuthorizations = params.getJSONArray("deleteAuthorizations");
		if(deleteAuthorizations != null)
		{
			this.setDeleteAuthorizations(roleId, deleteAuthorizations);
		}
		
		JSONArray editAuthorizations = params.getJSONArray("editAuthorizations");
		if(editAuthorizations != null)
		{
			this.setEditAuthorizations(roleId, editAuthorizations);
		}
		
		setFunctions(role, params);	
		
		this.saveEntity(role, user);
	}
	
	public void editRole(JSONObject params, User user)
	{
		Role role = JSONObject.toJavaObject(params, Role.class);
		String roleId = role.getId();
		
		JSONArray queryAuthorizations = params.getJSONArray("queryAuthorizations");
		if(queryAuthorizations != null)
		{
			this.setQueryAuthorizations(roleId, queryAuthorizations);
		}
		
		JSONArray deleteAuthorizations = params.getJSONArray("deleteAuthorizations");
		if(deleteAuthorizations != null)
		{
			this.setDeleteAuthorizations(roleId, deleteAuthorizations);
		}
		
		JSONArray editAuthorizations = params.getJSONArray("editAuthorizations");
		if(editAuthorizations != null)
		{
			this.setEditAuthorizations(roleId, editAuthorizations);
		}
		
		setFunctions(role, params);	
		
		this.updateEntity(role, user);

	}
	
	public void deleteRole(JSONObject params)
	{
		String roleId = params.getString("id");
		this.deleteEntity(roleId);
		
		queryAuthorizationMapper.deleteAuthorizationByRoleId(roleId);
		editAuthorizationMapper.deleteAuthorizationByRoleId(roleId);
		deleteAuthorizationMapper.deleteAuthorizationByRoleId(roleId);
		
	}
	
	private void setQueryAuthorizations(String roleId, JSONArray queryAuthorizationsJsonArray)
	{
		List<String> existedAuthorizations = queryAuthorizationMapper.getAuthorizedOrganizationIdsByRoleId(roleId);
		List<String> authorizations = JsonUtil.toStringList(queryAuthorizationsJsonArray);
		
		List<String> toBeAddedAuthorizations = ListUtil.getDifference(authorizations, existedAuthorizations);
		List<String> toBeRemovedAuthorizations = ListUtil.getDifference(existedAuthorizations, authorizations);
		
		for(String authorization : toBeAddedAuthorizations)
		{
			queryAuthorizationMapper.addAuthorization(roleId, authorization);
		}
		
		for(String authorization : toBeRemovedAuthorizations)
		{
			queryAuthorizationMapper.deleteAuthorization(roleId, authorization);
		}
	}
	
	private void setDeleteAuthorizations(String roleId, JSONArray deleteAuthorizationsJsonArray)
	{
		List<String> existedAuthorizations = deleteAuthorizationMapper.getAuthorizedOrganizationIdsByRoleId(roleId);
		List<String> authorizations = JsonUtil.toStringList(deleteAuthorizationsJsonArray);
		
		List<String> toBeAddedAuthorizations = ListUtil.getDifference(authorizations, existedAuthorizations);
		List<String> toBeRemovedAuthorizations = ListUtil.getDifference(existedAuthorizations, authorizations);
		
		for(String authorization : toBeAddedAuthorizations)
		{
			deleteAuthorizationMapper.addAuthorization(roleId, authorization);
		}
		
		for(String authorization : toBeRemovedAuthorizations)
		{
			deleteAuthorizationMapper.deleteAuthorization(roleId, authorization);
		}
	}
	
	private void setEditAuthorizations(String roleId, JSONArray editAuthorizationsJsonArray)
	{
		List<String> existedAuthorizations = editAuthorizationMapper.getAuthorizedOrganizationIdsByRoleId(roleId);
		List<String> authorizations = JsonUtil.toStringList(editAuthorizationsJsonArray);
		
		List<String> toBeAddedAuthorizations = ListUtil.getDifference(authorizations, existedAuthorizations);
		List<String> toBeRemovedAuthorizations = ListUtil.getDifference(existedAuthorizations, authorizations);
		
		for(String authorization : toBeAddedAuthorizations)
		{
			editAuthorizationMapper.addAuthorization(roleId, authorization);
		}
		
		for(String authorization : toBeRemovedAuthorizations)
		{
			editAuthorizationMapper.deleteAuthorization(roleId, authorization);
		}
	}
	
	private void setFunctions(Role role, JSONObject params)
	{
		JSONArray functionIds = params.getJSONArray("functions");
		if(functionIds != null)
		{
			List<Function> functions = new ArrayList<Function>();
			
			for(int i = 0; i < functionIds.size(); i++)
			{
				String functionId = functionIds.getString(i);
				Function function = functionRepository.findOne(functionId);
				
				if(function != null)
				{
					functions.add(function);
				}
			}
			
			role.setFunctions(functions);
		}
	}
}
