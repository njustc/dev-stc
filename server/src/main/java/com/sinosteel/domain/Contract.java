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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONSIGN_ID")
    @JSONField(serialize = false)
    private Consign consign;

    public Consign getConsign(){
        return consign;
    }

    public void setConsign(Consign consign){
        this.consign = consign;
    }

    public String getContractBody()
    {
        return contractBody;
    }

    public void setContractBody(String contractBody)
    {
        this.contractBody = contractBody;
    }
}
