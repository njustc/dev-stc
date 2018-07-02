package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
import java.util.UUID;

/**
 * @author LBW & SQW
 */

@Service
public class TestCaseService extends BaseService<TestCase> {
    @Autowired
    private TestCaseRepository testCaseRepository;
    @Autowired
    private ProjectRepository projectRepository;

    //不需要添加TestCase的状态
    //@Autowired
    //private ProcessInstanceService processInstanceService;


    //以用户的工程为来源查询testCase
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
            System.out.println(testCases);
            return processTestCases(testCases);
        }
        else
        {
            List<TestCase> testCases = testCaseRepository.findByAllTestCases();
            //处理TestCase为空的情况
            return processTestCases(testCases);
        }
    }
    public JSON queryTestCasesByProject(String projectID) throws Exception{
        if (projectRepository.findById(projectID) == null) {
            throw new Exception("Can't find project ID: " + projectID);
        }
        Project project = projectRepository.findById(projectID);
        List<TestCase> testCases = project.getTestCase();

        return  processTestCases(testCases);

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

        testCase = testCaseRepository.findById(temptestCase.getId());
        return JSON.parseObject(JSONObject.toJSONString(testCase));
    }

    //增加testCase
    public JSONObject addTestCase(String projectID, JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //生成TestCase的id
        String uid=UUID.randomUUID().toString();
        //check project
        if (projectRepository.findById(projectID) == null)
            throw new Exception("Can't find project with ID: " + projectID);

        Project project = projectRepository.findById(projectID);
        params.remove("projectID");

        TestCase testCase=JSONObject.toJavaObject(params,TestCase.class);
        testCase.setId(uid);
        testCase.setProject(project);

        List<TestCase> testCases = project.getTestCase();
        testCases.add(testCase);

        this.saveEntity(testCase, user);

        project.setTestCase(testCases);
        projectRepository.save(project);


        testCase = testCaseRepository.findById(uid);
        return JSON.parseObject(JSONObject.toJSONString(testCase));
    }


    //删除测试计划（不删除相关测试计划文件?）
    public void deleteTestCase(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        TestCase testCase = testCaseRepository.findById(uid);
        if (testCase == null)
            throw new Exception("Can't find testCase with id: " + uid);
        this.deleteEntity(uid);
    }



    private JSONObject processTestCase(TestCase testCase) throws Exception {
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testCase));
        if (testCase.getProject() != null)
            jsonObject.put("projectID", testCase.getProject().getId());
        return JSON.parseObject(JSONObject.toJSONString(testCase));
    }

    //简单处理TestCase的内容，解决查询时TestCase为空的情况
    private  JSONArray processTestCases(List<TestCase> testCases) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestCase testCase: testCases) {
            JSONObject jsonObject = processTestCase(testCase);
            //jsonObject.remove("testCase");

            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
