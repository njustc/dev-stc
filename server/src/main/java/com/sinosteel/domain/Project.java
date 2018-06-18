package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;
import java.util.List;

/**
 * @author SongJunju
 */
@Entity
@Table(name = "TBL_SYS_PROJECTS")
public class Project extends BaseEntity {


    /**
     * 该Project对应的用户
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID",foreignKey = @ForeignKey(name = "none", value =ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private User user;

    public User getUser(){
        return user;
    }
    public void setUser(User user){
        this.user = user;
    }

    /**
     * 委托
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONSIGN_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private Consign consign;

    public Consign getConsign(){
        return consign;
    }
    public void setConsign(Consign consign){
        this.consign = consign;
    }

    /**
     * 合同
     */
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "CONTRACT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private Contract contract;

    public Contract getContract(){
        return contract;
    }
    public void setContract(Contract contract){
        this.contract = contract;
    }

    /**
     * 测试报告
     */
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "TESTREPORT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private TestReport testReport;

    public TestReport getTestReport(){
        return testReport;
    }

    public void setTestReport(TestReport testReport){
        this.testReport = testReport;
    }


    /**
     * 测试记录表
     */
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private List<TestRecord> testRecords;

    public List<TestRecord> getTestRecords() {
        return testRecords;
    }

    public void setTestRecords(List<TestRecord> testRecords) {
        this.testRecords = testRecords;
    }

    /**
     * 测试用例表
     */
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name ="PROJECT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private List<TestCase> testCases;

    public List<TestCase> getTestCase() {
        return testCases;
    }

    public void setTestCase(List<TestCase> testCases) {
        this.testCases = testCases;
    }

    /**
     * 测试问题(bug)表
     */
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name ="PROJECT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private List<TestBug> testBugs;

    public List<TestBug> getTestBugs() {
        return testBugs;
    }

    public void setTestBugs(List<TestBug> testBugs) {
        this.testBugs = testBugs;
    }

    /**
     * 软件功能列表
     */
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name ="PROJECT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private List<TestFunction> testFunctions;

    public List<TestFunction> getTestFunctions() {
        return testFunctions;
    }

    public void setTestFunctions(List<TestFunction> testFunctions) {
        this.testFunctions = testFunctions;
    }

    /**
     * 测试报告检查表
     */
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "TESTREPORTCHECK_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private TestReportCheck testReportCheck;

    public TestReportCheck getTestReportCheck() {
        return testReportCheck;
    }

    public void setTestReportCheck(TestReportCheck testReportCheck) {
        this.testReportCheck = testReportCheck;
    }



    /**
     * 测试工作检查表
     */
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "TESTWORKCHECK_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private TestWorkCheck testWorkCheck;

    public TestWorkCheck getTestWorkCheck() {
        return testWorkCheck;
    }

    public void setTestWorkCheck(TestWorkCheck testWorkCheck) {
        this.testWorkCheck = testWorkCheck;
    }



    /**
     * 测试方案
     */
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "TESTPLAN_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private TestPlan testPlan;

    public TestPlan getTestPlan() {
        return testPlan;
    }

    public void setTestPlan(TestPlan testPlan) {
        this.testPlan = testPlan;
    }
}
