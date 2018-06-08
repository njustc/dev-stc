package com.sinosteel.repository;

import com.sinosteel.domain.TestResult;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
@Repository
public interface TestResultRepository extends BaseRepository<TestResult> {
    TestResult findById(String id);
    @Query("SELECT testResult from TestResult testResult where 1 = 1")
    List<TestResult> findByAllTestResults();
}
