package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestFunction;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.TestFunctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * @author LBW & SQW
 */

@Service
public class TestFunctionService extends BaseService<TestFunction> {
    @Autowired
    private TestFunctionRepository testFunctionRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


    //以工程为来源查询testCase
    public JSON queryTestFunctions(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestCases--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<Project> projects = user.getProjects();
            List<TestFunction> testFunctions = new ArrayList<TestFunction>();
            for (Project project: projects){
                testFunctions.addAll(project.getTestFunctions());
            }
            //TODO:对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestFunctions(testFunctions);
        }
        else
        {
            List<TestFunction> testFunctions = testFunctionRepository.findByAllTestFunctions();
            //对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestFunctions(testFunctions);
        }
    }

    public JSONObject queryTestFunctionByID(String id) throws Exception{
        TestFunction testFunction = testFunctionRepository.findById(id);
        if (testFunction == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testFunction));
    }

    //改动测试计划
    public JSONObject editTestFunction(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestFunction temptestFunction = JSONObject.toJavaObject(params, TestFunction.class);
        TestFunction testFunction;
        if ((testFunction = this.findEntityById(temptestFunction.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试计划时时只编辑内容
        testFunction.setBody(temptestFunction.getBody());
        this.updateEntity(testFunction, user);

        //TODO:return the consign with STATE!
        testFunction = testFunctionRepository.findById(temptestFunction.getId());
        return processTestFunction(testFunction);
    }

    //增加testCase
    public JSONObject addTestFunction(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //String uid=UUID.randomUUID().toString();
        String uid = params.getString("id");
        //check project
        if (projectRepository.findById(uid) == null)
            throw new Exception("Can't find project with ID: " + uid);

        TestFunction testFunction=JSONObject.toJavaObject(params,TestFunction.class);
        testFunction.setId(uid);
        testFunction.setProject(projectRepository.findById(uid));

        //TODO:start activiti process
        //String procID = processInstanceService.createTestCaseProcess(params, user);
        //testCase.setProcessInstanceID(procID);
        this.saveEntity(testFunction, user);

        //TODO:添加testCase状态
        testFunction = testFunctionRepository.findById(uid);
        return processTestFunction(testFunction);
    }


    //删除测试计划（不删除相关测试计划文件?）

    public void deleteTestFunction(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    //TODO:增加测试计划状态
    private JSONObject processTestFunction(TestFunction testFunction) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testCase.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testFunction));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    //去掉测试计划内容,TODO:添加状态
    private  JSONArray processTestFunctions(List<TestFunction> testFunctions) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestFunction testFunction: testFunctions) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testFunction));
            jsonObject.remove("testFunction");
            //String processState = (String) processInstanceService.queryProcessState(testCase.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
