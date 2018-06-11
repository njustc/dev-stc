package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;

/**
 * @author SongJunju
 */

/**
 * 测试记录
 */
@Entity
@Table(name = "TBL_SYS_TESTRECORDS")
public class TestRecord extends BaseEntity {

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
     * 连接Project的外键
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
     * 连接TestCase的外键
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TESTCASE_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private TestCase testCase;
    public TestCase getTestCase() {
        return testCase;
    }

    public void setTestCase(TestCase testCase) {
        this.testCase = testCase;
    }
}
