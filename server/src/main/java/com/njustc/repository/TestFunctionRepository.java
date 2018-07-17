package com.njustc.repository;

import com.njustc.domain.TestFunction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
