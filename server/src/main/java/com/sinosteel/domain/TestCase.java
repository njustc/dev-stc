package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;

/**
 * @author SongJunju
 */


/**
 * 测试用例
 */
@Entity
@Table(name = "TBL_SYS_TESTCASES")
public class TestCase extends BaseEntity {


    /**
     * 详细字段未定
     * 暂时先用来存储
     */
    @Column(name = "BODY")
    private String body;

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }


    /**
     * 连接Project类的外键
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private Project project;

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }


    /**
     * 连接TestRecord的外键
     */
    @OneToOne(mappedBy = "testCase")
    @JoinColumn(name = "TESTCASE_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private TestRecord testRecord;

    public TestRecord getTestRecord() {
        return testRecord;
    }

    public void setTestResult(TestRecord testRecord) {
        this.testRecord = testRecord;
    }



}
