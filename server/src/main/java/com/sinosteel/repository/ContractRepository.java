package com.sinosteel.repository;

import com.sinosteel.domain.Contract;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author SongJunju
 */
@Repository
public interface ContractRepository extends BaseRepository<Contract> {

    Contract findById(String id);
    @Query("Select contract from Contract contract where 1 = 1")
    List<Contract> findByAllContracts();

    @Query("delete from Contract contract where id = :id")
    void deleteById(@Param("id") String id);
}
