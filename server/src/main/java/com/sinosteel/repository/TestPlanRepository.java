package com.sinosteel.repository;

import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestPlan;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 测试计划仓库接口类
 * @author SongJunju
 */
@Repository
public interface TestPlanRepository extends BaseRepository<TestPlan> {
    /**
     * 通过ID查找测试计划
     * @param id 待查询的测试计划ID
     * @return 对应的测试计划
     */
    TestPlan findById(String id);

    /**
     * 返回所有的测试计划
     * @return 所有的测试计划列表
     */
    @Query("SELECT testPlan from TestPlan testPlan where 1 = 1")
    List<TestPlan> findByAllTestPlans();
}
