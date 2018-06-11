package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.TestPlan;
import com.sinosteel.domain.User;
import com.sinosteel.domain.Project;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.TestPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @author LBW & SQW
 */

@Service
public class TestPlanService extends BaseService<TestPlan> {
    @Autowired
    private TestPlanRepository testPlanRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;

    @Autowired
    private ProjectRepository projectRepository;


    //以工程为来源查询testplan，但是工程那里并没有设置好，TODO:设置好工程
    public JSON queryTestPlans(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestPlans--> query user role: " + user.getRoles().get(0).getRoleName());

        if (user.getRoles().get(0).getRoleName().equals("普通客户")) {
            List<Project> projects = user.getProjects();
            List<TestPlan> testPlans = new ArrayList<TestPlan>();
            for (Project project : projects) {
                testPlans.add(project.getTestPlan());
                //TODO:对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            }
            return processTestPlans(testPlans);
        }
        else {
            List<TestPlan> testplans = testPlanRepository.findByAllTestPlans();
            //对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestPlans(testplans);
        }
    }

    public JSONObject queryTestPlanByID(String id) throws Exception{
        TestPlan testPlan = testPlanRepository.findById(id);
        if (testPlan == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testPlan));
    }

    //改动测试计划
    public JSONObject editTestPlan(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestPlan temptestPlan = JSONObject.toJavaObject(params, TestPlan.class);
        TestPlan testPlan;
        if ((testPlan = this.findEntityById(temptestPlan.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试计划时时只编辑内容
        testPlan.setBody(temptestPlan.getBody());
        this.updateEntity(testPlan, user);

        //TODO:return the consign with STATE!
        testPlan = testPlanRepository.findById(temptestPlan.getId());
        return processTestPlan(testPlan);
    }

    //增加测试计划
    public JSONObject addTestPlan(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //String uid=UUID.randomUUID().toString();
        String uid = params.getString("id");

        TestPlan testPlan=JSONObject.toJavaObject(params,TestPlan.class);
        testPlan.setId(uid);
        Project project = projectRepository.findById(uid);
        project.setTestPlan(testPlan);
        /*testplan.setUser(user);*/

        //TODO:start activiti process
       // String procID = processInstanceService.createTestPlanProcess(params, user);
        //testplan.setProcessInstanceID(procID);
        this.saveEntity(testPlan, user);

        //TODO:添加testplan状态
        testPlan = testPlanRepository.findById(uid);
        return processTestPlan(testPlan);
    }


    //删除测试计划（不删除相关测试计划文件?）

    public void deleteTestPlan(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    //TODO:增加测试计划状态
    private JSONObject processTestPlan(TestPlan testPlan) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testPlan.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testPlan));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    //去掉测试计划内容,TODO:添加状态
    private  JSONArray processTestPlans(List<TestPlan> testplans) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestPlan testPlan: testplans) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testPlan));
            jsonObject.remove("testplan");
            //String processState = (String) processInstanceService.queryProcessState(testPlan.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
