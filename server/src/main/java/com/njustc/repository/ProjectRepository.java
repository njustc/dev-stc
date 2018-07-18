package com.njustc.repository;


import com.njustc.domain.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 项目管理接口类
 */
@Repository
public interface ProjectRepository extends BaseRepository<Project>{

    /**
     * 根据ID查询项目
     * @param id 待查询项目的ID
     * @return 对应的项目
     */
    Project findById(String id);

    /**
     * 返回所有项目
     * @return 所有项目的列表
     */
    @Query("SELECT project from Project project where 1 = 1")
    List<Project> findByAllProjects();

}
