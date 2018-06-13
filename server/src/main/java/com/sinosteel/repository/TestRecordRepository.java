package com.sinosteel.repository;

import com.sinosteel.domain.TestRecord;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author SongJunju
 */

@Repository
public interface TestRecordRepository extends BaseRepository<TestRecord> {
    TestRecord findById(String id);
    @Query("SELECT testRecord from TestRecord testRecord where 1 = 1")
    List<TestRecord> findByAllTestRecords();
}
