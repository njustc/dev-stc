package com.sinosteel.service;

import java.util.List;

import com.sinosteel.domain.Function;
import com.sinosteel.framework.mybatis.FunctionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;

import com.sinosteel.repository.FunctionRepository;
import com.sinosteel.framework.utils.json.JsonUtil;

@Service
public class FunctionService extends BaseService<Function>
{
	@Autowired
	private FunctionRepository functionRepository;
	
	@Autowired
	private FunctionMapper functionMapper;




	//返回给前端的JSON数据，由AuthController的login函数调用
	public JSONArray getFunctionsHierarchies(List<Function> functions)
	{
		JSONArray functionJsonArray = JsonUtil.toJSONArray(functions);
		return functionJsonArray;
	}

}
