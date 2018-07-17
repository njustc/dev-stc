package com.njustc.domain;

import com.alibaba.fastjson.JSON;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
/**
 * 标注为@MappedSuperclass的类将不是一个完整的实体类，他将不会映射到数据库表，但是他的属性都将映射到其子类的数据库字段中。
 * 标注为@MappedSuperclass的类不能再标注@Entity或@Table注解，也无需实现序列化接口。
 */
@MappedSuperclass
public class BaseEntity implements Serializable
{
	private static final long serialVersionUID = -7334806723394863536L;

	/**
	 * 主键ID
	 */
	@Id
	//@GeneratedValue(generator = "uuid")
	//@GenericGenerator(name = "uuid", strategy = "uuid")
	@Column(name = "ID")
	private String id;

	/**
	 * 编码
	 */
	@Column(name = "CODE")
	private String code;

	/**
	 * 名称
	 */
	@Column(name = "NAME")
	private String name;

	/**
	 * 创建时间
	 */
	@Column(name = "CREATED_TIME")
	private String createdTime;

	/**
	 * 创建用户ID
	 */
	@Column(name = "CREATED_USER_ID")
	private String createdUserId;

	/**
	 * 创建用户账号
	 */
	@Column(name = "CREATED_USER_NAME")
    private String createdUserName;

	/**
	 * 修改更改时间
	 */
	@Column(name = "ALTERED_TIME")
	private String alteredTime;

	/**
	 * 修改用户ID
	 */
	@Column(name = "ALTERED_USER_ID")
	private String alteredUserId;

	/**
	 * 修改用户账号
	 */
	@Column(name = "ALTERED_USER_NAME")
    private String alteredUserName;


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(String createdTime) {
		this.createdTime = createdTime;
	}

	public String getCreatedUserId() {
		return createdUserId;
	}

	public void setCreatedUserId(String createdUserId) {
		this.createdUserId = createdUserId;
	}

	public String getAlteredTime() {
		return alteredTime;
	}

	public void setAlteredTime(String alteredTime) {
		this.alteredTime = alteredTime;
	}

	public String getAlteredUserId() {
		return alteredUserId;
	}

	public void setAlteredUserId(String alteredUserId) {
		this.alteredUserId = alteredUserId;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 判断两个对象是否互相支持
	 * @param obj 用于比较的对象
	 * @return 相同会true，不相同返回false
	 */
	@Override
	public boolean equals(Object obj)
	{
		if(this == obj)
		{
			return true;
		}
		
		if(obj == null || (obj.getClass() != this.getClass()))
		{
			return false;
		}
		
		try
		{
			return ((BaseEntity)obj).getId().equals(this.getId());
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
			return false;
		}
	}
	
	@Override
	public int hashCode()
	{
		return this.getId().hashCode();
	}
	
	@Override
	public String toString()
	{
		return JSON.toJSONString(this);
	}

    public String getCreatedUserName() {
        return createdUserName;
    }

    public void setCreatedUserName(String createdUserName) {
        this.createdUserName = createdUserName;
    }

    public String getAlteredUserName() {
        return alteredUserName;
    }

    public void setAlteredUserName(String alteredUserName) {
        this.alteredUserName = alteredUserName;
    }
}
