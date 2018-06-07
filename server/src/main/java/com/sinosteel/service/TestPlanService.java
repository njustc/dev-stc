package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.TestCase;
import com.sinosteel.domain.User;
import com.sinosteel.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * @author LBW & SQW
 */

@Service
public class TestPlanService extends BaseService<TestCase> {
    @Autowired
    private TestCaseRepository testplanRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


    //以工程为来源查询testplan，但是工程那里并没有设置好，TODO:设置好工程
    /*public JSON queryTestPlans(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestPlans--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<TestCase> testplans = user.getTestPlans();
            //TODO:对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestPlans(testplans);
        }
        else
        {
            List<TestCase> testplans = testplanRepository.findByAllTestPlans();
            //对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestPlans(testplans);
        }
    }*/

    public JSONObject queryTestPlanByID(String id) throws Exception{
        TestCase testplan = testplanRepository.findById(id);
        if (testplan == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testplan));
    }

    //改动测试计划
    public JSONObject editTestPlan(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestCase temptestplan = JSONObject.toJavaObject(params, TestCase.class);
        TestCase testplan;
        if ((testplan = this.findEntityById(temptestplan.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试计划时时只编辑内容
        testplan.setTestcase(temptestplan.getTestcase());
        this.updateEntity(testplan, user);

        //TODO:return the consign with STATE!
        testplan = testplanRepository.findById(temptestplan.getId());
        return processTestPlan(testplan);
    }

    //增加测试计划
    public JSONObject addTestPlan(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        String uid=UUID.randomUUID().toString();

        TestCase testplan=JSONObject.toJavaObject(params,TestCase.class);
        testplan.setId(uid);
        /*testplan.setUser(user);*/

        //TODO:start activiti process
        //String procID = processInstanceService.createTestPlanProcess(params, user);
        //testplan.setProcessInstanceID(procID);
        this.saveEntity(testplan, user);

        //TODO:添加testplan状态
        testplan = testplanRepository.findById(uid);
        return processTestPlan(testplan);
    }


    //删除测试计划（不删除相关测试计划文件?）

    public void deleteTestPlan(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    //TODO:增加测试计划状态
    private JSONObject processTestPlan(TestCase testplan) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testplan.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testplan));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    //去掉测试计划内容,TODO:添加状态
    private  JSONArray processTestPlans(List<TestCase> testplans) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestCase testplan: testplans) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testplan));
            jsonObject.remove("testplan");
            //String processState = (String) processInstanceService.queryProcessState(testplan.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
