package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;

import java.util.List;

/**
 * @author SongJunju
 */

@Entity
@Table(name = "TBL_SYS_CONSIGNS")
public class Consign extends BaseEntity{




    @Column(name = "CONSIGNATION")
    private String consignation;

    @Column(name = "PROCESS_INSTANCE_ID")
    private String processInstanceID;




    @Column(name = "TESTTYPE")
    private String testType;
    /**
     * @param testType
     */
    public void setTestType(String testType) {
        this.testType = testType;
    }
    public String getTestType() {
        return testType;
    }

    /**
     * 测试类型 多选
     */

    @Column(name = "SOFTWARENAME")
    private String  sotfwareName;

    @Column(name = "COMPANY_EN")
    private String company_En;
    /**
     * @return
     */
    public String getSotfwareName() {
        return sotfwareName;
    }
    public void setSotfwareName(String sotfwareName) {
        this.sotfwareName = sotfwareName;
    }
    /**
     * @param company_En
     */
    public void setCompany_En(String company_En) {
        this.company_En = company_En;
    }
    public String getCompany_En() {
        return company_En;
    }

    @Column(name = "COMPANY_CH")
    private String company_Ch;
    /**
     * @param company_Ch
     */
    public void setCompany_Ch(String company_Ch) {
        this.company_Ch = company_Ch;
    }
    public String getCompany_Ch() {
        return company_Ch;
    }

    /**
     * 委托方案的中英文
     */

    @Column(name = "DEVELOPER")
    private String developer;

    @Column(name = "UNITPROPERTY")
    private String unitProperty;
    /**
     * @return
     */
    public String getDeveloper() {
        return developer;
    }
    public void setDeveloper(String developer) {
        this.developer = developer;
    }
    /**
     * @param unitProperty
     */
    public void setUnitProperty(String unitProperty) {
        this.unitProperty = unitProperty;
    }
    public String getUnitProperty() {
        return unitProperty;
    }


    /**
     * 单位性质 单选
     */

    @Column(name = "USER_DESCRIPTION")
    private String  user_Description;
    /**
     * @return
     */
    public String getUser_Description() {
        return user_Description;
    }
    public void setUser_Description(String user_Description) {
        this.user_Description = user_Description;
    }

    /**
     * 软件用户对象描述
     */

    @Column(name = "FUNC_DESCRIPTION")
    private String  func_Description;
    /**
     * @param func_Description
     */
    public void setFunc_Description(String func_Description) {
        this.func_Description = func_Description;
    }
    public String getFunc_Description() {
        return func_Description;
    }


    /**
     *主要功能及用途简介
     */

    @Column(name = "TEST_BASIS")
    private String test_Basis;
    /**
     * @param test_Basis
     */
    public void setTest_Basis(String test_Basis) {
        this.test_Basis = test_Basis;
    }
    public String getTest_Basis() {
        return test_Basis;
    }

    /**
     * 测试依据 多选
     */

    @Column(name = "TEST_SPECIFICATION")
    private String test_Specification ;
    /**
     * @param test_Specification
     */
    public void setTest_Specification(String test_Specification) {
        this.test_Specification = test_Specification;
    }
    public String getTest_Specification() {
        return test_Specification;
    }


    /**
     * 需要测试的技术指标 多选
     */

    @Column(name = "FUNC_NUM")
    private String func_num;
    public void setFunc_num(String func_num) {
        this.func_num = func_num;
    }
    public String getFunc_num() {
        return func_num;
    }

    /**
     * 功能点数
     */
    @Column(name = "FP_NUM")
    private String fp_num;
    public void setFp_num(String fp_num) {
        this.fp_num = fp_num;
    }
    public String getFp_num() {
        return fp_num;
    }

    @Column(name = "CODELINE")
    private String codeLine;
    public String getCodeLine() {
        return codeLine;
    }
    public void setCodeLine(String codeLine) {
        this.codeLine = codeLine;
    }


    /**
     * 以上属于软件功能
     */

    @Column(name = "SOFT_SYS")
    private String softSys;
    public String getSoftSys() {
        return softSys;
    }
    public void setSoftSys(String softSys) {
        this.softSys = softSys;
    }

    @Column(name = "SOFT_SUPPORT")
    private String softSupport;
    public void setSoftSupport(String softSupport) {
        this.softSupport = softSupport;
    }
    public String getSoftSupport() {
        return softSupport;
    }


