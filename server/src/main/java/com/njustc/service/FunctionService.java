package com.njustc.service;

import com.alibaba.fastjson.JSONArray;
import com.njustc.domain.Function;
import com.njustc.framework.mybatis.FunctionMapper;
import com.njustc.framework.utils.json.JsonUtil;
import com.njustc.repository.FunctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
