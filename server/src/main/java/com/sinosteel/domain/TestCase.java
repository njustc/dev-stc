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
     * 详细字段未定 暂时先用来存储
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
     * 1.测试分类 - 测试用例，测试记录
     */
    @Column(name = "TESTTYPE")
    private String testType;

    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }

    /**
     * 2.序号 - 测试用例，测试记录
     */
    @Column(name = "TESTORDER")
    private String testOrder;

    public String getTestOrder() {
        return testOrder;
    }

    public void setTestOrder(String testOrder) {
        this.testOrder = testOrder;
    }

    /**
     * 3.测试用例设计说明 - 测试用例，测试记录
     */
    @Column(name = "DESIGNNOTE")
    private String designNote;

    public String getDesignNote() {
        return designNote;
    }

    public void setDesignNote(String designNote) {
        this.designNote = designNote;
    }

    /**
     * 4.与本测试用例有关的规约说明 - 测试用例，测试记录
     */
    @Column(name = "AGREEMENTNOTE")
    private String agreementNote;

    public String getAgreementNote() {
        return agreementNote;
    }

    public void setAgreementNote(String agreementNote) {
        this.agreementNote = agreementNote;
    }

    /**
     * 5.测试用例执行过程 - 测试用例，测试记录
     */
    @Column(name = "IMPLEMENTATION")
    private String implementation;

    public String getImplementation() {
        return implementation;
    }

    public void setImplementation(String implementation) {
        this.implementation = implementation;
    }

    /**
     * 6.预期结果 - 测试用例，测试记录
     */
    @Column(name = "PRERESULT")
    private String preResult;

    public String getPreResult() {
        return preResult;
    }

    public void setPreResult(String preResult) {
        this.preResult = preResult;
    }

    /**
     * 7.测试用例设计者
     */
    @Column(name = "DESIGNERNAME")
    private String designerName;

    public String getDesignerName() {
        return designerName;
    }

    public void setDesignerName(String designerName) {
        this.designerName = designerName;
    }

    /**
     * 8.测试用例设计时间 - 测试用例
     */
    @Column(name = "TIME1")
    private String time1;

    public String getTime1() {
        return time1;
    }

    public void setTime1(String time1) {
        this.time1 = time1;
    }

    /**
     * 9.测试依据 - 测试用例，测试记录
     */
    @Column(name = "BASIS")
    private String basis;

    public String getBasis() {
        return basis;
    }

    public void setBasis(String basis) {
        this.basis = basis;
    }

    /**
     * 10.前提条件 - 测试记录
     */
    @Column(name = "CONDITION")
    private String condition;

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    /**
     * 11.实际结果 - 测试记录
     */
    @Column(name = "ACRESULT")
    private String acResult;

    public String getAcResult() {
        return acResult;
    }

    public void setAcResult(String acResult) {
        this.acResult = acResult;
    }

    /**
     * 12.是否与预期结果一致 - 测试记录
     */
    @Column(name = "SAMERESULT")
    private String sameResult;

    public String getSameResult() {
        return sameResult;
    }

    public void setSameResult(String sameResult) {
        this.sameResult = sameResult;
    }

    /**
     * 13.用例执行者 - 测试记录,测试问题
     */
    @Column(name = "CASEEXECUTOR")
    private String caseExecutor;

    public String getCaseExecutor() {
        return caseExecutor;
    }

    public void setCaseExecutor(String caseExecutor) {
        this.caseExecutor = caseExecutor;
    }

    /**
     * 14.执行测试时间 - 测试记录
     */
    @Column(name = "TIME2")
    private String time2;

    public String getTime2() {
        return time2;
    }

    public void setTime2(String time2) {
        this.time2 = time2;
    }

    /**
     * 15.确认人 - 测试记录,测试问题
     */
    @Column(name = "COMFIRMER")
    private String comfirmer;

    public String getComfirmer() {
        return comfirmer;
    }

    public void setComfirmer(String comfirmer) {
        this.comfirmer = comfirmer;
    }

    /**
     * 16.问题（缺陷）简要描述 - 测试问题
     */
    @Column(name = "BUGDESC")
    private String bugDesc;

    public String getBugDesc() {
        return bugDesc;
    }

    public void setBugDesc(String bugDesc) {
        this.bugDesc = bugDesc;
    }

    /**
     * 17.对应需求条目 - 测试问题
     */
    @Column(name = "DEMAND")
    private String demand;

    public String getDemand() {
        return demand;
    }

    public void setDemand(String demand) {
        this.demand = demand;
    }

    /**
     * 18.发现缺陷的初始条件 - 测试问题
     */
    @Column(name = "BUGCONDITION")
    private String bugCondition;

    public String getBugCondition() {
        return bugCondition;
    }

    public void setBugCondition(String bugCondition) {
        this.bugCondition = bugCondition;
    }

    /**
     * 19.发现缺陷用例及具体操作路径 - 测试问题
     */
    @Column(name = "BUGPATH")
    private String bugPath;

    public String getBugPath() {
        return bugPath;
    }

    public void setBugPath(String bugPath) {
        this.bugPath = bugPath;
    }

    /**
     * 20.发现时间 - 测试问题
     */
    @Column(name = "TIME3")
    private String time3;

    public String getTime3() {
        return time3;
    }

    public void setTime3(String time3) {
        this.time3 = time3;
    }

    /**
     * 21.修改建议 - 测试问题
     */
    @Column(name = "REVSUG")
    private String revSug;

    public String getRevSug() {
        return revSug;
    }

    public void setRevSug(String revSug) {
        this.revSug = revSug;
    }

    /**
     * processInstanceID
     */
    @Column(name = "PROCESS_INSTANCE_ID")
    private String processInstanceID;

    public String getProcessInstanceID() {
        return processInstanceID;
    }

    public void setProcessInstanceID(String processInstanceID) {
        this.processInstanceID = processInstanceID;
    }

    /**
     * 连接Project类的外键
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
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
    @JoinColumn(name = "TESTCASE_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private TestRecord testRecord;

    public TestRecord getTestRecord() {
        return testRecord;
    }

    public void setTestResult(TestRecord testRecord) {
        this.testRecord = testRecord;
    }

}