    @Column(name = "SOFT_APP")
    private String softApp;
    public void setSoftApp(String softApp) {
        this.softApp = softApp;
    }
    public String getSoftApp() {
        return softApp;
    }


    @Column(name = "SOFT_OTHER")
    private String softOther;
    public void setSoftOther(String softOther) {
        this.softOther = softOther;
    }
    public String getSoftOther() {
        return softOther;
    }

    /**
     * 以上属于软件类型选项 单选
     */

    @Column(name = "CLIENT_SYS")
    private String client_Sys;
    public void setClient_Sys(String client_Sys) {
        this.client_Sys = client_Sys;
    }
    public String getClient_Sys() {
        return client_Sys;
    }


    @Column(name = "CLIENT_INSTORAGE")
    private String client_inStorage;
    public void setClient_inStorage(String client_inStorage) {
        this.client_inStorage = client_inStorage;
    }
    public String getClient_inStorage() {
        return client_inStorage;
    }


    @Column(name = "CLIENT_EXSTORAGE")
    private String client_exStorage;
    public void setClient_exStorage(String client_exStorage) {
        this.client_exStorage = client_exStorage;
    }
    public String getClient_exStorage() {
        return client_exStorage;
    }

    @Column(name = "CLIENT_OTHER")
    private String client_other;
    public void setClient_other(String client_other) {
        this.client_other = client_other;
    }
    public String getClient_other() {
        return client_other;
    }


    /**
     * 以上属于运行环境 客户端
     */

    @Column(name = "SERVER_FRAME")
    private String server_Frame;
    public void setServer_Frame(String server_Frame) {
        this.server_Frame = server_Frame;
    }
    public String getServer_Frame() {
        return server_Frame;
    }

    @Column(name = "SERVER_INSTORAGE")
    private String server_inStorage;
    public void setServer_inStorage(String server_inStorage) {
        this.server_inStorage = server_inStorage;
    }
    public String getServer_inStorage() {
        return server_inStorage;
    }

    @Column(name = "SERVER_EXSTORAGE")
    private String server_exStorage;
    public void setServer_exStorage(String server_exStorage) {
        this.server_exStorage = server_exStorage;
    }
    public String getServer_exStorage() {
        return server_exStorage;
    }

    @Column(name = "SERVER_OTHER")
    private String server_other;
    public void setServer_other(String server_other) {
        this.server_other = server_other;
    }
    public String getServer_other() {
        return server_other;
    }

    /**
     * 以上属于运行环境 服务器端 硬件要求
     */

    @Column(name = "SERVER_SYS")
    private String server_Sys;
    public String getServer_Sys() {
        return server_Sys;
    }
    public void setServer_Sys(String server_Sys) {
        this.server_Sys = server_Sys;
    }


    @Column(name = "SERVER_LAN")
    private String server_lan;
    public String getServer_lan() {
        return server_lan;
    }
    public void setServer_lan(String server_lan) {
        this.server_lan = server_lan;
    }


    @Column(name = "SERVER_DATA")
    private String server_Data;
    public void setServer_Data(String server_Data) {
        this.server_Data = server_Data;
    }
    public String getServer_Data() {
        return server_Data;
    }


    @Column(name = "SERVER_SUPPORT")
    private String server_support;
    public void setServer_support(String server_support) {
        this.server_support = server_support;
    }
    public String getServer_support() {
        return server_support;
    }


    /**
     * 以上属于运行环境 服务器端 软件要求
     */

    @Column(name = "WEBENV")
    private String webEnv;
    public void setWebEnv(String webEnv) {
        this.webEnv = webEnv;
    }
    public String getWebEnv() {
        return webEnv;
    }


    /**
     * 网络环境要求
     */

    @Column(name = "SAMPLE_TYPE")
    private String sampleType;
    public void setSampleType(String sampleType) {
        this.sampleType = sampleType;
    }
    public String getSampleType() {
        return sampleType;
    }


    /**
     * 样品的软件介质
     */

    @Column(name = "SAMPLE_FILE")
    private String sampleFile;
    public void setSampleFile(String sampleFile) {
        this.sampleFile = sampleFile;
    }
    public String getSampleFile() {
        return sampleFile;
    }


    /**
     * 文档资料
     */

