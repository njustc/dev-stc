package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestReportCheck;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.TestReportCheckRepository;
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
public class TestReportCheckService extends BaseService<TestReportCheck> {
    @Autowired
    private TestReportCheckRepository testReportCheckRepository;
    @Autowired
    private ProjectRepository projectRepository;

    //testReportCheck也不需要添加状态
    //@Autowired
    //private ProcessInstanceService processInstanceService;

    //以用户的工程为来源查询testReportCheck
    public JSON queryTestReportChecks(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestRecords--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<Project> projects = user.getProjects();
            List<TestReportCheck> testReportChecks = new ArrayList<TestReportCheck>();
            for (Project project: projects){
                testReportChecks.add(project.getTestReportCheck());
            }
            //System.out.println(testReportChecks);
            return processTestReportChecks(testReportChecks);
        }
        else
        {
            List<TestReportCheck> testReportChecks = testReportCheckRepository.findByAllTestReportChecks();
            //处理testReportCheck为空的情况
            return processTestReportChecks(testReportChecks);
        }
    }

    //前端要在工程中获取testReportCheck
    public JSON queryTestReportCheckByProject(String projectID) throws Exception {
        if (projectRepository.findById(projectID) == null) {
            throw new Exception("can't find project by id : " + projectID);
        }
        Project project = projectRepository.findById(projectID);
        TestReportCheck  testReportCheck = project.getTestReportCheck();

        return processTestReportCheck(testReportCheck);
    }

    //根据id查询testReportCheck
    public JSONObject queryTestReportCheckByID(String id) throws Exception{
        TestReportCheck testReportCheck = testReportCheckRepository.findById(id);
        if (testReportCheck == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testReportCheck));
    }

    //改动testReportCheck
    public JSONObject editTestReportCheck(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestReportCheck temptestReportCheck = JSONObject.toJavaObject(params, TestReportCheck.class);
        TestReportCheck testReportCheck;
        if ((testReportCheck = this.findEntityById(temptestReportCheck.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试结果时只编辑内容
        testReportCheck.setBody(temptestReportCheck.getBody());
        this.updateEntity(testReportCheck, user);

        testReportCheck = testReportCheckRepository.findById(temptestReportCheck.getId());
        return processTestReportCheck(testReportCheck);
    }

    //增加testReportCheck
    public JSONObject addTestReportCheck(JSONObject params,List<MultipartFile> files,User user) throws Exception {


        String uid= params.getString("id");

        //check project
        if (projectRepository.findById(uid) == null)
            throw new Exception("Can't find project with ID: " + uid);

        Project project = projectRepository.findById(uid);
        //params.remove("projectID"); //不知是否为必要，感觉没必要

        TestReportCheck testReportCheck=JSONObject.toJavaObject(params,TestReportCheck.class);
        testReportCheck.setId(uid);

        project.setTestReportCheck(testReportCheck);
        projectRepository.save(project);

        testReportCheck.setProject(project);
        this.saveEntity(testReportCheck, user);


        testReportCheck = testReportCheckRepository.findById(uid);
        return processTestReportCheck(testReportCheck);
    }


    //删除testReportCheck
    public void deleteTestReportCheck(JSONObject params)
    {
        String uid=params.getString("id");

        Project project = projectRepository.findById(uid);
        project.setTestReportCheck(null);

        this.deleteEntity(uid);
    }


    //这两个函数留下用来处理testReportCheck为空的情况
    private JSONObject processTestReportCheck(TestReportCheck testRecord) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testRecord));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    private  JSONArray processTestReportChecks(List<TestReportCheck> testReportChecks) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestReportCheck testReportCheck: testReportChecks) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testReportCheck));
            //jsonObject.remove("testReportCheck");
            //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
