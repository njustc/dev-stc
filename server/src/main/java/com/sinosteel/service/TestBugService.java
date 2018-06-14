package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.TestBug;
import com.sinosteel.domain.User;
import com.sinosteel.domain.Project;
import com.sinosteel.repository.TestBugRepository;
import com.sinosteel.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

/**
 * @author LBW & SQW
 */

@Service
public class TestBugService extends BaseService<TestBug> {
    @Autowired
    private TestBugRepository testBugRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


    //以工程为来源查询testBug
    public JSON queryTestBugs(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestCases--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<Project> projects = user.getProjects();
            List<TestBug> testBugs = new ArrayList<TestBug>();
            for (Project project: projects){
                testBugs.addAll(project.getTestBugs());
            }
            //TODO:对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestBugs(testBugs);
        }
        else
        {
            List<TestBug> testBugs = testBugRepository.findByAllTestBugs();
            //对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestBugs(testBugs);
        }
    }

    public JSONObject queryTestBugByID(String id) throws Exception{
        TestBug testBug = testBugRepository.findById(id);
        if (testBug == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testBug));
    }

    //改动测试计划
    public JSONObject editTestBug(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestBug temptestBug = JSONObject.toJavaObject(params, TestBug.class);
        TestBug testBug;
        if ((testBug = this.findEntityById(temptestBug.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试计划时时只编辑内容
        testBug.setBody(temptestBug.getBody());
        this.updateEntity(testBug, user);

        //TODO:return the consign with STATE!
        testBug = testBugRepository.findById(temptestBug.getId());
        return processTestBug(testBug);
    }

    //增加testBug
    public JSONObject addTestBug(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //String uid=UUID.randomUUID().toString();
        String uid = params.getString("id");

        TestBug testBug=JSONObject.toJavaObject(params,TestBug.class);
        testBug.setId(uid);
        testBug.setProject(projectRepository.findById(uid));

        //TODO:start activiti process
        //String procID = processInstanceService.createTestCaseProcess(params, user);
        //testCase.setProcessInstanceID(procID);
        this.saveEntity(testBug, user);

        //TODO:添加testBug状态
        testBug = testBugRepository.findById(uid);
        return processTestBug(testBug);
    }


    //删除测试错误（不删除相关测试计划文件?）

    public void deleteTestBug(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    //TODO:增加测试计划状态
    private JSONObject processTestBug(TestBug testBug) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testCase.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testBug));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    //去掉测试计划内容,TODO:添加状态
    private  JSONArray processTestBugs(List<TestBug> testBugs) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestBug testBug: testBugs) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testBug));
            jsonObject.remove("testBug");
            //String processState = (String) processInstanceService.queryProcessState(testCase.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
