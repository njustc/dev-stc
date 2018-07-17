package com.njustc.framework.helpers.hierarchy.domain;

import com.njustc.domain.BaseEntity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import java.util.List;


@MappedSuperclass
public class Hierarchy<T extends Hierarchy<T>> extends BaseEntity
{
	private static final long serialVersionUID = 4998039521607719893L;

	@Column(name = "PARENT_ID")
	private String parentId;
	
	@Transient
	private List<T> children;
	
	@Transient
	private Hierarchy<T> parent;

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public List<T> getChildren() {
		return children;
	}

	public void setChildren(List<T> children) {
		this.children = children;
	}

	public Hierarchy<T> getParent() {
		return parent;
	}

	public void setParent(Hierarchy<T> parent) {
		this.parent = parent;
	}
}
