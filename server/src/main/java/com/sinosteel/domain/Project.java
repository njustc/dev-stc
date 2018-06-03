package com.sinosteel.domain;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "TBL_SYS_PROJECTS")
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONSIGN_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private Consign consign;

    public Consign getConsign(){
        return consign;
    }
    public void setConsign(Consign consign){
        this.consign = consign;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONTRACT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private Contract contract;

    public Contract getContract(){
        return contract;
    }
    public void setContract(Contract contract){
        this.contract = contract;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TESTREPORT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private TestReport testReport;

    public TestReport getTestReport(){
        return testReport;
    }

    public void setTestReport(TestReport testReport){
        this.testReport = testReport;
    }

    public List<TestResult> getTestResults() {
        return testResults;
    }

    public void setTestResults(List<TestResult> testResults) {
        this.testResults = testResults;
    }

    public List<TestPlan> getTestPlans() {
        return testPlans;
    }

    public void setTestPlans(List<TestPlan> testPlans) {
        this.testPlans = testPlans;
    }

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private List<TestResult> testResults;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name ="PROJECT_ID",foreignKey = @ForeignKey(name = "none",value = ConstraintMode.NO_CONSTRAINT))
    @JSONField(serialize = false)
    private List<TestPlan> testPlans;


}