    @Column(name = "SAMPLE_CHOICE")
    private String sampleChoice;
    public void setSampleChoice(String sampleChoice) {
        this.sampleChoice = sampleChoice;
    }
    public String getSampleChoice() {
        return sampleChoice;
    }


    /**
     * 保存期满了的选项
     */

    @Column(name = "SAMPLE_TIME")
    private String sampleTime;
    public void setSampleTime(String sampleTime) {
        this.sampleTime = sampleTime;
    }
    public String getSampleTime() {
        return sampleTime;
    }


    /**
     * 希望测试完成的时间
     */

    @Column(name = "CONSIGN_TEL")
    private String consignTEL;
    public void setConsignTEL(String consignTEL) {
        this.consignTEL = consignTEL;
    }
    public String getConsignTEL() {
        return consignTEL;
    }


    @Column(name = "CONSIGN_FAX")
    private String consignFAX;
    public void setConsignFAX(String consignFAX) {
        this.consignFAX = consignFAX;
    }
    public String getConsignFAX() {
        return consignFAX;
    }


    @Column(name = "CONSIGN_ADDR")
    private String consignAddr;
    public void setConsignAddr(String consignAddr) {
        this.consignAddr = consignAddr;
    }
    public String getConsignAddr() {
        return consignAddr;
    }


    @Column(name = "CONSIGN_CODE")
    private String consignCODE;
    public void setConsignCODE(String consignCODE) {
        this.consignCODE = consignCODE;
    }
    public String getConsignCODE() {
        return consignCODE;
    }


    @Column(name = "CONSIGN_NAME")
    private String consignName;
    public void setConsignName(String consignName) {
        this.consignName = consignName;
    }
    public String getConsignName() {
        return consignName;
    }


    @Column(name = "CONSIGN_PHONE")
    private String consignPhone;
    public void setConsignPhone(String consignPhone) {
        this.consignPhone = consignPhone;
    }
    public String getConsignPhone() {
        return consignPhone;
    }


    @Column(name = "CONSIGN_EMAIL")
    private String consignEmail;
    public void setConsignEmail(String consignEmail) {
        this.consignEmail = consignEmail;
    }
    public String getConsignEmail() {
        return consignEmail;
    }


    @Column(name = "CONSIGN_WEB")
    private String consignWEB;
    public void setConsignWEB(String consignWEB) {
        this.consignWEB = consignWEB;
    }
    public String getConsignWEB() {
        return consignWEB;
    }


    /**
     * 以上对应委托单位信息
     */

    @Column(name = "OTHER_ENCRYPT")
    private String otherEncrypt;
    public void setOtherEncrypt(String otherEncrypt) {
        this.otherEncrypt = otherEncrypt;
    }
    public String getOtherEncrypt() {
        return otherEncrypt;
    }


    /**
     * 密级
     */

    @Column(name = "OTHER_VIRUS")
    private String otherVirus;
    public void setOtherVirus(String otherVirus) {
        this.otherVirus = otherVirus;
    }
    public String getOtherVirus() {
        return otherVirus;
    }
    /**
    * 查杀病毒
     */


    /**
     * 以下属于材料检查 多选
     */
    @Column(name = "OTHER_SAMPLE")
    private String otherSample ;
    public void setOtherSample(String otherSample) {
        this.otherSample = otherSample;
    }
    public String getOtherSample() {
        return otherSample;
    }


    @Column(name = "OTHER_REDOC")
    private String othererREDOC;
    public void setOthererREDOC(String othererREDOC) {
        this.othererREDOC = othererREDOC;
    }
    public String getOthererREDOC() {
        return othererREDOC;
    }


    /**
     * 需求文档 多选
     */

    @Column(name = "OTHER_USERDOC")
    private  String otherUSERDOC;
    public void setOtherUSERDOC(String otherUSERDOC) {
        this.otherUSERDOC = otherUSERDOC;
    }
    public String getOtherUSERDOC() {
        return otherUSERDOC;
    }


    /**
     * 用户文档 多选
     */

    @Column(name = "OTHER_OPDOC")
    private  String otherOPDOC;
    public void setOtherOPDOC(String otherOPDOC) {
        this.otherOPDOC = otherOPDOC;
    }
    public String getOtherOPDOC() {
        return otherOPDOC;
    }


    /**
     * 操作文档 多选
     */

