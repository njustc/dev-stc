package com.njustc.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.njustc.domain.Organization;
import com.njustc.domain.Role;
import com.njustc.domain.User;
import com.njustc.framework.config.system.SystemConfig;
import com.njustc.framework.mybatis.OrganizationUserMapper;
import com.njustc.framework.mybatis.UserMapper;
import com.njustc.framework.utils.encryption.MD5Util;
import com.njustc.framework.utils.json.JsonUtil;
import com.njustc.framework.utils.list.ListUtil;
import com.njustc.framework.utils.string.StringUtil;
import com.njustc.repository.OrganizationRepository;
import com.njustc.repository.RoleRepository;
import com.njustc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService extends BaseService<User>
{
	@Autowired
	private SystemConfig systemConfig;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserMapper userMapper;


	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private OrganizationRepository organizationRepository;

	@Autowired
	private OrganizationUserMapper organizationUserMapper;

	
	public User getUserByUsername(String username)
	{
		return userRepository.findByUsername(username);
	}

	public User getLoginUser(JSONObject params) throws Exception
	{
		String userName = params.getString("username");
		if(StringUtil.isEmpty(userName))
		{
			throw new Exception("empty username");
		}
		
		String password = params.getString("password");
		if(StringUtil.isEmpty(password))
		{
			throw new Exception("empty password");
		}
		
		User user = userRepository.findByUsername(userName);
		if(user == null)
		{
			throw new Exception("no such user");
		}
		
		String encrptedPassword = MD5Util.encrypt(password);
		if(!encrptedPassword.equals(user.getPassword()))
		{
			throw new Exception("incorrect password");
		}
		
		return user;
	}
	
	public JSONArray queryAllUsers()
	{
		return JsonUtil.toJSONArray(userRepository.findAll());
	}
	

	
	/**新添加的用户密码固定为123456*/
	public void addUser(JSONObject params, User user)
	{
		User userToAdd = JSONObject.toJavaObject(params, User.class);
		
		String password = MD5Util.encrypt("123456");
		userToAdd.setPassword(password);
		
		userToAdd.setName(userToAdd.getUsername());
		
		JSONArray roleIds = params.getJSONArray("roleIds");
		if(roleIds != null)
		{
			List<Role> roles = new ArrayList<Role>();
			
			for(int i = 0; i < roleIds.size(); i++)
			{
				String roleId = roleIds.getString(i);
				Role role = roleRepository.findOne(roleId);
				
				roles.add(role);
			}
			
			userToAdd.setRoles(roles);
		}
		
		this.saveEntity(userToAdd, user);

		JSONArray organizationIds = params.getJSONArray("organizationIds");
		if(organizationIds != null)
		{
			String userId = userToAdd.getId();

			for(int i = 0; i < organizationIds.size(); i++)
			{
				String organizationId = organizationIds.getString(i);
				organizationUserMapper.insertOrganizationUser(organizationId, userId, "0");
			}
		}
	}
	
	public void addUser(String userId, String username, String name, User user)
	{
		User userToAdd = new User();
		
		userToAdd.setId(userId);
		userToAdd.setUsername(username);
		userToAdd.setName(name);
		
		String password = MD5Util.encrypt("123456");
		userToAdd.setPassword(password);
		
		this.saveEntity(userToAdd, user);

		String primeOrganization = systemConfig.getProperty("primeOrganization");
		organizationUserMapper.insertOrganizationUser(primeOrganization, userId, "0");
	}
	
	public void editUser(JSONObject params, User user)
	{
		String userId = params.getString("id");
		User userToEdit = userRepository.findOne(userId);
		
		String username = params.getString("username");
		if(!StringUtil.isEmpty(username))
		{
			userToEdit.setUsername(username);
		}
		
		JSONArray roleIds = params.getJSONArray("roleIds");
		if(roleIds != null)
		{
			List<Role> roles = new ArrayList<Role>();
			
			for(int i = 0; i < roleIds.size(); i++)
			{
				String roleId = roleIds.getString(i);
				Role role = roleRepository.findOne(roleId);
				
				roles.add(role);
			}
			
			userToEdit.setRoles(roles);
		}
		
		this.updateEntity(userToEdit, user);

		JSONArray organizationIdsJsonArray = params.getJSONArray("organizationIds");
		if(organizationIdsJsonArray != null)
		{
			List<String> organizationIds = JsonUtil.toStringList(organizationIdsJsonArray);
			List<String> existedOrganizationIds = organizationUserMapper.findOrganizationIdsByUserId(userId);

			List<String> toBeAddedOrganizationIds = ListUtil.getDifference(organizationIds, existedOrganizationIds);
			List<String> toBeDeletedOrganizationIds = ListUtil.getDifference(existedOrganizationIds, organizationIds);

			for(String organizationId : toBeAddedOrganizationIds)
			{
				organizationUserMapper.insertOrganizationUser(organizationId, userId, "0");
			}

			for(String organizationId : toBeDeletedOrganizationIds)
			{
				organizationUserMapper.deleteOrganizationUser(organizationId, userId);
			}
		}

	}
	
	public void deleteUser(JSONObject params)
	{
		String userId = params.getString("id");
		User user = userRepository.findOne(userId);
		String username = user.getUsername();
		
		userRepository.delete(userId);
		organizationUserMapper.deleteOrganizationUserByUserId(userId);
	}

	public List<Organization> getOrganizations(String username)
	{
		return userMapper.getOrganizations(username);
	}

	public List<String> getOrganizationIdsByUserId(String userId)
	{
		return userMapper.getOrganizationIdsByUserId(userId);
	}
}
