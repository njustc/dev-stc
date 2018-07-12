package com.sinosteel.repository;

import com.sinosteel.domain.SatisfactionSurvey;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SatisfactionSurveyRepository extends BaseRepository<SatisfactionSurvey> {
    SatisfactionSurvey findById(String id);
    @Query("SELECT satisfactionSurvey from SatisfactionSurvey satisfactionSurvey where 1=1")
    List<SatisfactionSurvey> findAllSatisfactionSurvey();
}
