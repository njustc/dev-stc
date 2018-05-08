package com.sinosteel.repository;

import com.sinosteel.domain.Organization;
import org.springframework.stereotype.Repository;

import com.sinosteel.framework.helpers.hierarchy.domain.HierarchyRepository;


@Repository
public interface OrganizationRepository extends HierarchyRepository<Organization>
{

}
