package com.sinosteel.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.Topic;
import com.sinosteel.domain.User;
import com.sinosteel.framework.helpers.pagination.PageResult;
import com.sinosteel.framework.helpers.pagination.Pager;
import com.sinosteel.framework.utils.json.JsonUtil;
import com.sinosteel.framework.utils.string.StringUtil;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

@Service
public class TopicService extends BaseService<Topic>
{
	@Autowired
	private TopicRepository topicRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	public JSONArray queryAllTopics()
	{
		return JsonUtil.toJSONArray(topicRepository.findAll());
	}
	
	public JSONObject queryTopics(JSONObject params)
	{
		StringBuilder hqlBuilder = new StringBuilder("FROM Topic topic WHERE 1 = 1 ");
		HashMap<String, Object> paramsMap = new HashMap<String, Object>();
		
		if(params != null)
		{
			String topicName = params.getString("topicName");
			if(!StringUtil.isEmpty(topicName))
			{
				hqlBuilder.append("AND topic.topicName LIKE :topicName ");
				paramsMap.put("topicName", "%" + topicName + "%");
			}
			
			String projectId = params.getString("projectId");
			if(!StringUtil.isEmpty(projectId))
			{
				hqlBuilder.append("AND topic.project.id = :projectId ");
				paramsMap.put("projectId", projectId);
			}
		}
		
		hqlBuilder.append("ORDER BY CREATED_TIME DESC ");
		
		Pager pager = JSONObject.toJavaObject(params.getJSONObject("pagination"), Pager.class);
		PageResult<Topic> pageResult = topicRepository.executeHql(hqlBuilder.toString(), paramsMap, pager);
		
		return pageResult.toJSONObject();
	}
	
	public void addTopic(JSONObject params, User user)
	{
		Topic topic = JSONObject.toJavaObject(params, Topic.class);
		topic.setId(UUID.randomUUID().toString());

		String projectId = params.getString("projectId");
		Project project = projectRepository.findOne(projectId);
		topic.setProject(project);
		
		this.saveEntity(topic, user);
	}
	
	public void editTopic(JSONObject params, User user)
	{
		Topic topic = JSONObject.toJavaObject(params, Topic.class);
		
		String topicId = topic.getId();
		Project project = topicRepository.findOne(topicId).getProject();
		topic.setProject(project);
		
		this.updateEntity(topic, user);
	}
}
