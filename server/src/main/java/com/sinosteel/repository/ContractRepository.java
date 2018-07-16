package com.sinosteel.repository;

import com.sinosteel.domain.Contract;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 合同的仓库接口
 * @author SongJunju
 */
@Repository
public interface ContractRepository extends BaseRepository<Contract> {
    /**
     * 根据ID查询合同
     * @param id 待查询合同的ID
     * @return 对应的合同
     */
    Contract findById(String id);

    /**
     * 返回所有合同
     * @return 所有合同的列表
     */
    @Query("Select contract from Contract contract where 1 = 1")
    List<Contract> findByAllContracts();

}
