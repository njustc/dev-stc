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

//    @Column(name = "SOFTWARENAME")
//    private String  sotfwareName;
//
//    @Column(name = "COMPANY_EN")
//    private String company_En;
//
//    @Column(name = "COMPANY_CH")
//    private String company_Ch;
//
//    @Column(name = "DEVELOPER")
//    private String developer;
//
//    @Column(name = "UNITPROPERTY")
//    private List<String> unitProperty;
//
//    @Column(name = "USER_DESCRIPTION")
//    private String  user_Description;
//
//    @Column(name = "FUNC_DESCRIPTION")
//    private String  func_Description;
//
//    @Column(name = "TEST_BASIS")
//    private List<String> test_Basis;
//
//    @Column(name = "TEST_SPECIFICATION")
//    private List<String> test_Specification;
//
//    @Column(name = "FUNC_NUM")
//    private String func_num;
//
//    @Column(name = "FP_NUM")
//    private String fp_num;
//
//    @Column(name = "CODELINE")
//    private String codeLine;
//
//    @Column(name = "SOFT_SYS")
//    private String softSys;
//
//    @Column(name = "SOFT_SUPPORT")
//    private String softSupport;
//
//    @Column(name = "SOFT_APP")
//    private String softApp;
//
//    @Column(name = "SOFT_OTHER")
//    private String softOther;
//
//    @ElementCollection
//    @Column(name = "CLIENT_SYS")
//    private List<String> client_Sys;
//
//    @Column(name = "CLIENT_INSTORAGE")
//    private String client_inStorage;
//
//    @Column(name = "CLIENT_EXSTORAGE")
//    private String client_exStorage;
//
//    @Column(name = "CLIENT_OTHER")
//    private String client_other;
//
//    @Column(name = "SERVER_FRAME")
//    private List<String> server_Frame;
//
//    @Column(name = "SERVER_INSTORAGE")
//    private String server_inStorage;
//
//    @Column(name = "SERVER_EXSTORAGE")
//    private String server_exStorage;
//
//    @Column(name = "SERVER_OTHER")
//    private String server_other;
//
//    @Column(name = "SERVER_SYS")
//    private String server_Sys;
//
//    @Column(name = "SERVER_LAN")
//    private String server_lan;
//
//    @Column(name = "SERVER_SUPPORT")
//    private String server_support;
//
//    @Column(name = "WEBENV")
//    private String webEnv;
//
//    @Column(name = "SAMPLE_TYPE")
//    private String sampleType;
//
//    @Column(name = "SAMPLE_FILE")
//    private String sampleFile;
//
//    @Column(name = "SAMPLE_CHOICE")
//    private String sampleChoice;
//
//    @Column(name = "SAMPLE_TIME")
//    private String sampleTime;
//
//    @Column(name = "CONSIGN_TEL")
//    private String consignTEL;
//
//    @Column(name = "CONSIGN_FAX")
//    private String consignFAX;
//
//    @Column(name = "CONSIGN_ADDR")
//    private String consignAddr;
//
//    @Column(name = "CONSIGN_CODE")
//    private String consignCODE;
//
//    @Column(name = "CONSIGN_NAME")
//    private String consignName;
//
//    @Column(name = "CONSIGN_PHONE")
//    private String consignPhone;
//
//    @Column(name = "CONSIGN_EMAIL")
//    private String consignEmail;
//
//    @Column(name = "CONSIGN_WEB")
//    private String consignWEB;
//
//    @Column(name = "OTHER_ENCRYPT")
//    private String otherEncrypt;
//
//    @Column(name = "OTHER_VIRUS")
//    private String otherVirus;
//
//    @Column(name = "OTHER_SAMPLE")
//    private List<String> otherEncrypt2;
//
//    @ElementCollection
//    @Column(name = "OTHER_REDOC")
//    private  List<String> otherREDOC;
//
//    @ElementCollection
//    @Column(name = "OTHER_USERDOC")
//    private  List<String> otherUSERDOC;
//
//    @ElementCollection
//    @Column(name = "OTHER_OPDOC")
//    private  List<String> otherOPDOC;
//
//    @Column(name = "OTHER_INFO")
//    private String otherInfo;
//
//    @Column(name = "OTHER_CHECK")
//    private  String otherCheck;
//
//    @Column(name = "OTHER_DEAL")
//    private  String otherDeal;
//
//    @Column(name = "OTHER_PROJECTID")
//    private  String otherProjectId;

    /*
    @Column(name = "OTHER_PS")
    private  String otherPS;

    @Column(name = "OTHER_SIGN")
    private  List<String> otherSIGN;
    */

    /**
     * @author FW
     * 以下属于委托测试功能表
     */

