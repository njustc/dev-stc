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

    @Column(name = "TESTTYPES")
    private String testTypes;


    /**
     * @author FW
     * 以下属于委托测试申请表
     */


    @Column(name = "TESTTYPE")
    private String testType;
    /**
     * 测试类型 多选
     */

    @Column(name = "SOFTWARENAME")
    private String  sotfwareName;

    @Column(name = "COMPANY_EN")
    private String company_En;

    @Column(name = "COMPANY_CH")
    private String company_Ch;
    /**
     * 委托方案的中英文
     */

    @Column(name = "DEVELOPER")
    private String developer;

    @Column(name = "UNITPROPERTY")
    private String unitProperty;
    /**
     * 单位性质 单选
     */

    @Column(name = "USER_DESCRIPTION")
    private String  user_Description;
    /**
     * 软件用户对象描述
     */

    @Column(name = "FUNC_DESCRIPTION")
    private String  func_Description;
    /**
     *主要功能及用途简介
     */

    @Column(name = "TEST_BASIS")
    private String test_Basis;
    /**
     * 测试依据 多选
     */

    @Column(name = "TEST_SPECIFICATION")
    private String test_Specification ;
    /**
     * 需要测试的技术指标 多选
     */

    @Column(name = "FUNC_NUM")
    private String func_num;

    @Column(name = "FP_NUM")
    private String fp_num;

    @Column(name = "CODELINE")
    private String codeLine;
    /**
     * 以上属于软件功能
     */

    @Column(name = "SOFT_SYS")
    private String softSys;

    @Column(name = "SOFT_SUPPORT")
    private String softSupport;

    @Column(name = "SOFT_APP")
    private String softApp;

    @Column(name = "SOFT_OTHER")
    private String softOther;
    /**
     * 以上属于软件类型选项 单选
     */

    @Column(name = "CLIENT_SYS")
    private String client_Sys;

    @Column(name = "CLIENT_INSTORAGE")
    private String client_inStorage;

    @Column(name = "CLIENT_EXSTORAGE")
    private String client_exStorage;

    @Column(name = "CLIENT_OTHER")
    private String client_other;
    /**
     * 以上属于运行环境 客户端
     */

    @Column(name = "SERVER_FRAME")
    private String server_Frame;

    @Column(name = "SERVER_INSTORAGE")
    private String server_inStorage;

    @Column(name = "SERVER_EXSTORAGE")
    private String server_exStorage;

    @Column(name = "SERVER_OTHER")
    private String server_other;
    /**
     * 以上属于运行环境 服务器端 硬件要求
     */

    @Column(name = "SERVER_SYS")
    private String server_Sys;

    @Column(name = "SERVER_LAN")
    private String server_lan;

    @Column(name = "SERVER_DATA")
    private String server_Data;

    @Column(name = "SERVER_SUPPORT")
    private String server_support;
    /**
     * 以上属于运行环境 服务器端 软件要求
     */

    @Column(name = "WEBENV")
    private String webEnv;
    /**
     * 网络环境要求
     */

    @Column(name = "SAMPLE_TYPE")
    private String sampleType;
    /**
     * 样品的软件介质
     */

    @Column(name = "SAMPLE_FILE")
    private String sampleFile;
    /**
     * 文档资料
     */

    @Column(name = "SAMPLE_CHOICE")
    private String sampleChoice;
    /**
     * 保存期满了的选项
     */

    @Column(name = "SAMPLE_TIME")
    private String sampleTime;
    /**
     * 希望测试完成的时间
     */

    @Column(name = "CONSIGN_TEL")
    private String consignTEL;

    @Column(name = "CONSIGN_FAX")
    private String consignFAX;

    @Column(name = "CONSIGN_ADDR")
    private String consignAddr;

    @Column(name = "CONSIGN_CODE")
    private String consignCODE;

    @Column(name = "CONSIGN_NAME")
    private String consignName;

    @Column(name = "CONSIGN_PHONE")
    private String consignPhone;

    @Column(name = "CONSIGN_EMAIL")
    private String consignEmail;

    @Column(name = "CONSIGN_WEB")
    private String consignWEB;
    /**
     * 以上对应委托单位信息
     */

    @Column(name = "OTHER_ENCRYPT")
    private String otherEncrypt;
    /**
     * 密级
     */

    @Column(name = "OTHER_VIRUS")
    private String otherVirus;
    /**
     * 查杀病毒
     */


    /**
     * 以下属于材料检查 多选
     */
    @Column(name = "OTHER_SAMPLE")
    private String otherSample ;

    @Column(name = "OTHER_REDOC")
    private String othererREDOC;
    /**
     * 需求文档 多选
     */

    @Column(name = "OTHER_USERDOC")
    private  String otherUSERDOC;
    /**
     * 用户文档 多选
     */

    @Column(name = "OTHER_OPDOC")
    private  String otherOPDOC;
    /**
     * 操作文档 多选
     */

    @Column(name = "OTHER_OTHER")
    private String otherOther;

    @Column(name = "OTHER_CHECK")
    private  String otherCheck;
    /**
     * 确认意见 单选
     */

    @Column(name = "OTHER_DEAL")
    private  String otherDeal;
    /**
     * 受理意见 单选
     */

    @Column(name = "OTHER_PROJECTID")
    private  String otherProjectId;



