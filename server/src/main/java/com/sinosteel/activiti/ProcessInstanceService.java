package com.sinosteel.activiti;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.Contract;
import com.sinosteel.domain.User;
import com.sinosteel.framework.core.web.Request;
import org.activiti.engine.form.FormProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springfox.documentation.spring.web.json.Json;

import java.util.List;

/**
 * 定义了流程实例各种操作的接口.
 * @author TC
 */
@Service
public class ProcessInstanceService {
/*    @Autowired
    private BaseActiviti baseActiviti;*/
    @Autowired
    private TCProcessEngine TCProcessEngine;


    /**
     * 开启一个委托实例
     * @param params json对象
     * @param user 创建实例的用户
     * @return 以String形式返回流程实例的ID
     * @throws Exception 创建委托实例失败
     */
    public String createConsignProcess(JSONObject params, User user)throws Exception
    {
        Consign consign = JSONObject.toJavaObject(params, Consign.class);
       // return baseActiviti.consignActiviti.createConsignProcess(consign.getId(), user.getId());
        return TCProcessEngine.createConsignProcess(consign.getId(),user.getId());
    }

    /**
     * 开启一个合同实例
     * @param params json对象
     * @param user 创建实例的用户
     * @return 以String形式返回流程实例的ID
     * @throws Exception 创建合同实例失败
     */
    public String createContractProcess(JSONObject params, User user) throws Exception{
        Contract contract = JSONObject.toJavaObject(params, Contract.class);
        //return baseActiviti.contractActiviti.createContractProcess(contract.getId(), user.getId(),"W0");
        return TCProcessEngine.createContractProcess(contract.getId(),user.getId());
    }

    /**
     * 开启一个测试方案
     * @param params json对象
     * @param user 创建实例的用户
     * @return 以String形式返回流程实例的ID
     * @throws Exception 创建测试方案失败
     */
    public String createTestPlanProcess(JSONObject params, User user) throws Exception{
        //TestCase testCase = JSONObject.toJavaObject(params, TestCase.class);
        //return baseActiviti.contractActiviti.createContractProcess(contract.getId(), user.getId(),"W0");
        return TCProcessEngine.createTestplanProcess();
    }

    /**
     * 开启一个测试报告
     * @param params json对象
     * @param user 创建实例的用户
     * @return 以String形式返回流程实例的ID
     * @throws Exception 创建测试报告失败
     */
    public String createTestReportProcess(JSONObject params, User user) throws Exception{
        //TestReport testReport = JSONObject.toJavaObject(params, TestReport.class);
        //return baseActiviti.contractActiviti.createContractProcess(contract.getId(), user.getId(),"W0");
        return TCProcessEngine.createTestreportProcess(user.getId());
    }

    /**
     * 更新具体流程实例状态
     * @param processInstanceID 流程实例的ID
     * @param request 要执行的操作、请求
     * @return 对象在流程中的状态
     * @throws Exception 更新流程实例状态失败
     */
    public JSONObject updateProcessState(String processInstanceID, Request request) throws Exception {
        //baseActiviti.updateProcessInstanceState(processInstanceID,request);
        TCProcessEngine.updateProcess(processInstanceID,request);
        return queryProcessState(processInstanceID);
    }

    /**
     * 查询具体流程实例状态
     * @param processInstanceID 流程实例的ID
     * @return json对象
     * @throws Exception 查询流程实例状态失败
     */
    public JSONObject queryProcessState(String processInstanceID) throws Exception {
        String state = TCProcessEngine.getProcessState(processInstanceID);
        List<String> operation = TCProcessEngine.getUserOperation(processInstanceID);
        String assigee=TCProcessEngine.getTaskAssignee(processInstanceID);
        JSONObject queryResultJson = new JSONObject();
        queryResultJson.put("processInstanceID",  processInstanceID);
        queryResultJson.put("state", state);
        queryResultJson.put("operation", operation);
        queryResultJson.put("assignee",assigee);
        return queryResultJson;
    }


    /**
     * 获取当前task的用户权限
     * @param processInstanceID 流程实例的ID
     * @return json对象
     * @throws Exception 获取当前任务的用户权限失败
     */
    public JSONObject getUserOperation(String processInstanceID) throws Exception {
        List<String> operation = TCProcessEngine.getUserOperation(processInstanceID);
        JSONObject userOperationJson = new JSONObject();
        userOperationJson.put("processInstanceID",  processInstanceID);
        userOperationJson.put("operation", operation);
        return userOperationJson;
    }


    /**
     * 查询具体流程实例的历史任务信息
     * @param processInstanceID 流程实例的ID
     * @return json对象
     * @throws Exception 查询具体流程实例的历史任务信息失败
     */
    public JSONObject getHistoricTasks(String processInstanceID) throws Exception {
        List<String> operation = TCProcessEngine.queryHistoricTask(processInstanceID);
        JSONObject historicTaskJson = new JSONObject();
        historicTaskJson.put("processInstanceID",  processInstanceID);
        historicTaskJson.put("TaskInfors", operation);
        return historicTaskJson;
    }


    /**
     * 获取当前task的用户类型
     * @param processInstanceID 流程实例的ID
     * @return json对象
     * @throws Exception 获取当前任务的用户类型失败
     */
    public JSONObject getUserType(String processInstanceID) throws Exception{
        String userType=TCProcessEngine.getTaskAssignee(processInstanceID);
        JSONObject getUserTypeJson=new JSONObject();
        getUserTypeJson.put("processInstanceID",processInstanceID);
        getUserTypeJson.put("UserType",getUserTypeJson);
        return getUserTypeJson;
    }


    /**
     * 获取用户意见
     * @param processInstanceID 流程实例的ID
     * @return json对象
     * @throws Exception 获取用户意见失败
     */
   public JSONObject getComments(String processInstanceID) throws Exception
    {
        List<String> formProperties=TCProcessEngine.getComments(processInstanceID);
        String task=TCProcessEngine.getLastTask(processInstanceID);
        JSONObject getTaskDataJson=new JSONObject();
        getTaskDataJson.put("processInstanceID",processInstanceID);
        getTaskDataJson.put("taskName",task);
        getTaskDataJson.put("comments",formProperties);
        return  getTaskDataJson;
    }
}
