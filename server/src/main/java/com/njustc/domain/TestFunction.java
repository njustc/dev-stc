package com.njustc.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;

/**
 * @author SongJunju
 */

/**
 * 软件功能表
 */
@Entity
@Table(name = "TBL_SYS_TESTFUNCTIONS")
public class TestFunction extends BaseEntity {

    /**
     * 软件功能表文档整体
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
     * 对应的项目
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

}
