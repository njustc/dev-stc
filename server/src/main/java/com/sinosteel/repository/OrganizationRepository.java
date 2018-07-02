package com.sinosteel.repository;

import com.sinosteel.domain.Organization;
import com.sinosteel.framework.helpers.hierarchy.domain.HierarchyRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OrganizationRepository extends HierarchyRepository<Organization>
{

}
