package com.sinosteel.repository;

import com.sinosteel.domain.TestFunction;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/**
 * @author SongJunju
 */

@Repository
public interface TestFunctionRepository extends BaseRepository<TestFunction> {
    TestFunction findById(String id);
    @Query("SELECT testFunction from TestFunction testFunction where 1 = 1")
    List<TestFunction> findByAllTestFunctions();
}
