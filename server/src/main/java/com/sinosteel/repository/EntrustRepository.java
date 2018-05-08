package com.sinosteel.repository;

import com.sinosteel.domain.Entrust;
import org.springframework.stereotype.Repository;

public interface EntrustRepository extends BaseRepository<Entrust>{
    Entrust findById(String id);
}
