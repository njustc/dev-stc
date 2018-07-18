package com.njustc.framework.core.web;

import com.alibaba.fastjson.JSONObject;
import com.njustc.domain.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class Request 
{
	private User user;
	
	private String uri;
	
	private String client;
	
	private String dateTime;
	
	private JSONObject params;
	
	private List<MultipartFile> files;
	
	public Request()
	{
		
	}
	
	public Request(JSONObject params)
	{
		this.params = params;
	}
	
	public Request(JSONObject params, List<MultipartFile> files)
	{
		this.params = params;
		this.files = files;
	}
	
public JSONObject getParams()
	{
		return params;
	}
	
	public void setParams(JSONObject params) 
	{
		this.params = params;
	}
	
	public List<MultipartFile> getFiles() 
	{
		return files;
	}
	
	public void setFiles(List<MultipartFile> files) 
	{
		this.files = files;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
