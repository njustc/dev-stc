package com.sinosteel.repository;


import com.sinosteel.domain.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends BaseRepository<Project>{

    Project findById(String id);
    @Query("SELECT project from Project project where 1 = 1")
    List<Project> findByName(String name);
}
