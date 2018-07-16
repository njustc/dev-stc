package com.sinosteel.repository;

import com.sinosteel.domain.BaseEntity;
import com.sinosteel.framework.helpers.pagination.PageResult;
import com.sinosteel.framework.helpers.pagination.Pager;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

/**
 * {@code BaseRepository} 接口实现
 * @param <T> {@code BaseEntity} 子类
 */
public class BaseRepositoryImpl<T extends BaseEntity> extends SimpleJpaRepository<T, String> implements BaseRepository<T>
{
	/**
	 * 实体类的Class
	 */
	private final Class<T> domainClass;

	/**
	 * 实体类管理器EntityManager
	 */
	private final EntityManager entityManager;

	/**
	 * 自定义构造函数
	 * @param domainClass 实体类的Class
	 * @param entityManager 实体类管理器
	 */
	public BaseRepositoryImpl(Class<T> domainClass, EntityManager entityManager)
	{
		super(domainClass, entityManager);
		this.domainClass = domainClass;
		this.entityManager = entityManager;
	}

	/**
	 * 是否互相支持
	 * @param modelType 模式类型
	 * @return 是否支持
	 */
	@Override
	public boolean support(String modelType) 
	{
		return domainClass.getName().equals(modelType);
	}
	
	public EntityManager getEntityManager()
	{
		return this.entityManager;
	}

	/**
	 * 执行Sql语句
	 * @param sql 符合语法的sql语句
	 * @param paramsMap 参数表
	 * @param <U> 返回列表所包含的对象类型
	 * @return 返回所查询的对象列表
	 */
	@SuppressWarnings("unchecked")
	@Override
	public <U> List<U> executeSql(String sql, HashMap<String, Object> paramsMap)
	{
		Query query = this.entityManager.createNativeQuery(sql);
		setParams(query, paramsMap);

		return query.getResultList();
	}

	/**
	 * 执行Sql语句
	 * @param sql 符合语法的sql语句
	 * @return 执行是否成功
	 */

	@Override
	public int executeSql(String sql)
	{
		Query query = this.entityManager.createNativeQuery(sql);
		return query.executeUpdate();
	}

	/**
	 * 执行Hql语句
	 * @param hql 符合语法的hql语句
	 * @param paramsMap 参数列表
	 * @return 返回产讯的对象列表
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<T> executeHql(String hql, HashMap<String, Object> paramsMap)
	{
		Query query = this.entityManager.createQuery(hql);
		setParams(query, paramsMap);
		
		return query.getResultList();
	}


	/**
	 * 执行Sql语句并将结果进行分页，返回分页后的列表
	 * @param sql 符合语法的Sql语句
	 * @param paramsMap 参数列表
	 * @param pager 分页器
	 * @param <U> 返回列表所包含的对象类型
	 * @return 返回所查询的对象分页后的页列表
	 */
	@SuppressWarnings("unchecked")
	@Override
	//U在这里表示泛型，是指BaseRepositoryImpl中未定义类；与T不同的是，T是限定为BaseEntity的子类，而U可以指代任何类
	public <U> PageResult<U> executeSql(String sql, HashMap<String, Object> paramsMap, Pager pager)
	{
		Query query = this.entityManager.createNativeQuery(sql);
		setParams(query, paramsMap);
		setPager(query, pager);
		List<U> data = query.getResultList();
		
		String countSql = this.genCountSql(sql);
		Query countQuery = this.entityManager.createNativeQuery(countSql);
		setParams(countQuery, paramsMap);
		int total =  Integer.parseInt(countQuery.getSingleResult().toString());

		PageResult<U> queryResult = new PageResult<U>(total, data);
		return queryResult;
	}


	/**
	 * 执行Hql语句并将结果进行分页，返回分页后的列表
	 * @param hql 符合语法的Hql语句
	 * @param paramsMap 参数列表
	 * @param pager 分页器
	 * @return 返回所查询的对象分页后的页列表
	 */
	@SuppressWarnings("unchecked")
	@Override
	public PageResult<T> executeHql(String hql, HashMap<String, Object> paramsMap, Pager pager) 
	{
		Query query = this.entityManager.createQuery(hql);
		setParams(query, paramsMap);
		setPager(query, pager);	
		List<T> data = query.getResultList();
		
		String countHql = this.genCountSql(hql);
		Query countQuery = this.entityManager.createQuery(countHql);
		setParams(countQuery, paramsMap);
		int total =  Integer.parseInt(countQuery.getSingleResult().toString());
		
		PageResult<T> queryResult = new PageResult<T>(total, data);
		return queryResult;
	}

	/**
	 * 执行Hql语句
	 * @param hql 符合语法的hql语句
	 * @param paramsMap 参数列表
	 * @param <U> 返回列表所包含的对象类型
	 * @return 返回所查询的对象列表
	 */
	@SuppressWarnings("unchecked")
	@Override
	public <U> List<U> executeHqlIndicatingType(String hql, HashMap<String, Object> paramsMap)
	{
		Query query = this.entityManager.createQuery(hql);
		
		if(paramsMap != null)
		{
			Iterator <Entry <String, Object>> iter = paramsMap.entrySet().iterator();
			while(iter.hasNext())
			{
				Entry <String, Object> entry = iter.next();
				
				String paramName = entry.getKey();
				Object paramValue = entry.getValue();
				
				query.setParameter(paramName, paramValue);
			}
		}
		
		return query.getResultList();
	}

	/**
	 * 给query设置参数
	 * @param query 目标query语句
	 * @param paramsMap 参数列表
	 */
	private void setParams(Query query, HashMap<String, Object> paramsMap)
	{
		if(paramsMap != null)
		{
			Iterator<Entry <String, Object>> iter = paramsMap.entrySet().iterator();
			while(iter.hasNext())
			{
				Entry <String, Object> entry = iter.next();
				
				String paramName = entry.getKey();
				Object paramValue = entry.getValue();
				
				query.setParameter(paramName, paramValue);
			}
		}
	}

	/**
	 * 将分类器信息写入query语句
	 * @param query query语句
	 * @param pager 分类器
	 */
	private void setPager(Query query, Pager pager)
	{
		if(pager != null)
		{
			int current = pager.current;
			int pageSize = pager.pageSize;
			
			int firstIndex = pageSize * (current - 1);
			
			query.setFirstResult(firstIndex);
			query.setMaxResults(pageSize);
		}
	}

	/**
	 * 获取sql查询结果的行数
	 * @param sql sql语句
	 * @return 行数
	 */
	private String genCountSql(String sql)
	{
		String regex = "\\s*SELECT\\s+[^\\s]+";
		
		if(sql.matches(regex))
		{	
			String countSql = sql.replaceFirst(regex, "SELECT COUNT(1)");
			return countSql;
		}
		else
		{
			String countSql = "SELECT COUNT(1) " + sql;
			return countSql;
		}
	}
}
