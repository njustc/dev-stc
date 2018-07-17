package com.njustc.domain;

import com.njustc.framework.helpers.hierarchy.domain.Hierarchy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 组织管理
 */
@Entity
@Table(name = "TBL_SYS_ORGANIZATION")
public class Organization extends Hierarchy<Organization>
{
    private static final long serialVersionUID = -2012132102143789528L;

    /**
     * 组织名称
     */
    @Column(name = "ORGANIZATION_NAME")
    private String organizationName;

    /**
     * 组织描述
     */
    @Column(name = "DESCRIPTION")
    private String description;

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
