package com.sinosteel.repository;

import com.fasterxml.jackson.databind.ser.Serializers;
import com.sinosteel.domain.TestReport;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Lumpy
 */

@Repository
public interface TestReportRepository extends BaseRepository<TestReport> {
    TestReport findById(String id);
    @Query("SELECT body from TestReport testReport where 1=1")
    List<TestReport> findByAllTestReports();
}
