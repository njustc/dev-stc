package com.sinosteel.repository;

import com.sinosteel.domain.TestWorkCheck;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author SongJunju
 */

@Repository
public interface TestWorkCheckRepository extends BaseRepository<TestWorkCheck> {
    TestWorkCheck findById(String id);
    @Query("SELECT body from TestRecord testRecord where 1 = 1")
    List<TestWorkCheck> findByAllTestWorkChecks();
}
