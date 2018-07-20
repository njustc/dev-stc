package com.njustc.repository;

import com.njustc.domain.Organization;
import com.njustc.framework.helpers.hierarchy.domain.HierarchyRepository;
import org.springframework.stereotype.Repository;

/**
 * 组织仓库接口类
 */
@Repository
public interface OrganizationRepository extends HierarchyRepository<Organization>
{

}
