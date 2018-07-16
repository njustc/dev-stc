package com.sinosteel.repository;

import com.sinosteel.domain.Consign;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 委托的仓库接口
 * @author SongJunju
 */
@Repository
public interface ConsignRepository extends BaseRepository<Consign>{
    /**
     * 根据ID查询
     * @param id 待查询委托的id
     * @return 对应的委托
     */
    Consign findById(String id);

    /**
     * 返回所有委托
     * @return 所有委托的列表
     */
    @Query("SELECT consign from Consign consign where 1 = 1")
    List<Consign> findByAllConsigns();
}
