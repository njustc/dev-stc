package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
import java.util.UUID;

/**
 * @author LBW & SQW
 */

@Service
public class TestFunctionService extends BaseService<TestFunction> {
    @Autowired
    private TestFunctionRepository testFunctionRepository;
    @Autowired
    private ProjectRepository projectRepository;

    //不需要添加状态
    //@Autowired
    //private ProcessInstanceService processInstanceService;


    //查询
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
            System.out.println(testFunctions);
            return processTestFunctions(testFunctions);
        }
        else
        {
            List<TestFunction> testFunctions = testFunctionRepository.findByAllTestFunctions();
            //利用这个函数处理为空的情况
            return processTestFunctions(testFunctions);
        }
    }

    //前端需要用project来查询TestFunction时
    public JSON queryTestFUnctionByProject(String projectID) throws Exception {
        if(projectRepository.findById(projectID) == null) {
            throw new Exception("Can't find project by id : " + projectID);
        }
        Project project = projectRepository.findById(projectID);
        List<TestFunction> testFunctions = project.getTestFunctions();

        return processTestFunctions(testFunctions);
    }

    public JSONObject queryTestFunctionByID(String id) throws Exception{
        TestFunction testFunction = testFunctionRepository.findById(id);
        if (testFunction == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testFunction));
    }

    //改动测试功能
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

    //增加TestFunction
    public JSONObject addTestFunction(String projectID, JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //随机生成TestFunction的id
        String uid= UUID.randomUUID().toString();

        if (projectRepository.findById(projectID) == null) //找不到想要绑定的project
            throw new Exception("Can't find project with ID: " + projectID);

        Project project = projectRepository.findById(projectID);
        params.remove("projectID"); //删除参数里的工程id以便保存实体
        TestFunction testFunction=JSONObject.toJavaObject(params,TestFunction.class);
        testFunction.setId(uid);
        testFunction.setProject(project);

        List<TestFunction> testFunctions = project.getTestFunctions();
        testFunctions.add(testFunction);

        this.saveEntity(testFunction, user);

        project.setTestFunctions(testFunctions);
        projectRepository.save(project);

        //返回刚刚添加的testFunction
        testFunction = testFunctionRepository.findById(uid);
        return JSON.parseObject(JSONObject.toJSONString(testFunction));
    }


    //删除测试功能
    public void deleteTestFunction(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        TestFunction testFunction = testFunctionRepository.findById(uid);
        if (testFunction == null)
            throw new Exception("Can't find testFunction with id: " + uid);
        this.deleteEntity(uid);
    }



    private JSONObject processTestFunction(TestFunction testFunction) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testCase.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testFunction));
        //jsonObject.put("state", processState);
        if (testFunction != null && testFunction.getProject() != null)
            jsonObject.put("projectID", testFunction.getProject().getId());
        return jsonObject;

    }

    //解决查询为空时的问题
    private  JSONArray processTestFunctions(List<TestFunction> testFunctions) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestFunction testFunction: testFunctions) {
            JSONObject jsonObject = processTestFunction(testFunction);
            resultArray.add(jsonObject);
        }
        return resultArray;
    }
}
