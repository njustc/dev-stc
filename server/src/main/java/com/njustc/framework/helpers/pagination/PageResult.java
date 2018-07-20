package com.njustc.framework.helpers.pagination;

import com.alibaba.fastjson.JSONObject;
import com.njustc.framework.utils.json.JsonUtil;

import java.util.List;

public class PageResult<T>
{
	public int total;
	public List<T> data;
	
	public PageResult()
	{
		
	}
	
	public PageResult(int total, List<T> data)
	{
		this.total = total;
		this.data = data;
	}
	
	public JSONObject toJSONObject()
	{
		JSONObject queryResultJson = new JSONObject();
		
		queryResultJson.put("total", total);
		queryResultJson.put("data", JsonUtil.toJSONArray(data));
		
		return queryResultJson;
	}
	
	@Override
	public String toString()
	{
		return this.toJSONObject().toJSONString();
	}
}
