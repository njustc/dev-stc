package com.sinosteel.activiti;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.domain.*;
import com.sinosteel.framework.core.web.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springfox.documentation.spring.web.json.Json;

import java.util.List;

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

    /*开启一个测试方案*/
    public String createTestPlanProcess(JSONObject params, User user) throws Exception{
        //TestCase testCase = JSONObject.toJavaObject(params, TestCase.class);
        //return baseActiviti.contractActiviti.createContractProcess(contract.getId(), user.getId(),"W0");
        return TCProcessEngine.createTestplanProcess();
    }
    /*开启一个测试报告*/
    public String createTestReportProcess(JSONObject params, User user) throws Exception{
        //TestReport testReport = JSONObject.toJavaObject(params, TestReport.class);
        //return baseActiviti.contractActiviti.createContractProcess(contract.getId(), user.getId(),"W0");
        return TCProcessEngine.createTestreportProcess();
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

    /*获取当前task的用户权限*/
    public JSONObject getUserOperation(String processInstanceID) throws Exception {
        List<String> operation = TCProcessEngine.getUserOperation(processInstanceID);
        JSONObject userOperationJson = new JSONObject();
        userOperationJson.put("processInstanceID",  processInstanceID);
        userOperationJson.put("operation", operation);
        return userOperationJson;
    }
}
