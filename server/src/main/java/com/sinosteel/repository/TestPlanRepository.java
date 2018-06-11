package com.sinosteel.repository;

import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestPlan;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author SongJunju
 */

@Repository
public interface TestPlanRepository extends BaseRepository<TestPlan> {

    TestPlan findById(String id);
    @Query("SELECT testPlan from TestPlan testPlan where 1 = 1")
    List<TestPlan> findByAllTestPlans();
}
