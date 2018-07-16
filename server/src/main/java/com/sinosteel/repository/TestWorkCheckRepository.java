package com.sinosteel.repository;

import com.sinosteel.domain.TestWorkCheck;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 测试工作检查表仓库接口类
 * @author SongJunju
 */

@Repository
public interface TestWorkCheckRepository extends BaseRepository<TestWorkCheck> {
    /**
     * 通过ID查找测试工作检查表
     * @param id 待查询的测试工作检查表ID
     * @return 对应的测试工作检查表
     */
    TestWorkCheck findById(String id);

    /**
     * 返回所有的测试工作检查表
     * @return 所有测试工作检查表列表
     */
    @Query("SELECT testWorkCheck from TestWorkCheck testWorkCheck where 1 = 1")
    List<TestWorkCheck> findByAllTestWorkChecks();
}
