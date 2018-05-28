package com.sinosteel.web;

import com.alibaba.fastjson.JSONArray;
import com.sinosteel.domain.Function;
import com.sinosteel.domain.FunctionType;
import com.sinosteel.domain.Role;
import com.sinosteel.domain.User;
import com.sinosteel.service.FunctionService;
import com.sinosteel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.framework.utils.encryption.HmacSHA256Util;
import com.sinosteel.framework.utils.encryption.MD5Util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AuthController 
{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private FunctionService functionService;
	
	/**作为无状态WEB应用，仅需要登录时授予一个密码摘要，并且无需登出操作*/
	@RequestMapping(value = "/login")
	public Response login(Request request)
	{
		Response response = new Response();
		
		try
		{
			User user = userService.getLoginUser(request.getParams());
			JSONObject userJson = JSONObject.parseObject(JSONObject.toJSONString(user));
			//去掉roles以及function等冗杂信息
			userJson.remove("roles");
			userJson.remove("functions");
			//将与角色及其功能相关信息写入该jsonarray里面，返回给前端
			JSONArray rolesJson = new JSONArray();
			List<Role> roles = user.getRoles();
			for (Role role: roles) {
				JSONObject roleJson = new JSONObject();
				//将角色名称放入json内
				roleJson.put("name", role.getRoleString());

				List<Function> roleFunctions = role.getFunctions();
				Map<String, ArrayList<FunctionType>> functionGroup = new HashMap<String, ArrayList<FunctionType>>();
				for (Function function: roleFunctions) {
					if (functionGroup.get(function.getObject()) == null) {
						functionGroup.put(function.getObject(), new ArrayList<FunctionType>());
					}
					ArrayList<FunctionType> functionTypeArrayList = functionGroup.get(function.getObject());
					functionTypeArrayList.add(function.getFunctionType());

				}
				//将角色的功能相关放入json内
				roleJson.put("functionGroup", functionGroup);
				//将该角色的所有信息放入总的jsonArray内
				rolesJson.add(roleJson);
			}
			//userJson.put("modules", functionService.getFunctionsHierarchies(user.getFunctions()));
			userJson.put("roles", rolesJson);
			String digest = HmacSHA256Util.digest(user.getUsername(), user.getPassword());
			userJson.put("clientDigest", digest);
			
			response.status = ResponseType.SUCCESS;
			response.data = userJson;
			response.message = "";
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
	
	@RequestMapping(value = "/resetPassword")
	public Response resetPassword(Request request)
	{
		Response response = new Response();
		
		try
		{
			response.status = ResponseType.SUCCESS;
			
			String password = request.getParams().getString("password");
			String encrptedPassword = MD5Util.encrypt(password);
			
			User user = request.getUser();
			if(encrptedPassword.equals(user.getPassword()))
			{
				String newPassword = request.getParams().getString("newPassword");
				String encrptedNewPassword = MD5Util.encrypt(newPassword);
				
				user.setPassword(encrptedNewPassword);
				userService.updateEntity(user, user);
			}
			else
			{
				throw new Exception("INCORRECT PASSWORD");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			response.status = ResponseType.FAILURE;
			response.message = e.getMessage();
		}
		
		return response;
	}
}

