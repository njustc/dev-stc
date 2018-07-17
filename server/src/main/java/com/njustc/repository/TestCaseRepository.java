package com.njustc.repository;

import com.njustc.domain.TestCase;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 测试用例仓库接口类
 * @author SongJunju
 */

@Repository
public interface TestCaseRepository extends BaseRepository<TestCase> {
    /**
     * 通过ID查询测试用例
     * @param id 待查询的测试用例ID
     * @return 对应的测试用例
     */
    TestCase findById(String id);

    /**
     * 返回所有测试用例
     * @return 所有测试用例列表
     */
    @Query("SELECT testCase from TestCase testCase where 1 = 1")
    List<TestCase> findByAllTestCases();
}
