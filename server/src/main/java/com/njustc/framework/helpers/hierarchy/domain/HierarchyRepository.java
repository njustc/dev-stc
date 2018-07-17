package com.njustc.framework.helpers.hierarchy.domain;

import com.njustc.repository.BaseRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;


@NoRepositoryBean
public interface HierarchyRepository<T extends Hierarchy<T>> extends BaseRepository<T>
{
	List<T> findByParentId(String parentId);
}
