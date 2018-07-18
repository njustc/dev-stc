package com.njustc.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.njustc.domain.BaseEntity;
import com.njustc.domain.User;
import com.njustc.framework.utils.date.DateUtil;
import com.njustc.framework.utils.string.StringUtil;
import com.njustc.repository.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Transactional(propagation = Propagation.REQUIRED, rollbackFor={Exception.class, RuntimeException.class})
public class BaseService<T extends BaseEntity>
{
	public BaseRepository<T> baseRepository;
	
	@Autowired
	public RedisTemplate<?, ?> redisTemplate;
	
	@Autowired
	public void setBaseRepository(BaseRepository<T> baseRepository)
	{
		this.baseRepository = baseRepository;
	}
	
	public T saveEntity(T entity, User user)
	{
		String id = entity.getId();
		if(StringUtil.isEmpty(id))
		{
			id = UUID.randomUUID().toString();
			entity.setId(id);
		}
		
		if(user != null)
		{
			entity.setCreatedUserId(user.getId());
			entity.setCreatedUserName(user.getUsername());
		}
		
		entity.setCreatedTime(DateUtil.formatDateTime(new Date()));
		
		baseRepository.save(entity);
		return entity;
	}
	
	public T saveEntity(JSONObject entityJson, Class<T> clazz, User user)
	{
		T entity = (T) JSON.toJavaObject(entityJson, clazz);
		return this.saveEntity(entity, user);
	}
	
	public void deleteEntity(String id)
	{
		baseRepository.delete(id);
	}
	
	public void deleteEntity(T entity)
	{
		baseRepository.delete(entity);
	}
	
	public T updateEntity(T entity, User user)
	{
		if(user != null)
		{
			entity.setAlteredUserId(user.getId());
			entity.setAlteredUserName(user.getUsername());
		}
		
		entity.setAlteredTime(DateUtil.formatDateTime(new Date()));
		
		baseRepository.save(entity);
		return entity;
	}
	
	public T updateEntity(JSONObject entityJson, Class<T> clazz, User user)
	{
		T entity = JSON.toJavaObject(entityJson, clazz);
		return this.updateEntity(entity, user);
	}

	public T findEntityById(String id)
	{
		return baseRepository.findOne(id);
	}
	
	public List<T> findAll()
	{
		return baseRepository.findAll();
	}
	
	public List<String> getIds(List<T> entities)
	{
		List<String> ids = new ArrayList<String>();
		
		for(T entity : entities)
		{
			String id = entity.getId();
			ids.add(id);
		}
		
		return ids;
	}
}