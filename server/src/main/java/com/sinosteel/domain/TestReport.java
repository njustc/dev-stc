package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;


//测试报告
@Entity
@Table(name = "TBL_SYS_TESTREPORT")
public class TestReport extends BaseEntity {

    @OneToOne(mappedBy = "testReport")
    @JSONField(serialize = false)
    private Project project;

    public Project getProject(){
        return project;
    }
    public void setProject(Project project){
        this.project = project;
    }

}
