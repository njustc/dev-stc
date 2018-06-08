package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.TestResult;
import com.sinosteel.domain.User;
import com.sinosteel.domain.Project;
import com.sinosteel.repository.TestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * @author LBW & SQW
 */

@Service
public class TestResultService extends BaseService<TestResult> {
    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


    //以工程为来源查询testResult，但是工程那里并没有设置好，TODO:设置好工程
    /*public JSON queryTestResults(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestResults--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<TestResult> testResults = user.getTestResults();
            //TODO:对测试结果进行处理，去掉具体内容,并且添加测试结果状态
            return processTestResults(testResults);
        }
        else
        {
            List<TestResult> testResults = testResultRepository.findByAllTestResults();
            //对测试结果进行处理，去掉具体内容,并且添加测试结果状态
            return processTestResults(testResults);
        }
    }*/

    public JSONObject queryTestResultByID(String id) throws Exception{
        TestResult testResult = testResultRepository.findById(id);
        if (testResult == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testResult));
    }

    //改动测试结果
    public JSONObject editTestResult(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestResult temptestResult = JSONObject.toJavaObject(params, TestResult.class);
        TestResult testResult;
        if ((testResult = this.findEntityById(temptestResult.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试结果时只编辑内容
        testResult.setResult(temptestResult.getResult());
        this.updateEntity(testResult, user);

        //TODO:return the testResult with STATE!
        testResult = testResultRepository.findById(temptestResult.getId());
        return processTestResult(testResult);
    }

    //增加测试结果
    public JSONObject addTestResult(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        String uid=UUID.randomUUID().toString();

        TestResult testResult=JSONObject.toJavaObject(params,TestResult.class);
        testResult.setId(uid);
        /*testResult.setUser(user);*/

        //TODO:start activiti process
        //String procID = processInstanceService.createTestResultProcess(params, user);
        //testResult.setProcessInstanceID(procID);
        this.saveEntity(testResult, user);

        //TODO:添加testResult状态
        testResult = testResultRepository.findById(uid);
        return processTestResult(testResult);
    }


    //删除测试结果（不删除相关测试结果文件?）

    public void deleteTestResult(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    //TODO:增加测试结果状态
    private JSONObject processTestResult(TestResult testResult) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testResult.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testResult));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    //去掉测试结果内容,TODO:添加状态
    private  JSONArray processTestResults(List<TestResult> testResults) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestResult testResult: testResults) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testResult));
            jsonObject.remove("testResult");
            //String processState = (String) processInstanceService.queryProcessState(testResult.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
