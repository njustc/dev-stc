package com.sinosteel.activiti;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.Contract;
import com.sinosteel.domain.TestPlan;
import com.sinosteel.domain.User;
import com.sinosteel.framework.core.web.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcessInstanceService {
/*    @Autowired
    private BaseActiviti baseActiviti;*/
    @Autowired
    private TCProcessEngine TCProcessEngine;

    /*开启一个委托实例*/
    public String createConsignProcess(JSONObject params, User user)throws Exception
    {
        Consign consign = JSONObject.toJavaObject(params, Consign.class);
       // return baseActiviti.consignActiviti.createConsignProcess(consign.getId(), user.getId());
        return TCProcessEngine.createConsignProcess(consign.getId(),user.getId());
    }
    /*开启一个合同实例*/
    public String createContractProcess(JSONObject params, User user) throws Exception{
        Contract contract = JSONObject.toJavaObject(params, Contract.class);
        //return baseActiviti.contractActiviti.createContractProcess(contract.getId(), user.getId(),"W0");
        return TCProcessEngine.createContractProcess(contract.getId(),user.getId());
    }

    public String createTestPlanProcess(JSONObject params, User user) throws Exception{
        TestPlan testPlan = JSONObject.toJavaObject(params, TestPlan.class);
        //return baseActiviti.contractActiviti.createContractProcess(contract.getId(), user.getId(),"W0");
        return TCProcessEngine.createContractProcess(testPlan.getId(),user.getId());
    }

    /*更新具体流程实例状态*/
    public JSONObject updateProcessState(String processInstanceID, Request request) throws Exception {
        //baseActiviti.updateProcessInstanceState(processInstanceID,request);
        TCProcessEngine.updateProcess(processInstanceID,request);
        return queryProcessState(processInstanceID);
    }
    /*查询具体流程实例状态*/
    public JSONObject queryProcessState(String processInstanceID) throws Exception {
        String state = TCProcessEngine.getProcessState(processInstanceID);
        JSONObject queryResultJson = new JSONObject();
        queryResultJson.put("processInstanceID",  processInstanceID);
        queryResultJson.put("state", state);
        return queryResultJson;
    }
}
