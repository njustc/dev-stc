package com.njustc.repository;

import com.njustc.domain.TestBug;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 测试问题仓库接口类
 * @author SongJunju
 */

@Repository
public interface TestBugRepository extends BaseRepository<TestBug> {

    /**
     * 根据ID查找测试问题
     * @param id 待查询的测试问题ID
     * @return 对应的测试问题
     */
    TestBug findById(String id);

    /**
     * 返回所有测试问题
     * @return 所有测试问题列表
     */
    @Query("SELECT testBug from TestBug testBug where 1 = 1")
    List<TestBug> findByAllTestBugs();
}
