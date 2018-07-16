package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.databind.ser.Serializers;
import org.junit.Test;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
/**
 * @author SongJunju && FW
 */

/**
 * 测试方案
 */
@Entity
@Table(name = "TBL_SYS_TESTPLANS")
public class TestPlan extends BaseEntity {


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
    @OneToOne(mappedBy = "testPlan")
    @JSONField(serialize = false)
    private Project project;

    public Project getProject(){
        return project;
    }
    public void setProject(Project project){
        this.project = project;
    }


    /**
     * 编制人
     */
    @Column (name = "AUTHOR")
    private String author;
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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
     * 批准人
     */
    @Column (name = "APPROVER")
    private String approver;
    public String getApprover() {
        return approver;
    }
    public void setApprover(String approver) {
        this.approver = approver;
    }

    /**
     *测试环境--硬件
     */
    @Column (name = "HARDWARE")
    private String hardware;
    public String getHardware() {
        return hardware;
    }

    public void setHardware(String hardware) {
        this.hardware = hardware;
    }

    /**
     * 测试环境--软件
     */
    @Column (name = "SOFTWARE")
    private String software;
    public String getSoftware() {
        return software;
    }

    public void setSoftware(String software) {
        this.software = software;
    }


    /**
     * 测试环境--人员
     */
    @Column (name = "STAFF")
    private String staff;
    public String getStaff() {
        return staff;
    }
    public void setStaff(String staff) {
        this.staff = staff;
    }

    /**
     * 测试进度表
     */
    @Column (name = "PROGRESSTABLE")
    private String progressTable;
    public String getProgressTable() {
        return progressTable;
    }
    public void setProgressTable(String progressTable) {
        this.progressTable = progressTable;
    }

}
