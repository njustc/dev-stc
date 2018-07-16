package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;
import java.util.List;

/**
 * 该类表示用户所对应的角色
 */
@Entity
@Table(name = "TBL_SYS_ROLES")
public class Role extends BaseEntity {

	/**
	 * 角色名称
	 */
	@Column(name = "ROLE_NAME")
	private String roleName;

	/**
	 * 角色简易描述
	 */
	@Column(name = "ROLE_STRING")
	private String roleString;

	/**
	 * 角色详细描述
	 */
	@Column(name = "DESCRIPTION")
	private String description;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "TBL_SYS_ROLE_FUNCTIONS", joinColumns = {
			@JoinColumn(name = "ROLE_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	}, inverseJoinColumns = {
			@JoinColumn(name = "FUNCTION_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
	})

	/**
	 * 角色所对应的权限
	 */
	@JSONField(deserialize = false)
	private List<Function> functions;

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public List<Function> getFunctions() {
		return functions;
	}

	@JSONField(deserialize = false)
	public void setFunctions(List<Function> functions) {
		this.functions = functions;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRoleString() {
		return roleString;
	}

	public void setRoleString(String roleString) {
		this.roleString = roleString;
	}
}