    @Column(name = "OTHER_OTHER")
    private String otherOther;
    public void setOtherOther(String otherOther) {
        this.otherOther = otherOther;
    }
    public String getOtherOther() {
        return otherOther;
    }


    @Column(name = "OTHER_CHECK")
    private  String otherCheck;
    public void setOtherCheck(String otherCheck) {
        this.otherCheck = otherCheck;
    }
    public String getOtherCheck() {
        return otherCheck;
    }


    /**
     * 确认意见 单选
     */

    @Column(name = "OTHER_DEAL")
    private  String otherDeal;
    public void setOtherDeal(String otherDeal) {
        this.otherDeal = otherDeal;
    }
    public String getOtherDeal() {
        return otherDeal;
    }


    /**
     * 受理意见 单选
     */

    @Column(name = "OTHER_PROJECTID")
    private  String otherProjectId;
    public String getOtherProjectId() {
        return otherProjectId;
    }
    public void setOtherProjectId(String otherProjectId) {
        this.otherProjectId = otherProjectId;
    }

/**
 以下属于委托测试功能表
 @author FW
 */

    /**
     * 原来是应该是可以添加的表格
     * 暂时写成这种形式 目前没找到合适的数据结构
     */

    @Column(name = "FUNCTEST_MODE_ID")
    private  String functestModeID;
    public void setFunctestModeID(String functestModeID) {
        this.functestModeID = functestModeID;
    }
    public String getFunctestModeID() {
        return functestModeID;
    }


    @Column(name = "FUNCTEST_MODE_NAME")
    private  String functestModeName;
    public void setFunctestModeName(String functestModeName) {
        this.functestModeName = functestModeName;
    }
    public String getFunctestModeName() {
        return functestModeName;
    }


    @Column(name = "FUNCTEST_MODE_INFO")
    private  String functestModeINFO;
    public void setFunctestModeINFO(String functestModeINFO) {
        this.functestModeINFO = functestModeINFO;
    }
    public String getFunctestModeINFO() {
        return functestModeINFO;
    }

/**
    @Column(name = "FUNCTEST_M2_NAME")
    private  String functestM2Name;

    @Column(name = "FUNCTEST_M2_INFO")
    private  String functestM2INFO;

    @Column(name = "FUNCTEST_M3_NAME")
    private  String functestM3Name;

    @Column(name = "FUNCTEST_M3_INFO")
    private  String functestM3INFO;

    @Column(name = "FUNCTEST_M4_NAME")
    private  String functestM4Name;

    @Column(name = "FUNCTEST_M4_INFO")
    private  String functestM4INFO;

    @Column(name = "FUNCTEST_M5_NAME")
    private  String functestM5Name;

    @Column(name = "FUNCTEST_M5_INFO")
    private  String functestM5INFO;

    @Column(name = "FUNCTEST_M6_NAME")
    private  String functestM6Name;

    @Column(name = "FUNCTEST_M6_INFO")
    private  String functestM6INFO;

    @Column(name = "FUNCTEST_M7_NAME")
    private  String functestM7Name;

    @Column(name = "FUNCTEST_M7_INFO")
    private  String functestM7INFO;

    @Column(name = "FUNCTEST_M8_NAME")
    private  String functestM8Name;

    @Column(name = "FUNCTEST_M8_INFO")
    private  String functestM8INFO;

    @Column(name = "FUNCTEST_M9_NAME")
    private  String functestM9Name;

    @Column(name = "FUNCTEST_M9_INFO")
    private  String functestM9INFO;

    @Column(name = "FUNCTEST_M10_NAME")
    private  String functestM10Name;

    @Column(name = "FUNCTEST_M10_INFO")
    private  String functestM10INFO;

    @Column(name = "FUNCTEST_M11_NAME")
    private  String functestM11Name;

    @Column(name = "FUNCTEST_M11_INFO")
    private  String functestM11INFO;

    @Column(name = "FUNCTEST_M12_NAME")
    private  String functestM12Name;

    @Column(name = "FUNCTEST_M12_INFO")
    private  String functestM12INFO;

    @Column(name = "FUNCTEST_M13_NAME")
    private  String functestM13Name;

    @Column(name = "FUNCTEST_M13_INFO")
    private  String functestM13INFO;

    @Column(name = "FUNCTEST_M14_NAME")
    private  String functestM14Name;

    @Column(name = "FUNCTEST_M14_INFO")
    private  String functestM14INFO;

    @Column(name = "FUNCTEST_M15_NAME")
    private  String functestM15Name;

    @Column(name = "FUNCTEST_M15_INFO")
    private  String functestM15INFO;

    @Column(name = "FUNCTEST_M16_NAME")
    private  String functestM16Name;

    @Column(name = "FUNCTEST_M16_INFO")
    private  String functestM16INFO;
    */

/**
 以下属于软件测试报告
 @author FW
 */
    /**
     * 以下是封面页内容 用F代表first 意会一下
     */
    @Column(name = "TESTREPO_FNAME")
    private  String testrepoFName;
    public void setTestrepoFName(String testrepoFName) {
        this.testrepoFName = testrepoFName;
    }
    public String getTestrepoFName() {
        return testrepoFName;
    }

