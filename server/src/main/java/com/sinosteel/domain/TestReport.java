package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;


//测试报告
@Entity
@Table(name = "TBL_SYS_TESTREPORTS")
public class TestReport extends BaseEntity {

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    @Column(name = "REPORT")
    private String report;

    @OneToOne(mappedBy = "testReport")
    @JoinColumn(name = "TESTREPORT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private Project project;

    public Project getProject(){
        return project;
    }
    public void setProject(Project project){
        this.project = project;
    }

}
