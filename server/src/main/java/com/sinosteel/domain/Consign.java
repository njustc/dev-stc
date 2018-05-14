package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;


/**
 * @author SongJunju
 */

@Entity
@Table(name = "TBL_SYS_CONSIGN")
public class Consign extends BaseEntity{


    @Column(name = "CONSIGNATION")
    private String consignation;

    @Column(name = "PROCESS_INSTANCE_ID")
    private String processInstanceID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID",foreignKey = @ForeignKey(value = ConstraintMode.CONSTRAINT))
    @JSONField(serialize = false)
    private User user;


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