    @Column(name = "TESTREPO_FVERSION")
    private  String testrepoFVersion;
    public void setTestrepoFVersion(String testrepoFVersion) {
        this.testrepoFVersion = testrepoFVersion;
    }
    public String getTestrepoFVersion() {
        return testrepoFVersion;
    }


    @Column(name = "TESTREPO_FCOMPANY")
    private  String testrepoFCompany;
    public void setTestrepoFCompany(String testrepoFCompany) {
        this.testrepoFCompany = testrepoFCompany;
    }
    public String getTestrepoFCompany() {
        return testrepoFCompany;
    }

    @Column(name = "TESTREPO_FTESTTYPE")
    private  String testrepoFTesttype;
    public void setTestrepoFTesttype(String testrepoFTesttype) {
        this.testrepoFTesttype = testrepoFTesttype;
    }
    public String getTestrepoFTesttype() {
        return testrepoFTesttype;
    }



    @Column(name = "TESTREPO_FTIME")
    private  String testrepoFTime;
    public void setTestrepoFTime(String testrepoFTime) {
        this.testrepoFTime = testrepoFTime;
    }
    public String getTestrepoFTime() {
        return testrepoFTime;
    }


    /**
     * 以下属于测试报告正文表格
     */

    @Column(name = "TESTREPO_COMPANY")
    private  String testrepoCompany;
    public void setTestrepoCompany(String testrepoCompany) {
        this.testrepoCompany = testrepoCompany;
    }
    public String getTestrepoCompany() {
        return testrepoCompany;
    }


    /**
     * 委托单位
     */

    @Column(name = "TESTREPO_ID")
    private  String testrepoID;
    public void setTestrepoID(String testrepoID) {
        this.testrepoID = testrepoID;
    }
    public String getTestrepoID() {
        return testrepoID;
    }


    @Column(name = "TESTREPO_NAME")
    private  String testrepoName;
    public void setTestrepoName(String testrepoName) {
        this.testrepoName = testrepoName;
    }
    public String getTestrepoName() {
        return testrepoName;
    }


    @Column(name = "TESTREPO_VERSION")
    private  String testrepoVersion;
    public void setTestrepoVersion(String testrepoVersion) {
        this.testrepoVersion = testrepoVersion;
    }
    public String getTestrepoVersion() {
        return testrepoVersion;
    }

    @Column(name = "TESTREPO_COMETIME")
    private  String testrepoComeTime;
    public void setTestrepoComeTime(String testrepoComeTime) {
        this.testrepoComeTime = testrepoComeTime;
    }
    public String getTestrepoComeTime() {
        return testrepoComeTime;
    }


    /**
     * 来样日期
     */
    @Column(name = "TESTREPO_TESTTYPE")
    private  String testrepoTesttype;
    public void setTestrepoTesttype(String testrepoTesttype) {
        this.testrepoTesttype = testrepoTesttype;
    }
    public String getTestrepoTesttype() {
        return testrepoTesttype;
    }


    @Column(name = "TESTREPO_TESTTIME")
    private  String testrepoTesyTime;
    public void setTestrepoTesyTime(String testrepoTesyTime) {
        this.testrepoTesyTime = testrepoTesyTime;
    }
    public String getTestrepoTesyTime() {
        return testrepoTesyTime;
    }


    @Column(name = "TESTREPO_RELY")
    private  String testrepoRely;
    public void setTestrepoRely(String testrepoRely) {
        this.testrepoRely = testrepoRely;
    }
    public String getTestrepoRely() {
        return testrepoRely;
    }

