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
 * {@code TestFunctionService} It's a testFunction service.
 *
 * Including functions:query testFunctions by user,
 * query testFunctions by project ID,query testFunctions by testFunctions ID,
 * edit testFunctions ,add testFunctions, delete testFunctions.
 * 
 * @author LBW
 * @author SQW
 * @since 2018/7/15
 * @version 1.0
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


    /**
     * 通过用户的工程来查询测试功能
     *
     * <p>查询测试功能需要传入用户身份信息User</p>
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有工程,再返回其各个工程名下测试功能信息;
     *  如果User身份是工作人员,则调用testFunctionRepository.findAllTestFunction返回所有的测试功能信息
     *</p>
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
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
    
    /**
     * 通过测试功能所属Project ID查询测试功能
     *
     * <p>查询测试功能需要传入工程ID project ID</p>
     *<p>
     * 传入工程ID后会首先调用 projectRepository.findById 对该测试功能对应的工程project进行查找,
     * 若该工程ID不属于任何已存在的工程,则会抛出异常,返回字段"can't find project by id : projectID";
     * 若存在,则调用project.getTestFunction 检查该工程是否有测试功能与其对应,
     * 若无法找到,则抛出异常,返回字段"can't find testFunctions with project:  projectID".
     * 否则返回工程ID为projectID的工程对应的测试功能信息
     *</p>
     * @param projectID 以String形式传入工程ID
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
    public JSON queryTestFUnctionByProject(String projectID) throws Exception {
        if(projectRepository.findById(projectID) == null) {
            throw new Exception("Can't find project by id : " + projectID);
        }
        Project project = projectRepository.findById(projectID);
        List<TestFunction> testFunctions = project.getTestFunctions();

        return processTestFunctions(testFunctions);
    }

    /**
     * 通过测试功能ID查询测试功能
     *
     * <p>通过测试功能ID查询测试功能需要传入测试功能ID</p>
     *<p>
     *  传入测试功能ID后,首先调用testFunctionsRepository.findById 对测试功能ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的测试功能信息.
     *</p>
     * @param id 以String形式传入测试功能ID
     * @return 以JSONObject形式返回测试功能ID
     * @throws Exception 抛出异常
     *
     */
    public JSONObject queryTestFunctionByID(String id) throws Exception{
        TestFunction testFunction = testFunctionRepository.findById(id);
        if (testFunction == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testFunction));
    }

    /**
     * 对测试功能内容进行编辑
     *
     * <p>编辑测试功能内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出测试功能id以调用this.findEntityById检测该测试功能是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该测试功能存在,则调用baseService类中的updateEntity函数修改测试功能内容body
     * 之后调用testFunctionRepository.findById获取该测试功能信息
     * 最终返回编辑完成后的测试功能信息
     *
     *</p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回测试功能状态的更新以及更新后的测试功能
     * @throws Exception 抛出异常
     */
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

    /**
     * 新增一个测试功能
     *
     * <p>新增测试功能需要传入创建的对象,上传文件以及用户信息</p>
     *<p>首先通过随机数生成来生成uid,
     * 并调用projectRepository.findById 检测传入的工程ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find project with ID: project ID"
     * 若存在则将获取该ID对应的工程信息
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入新对象testFunction中,
     * 将uid作为新测试功能的testFunction ID,传入的用户信息user作为新测试功能的持有者User
     * 调用processInstanceService.createTestFunctionProcess设置新测试功能的流程实例ID
     * 调用BaseService类中的saveEntity将该新测试功能存入数据库
     * 最后返回添加完成后的测试功能信息
     *
     *</p>
     * @param projectID 对应的工程ID
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的测试功能以及测试功能状态的更新
     * @throws Exception 抛出异常
     */
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


    /**
     * 对测试功能进行删除
     *
     * <p>删除测试功能需要传入相应的测试功能信息</p>
     * <p>首先提取出待删除测试功能的TestFunction ID,
     * 并调用testFunctionsRepository.findById检测该测试功能是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find testFunction with id: id"
     * 若返回值不为空,则调用BaseService类下的deleteEntity将其置为NULL以删除该测试功能
     * </p>
     *
     * @param params 待删除测试功能信息
     * @throws Exception 若传入的测试功能信息不存在则抛出异常
     */
    public void deleteTestFunction(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        TestFunction testFunction = testFunctionRepository.findById(uid);
        if (testFunction == null)
            throw new Exception("Can't find testFunction with id: " + uid);
        this.deleteEntity(uid);
    }


    /**
     * 处理TestFunction为空的情况
     *
     * @param testFunction 测试功能的信息
     * @return 返回JSONObject形式的测试功能信息
     * @throws Exception 抛出异常
     */
    private JSONObject processTestFunction(TestFunction testFunction) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testCase.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testFunction));
        //jsonObject.put("state", processState);
        if (testFunction != null && testFunction.getProject() != null)
            jsonObject.put("projectID", testFunction.getProject().getId());
        return jsonObject;

    }

    /**
     * 处理TestFunction为空的情况
     *
     * @param testFunctions 测试检查报告的信息
     * @return 返回JSONArray形式的测试功能信息
     * @throws Exception 抛出异常
     */
    private  JSONArray processTestFunctions(List<TestFunction> testFunctions) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestFunction testFunction: testFunctions) {
            JSONObject jsonObject = processTestFunction(testFunction);
            resultArray.add(jsonObject);
        }
        return resultArray;
    }
}
