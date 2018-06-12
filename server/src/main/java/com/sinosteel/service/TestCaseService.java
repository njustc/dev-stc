package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestCase;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * @author LBW & SQW
 */

@Service
public class TestCaseService extends BaseService<TestCase> {
    @Autowired
    private TestCaseRepository testCaseRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


    //以工程为来源查询testCase
    public JSON queryTestCases(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestCases--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<Project> projects = user.getProjects();
            List<TestCase> testCases = new ArrayList<TestCase>();
            for (Project project: projects){
                testCases.addAll(project.getTestCase());
            }
            //TODO:对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestCases(testCases);
        }
        else
        {
            List<TestCase> testCases = testCaseRepository.findByAllTestCases();
            //对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestCases(testCases);
        }
    }

    public JSONObject queryTestCaseByID(String id) throws Exception{
        TestCase testCase = testCaseRepository.findById(id);
        if (testCase == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testCase));
    }

    //改动测试计划
    public JSONObject editTestCase(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestCase temptestCase = JSONObject.toJavaObject(params, TestCase.class);
        TestCase testCase;
        if ((testCase = this.findEntityById(temptestCase.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试计划时时只编辑内容
        testCase.setBody(temptestCase.getBody());
        this.updateEntity(testCase, user);

        //TODO:return the consign with STATE!
        testCase = testCaseRepository.findById(temptestCase.getId());
        return processTestCase(testCase);
    }

    //增加testCase
    public JSONObject addTestCase(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //String uid=UUID.randomUUID().toString();
        String uid = params.getString("id");
        //check project
        if (projectRepository.findById(uid) == null)
            throw new Exception("Can't find project with ID: " + uid);

        TestCase testCase=JSONObject.toJavaObject(params,TestCase.class);
        testCase.setId(uid);
        testCase.setProject(projectRepository.findById(uid));

        //TODO:start activiti process
        //String procID = processInstanceService.createTestCaseProcess(params, user);
        //testCase.setProcessInstanceID(procID);
        this.saveEntity(testCase, user);

        //TODO:添加testCase状态
        testCase = testCaseRepository.findById(uid);
        return processTestCase(testCase);
    }


    //删除测试计划（不删除相关测试计划文件?）

    public void deleteTestCase(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    //TODO:增加测试计划状态
    private JSONObject processTestCase(TestCase testCase) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testCase.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testCase));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    //去掉测试计划内容,TODO:添加状态
    private  JSONArray processTestCases(List<TestCase> testCases) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestCase testCase: testCases) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testCase));
            jsonObject.remove("testCase");
            //String processState = (String) processInstanceService.queryProcessState(testCase.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
