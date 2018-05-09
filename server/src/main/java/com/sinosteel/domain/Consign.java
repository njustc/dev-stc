package com.sinosteel.domain;

import javax.persistence.*;


/**
 * @author SongJunju
 */

@Entity
@Table(name = "TBL_SYS_CONSIGN")
@Inheritance(strategy = InheritanceType.JOINED)
public class Consign extends BaseEntity{
    @Column(name = "CONSIGNATION")
    private String consignation;

    @Column(name = "CONSIGNID")
    private String consignid;

    public String getConsignation() {
        return consignation;
    }

    public void setConsignation(String consignation) {
        this.consignation = consignation;
    }

    public String getConsignid()
    {
        return consignid;
    }
    public void setConsignid(String consignid){this.consignid = consignid;}
}