    /**
     * 测试依据
     */

    @Column(name = "TESTREPO_SAMPLE")
    private  String testrepoSample;
    public void setTestrepoSample(String testrepoSample) {
        this.testrepoSample = testrepoSample;
    }
    public String getTestrepoSample() {
        return testrepoSample;
    }



    /**
     * 软件样本
     */

    @Column(name = "TESTREPO_SAMPLEDOC")
    private  String testrepoSampleDoc;
    public void setTestrepoSampleDoc(String testrepoSampleDoc) {
        this.testrepoSampleDoc = testrepoSampleDoc;
    }
    public String getTestrepoSampleDoc() {
        return testrepoSampleDoc;
    }


    /**
     * 软件文档
     */

    @Column(name = "TESTREPO_CONCLUDE")
    private  String testrepoConclude;
    public void setTestrepoConclude(String testrepoConclude) {
        this.testrepoConclude = testrepoConclude;
    }
    public String getTestrepoConclude() {
        return testrepoConclude;
    }


    /**
     * 主测人
     */
    @Column(name = "TESTREPO_EXECUTOR")
    private  String testrepoExecutor;
    public void setTestrepoExecutor(String testrepoExecutor) {
        this.testrepoExecutor = testrepoExecutor;
    }
    public String getTestrepoExecutor() {
        return testrepoExecutor;
    }


    @Column(name = "TESTREPO_EXECUTOR_TIME")
    private  String testrepoExecutorTime;
    public String getTestrepoExecutorTime() {
        return testrepoExecutorTime;
    }
    public void setTestrepoExecutorTime(String testrepoExecutorTime) {
        this.testrepoExecutorTime = testrepoExecutorTime;
    }

    /**
     * 审核人
     */
    @Column(name = "TESTREPO_AUDITOR")
    private  String testrepoAuditor;
    public String getTestrepoAuditor() {
        return testrepoAuditor;
    }
    public void setTestrepoAuditor(String testrepoAuditor) {
        this.testrepoAuditor = testrepoAuditor;
    }

    @Column(name = "TESTREPO_AUDITOR_TIME")
    private  String testrepoAuditorTime;
    public String getTestrepoAuditorTime() {
        return testrepoAuditorTime;
    }
    public void setTestrepoAuditorTime(String testrepoAuditorTime) {
        this.testrepoAuditorTime = testrepoAuditorTime;
    }

    /**
     * 批准人
     */
    @Column(name = "TESTREPO_APPROVER")
    private  String testrepoApprover;
    public String getTestrepoApprover() {
        return testrepoApprover;
    }
    public void setTestrepoApprover(String testrepoApprover) {
        this.testrepoApprover = testrepoApprover;
    }

    @Column(name = "TESTREPO_APPROVER_TIME")
    private  String testrepoApproverTime;
    public void setTestrepoApproverTime(String testrepoApproverTime) {
        this.testrepoApproverTime = testrepoApproverTime;
    }
    public String getTestrepoApproverTime() {
        return testrepoApproverTime;
    }

    /**
     * 以下属于委托单位的联系方式
     */
    @Column(name = "TESTREPO_CLIENT_PHONE")
    private  String testrepoClientPhone;
    public String getTestrepoClientPhone() {
        return testrepoClientPhone;
    }
    public void setTestrepoClientPhone(String testrepoClientPhone) {
        this.testrepoClientPhone = testrepoClientPhone;
    }

    @Column(name = "TESTREPO_CLIENT_FAX")
    private  String testrepoClientFAX;
    public void setTestrepoClientFAX(String testrepoClientFAX) {
        this.testrepoClientFAX = testrepoClientFAX;
    }
    public String getTestrepoClientFAX() {
        return testrepoClientFAX;
    }

    @Column(name = "TESTREPO_CLIENT_ADDR")
    private  String testrepoClientADDR;

    public void setTestrepoClientADDR(String testrepoClientADDR) {
        this.testrepoClientADDR = testrepoClientADDR;
    }
    public String getTestrepoClientADDR() {
        return testrepoClientADDR;
    }

    @Column(name = "TESTREPO_CLIENT_CODE")
    private  String testrepoClientCODE;
    public String getTestrepoClientCODE() {
        return testrepoClientCODE;
    }
    public void setTestrepoClientCODE(String testrepoClientCODE) {
        this.testrepoClientCODE = testrepoClientCODE;
    }

