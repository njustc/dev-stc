package com.sinosteel.repository;

import com.sinosteel.domain.Consign;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author SongJunju
 */

public interface ConsignRepository extends BaseRepository<Consign>{
    Consign findById(String id);
    @Query("SELECT consign from Consign consign where 1 = 1")
    List<Consign> findByAllConsigns();
}
