package com.sinosteel.repository;

import com.sinosteel.domain.Menu;
import com.sinosteel.framework.helpers.hierarchy.domain.HierarchyRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends HierarchyRepository<Menu>
{

}