    @Column(name = "TESTREPO_CLIENT_NAME")
    private  String testrepoClientName;
    public String getTestrepoClientName() {
        return testrepoClientName;
    }
    public void setTestrepoClientName(String testrepoClientName) {
        this.testrepoClientName = testrepoClientName;
    }

    @Column(name = "TESTREPO_CLIENT_Email")
    private  String testrepoClientEmail;
    public String getTestrepoClientEmail() {
        return testrepoClientEmail;
    }
    public void setTestrepoClientEmail(String testrepoClientEmail) {
        this.testrepoClientEmail = testrepoClientEmail;
    }

    /**
     *以下属于测试方的联系方式
     */
    @Column(name = "TESTREPO_SERVER_PHONE")
    private  String testrepoServerPhone;
    public String getTestrepoServerPhone() {
        return testrepoServerPhone;
    }
    public void setTestrepoServerPhone(String testrepoServerPhone) {
        this.testrepoServerPhone = testrepoServerPhone;
    }

    @Column(name = "TESTREPO_SERVER_FAX")
    private  String testrepoServerFAX;
    public String getTestrepoServerFAX() {
        return testrepoServerFAX;
    }
    public void setTestrepoServerFAX(String testrepoServerFAX) {
        this.testrepoServerFAX = testrepoServerFAX;
    }

    @Column(name = "TESTREPO_SERVER_ADDR")
    private  String testrepoServerADDR;
    public String getTestrepoServerADDR() {
        return testrepoServerADDR;
    }
    public void setTestrepoServerADDR(String testrepoServerADDR) {
        this.testrepoServerADDR = testrepoServerADDR;
    }

    @Column(name = "TESTREPO_SERVER_CODE")
    private  String testrepoServerCODE;

    @Column(name = "TESTREPO_SERVER_NAME")
    private  String testrepoServerName;

    @Column(name = "TESTREPO_SERVER_Email")
    private  String testrepoServerEmail;

    /**
     * 以下属于测试环境中硬件环境要求 H代表Hardware 意会一下
     */
    @Column(name = "TESTREPO_HTYPE")
    private  String testrepoHTYPE;

    @Column(name = "TESTREPO_HNAME")
    private  String testrepoHNAME;

    @Column(name = "TESTREPO_HCONF")
    private  String testrepoHCONF;
    /**
     * 硬件配置
     */
    @Column(name = "TESTREPO_HNUM")
    private  String testrepoHNUM;

    /**
     * 以下属于测试环境中软件环境要求 S代表Software 意会一下
     *
     * 原表中是表格 先这么写一下以后再改结构
     */
    @Column(name = "TESTREPO_STYPE")
    private  String testrepoSTYPE;

    @Column(name = "TESTREPO_SNAME")
    private  String testrepoSNAME;

    @Column(name = "TESTREPO_SVERSION")
    private  String testrepoSVERSION;

    @Column(name = "TESTREPO_WEBENV")
    private  String testrepoWebEnv;
    /**
     * 网络环境
     */

    @Column(name = "TESTREPO_TESTRELY")
    private  String testrepoTestRely;
    /**
     * 测试依据
     */
    @Column(name = "TESTREPO_TESTREFER")
    private  String testrepoTestRefer;
    /**
     * 参考资料
     */

    /**
     * 以下是各项测试内容
     */

    /**
     * 功能性测试
     * 对应; 功能模块 功能要求 测试结果
     */
    @Column(name = "TESTREPO_FUNCMODE")
    private  String testrepoFuncMode;

    @Column(name = "TESTREPO_FUNCREQUIRE")
    private  String testrepoFuncRequire;

    @Column(name = "TESTREPO_FUNCRESULT")
    private  String testrepoFuncResult;

    /**
     * 效率测试  EFF代表efficiency了
     * 对应; 测试特性 测试说明 测试结果
     */

    @Column(name = "TESTREPO_EFFTYPE")
    private  String testrepoEFFTYPE;

    @Column(name = "TESTREPO_EFFINFO")
    private  String testrepoEFFINFO;

    @Column(name = "TESTREPO_EFFRESULT")
    private  String testrepoEFFRESULT;

    /**
     * 可移植性测试  TRANS代表transportability
     * 对应; 测试特性 测试说明 测试结果
     */
    @Column(name = "TESTREPO_TRANSTYPE")
    private  String testrepoTRANSTYPE;

