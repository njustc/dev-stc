package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.databind.ser.Serializers;
import org.junit.Test;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TBL_SYS_TESTPLANS")
public class TestPlan extends BaseEntity {

    @OneToOne(mappedBy = "testPlan")
    @JSONField(serialize = false)
    private Project project;

    public Project getProject(){
        return project;
    }
    public void setProject(Project project){
        this.project = project;
    }
}
