package com.sinosteel.repository;

import com.sinosteel.domain.TestReportCheck;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * @author SongJunju
 */

@Repository
public interface TestReportCheckRepository extends BaseRepository<TestReportCheck> {
    TestReportCheck findById(String id);
    @Query("SELECT testReportCheck from TestReportCheck testReportCheck where 1 = 1")
    List<TestReportCheck> findByAllTestReportChecks();
}
