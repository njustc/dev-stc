package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
/**
 * @author SongJunju
 */

/**
 * 测试记录检查表
 */
@Entity
@Table(name = "TBL_SYS_TESTREPORTCHECKS")
public class TestReportCheck extends BaseEntity{

    @OneToOne(mappedBy = "testReportCheck")
    @JSONField(serialize = false)
    private Project project;

    public Project getProject(){
        return project;
    }
    public void setProject(Project project){
        this.project = project;
    }
}
