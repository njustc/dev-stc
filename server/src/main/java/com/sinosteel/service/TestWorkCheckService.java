package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.TestWorkCheck;
import com.sinosteel.repository.TestWorkCheckRepository;
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
public class TestWorkCheckService extends BaseService<TestWorkCheck> {
    @Autowired
    private TestWorkCheckRepository testWorkCheckRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


    //以工程为来源查询testRecord
    public JSON queryTestWorkChecks(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestRecords--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<Project> projects = user.getProjects();
            List<TestWorkCheck> testWorkChecks = new ArrayList<TestWorkCheck>();
            for (Project project: projects){
                testWorkChecks.add(project.getTestWorkCheck());
            }
            //TODO:对测试结果进行处理，去掉具体内容,并且添加测试结果状态
            return processTestWorkChecks(testWorkChecks);
        }
        else
        {
            List<TestWorkCheck> testWorkChecks = testWorkCheckRepository.findByAllTestWorkChecks();
            //对测试结果进行处理，去掉具体内容,并且添加测试结果状态
            return processTestWorkChecks(testWorkChecks);
        }
    }

    public JSONObject queryTestWorkCheckByID(String id) throws Exception{
        TestWorkCheck testWorkCheck = testWorkCheckRepository.findById(id);
        if (testWorkCheck == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testWorkCheck));
    }

    //改动测试结果
    public JSONObject editTestWorkCheck(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestWorkCheck temptestWorkCheck = JSONObject.toJavaObject(params, TestWorkCheck.class);
        TestWorkCheck testWorkCheck;
        if ((testWorkCheck = this.findEntityById(temptestWorkCheck.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试结果时只编辑内容
        //TODO:加入更多body内容
        testWorkCheck.setVersion(temptestWorkCheck.getVersion());
        this.updateEntity(testWorkCheck, user);

        //TODO:return the testRecord with STATE!
        testWorkCheck = testWorkCheckRepository.findById(temptestWorkCheck.getId());
        return processTestWorkCheck(testWorkCheck);
    }

    //增加测试结果
    public JSONObject addTestWorkCheck(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //String uid=UUID.randomUUID().toString();
        String uid = params.getString("id");

        TestWorkCheck testWorkCheck=JSONObject.toJavaObject(params,TestWorkCheck.class);
        testWorkCheck.setId(uid);
        testWorkCheck.setProject(projectRepository.findById(uid));

        //TODO:start activiti process
        //String procID = processInstanceService.createTestRecordProcess(params, user);
        //testRecord.setProcessInstanceID(procID);
        this.saveEntity(testWorkCheck, user);

        //TODO:添加testRecord状态
        testWorkCheck = testWorkCheckRepository.findById(uid);
        return processTestWorkCheck(testWorkCheck);
    }


    //删除测试结果（不删除相关测试结果文件?）

    public void deleteTestWorkCheck(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    //TODO:增加测试结果状态
    private JSONObject processTestWorkCheck(TestWorkCheck testWorkCheck) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testWorkCheck));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    //去掉测试结果内容,TODO:添加状态
    private  JSONArray processTestWorkChecks(List<TestWorkCheck> testWorkChecks) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestWorkCheck testWorkCheck: testWorkChecks) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testWorkCheck));
            jsonObject.remove("testWorkCheck");
            //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
