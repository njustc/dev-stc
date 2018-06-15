package com.sinosteel.repository;

import com.sinosteel.domain.TestBug;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author SongJunju
 */

@Repository
public interface TestBugRepository extends BaseRepository<TestBug> {
    TestBug findById(String id);
    @Query("SELECT testBug from TestBug testBug where 1 = 1")
    List<TestBug> findByAllTestBugs();
}
