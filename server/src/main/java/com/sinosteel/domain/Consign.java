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


    /**
     * 测试类型
     */
    @Column(name = "TESTTYPE")
    private String testType;

    public void setTestType(String testType) {
        this.testType = testType;
    }
    public String getTestType() {
        return testType;
    }

    /**
     * 软件名称
     */
    @Column(name = "SOFTWARENAME")
    private String  sotfwareName;


    /**
     * 版本号
     */
    @Column(name = "VERSION")
    private String version;

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    /**
     * 委托单位(英文)
     */

    @Column(name = "COMPANY_EN")
    private String company_En;

    public String getSotfwareName() {
        return sotfwareName;
    }
    public void setSotfwareName(String sotfwareName) {
        this.sotfwareName = sotfwareName;
    }

    public void setCompany_En(String company_En) {
        this.company_En = company_En;
    }
    public String getCompany_En() {
        return company_En;
    }

    /**
     * 委托单位(中文)
     */
    @Column(name = "COMPANY_CH")
    private String company_Ch;

    public void setCompany_Ch(String company_Ch) {
        this.company_Ch = company_Ch;
    }
    public String getCompany_Ch() {
        return company_Ch;
    }

    /**
     * 开发单位
     */
    @Column(name = "DEVELOPER")
    private String developer;

    /**
     * 单位性质
     */
    @Column(name = "UNITPROPERTY")
    private String unitProperty;

    public String getDeveloper() {
        return developer;
    }
    public void setDeveloper(String developer) {
        this.developer = developer;
    }

    public void setUnitProperty(String unitProperty) {
        this.unitProperty = unitProperty;
    }
    public String getUnitProperty() {
        return unitProperty;
    }

    /**
     * 软件用户对象
     */
    @Column(name = "USER_DESCRIPTION")
    private String  user_Description;

    public String getUser_Description() {
        return user_Description;
    }
    public void setUser_Description(String user_Description) {
        this.user_Description = user_Description;
    }

    /**
     * 主要功能及用途简介
     */
    @Column(name = "FUNC_DESCRIPTION")
    private String  func_Description;

    public void setFunc_Description(String func_Description) {
        this.func_Description = func_Description;
    }
    public String getFunc_Description() {
        return func_Description;
    }


    /**
     * 测试依据 多选
     */
    @Column(name = "TEST_BASIS")
    private String test_Basis;

    public void setTest_Basis(String test_Basis) {
        this.test_Basis = test_Basis;
    }
    public String getTest_Basis() {
        return test_Basis;
    }

    /**
     * 需要测试的技术指标 多选
     */
    @Column(name = "TEST_SPECIFICATION")
    private String test_Specification ;

    public void setTest_Specification(String test_Specification) {
        this.test_Specification = test_Specification;
    }
    public String getTest_Specification() {
        return test_Specification;
    }


    /**
     * 软件规模-功能数
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
     * 软件规模 - 功能点数
     */
    @Column(name = "FP_NUM")
    private String fp_num;
    public void setFp_num(String fp_num) {
        this.fp_num = fp_num;
    }
    public String getFp_num() {
        return fp_num;
    }

    /**
     * 软件规模 - 代码行数
     */
    @Column(name = "CODELINE")
    private String codeLine;
    public String getCodeLine() {
        return codeLine;
    }
    public void setCodeLine(String codeLine) {
        this.codeLine = codeLine;
    }


    /**
     * 软件类型 - 系统软件
     */
    @Column(name = "SOFT_SYS")
    private String softSys;
    public String getSoftSys() {
        return softSys;
    }
    public void setSoftSys(String softSys) {
        this.softSys = softSys;
    }

    /**
     * 软件类型 - 支持软件
     */
    @Column(name = "SOFT_SUPPORT")
    private String softSupport;
    public void setSoftSupport(String softSupport) {
        this.softSupport = softSupport;
    }
    public String getSoftSupport() {
        return softSupport;
    }

    /**
     * 软件类型 - 应用软件
     */
    @Column(name = "SOFT_APP")
    private String softApp;
    public void setSoftApp(String softApp) {
        this.softApp = softApp;
    }
    public String getSoftApp() {
        return softApp;
    }


    /**
     * 软件类型 - 其他
     */
    @Column(name = "SOFT_OTHER")
    private String softOther;
    public void setSoftOther(String softOther) {
        this.softOther = softOther;
    }
    public String getSoftOther() {
        return softOther;
    }

    /**
     * 运行环境 - 客户端 - 操作系统
     */

    @Column(name = "CLIENT_SYS")
    private String client_Sys;
    public void setClient_Sys(String client_Sys) {
        this.client_Sys = client_Sys;
    }
    public String getClient_Sys() {
        return client_Sys;
    }

    /**
     * 运行环境 - 客户端 - 内存要求
     */
    @Column(name = "CLIENT_INSTORAGE")
    private String client_inStorage;
    public void setClient_inStorage(String client_inStorage) {
        this.client_inStorage = client_inStorage;
    }
    public String getClient_inStorage() {
        return client_inStorage;
    }


    /**
     * 运行环境 - 客户端 - 硬盘要求
     */
    @Column(name = "CLIENT_EXSTORAGE")
    private String client_exStorage;
    public void setClient_exStorage(String client_exStorage) {
        this.client_exStorage = client_exStorage;
    }
    public String getClient_exStorage() {
        return client_exStorage;
    }

    /**
     * 运行环境 - 客户端 - 其它要求
     */
    @Column(name = "CLIENT_OTHER")
    private String client_other;
    public void setClient_other(String client_other) {
        this.client_other = client_other;
    }
    public String getClient_other() {
        return client_other;
    }


    /**
     * 运行环境 - 服务器端 - 硬件 - 架构
     */
    @Column(name = "SERVER_FRAME")
    private String server_Frame;
    public void setServer_Frame(String server_Frame) {
        this.server_Frame = server_Frame;
    }
    public String getServer_Frame() {
        return server_Frame;
    }

    /**
     * 运行环境 - 服务器端 - 硬件 - 内存要求
     */
    @Column(name = "SERVER_INSTORAGE")
    private String server_inStorage;
    public void setServer_inStorage(String server_inStorage) {
        this.server_inStorage = server_inStorage;
    }
    public String getServer_inStorage() {
        return server_inStorage;
    }

    /**
     * 运行环境 - 服务器端 - 硬件 - 硬盘要求
     */
    @Column(name = "SERVER_EXSTORAGE")
    private String server_exStorage;
    public void setServer_exStorage(String server_exStorage) {
        this.server_exStorage = server_exStorage;
    }
    public String getServer_exStorage() {
        return server_exStorage;
    }

    /**
     * 运行环境 - 服务器端 - 硬件 - 其它要求
     */
    @Column(name = "SERVER_OTHER")
    private String server_other;
    public void setServer_other(String server_other) {
        this.server_other = server_other;
    }
    public String getServer_other() {
        return server_other;
    }

    /**
     * 运行环境 - 服务器端 - 软件 - 操作系统
     */
    @Column(name = "SERVER_SYS")
    private String server_Sys;
    public String getServer_Sys() {
        return server_Sys;
    }
    public void setServer_Sys(String server_Sys) {
        this.server_Sys = server_Sys;
    }

    /**
     * 运行环境 - 服务器端 - 软件 - 编程语言
     */

    @Column(name = "SERVER_LAN")
    private String server_lan;
    public String getServer_lan() {
        return server_lan;
    }
    public void setServer_lan(String server_lan) {
        this.server_lan = server_lan;
    }

    /**
     * 运行环境 - 服务器端 - 软件 - 数据库
     */
    @Column(name = "SERVER_DATA")
    private String server_Data;
    public void setServer_Data(String server_Data) {
        this.server_Data = server_Data;
    }
    public String getServer_Data() {
        return server_Data;
    }


    /**
     * 运行环境 - 服务器端 - 软件 - 其它支撑软件
     */
    @Column(name = "SERVER_SUPPORT")
    private String server_support;
    public void setServer_support(String server_support) {
        this.server_support = server_support;
    }
    public String getServer_support() {
        return server_support;
    }


    /**
     * 运行环境 - 服务器端 - 软件 - 版本
     */

    @Column(name = "SERVER_SOFT_VERSION")
    private String server_soft_version;
    public String getServer_soft_version() {
        return server_soft_version;
    }

    public void setServer_soft_version(String server_soft_version) {
        this.server_soft_version = server_soft_version;
    }


    /**
     * 运行环境 - 服务器端 - 软件 - 构架
     */

    @Column(name = "SERVER_SOFT_FRAME")
    private String server_soft_Frame;
    public String getServer_soft_Frame() {
        return server_soft_Frame;
    }

    public void setServer_soft_Frame(String server_soft_Frame) {
        this.server_soft_Frame = server_soft_Frame;
    }



    /**
     * 运行环境 - 服务器端 - 软件 - 中间件
     */

    @Column(name = "SERVER_SOFT_MIDW")
    private String server_soft_MidW;
    public String getServer_soft_MidW() {
        return server_soft_MidW;
    }

    public void setServer_soft_MidW(String server_soft_MidW) {
        this.server_soft_MidW = server_soft_MidW;
    }

    /**
     * 运行环境 - 网络环境
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
     * 样品和数量 - 软件介质
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
     * 样品和数量 - 文档资料
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
     * 提交的样品（硬拷贝资料、硬件）五年保存期满：由本实验室销毁还是退还
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
     * 希望测试完成时间
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
     * 委托单位信息 - 电话
     */

    @Column(name = "CONSIGN_TEL")
    private String consignTEL;
    public void setConsignTEL(String consignTEL) {
        this.consignTEL = consignTEL;
    }
    public String getConsignTEL() {
        return consignTEL;
    }

    /**
     * 委托单位信息 - 传真
     */

    @Column(name = "CONSIGN_FAX")
    private String consignFAX;
    public void setConsignFAX(String consignFAX) {
        this.consignFAX = consignFAX;
    }
    public String getConsignFAX() {
        return consignFAX;
    }


    /**
     * 委托单位信息 - 地址
     */
    @Column(name = "CONSIGN_ADDR")
    private String consignAddr;
    public void setConsignAddr(String consignAddr) {
        this.consignAddr = consignAddr;
    }
    public String getConsignAddr() {
        return consignAddr;
    }

    /**
     * 委托单位信息 - 邮编
     */

    @Column(name = "CONSIGN_CODE")
    private String consignCODE;
    public void setConsignCODE(String consignCODE) {
        this.consignCODE = consignCODE;
    }
    public String getConsignCODE() {
        return consignCODE;
    }

    /**
     * 委托单位信息 - 联系人
     */
    @Column(name = "CONSIGN_NAME")
    private String consignName;
    public void setConsignName(String consignName) {
        this.consignName = consignName;
    }
    public String getConsignName() {
        return consignName;
    }

    /**
     * 委托单位信息 - 手机
     */

    @Column(name = "CONSIGN_PHONE")
    private String consignPhone;
    public void setConsignPhone(String consignPhone) {
        this.consignPhone = consignPhone;
    }
    public String getConsignPhone() {
        return consignPhone;
    }

    /**
     * 委托单位信息 - E-mail
     */
    @Column(name = "CONSIGN_EMAIL")
    private String consignEmail;
    public void setConsignEmail(String consignEmail) {
        this.consignEmail = consignEmail;
    }
    public String getConsignEmail() {
        return consignEmail;
    }

    /**
     * 委托单位信息 - 网址
     */
    @Column(name = "CONSIGN_WEB")
    private String consignWEB;
    public void setConsignWEB(String consignWEB) {
        this.consignWEB = consignWEB;
    }
    public String getConsignWEB() {
        return consignWEB;
    }


    /**
     * 密级
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
     * 查杀病毒
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
     * 材料检查 - 测试样品
     */
    @Column(name = "OTHER_SAMPLE")
    private String otherSample ;
    public void setOtherSample(String otherSample) {
        this.otherSample = otherSample;
    }
    public String getOtherSample() {
        return otherSample;
    }


    /**
     * 材料检查 - 需求文档
     */
    @Column(name = "OTHER_REDOC")
    private String othererREDOC;
    public void setOthererREDOC(String othererREDOC) {
        this.othererREDOC = othererREDOC;
    }
    public String getOthererREDOC() {
        return othererREDOC;
    }

    /**
     * 材料检查 - 用户文档
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
     * 材料检查 - 操作文档
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
     * 材料检查 - 其它
     */
    @Column(name = "OTHER_OTHER")
    private String otherOther;
    public void setOtherOther(String otherOther) {
        this.otherOther = otherOther;
    }
    public String getOtherOther() {
        return otherOther;
    }


    /**
     * 确认意见
     */
    @Column(name = "OTHER_CHECK")
    private  String otherCheck;
    public void setOtherCheck(String otherCheck) {
        this.otherCheck = otherCheck;
    }
    public String getOtherCheck() {
        return otherCheck;
    }


    /**
     * 受理意见
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
     * 测试项目编号
     */
    @Column(name = "OTHER_PROJECTID")
    private  String otherProjectId;
    public String getOtherProjectId() {
        return otherProjectId;
    }
    public void setOtherProjectId(String otherProjectId) {
        this.otherProjectId = otherProjectId;
    }






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