//    @Column(name = "FUNCTEST_NAME")
//    private  String functestName;
//
//    @Column(name = "FUNCTEST_ID")
//    private  String functestID;
//
//    @Column(name = "FUNCTEST_M1_NAME")
//    private  String functestM1Name;
//
//    @Column(name = "FUNCTEST_M1_INFO")
//    private  String functestM1INFO;
//
//    @Column(name = "FUNCTEST_M2_NAME")
//    private  String functestM2Name;
//
//    @Column(name = "FUNCTEST_M2_INFO")
//    private  String functestM2INFO;
//
//    @Column(name = "FUNCTEST_M3_NAME")
//    private  String functestM3Name;
//
//    @Column(name = "FUNCTEST_M3_INFO")
//    private  String functestM3INFO;
//
//    @Column(name = "FUNCTEST_M4_NAME")
//    private  String functestM4Name;
//
//    @Column(name = "FUNCTEST_M4_INFO")
//    private  String functestM4INFO;
//
//    @Column(name = "FUNCTEST_M5_NAME")
//    private  String functestM5Name;
//
//    @Column(name = "FUNCTEST_M5_INFO")
//    private  String functestM5INFO;
//
//    @Column(name = "FUNCTEST_M6_NAME")
//    private  String functestM6Name;
//
//    @Column(name = "FUNCTEST_M6_INFO")
//    private  String functestM6INFO;
//
//    @Column(name = "FUNCTEST_M7_NAME")
//    private  String functestM7Name;
//
//    @Column(name = "FUNCTEST_M7_INFO")
//    private  String functestM7INFO;
//
//    @Column(name = "FUNCTEST_M8_NAME")
//    private  String functestM8Name;
//
//    @Column(name = "FUNCTEST_M8_INFO")
//    private  String functestM8INFO;
//
//    @Column(name = "FUNCTEST_M9_NAME")
//    private  String functestM9Name;
//
//    @Column(name = "FUNCTEST_M9_INFO")
//    private  String functestM9INFO;
//
//    @Column(name = "FUNCTEST_M10_NAME")
//    private  String functestM10Name;
//
//    @Column(name = "FUNCTEST_M10_INFO")
//    private  String functestM10INFO;
//
//    @Column(name = "FUNCTEST_M11_NAME")
//    private  String functestM11Name;
//
//    @Column(name = "FUNCTEST_M11_INFO")
//    private  String functestM11INFO;
//
//    @Column(name = "FUNCTEST_M12_NAME")
//    private  String functestM12Name;
//
//    @Column(name = "FUNCTEST_M12_INFO")
//    private  String functestM12INFO;
//
//    @Column(name = "FUNCTEST_M13_NAME")
//    private  String functestM13Name;
//
//    @Column(name = "FUNCTEST_M13_INFO")
//    private  String functestM13INFO;
//
//    @Column(name = "FUNCTEST_M14_NAME")
//    private  String functestM14Name;
//
//    @Column(name = "FUNCTEST_M14_INFO")
//    private  String functestM14INFO;
//
//    @Column(name = "FUNCTEST_M15_NAME")
//    private  String functestM15Name;
//
//    @Column(name = "FUNCTEST_M15_INFO")
//    private  String functestM15INFO;
//
//    @Column(name = "FUNCTEST_M16_NAME")
//    private  String functestM16Name;
//
//    @Column(name = "FUNCTEST_M16_INFO")
//    private  String functestM16INFO;
//
//
//    /**
//     * @author FW
//     * 以下属于软件测试报告
//     */
//    @Column(name = "TESTREPO_COMPANY")
//    private  String testrepoCompany;
//
//    @Column(name = "TESTREPO_ID")
//    private  String testrepoID;
//
//    @Column(name = "TESTREPO_NAME")
//    private  String testrepoName;
//
//    @Column(name = "TESTREPO_VERSION")
//    private  String testrepoVersion;
//
//    @Column(name = "TESTREPO_COMETIME")
//    private  String testrepoComeTime;
//
//    @Column(name = "TESTREPO_TESTTIME")
//    private  String testrepoTesyTime;
//
//    @Column(name = "TESTREPO_RELY")
//    private  String testrepoRely;
//
//    @ElementCollection
//    @Column(name = "TESTREPO_SAMPLE")
//    private  List<String> testrepoSample;
//
//    @ElementCollection
//    @Column(name = "TESTREPO_SAMPLEDOC")
//    private  List<String> testrepoSampleDoc;
//
//    @Column(name = "TESTREPO_CONCLUDE")
//    private  String testrepoConclude;
//
//    @Column(name = "TESTREPO_EXECUTOR")
//    private  String testrepoExecutor;
//
//    @Column(name = "TESTREPO_EXECUTOR_Time")
//    private  String testrepoExecutorTime;
//
//    @Column(name = "TESTREPO_AUDITOR")
//    private  String testrepoAuditor;
//
//    @Column(name = "TESTREPO_AUDITOR_TIME")
//    private  String testrepoAuditorTime;
//
//    @Column(name = "TESTREPO_APPROVER")
//    private  String testrepoApprover;
//
//    @Column(name = "TESTREPO_APPROVER_TIME")
//    private  String testrepoApproverTime;
//
//    @Column(name = "TESTREPO_CLIENT_PHONE")
//    private  String testrepoClientPhone;
//
//    @Column(name = "TESTREPO_CLIENT_FAX")
//    private  String testrepoClientFAX;
//
//    @Column(name = "TESTREPO_CLIENT_ADDR")
//    private  String testrepoClientADDR;
//
//    @Column(name = "TESTREPO_CLIENT_CODE")
//    private  String testrepoClientCODE;
//
//    @Column(name = "TESTREPO_CLIENT_NAME")
//    private  String testrepoClientName;
//
//    @Column(name = "TESTREPO_CLIENT_Email")
//    private  String testrepoClientEmail;
//
//    @Column(name = "TESTREPO_SERVER_PHONE")
//    private  String testrepoServerPhone;
//
//    @Column(name = "TESTREPO_SERVER_FAX")
//    private  String testrepoServerFAX;
//
//    @Column(name = "TESTREPO_SERVER_ADDR")
//    private  String testrepoServerADDR;
//
//    @Column(name = "TESTREPO_SERVER_CODE")
//    private  String testrepoServerCODE;
//
//    @Column(name = "TESTREPO_SERVER_NAME")
//    private  String testrepoServerName;
//
//    @Column(name = "TESTREPO_SERVER_Email")
//    private  String testrepoServerEmail;







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
