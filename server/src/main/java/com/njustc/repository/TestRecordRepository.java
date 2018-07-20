package com.njustc.repository;

import com.njustc.domain.TestRecord;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 测试记录仓库接口类
 * @author SongJunju
 */

@Repository
public interface TestRecordRepository extends BaseRepository<TestRecord> {

    /**
     * 通过ID查询测试记录
     * @param id 待查询的测试记录ID
     * @return 对应的测试记录
     */
    TestRecord findById(String id);

    /**
     * 返回所有的测试记录
     * @return 所有的测试记录列表
     */
    @Query("SELECT testRecord from TestRecord testRecord where 1 = 1")
    List<TestRecord> findByAllTestRecords();
}