/**
 以下属于委托测试功能表
 @author FW
 */

    /**
     * 原来是应该是可以添加的表格
     * 暂时写成这种形式 目前没找到合适的数据结构
     */

    @Column(name = "FUNCTEST_NAME")
    private  String functestName;

    @Column(name = "FUNCTEST_ID")
    private  String functestID;

    @Column(name = "FUNCTEST_M1_NAME")
    private  String functestM1Name;

    @Column(name = "FUNCTEST_M1_INFO")
    private  String functestM1INFO;

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

/**
 以下属于软件测试报告
 @author FW
 */
    /**
     * 以下是封面页内容 用F代表first 意会一下
     */
    @Column(name = "TESTREPO_FNAME")
    private  String testrepoFName;

    @Column(name = "TESTREPO_FVERSION")
    private  String testrepoFVersion;

    @Column(name = "TESTREPO_FCOMPANY")
    private  String testrepoFCompany;

    @Column(name = "TESTREPO_FTESTTYPE")
    private  String testrepoFTesttype;

    @Column(name = "TESTREPO_FTIME")
    private  String testrepoFTime;

    /**
     * 以下属于测试报告正文表格
     */

    @Column(name = "TESTREPO_COMPANY")
    private  String testrepoCompany;
    /**
     * 委托单位
     */

    @Column(name = "TESTREPO_ID")
    private  String testrepoID;

    @Column(name = "TESTREPO_NAME")
    private  String testrepoName;

    @Column(name = "TESTREPO_VERSION")
    private  String testrepoVersion;

    @Column(name = "TESTREPO_COMETIME")
    private  String testrepoComeTime;
    /**
     * 来样日期
     */
    @Column(name = "TESTREPO_TESTTYPE")
    private  String testrepoTesttype;

    @Column(name = "TESTREPO_TESTTIME")
    private  String testrepoTesyTime;

    @Column(name = "TESTREPO_RELY")
    private  String testrepoRely;
    /**
     * 测试依据
     */

    @Column(name = "TESTREPO_SAMPLE")
    private  String testrepoSample;
    /**
     * 软件样本
     */

    @Column(name = "TESTREPO_SAMPLEDOC")
    private  String testrepoSampleDoc;
    /**
     * 软件文档
     */

    @Column(name = "TESTREPO_CONCLUDE")
    private  String testrepoConclude;

    /**
     * 主测人
     */
    @Column(name = "TESTREPO_EXECUTOR")
    private  String testrepoExecutor;

    @Column(name = "TESTREPO_EXECUTOR_TIME")
    private  String testrepoExecutorTime;

    /**
     * 审核人
     */
    @Column(name = "TESTREPO_AUDITOR")
    private  String testrepoAuditor;

    @Column(name = "TESTREPO_AUDITOR_TIME")
    private  String testrepoAuditorTime;

    /**
     * 批准人
     */
    @Column(name = "TESTREPO_APPROVER")
    private  String testrepoApprover;

    @Column(name = "TESTREPO_APPROVER_TIME")
    private  String testrepoApproverTime;


    /**
     * 以下属于委托单位的联系方式
     */
    @Column(name = "TESTREPO_CLIENT_PHONE")
    private  String testrepoClientPhone;

    @Column(name = "TESTREPO_CLIENT_FAX")
    private  String testrepoClientFAX;

    @Column(name = "TESTREPO_CLIENT_ADDR")
    private  String testrepoClientADDR;

    @Column(name = "TESTREPO_CLIENT_CODE")
    private  String testrepoClientCODE;

    @Column(name = "TESTREPO_CLIENT_NAME")
    private  String testrepoClientName;

    @Column(name = "TESTREPO_CLIENT_Email")
    private  String testrepoClientEmail;

    /**
     *以下属于测试方的联系方式
     */
    @Column(name = "TESTREPO_SERVER_PHONE")
    private  String testrepoServerPhone;

    @Column(name = "TESTREPO_SERVER_FAX")
    private  String testrepoServerFAX;

    @Column(name = "TESTREPO_SERVER_ADDR")
    private  String testrepoServerADDR;

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
     * 以下属于委托测试检查表  Entrustment test checklist 简称ETC吧
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
