package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestPlan;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.TestPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

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


    //以工程为来源查询testplan，但是工程那里并没有设置好
    public JSON queryTestPlans(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestPlans--> query user role: " + user.getRoles().get(0).getRoleName());

        if (user.getRoles().get(0).getRoleName().equals("普通客户")) {
            List<Project> projects = user.getProjects();
            List<TestPlan> testPlans = new ArrayList<TestPlan>();
            for (Project project : projects) {
                testPlans.add(project.getTestPlan());
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

        testPlan = testPlanRepository.findById(temptestPlan.getId());
        return processTestPlan(testPlan);
    }

    //增加测试计划
    public JSONObject addTestPlan(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //String uid=UUID.randomUUID().toString();
        String uid = params.getString("id");
        //check project
        if (projectRepository.findById(uid) == null)
            throw new Exception("Can't find project with ID: " + uid);

        Project project = projectRepository.findById(uid);
        TestPlan testPlan=JSONObject.toJavaObject(params,TestPlan.class);
        testPlan.setId(uid);

        String procID = processInstanceService.createTestPlanProcess(params, user);
        testPlan.setProcessInstanceID(procID);

        //set testplan in project
        project.setTestPlan(testPlan);
        projectRepository.save(project);

        //set project in test plan
        testPlan.setProject(project);
        this.saveEntity(testPlan, user);

        testPlan = testPlanRepository.findById(uid);
        return processTestPlan(testPlan);
    }


    //删除测试计划（不删除相关测试计划文件?）

    public void deleteTestPlan(JSONObject params)
    {
        String uid=params.getString("id");
        //delete testplan from project
        Project project = projectRepository.findById(uid);
        project.setTestPlan(null);

        //delete test plan
        this.deleteEntity(uid);
    }


    private JSONObject processTestPlan(TestPlan testPlan) throws Exception {
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testPlan));
        JSONObject processState = processInstanceService.queryProcessState(testPlan.getProcessInstanceID());
        String state = processState.getString("state");
        String operation = processState.getString("operation");
        jsonObject.put("state", state);
        jsonObject.put("operation", operation);
        return jsonObject;

    }

    private  JSONArray processTestPlans(List<TestPlan> testplans) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestPlan testPlan: testplans) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testPlan));
            jsonObject.remove("testplan");
            JSONObject processState = processInstanceService.queryProcessState(testPlan.getProcessInstanceID());
            String state = processState.getString("state");
            String operation = processState.getString("operation");
            jsonObject.put("state", state);
            jsonObject.put("operation", operation);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
