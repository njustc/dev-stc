package com.sinosteel.repository;

import com.sinosteel.domain.TestReport;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 测试报告仓库接口类
 * @author Lumpy
 */

@Repository
public interface TestReportRepository extends BaseRepository<TestReport> {
    /**
     * 通过ID查询测试报告
     * @param id 待查询的测试报告
     * @return 对应的测试报告
     */
    TestReport findById(String id);

    /**
     * 返回所有的测试报告
     * @return 所有的测试报告列表
     */
    @Query("SELECT testReport from TestReport testReport where 1=1")
    List<TestReport> findByAllTestReports();
}
