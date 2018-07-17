package com.njustc.repository;

import com.njustc.domain.BaseEntity;
import com.njustc.framework.helpers.pagination.PageResult;
import com.njustc.framework.helpers.pagination.Pager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.List;

/**
 * 该类是所有仓库接口类的基类
 * @param <T> T是BaseEntity的子类
 */
@Component(value = "baseRepository")
@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity> extends JpaRepository<T, String>, JpaSpecificationExecutor<T>, PagingAndSortingRepository<T, String>
{
	/**
	 * 是否互相支持
	 * @param modelType 模式类型
	 * @return 是否支持
	 */
	boolean support(String modelType);

	/**
	 * 获取实体类管理器
	 * @return 获取实体类管理器对象
	 */
	EntityManager getEntityManager();

	/**
	 * 执行Sql语句
	 * @param sql 符合语法的sql语句
	 * @param paramsMap 参数表
	 * @param <U> 返回列表所包含的对象类型
	 * @return 返回所查询的对象列表
	 */
	<U> List<U> executeSql(String sql, HashMap<String, Object> paramsMap);

	/**
	 * 执行Sql语句
	 * @param sql 符合语法的sql语句
	 * @return 执行是否成功
	 */
	int executeSql(String sql);

	/**
	 * 执行Hql语句
	 * @param hql 符合语法的hql语句
	 * @param paramsMap 参数列表
	 * @return 返回产讯的对象列表
	 */
	List<T> executeHql(String hql, HashMap<String, Object> paramsMap);

	/**
	 * 执行Hql语句
	 * @param hql 符合语法的hql语句
	 * @param paramsMap 参数列表
	 * @param <U> 返回列表所包含的对象类型
	 * @return 返回所查询的对象列表
	 */
	<U> List<U> executeHqlIndicatingType(String hql, HashMap<String, Object> paramsMap);

	/**
	 * 执行Sql语句并将结果进行分页，返回分页后的列表
	 * @param sql 符合语法的Sql语句
	 * @param paramsMap 参数列表
	 * @param pager 分页器
	 * @param <U> 返回列表所包含的对象类型
	 * @return 返回所查询的对象分页后的页列表
	 */
	<U> PageResult<U> executeSql(String sql, HashMap<String, Object> paramsMap, Pager pager);

	/**
	 * 执行Hql语句并将结果进行分页，返回分页后的列表
	 * @param hql 符合语法的Hql语句
	 * @param paramsMap 参数列表
	 * @param pager 分页器
	 * @return 返回所查询的对象分页后的页列表
	 */
	PageResult<T> executeHql(String hql, HashMap<String, Object> paramsMap, Pager pager);
}