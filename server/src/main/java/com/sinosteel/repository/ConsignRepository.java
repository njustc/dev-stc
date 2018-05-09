package com.sinosteel.repository;

import com.sinosteel.domain.Consign;

/**
 * @author SongJunju
 */

public interface ConsignRepository extends BaseRepository<Consign>{
    Consign findById(String id);
    Consign findByConsignid(String consignid);
}
