package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;

//测试方案
@Entity
@Table(name = "TBL_SYS_TESTCASES")
public class TestCase extends BaseEntity {

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private Project project;

    public TestRecord getTestRecord() {
        return testRecord;
    }

    public void setTestResult(TestRecord testRecord) {
        this.testRecord = testRecord;
    }

    @OneToOne(mappedBy = "testCase")
    @JoinColumn(name = "TESTCASE_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private TestRecord testRecord;

    public String getTestcase() {
        return testcase;
    }

    public void setTestcase(String testcase) {
        this.testcase = testcase;
    }

    @Column(name = "TESTCASE")
    private String testcase;

}
