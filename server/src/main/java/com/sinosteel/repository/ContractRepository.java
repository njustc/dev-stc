package com.sinosteel.repository;

import com.sinosteel.domain.Contract;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Songjunju
 */

@Repository
public interface ContractRepository extends BaseRepository<Contract> {

    Contract findById(String id);
    @Query("Select contract from Contract contract where 1 = 1")
    List<Contract> findByAllContracts();
}
