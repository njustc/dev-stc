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


    //以工程为来源查询testPlan
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

    public JSON queryTestPlansByProject(String projectID) throws Exception {
        Project project = projectRepository.findById(projectID);
        if(project == null) {
            throw new Exception("can't find project by id: " + projectID);
        }
        TestPlan testPlan = project.getTestPlan();
        if (testPlan == null)
            throw new Exception("can't find consign with project: " + projectID);
        return processTestPlan(testPlan);
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
    public JSONObject addTestPlan(String projectID, JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //随机生成testPlan的id
        String uid= UUID.randomUUID().toString();
        //String uid = params.getString("id");
        //check project
        if (projectRepository.findById(projectID) == null)
            throw new Exception("Can't find project with ID: " + projectID);

        Project project = projectRepository.findById(projectID);
        TestPlan testPlan=JSONObject.toJavaObject(params,TestPlan.class);
        testPlan.setId(uid);

        String procID = processInstanceService.createTestPlanProcess(params, user);
        testPlan.setProcessInstanceID(procID);

        //set testPlan in project
        project.setTestPlan(testPlan);
        projectRepository.save(project);

        //set project in test plan,TODO:考虑user是否为project.getUser()
        testPlan.setProject(project);
        this.saveEntity(testPlan, user);

        testPlan = testPlanRepository.findById(uid);
        return processTestPlan(testPlan);
    }


    //删除测试计划（不删除相关测试计划文件?）

    public void deleteTestPlan(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        TestPlan testPlan = testPlanRepository.findById(uid);
        if (testPlan == null)
            throw new Exception("Can't find testPlan with id: " + uid);
        //delete testplan from project
        Project project = testPlan.getProject();
        project.setTestPlan(null);

        //delete test plan
        this.deleteEntity(uid);
    }


    private JSONObject processTestPlan(TestPlan testPlan) throws Exception {
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testPlan));
        JSONObject processState = processInstanceService.queryProcessState(testPlan.getProcessInstanceID());
        jsonObject.putAll(processState);
        if (testPlan.getProject() != null)
            jsonObject.put("projectID", testPlan.getProject().getId());
        return jsonObject;

    }

    private  JSONArray processTestPlans(List<TestPlan> testplans) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestPlan testPlan: testplans) {
            if (testPlan != null) {
                JSONObject jsonObject = processTestPlan(testPlan);
                //jsonObject.remove("testplan");

                resultArray.add(jsonObject);
            }
        }
        return resultArray;
    }
}
