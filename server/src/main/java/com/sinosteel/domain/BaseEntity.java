package com.sinosteel.domain;

import com.alibaba.fastjson.JSON;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

//标注为@MappedSuperclass的类将不是一个完整的实体类，他将不会映射到数据库表，但是他的属性都将映射到其子类的数据库字段中。
//标注为@MappedSuperclass的类不能再标注@Entity或@Table注解，也无需实现序列化接口。
@MappedSuperclass
public class BaseEntity implements Serializable
{
	private static final long serialVersionUID = -7334806723394863536L;

	@Id
	//@GeneratedValue(generator = "uuid")
	//@GenericGenerator(name = "uuid", strategy = "uuid")
	@Column(name = "ID")
	private String id;
	
	@Column(name = "CODE")
	private String code;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "CREATED_TIME")
	private String createdTime;
	
	@Column(name = "CREATED_USER_ID")
	private String createdUserId;

	@Column(name = "CREATED_USER_NAME")
    private String createdUserName;
	
	@Column(name = "ALTERED_TIME")
	private String alteredTime;
	
	@Column(name = "ALTERED_USER_ID")
	private String alteredUserId;

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
