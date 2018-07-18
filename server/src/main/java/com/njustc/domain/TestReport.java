package com.njustc.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;


/**
 * @author SongJunju
 * @author FW
 */

/**
 * 测试报告
 */
@Entity
@Table(name = "TBL_SYS_TESTREPORTS")
public class TestReport extends BaseEntity {

    /**
     * 测试报告文档整体
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
     * 流程ID
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
     * 对应项目
     */
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

    /**
     *版本号
     */
    @Column (name = "VERSION")
    private String version;
    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    /**
     * 委托单位
     */
    @Column (name = "CLIENTCOMPANY")
    private String clientCompany;
    public String getClientCompany() {
        return clientCompany;
    }

    public void setClientCompany(String clientCompany) {
        this.clientCompany = clientCompany;
    }

    /**
     * 测试类别
     */
    @Column (name = "TESTTYPE")
    private String testType;
    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }

    /**
     * 报告日期
     */
    @Column (name = "REPORTDATA")
    private String reportData;
    public String getReportData() {
        return reportData;
    }

    public void setReportData(String reportData) {
        this.reportData = reportData;
    }


    /**
     * 项目编号
     */
    @Column (name = "CODEID")
    private String codeId;
    public String getCodeId() {
        return codeId;
    }
    public void setCodeId(String codeId) {
        this.codeId = codeId;
    }

    /**
     * 样品名称
     */
    @Column (name = "SAMPLENAME")
    private String sampleName;
    public String getSampleName() {
        return sampleName;
    }

    public void setSampleName(String sampleName) {
        this.sampleName = sampleName;
    }


    /**
     * 来样日期
     */
    @Column (name = "SAMPLEDATA")
    private String sampleData;
    public String getSampleData() {
        return sampleData;
    }

    public void setSampleData(String sampleData) {
        this.sampleData = sampleData;
    }

    /**
     * 测试日期
     */
    @Column (name = "TESTDATA")
    private String testData;

    public String getTestData() {
        return testData;
    }

    public void setTestData(String testData) {
        this.testData = testData;
    }

    /**
     * 测试依据
     */
    @Column (name = "TESTBASIS")
    private String testBasis;
    public String getTestBasis() {
        return testBasis;
    }

    public void setTestBasis(String testBasis) {
        this.testBasis = testBasis;
    }
    /**
     * 样品清单--软件样本
     */
    @Column (name = "TESTMENUSAMPLE")
    private String testMenuSample;
    public String getTestMenuSample() {
        return testMenuSample;
    }

    public void setTestMenuSample(String testMenuSample) {
        this.testMenuSample = testMenuSample;
    }

    /**
     * 样品清单--软件文档
     */
    @Column (name = "TESTMENUDOC")
    private String testMenuDoc;

    public String getTestMenuDoc() {
        return testMenuDoc;
    }

    public void setTestMenuDoc(String testMenuDoc) {
        this.testMenuDoc = testMenuDoc;
    }

    /**
     * 测试结论
     */
    @Column (name ="TESTCONCLUSION")
    private String testConclusion;

    public String getTestConclusion() {
        return testConclusion;
    }
    public void setTestConclusion(String testConclusion) {
        this.testConclusion = testConclusion;
    }

    /**
     * 主测人
     */
    @Column (name = "TESTER")
    private String tester;
    public String getTester() {
        return tester;
    }

    public void setTester(String tester) {
        this.tester = tester;
    }

    /**
     * 主测人日期
     */
    @Column (name="TESTERTIME")
    private String testerTime;

    public String getTesterTime() {
        return testerTime;
    }

    public void setTesterTime(String testerTime) {
        this.testerTime = testerTime;
    }
    /**
     * 审核人
     */
    @Column (name = "AUDITOR")
    private String auditor;
    public String getAuditor() {
        return auditor;
    }

    public void setAuditor(String auditor) {
        this.auditor = auditor;
    }

    /**
     * 审核人日期
     */
    @Column (name = "AUDITORDATA")
    private String auditorData;
    public String getAuditorData() {
        return auditorData;
    }

    public void setAuditorData(String auditorData) {
        this.auditorData = auditorData;
    }

    /**
     * 批准人
     */
    @Column (name="APPROVER")
    private String approver;
    public String getApprover() {
        return approver;
    }

    public void setApprover(String approver) {
        this.approver = approver;
    }

    /**
     * 批准人日期
     */
    @Column (name ="APPROVERDATA")
    private String approverData;
    public String getApproverData() {
        return approverData;
    }
    public void setApproverData(String approverData) {
        this.approverData = approverData;
    }

    /**
     * 委托单位电话
     */
    @Column (name = "CLIENTTEL")
    private String clientTel;
    public String getClientTel() {
        return clientTel;
    }
    public void setClientTel(String clientTel) {
        this.clientTel = clientTel;
    }

    /**
     * 委托单位传真
     */
    @Column (name = "CLIENTFAX")
    private String clientFax;
    public String getClientFax() {
        return clientFax;
    }

    public void setClientFax(String clientFax) {
        this.clientFax = clientFax;
    }

    /**
     * 委托单位地址
     */
    @Column (name = "CLIENTADDR")
    private String clientAddr;
    public String getClientAddr() {
        return clientAddr;
    }

    public void setClientAddr(String clientAddr) {
        this.clientAddr = clientAddr;
    }

    /**
     *委托单位邮编
     */
    @Column (name = "CLIENTPOSTCODE")
    private String clientPostCode;

    public String getClientPostCode() {
        return clientPostCode;
    }

    public void setClientPostCode(String clientPostCode) {
        this.clientPostCode = clientPostCode;
    }

    /**
     * 委托单位联系人
     */
    @Column (name = "CLIENTCONTACT")
    private String clientContact;
    public String getClientContact() {
        return clientContact;
    }

    public void setClientContact(String clientContact) {
        this.clientContact = clientContact;
    }

    /**
    委托单位Email|clientEmail|未定义
    */

    @Column (name = "CLIENTEMAIL")
    private String clientEmail;

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }
}
