package com.sinosteel.framework.helpers.hierarchy.domain;

import java.util.List;

import com.sinosteel.repository.BaseRepository;
import org.springframework.data.repository.NoRepositoryBean;


@NoRepositoryBean
public interface HierarchyRepository<T extends Hierarchy<T>> extends BaseRepository<T>
{
	List<T> findByParentId(String parentId);
}