    @Column(name = "TESTREPO_TRANSINFO")
    private  String testrepoTRANSINFO;

    @Column(name = "TESTREPO_TRANSRESULT")
    private  String testrepoTRANSRESULT;

    /**
     * 可移植性测试  USE代表usability
     * 对应; 测试特性 测试说明 测试结果
     * 原文档中是表格
     */
    @Column(name = "TESTREPO_USETYPE")
    private  String testrepoUSESTYPE;

    @Column(name = "TESTREPO_USESINFO")
    private  String testrepoUSEINFO;

    @Column(name = "TESTREPO_USERRESULT")
    private  String testrepoUSERESULT;

    /**
     * 可靠性测试
     * 对应; 测试特性 测试说明 测试结果
     * 原文档中是表格
     */
    @Column(name = "TESTREPO_RELYTYPE")
    private  String testrepoRELYTYPE;

    @Column(name = "TESTREPO_RELYINFO")
    private  String testrepoRELYINFO;

    @Column(name = "TESTREPO_RELYRESULT")
    private  String testrepoRELYRESULT;


    /**
     以下属于软件测试方案文档

     存疑太多所以没做完
     @author FW
     */

    /**
     * 以下是首页内容
     * 标题下面那个空格不知道是啥
     * 对应编制人 审核人 批准人
     */
    /**@Column(name = "TESTPLAN_COMPILER")
    private  String testplanCompiler;

     @Column(name = "TESTPLAN_AUDITOR")
     private  String testplanAuditor;

     @Column(name = "TESTPLAN_APPROVER")
     private  String testplanApprover;

     @Column(name = "TESTPLAN_INTRO")
     private  String testplanINTRO;
     */


    /**
     * 以下属于测试报告检查表 TestReportCheck 简称TRC吧
     @author FW
     */
    @Column(name = "TRC_SOFTNAME")
    private String TRCSoftName;

    @Column(name = "TRC_CLIENTNAME")
    private  String TRCSClientName;
    /**
     * 委托单位名称
     */

    /**
     * 以下对应测试报告检查表的各项内容
     */
    @Column(name = "TRC_RESULT1")
    private  String TRCResult1;

    @Column(name = "TRC_RESULT2")
    private  String TRCResult2;

    @Column(name = "TRC_RESULT3")
    private  String TRCResult3;

    @Column(name = "TRC_RESULT4")
    private  String TRCResult4;

    @Column(name = "TRC_RESULT5")
    private  String TRCResult5;

    @Column(name = "TRC_RESULT6")
    private  String TRCResult6;

    @Column(name = "TRC_RESULT7")
    private  String TRCResult7;

    @Column(name = "TRC_RESULT8")
    private  String TRCResult8;

    @Column(name = "TRC_RESULT9")
    private  String TRCResult9;

    @Column(name = "TRC_RESULT10")
    private  String TRCResult10;

    @Column(name = "TRC_RESULT11_1")
    private  String TRCResult11_1;

    @Column(name = "TRC_RESULT11_2")
    private  String TRCResult11_2;

    @Column(name = "TRC_RESULT11_3")
    private  String TRCResult11_3;

    @Column(name = "TRC_RESULT12")
    private  String TRCResult12;

    /**
     * 检查人和日期
     */
    @Column(name = "TRC_AUDITOR")
    private  String TRCAuditor;

    @Column(name = "TRC_TIME")
    private  String TRCTime;

    /**
     * 以下属于委托测试测试总项 详见TEST CASE
     @author FW
     */




    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID",foreignKey = @ForeignKey(value = ConstraintMode.CONSTRAINT))
    @JSONField(serialize = false)
    private User user;

    //委托所在的工程
    @OneToOne(mappedBy = "consign")
    @JSONField(serialize = false)
    private Project project;

    public Project getProject(){
        return project;
    }
    public void setProject(Project project){
        this.project = project;
    }
    //====================================


    public String getConsignation() {
        return consignation;
    }

    public void setConsignation(String consignation) {
        this.consignation = consignation;
    }

    public String getProcessInstanceID()
    {
        return processInstanceID;
    }
    public void setProcessInstanceID(String processInstanceID){this.processInstanceID = processInstanceID;}

    public User getUser()
    {
        return user;
    }
    public void setUser(User user){
        this.user=user;
    }





}
