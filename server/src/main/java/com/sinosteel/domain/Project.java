package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;

@Entity
@Table(name = "TBL_SYS_PROJECT")
public class Project extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID",foreignKey = @ForeignKey(name = "none", value =ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private User user;

    public User getUser(){
        return user;
    }
    public void setUser(User user){
        this.user = user;
    }

    @OneToOne
    @JoinColumn(name = "CONSIGN_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private Consign consign;

    public Consign getConsign(){
        return consign;
    }
    public void setConsign(Consign consign){
        this.consign = consign;
    }

    @OneToOne
    @JoinColumn(name = "CONTRACT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private Contract contract;

    public Contract getContract(){
        return contract;
    }
    public void setContract(Contract contract){
        this.contract = contract;
    }

}
