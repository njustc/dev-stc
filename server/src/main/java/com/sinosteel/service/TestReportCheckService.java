package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.TestReportCheck;
import com.sinosteel.repository.TestReportCheckRepository;
import com.sinosteel.domain.User;
import com.sinosteel.domain.Project;
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
public class TestReportCheckService extends BaseService<TestReportCheck> {
    @Autowired
    private TestReportCheckRepository testReportCheckRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


    //以工程为来源查询testRecord
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
            //TODO:对测试结果进行处理，去掉具体内容,并且添加测试结果状态
            return processTestReportChecks(testReportChecks);
        }
        else
        {
            List<TestReportCheck> testReportChecks = testReportCheckRepository.findByAllTestReportChecks();
            //对测试结果进行处理，去掉具体内容,并且添加测试结果状态
            return processTestReportChecks(testReportChecks);
        }
    }

    public JSONObject queryTestReportCheckByID(String id) throws Exception{
        TestReportCheck testReportCheck = testReportCheckRepository.findById(id);
        if (testReportCheck == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testReportCheck));
    }

    //改动测试结果
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

        //TODO:return the testRecord with STATE!
        testReportCheck = testReportCheckRepository.findById(temptestReportCheck.getId());
        return processTestReportCheck(testReportCheck);
    }

    //增加测试结果
    public JSONObject addTestReportCheck(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //String uid=UUID.randomUUID().toString();
        String uid = params.getString("id");

        TestReportCheck testReportCheck=JSONObject.toJavaObject(params,TestReportCheck.class);
        testReportCheck.setId(uid);
        testReportCheck.setProject(projectRepository.findById(uid));

        //TODO:start activiti process
        //String procID = processInstanceService.createTestRecordProcess(params, user);
        //testRecord.setProcessInstanceID(procID);
        this.saveEntity(testReportCheck, user);

        //TODO:添加testRecord状态
        testReportCheck = testReportCheckRepository.findById(uid);
        return processTestReportCheck(testReportCheck);
    }


    //删除测试结果（不删除相关测试结果文件?）

    public void deleteTestReportCheck(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    //TODO:增加测试结果状态
    private JSONObject processTestReportCheck(TestReportCheck testRecord) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testRecord));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    //去掉测试结果内容,TODO:添加状态
    private  JSONArray processTestReportChecks(List<TestReportCheck> testReportChecks) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestReportCheck testReportCheck: testReportChecks) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testReportCheck));
            jsonObject.remove("testReportCheck");
            //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
