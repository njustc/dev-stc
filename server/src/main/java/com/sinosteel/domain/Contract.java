package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;

/**
 * @author SongJunju && FW
 */
@Entity
@Table(name = "TBL_SYS_CONTRACTS")
public class Contract extends BaseEntity {


    /**
     * 委托方(甲方)
     */
    @Column(name = "CLIENT")
    private String client;
    public String getClient() {
        return client;
    }
    public void setClient(String client) {
        this.client = client;
    }


    /**
     * 委托方 （乙方）
     */
    @Column(name = "ASSIGNEE")
    private String assignee;
    public String getAssignee() {
        return assignee;
    }
    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }


    /**
     * 签订地点
     */
    @Column(name = "SIGNPLACE")
    private String signPlace;
    public String getSignPlace() {
        return signPlace;
    }
    public void setSignPlace(String signPlace) {
        this.signPlace = signPlace;
    }


    /**
     *签订日期
     */
    @Column(name = "SIGNDATA")
    private String signData;
    public String getSignData() {
        return signData;
    }
    public void setSignData(String signData) {
        this.signData = signData;
    }

    /**
     * 质量特性
     */
    @Column (name = "QUALITY" )
    private String quality;
    public String getQuality() {
        return quality;
    }
    public void setQuality(String quality) {
        this.quality = quality;
    }

    /**
     * 合同价款
     */
    @Column (name = "PRICE")
    private String price;
    public String getPrice() {
        return price;
    }
    public void setPrice(String price) {
        this.price = price;
    }

    /**
     * 履行期限
     */
    @Column (name = "FINISHTIME")
    private String finishTime;
    public String getFinishTime() {
        return finishTime;
    }
    public void setFinishTime( String finishTime){
        this.finishTime = finishTime ;
    }


    /**
     * 委托方--单位全称
     */
    @Column (name = "CLIENTCOMPANYNAME")
    private String clientCompanyName;
    public String getClientCompanyName() {
        return clientCompanyName;
    }
    public void setClientCompanyName(String clientCompanyName) {
        this.clientCompanyName = clientCompanyName;
    }

    /**
     * 委托方--授权代表
     */
    @Column (name = "CLIENTAUTHPEPRE")
    private String clientAuthRepre;
    public String getClientAuthRepre() {
        return clientAuthRepre;
    }
    public void setClientAuthRepre(String clientAuthRepre) {
        this.clientAuthRepre = clientAuthRepre;
    }

    /**
     * 委托方--签章日期
     */
    @Column (name = "CLIENTSIGNDATA")
    private String clientSignData;
    public String getClientSignData() {
        return clientSignData;
    }
    public void setClientSignData(String clientSignData) {
        this.clientSignData = clientSignData;
    }

    /**
     * 委托方--联系人
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
     * 委托方--通讯地址
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
     *委托方--电话
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
     * 委托方--传真
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
     * 委托方--开户银行
     */
    @Column (name = "CLIENTBANK")
    private String clientBank;
    public String getClientBank() {
        return clientBank;
    }
    public void setClientBank(String clientBank) {
        this.clientBank = clientBank;
    }


    /**
     * 委托方--账号
     */
    @Column (name = "CLIENTUSERNAME")
    private String clientUserName;
    public String getClientUserName() {
        return clientUserName;
    }
    public void setClientUserName(String clientUserName) {
        this.clientUserName = clientUserName;
    }

    /**
     * 委托方--邮编
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
     * 受托方--单位全称
     */
    @Column (name = "ASSIGNEECOMPANYNAME")
    private String assigneeCompanyName;
    public String getAssigneeCompanyName() {
        return assigneeCompanyName;
    }

    public void setAssigneeCompanyName(String assigneeCompanyName) {
        this.assigneeCompanyName = assigneeCompanyName;
    }

    /**
     * 受托方--授权代表
     */
    @Column (name = "ASSGINEEAUTHREPRE")
    private String assigneeAuthRepre;
    public String getAssigneeAuthRepre() {
        return assigneeAuthRepre;
    }
    public void setAssigneeAuthRepre(String assigneeAuthRepre) {
        this.assigneeAuthRepre = assigneeAuthRepre;
    }

    /**
     * 受托方--签章日期
     */
    @Column (name = "ASSIGNEESIGNDATA")
    private String assigneeSignData;
    public String getassigneeSignData() {
        return assigneeSignData;
    }
    public void setassigneeSignData(String assigneeSignData) {
        this.assigneeSignData = assigneeSignData;
    }

    /**
     * 受托方--联系人
     */
    @Column (name = "ASSIGNEECONTACT")
    private String assigneeContact;
    public String getAssigneeContact() {
        return assigneeContact;
    }
    public void setAssigneeContact(String assigneeContact) {
        this.assigneeContact = assigneeContact;
    }


    /**
     * 受托方--通讯地址
     */
    @Column (name = "ASSIGNEEADDR")
    private String assigneeAddr;
    public String getAssigneeAddr() {
        return assigneeAddr;
    }
    public void setAssigneeAddr(String assigneeAddr) {
        this.assigneeAddr = assigneeAddr;
    }

    /**
     *受托方--电话
     */
    @Column (name = "ASSIGNEETEL")
    private String assigneeTel;
    public String getAssigneeTel() {
        return assigneeTel;
    }
    public void setAssigneeTel(String assigneeTel) {
        this.assigneeTel = assigneeTel;
    }


    /**
     * 受托方--传真
     */
    @Column (name = "ASSIGNEEFAX")
    private String assigneeFax;
    public String getAssigneeFax() {
        return assigneeFax;
    }

    public void setAssigneeFax(String clientFax) {
        this.clientFax = clientFax;
    }


    /**
     * 受托方--开户银行
     */
    @Column (name = "ASSIGNEEBANK")
    private String assigneeDataBank;

    public String getAssigneeDataBank() {
        return assigneeDataBank;
    }
    public void setAssigneeDataBank(String assigneeDataBank) {
        this.assigneeDataBank = assigneeDataBank;
    }
    /**
     * 受托方--户名
     */
    @Column (name = "ASSIGNEEBANKNAME")
    private String assigneeDataBankName;

    public String getAssigneeDataBankName() {
        return assigneeDataBankName;
    }
    public void setAssigneeDataBankName(String assigneeDataBankName) {
        this.assigneeDataBankName = assigneeDataBankName;
    }

    /**
     * 受托方--账号
     */
    @Column (name = "ASSIGNEEUSERNAME")
    private String assigneeUserName;

    public void setAssigneeUserName(String assigneeUserName) {
        this.assigneeUserName = assigneeUserName;
    }

    public String getAssigneeUserName() {
        return assigneeUserName;
    }

    /**
     * 受托方--邮编
     */
    @Column (name = "ASSIGNEEPOSTCODE")
    private String assigneePostCode;

    public String getAssigneePostCode() {
        return assigneePostCode;
    }

    public void setAssigneePostCode(String assigneePostCode) {
        this.assigneePostCode = assigneePostCode;
    }



    @Column(name = "CONTRACTBODY")
    private String contractBody;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", foreignKey = @ForeignKey(value = ConstraintMode.CONSTRAINT))
    @JSONField(serialize = false)
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "PROCESS_INSTANCE_ID")
    private String processInstanceID;

    public String getProcessInstanceID() {
        return processInstanceID;
    }

    public void setProcessInstanceID(String processInstanceID) {
        this.processInstanceID = processInstanceID;
    }

    // 合同所在的工程
    @OneToOne(mappedBy = "contract")
    @JSONField(serialize = false)
    private Project project;

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    // ===================================

    public String getContractBody() {
        return contractBody;
    }

    public void setContractBody(String contractBody) {
        this.contractBody = contractBody;
    }
}
