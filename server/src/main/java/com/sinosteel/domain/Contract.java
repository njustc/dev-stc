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
