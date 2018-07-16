package com.sinosteel.repository;

import com.sinosteel.domain.SatisfactionSurvey;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 满意度调查表的仓库接口类
 */
@Repository
public interface SatisfactionSurveyRepository extends BaseRepository<SatisfactionSurvey> {
    /**
     * 根据ID查询满意度调查表
     * @param id 待查询满意度调查表的ID
     * @return 对应的满意度调查表
     */
    SatisfactionSurvey findById(String id);

    /**
     * 返回所有满意度调查表
     * @return 所有满意度调查表列表
     */
    @Query("SELECT satisfactionSurvey from SatisfactionSurvey satisfactionSurvey where 1=1")
    List<SatisfactionSurvey> findAllSatisfactionSurvey();
}
