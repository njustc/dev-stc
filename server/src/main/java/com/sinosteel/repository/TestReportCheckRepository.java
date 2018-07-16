package com.sinosteel.repository;

import com.sinosteel.domain.TestReportCheck;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * 测试报告检查表仓库接口类
 * @author SongJunju
 */

@Repository
public interface TestReportCheckRepository extends BaseRepository<TestReportCheck> {
    /**
     * 通过ID查询对应的测试报告检查表
     * @param id 待查询的测试报告检查表ID
     * @return 对应的测试报告检查表
     */
    TestReportCheck findById(String id);

    /**
     * 返回所有测试报告检查表
     * @return 所有测试报告检查表列表
     */
    @Query("SELECT testReportCheck from TestReportCheck testReportCheck where 1 = 1")
    List<TestReportCheck> findByAllTestReportChecks();

}
