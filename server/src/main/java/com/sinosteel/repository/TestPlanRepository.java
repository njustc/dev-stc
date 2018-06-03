package com.sinosteel.repository;

import com.sinosteel.domain.TestPlan;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
@Repository
public interface TestPlanRepository extends BaseRepository<TestPlan> {
    TestPlan findById(String id);
    @Query("SELECT testplan from TestPlan testplan where 1 = 1")
    List<TestPlan> findByAllTestPlans();
}
