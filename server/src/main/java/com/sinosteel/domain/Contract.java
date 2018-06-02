package com.sinosteel.domain;


import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;

/**
 * @author Songjunju
 */

@Entity
@Table(name = "TBL_SYS_CONTRACT")
public class Contract extends BaseEntity {

    @Column(name = "CONTRACTBODY")
    private String contractBody;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID",foreignKey = @ForeignKey(value = ConstraintMode.CONSTRAINT))
    @JSONField(serialize = false)
    private User user;
    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    @Column(name = "PROCESS_INSTANCE_ID")
    private String processInstanceID;
    public String getProcessInstanceID()
    {
        return processInstanceID;
    }
    public void setProcessInstanceID(String processInstanceID){this.processInstanceID = processInstanceID;}

    //合同所在的工程
    @OneToOne(mappedBy = "contract")
    @JSONField(serialize = false)
    private Project project;
    public Project getProject(){
        return project;
    }

    public void setProject(Project project){
        this.project = project;
    }
    //===================================


    public String getContractBody()
    {
        return contractBody;
    }

    public void setContractBody(String contractBody)
    {
        this.contractBody = contractBody;
    }
}
