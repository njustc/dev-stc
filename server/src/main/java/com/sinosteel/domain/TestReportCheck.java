package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
/**
 * @author SongJunju && FW
 */

/**
 * 测试记录检查表
 */
@Entity
@Table(name = "TBL_SYS_TESTREPORTCHECKS")
public class TestReportCheck extends BaseEntity{

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
     * 连接Project的外键
     */
    @OneToOne(mappedBy = "testReportCheck")
    @JSONField(serialize = false)
    private Project project;

    public Project getProject(){
        return project;
    }
    public void setProject(Project project){
        this.project = project;
    }

    /**
     * 软件名称
     */
    @Column (name = "SOFTWARENAME")
    private String softwareName;

    public String getSoftwareName() {
        return softwareName;
    }
    public void setSoftwareName(String softwareName) {
        this.softwareName = softwareName;
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
     * 检查内容 （下面的表）
     */
    @Column (name = "CHECKBODY")
    private String checkBody;

    public String getCheckBody() {
        return checkBody;
    }

    public void setCheckBody(String checkBody) {
        this.checkBody = checkBody;
    }

    /**
     * 检查人
     */
    @Column (name = "CHECKMAN")
    private String checkMan;

    public String getCheckMan() {
        return checkMan;
    }

    public void setCheckMan(String checkMan) {
        this.checkMan = checkMan;
    }

    /**
     * 检查日期
     */
    @Column (name = "CHECKDATA")
    private String checkData;

    public String getCheckData() {
        return checkData;
    }

    public void setCheckData(String checkData) {
        this.checkData = checkData;
    }
}
