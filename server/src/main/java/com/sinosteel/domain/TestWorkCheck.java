package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;


/**
 * @author SongJunju
 */

/**
 * 测试工作检查表
 */
@Entity
@Table(name = "TBL_SYS_TESTWORKCHECKS")
public class TestWorkCheck extends BaseEntity{

    /**
     * 详细字段未定
     * 暂时先用来存储
     */
    @Column(name = "BODY")
    private String body;

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
     * 软件名称
     */
    @Column(name = "SOFTWARENAME")
    private String softwarename;

    public String getSoftwarename() {
        return softwarename;
    }

    public void setSoftwarename(String softwarename) {
        this.softwarename = softwarename;
    }

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
     * 委托单位
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
     * 起始时间 _年_月_日
     */
    @Column(name = "STARTTIME")
    private String starttime;

    public String getStarttime() {
        return starttime;
    }

    public void setStarttime(String starttime) {
        this.starttime = starttime;
    }

    /**
     * 预计完成时间 _年_月_日
     */
    @Column(name = "FCENDTIME")
    private String fcendtime;

    public String getFcendtime() {
        return fcendtime;
    }

    public void setFcendtime(String fcendtime) {
        this.fcendtime = fcendtime;
    }

    /**
     * 主测人
     */
    @Column(name = "TESTWORKDER")
    private String testworker;

    public String getTestworker() {
        return testworker;
    }

    public void setTestworker(String testworker) {
        this.testworker = testworker;
    }

    /**
     * 实际完成时间
     */
    @Column(name = "ACENDTIME")
    private String acendtime;

    public String getAcendtime() {
        return acendtime;
    }

    public void setAcendtime(String acendtime) {
        this.acendtime = acendtime;
    }


    /**
     * Project外键
     */
    @OneToOne(mappedBy = "testWorkCheck")
    @JSONField(serialize = false)
    private Project project;

    public Project getProject(){
        return project;
    }
    public void setProject(Project project){
        this.project = project;
    }
}
