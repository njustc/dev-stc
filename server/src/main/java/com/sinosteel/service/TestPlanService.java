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
 *
 * {@code TestPlanService} It's a testPlans service.
 *
 * Including functions:query testPlans by user,
 * query testPlans by project ID,query testPlans by testPlans ID,
 * edit testPlans ,add testPlans, delete testPlans.
 * 
 * 
 * @author LBW
 * @author SQW
 * @version 1.0
 */

@Service
public class TestPlanService extends BaseService<TestPlan> {
    @Autowired
    private TestPlanRepository testPlanRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;

    @Autowired
    private ProjectRepository projectRepository;


    /**
     * 通过用户的工程来查询测试计划
     *
     * <p>查询测试计划需要传入用户身份信息User</p>
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有工程,再返回其各个工程名下测试计划信息;
     *  如果User身份是工作人员,则调用testPlanRepository.findAllTestPlan返回所有的测试计划信息
     *</p>
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
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


    /**
     * 通过测试计划所属Project ID查询测试计划
     *
     * <p>查询测试计划需要传入工程ID project ID</p>
     *<p>
     * 传入工程ID后会首先调用 projectRepository.findById 对该测试计划对应的工程project进行查找,
     * 若该工程ID不属于任何已存在的工程,则会抛出异常,返回字段"can't find project by id : projectID";
     * 若存在,则调用project.getTestPlan 检查该工程是否有测试计划与其对应,
     * 若无法找到,则抛出异常,返回字段"can't find testPlans with project:  projectID".
     * 否则返回工程ID为projectID的工程对应的测试计划信息
     *</p>
     * @param projectID 以String形式传入工程ID
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
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


    /**
     * 通过测试计划ID查询测试计划
     *
     * <p>通过测试计划ID查询测试计划需要传入测试计划ID</p>
     *<p>
     *  传入测试计划ID后,首先调用testPlansRepository.findById 对测试计划ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的测试计划信息.
     *</p>
     * @param id 以String形式传入测试计划ID
     * @return 以JSONObject形式返回测试计划ID
     * @throws Exception 抛出异常
     *
     */
    public JSONObject queryTestPlanByID(String id) throws Exception{
        TestPlan testPlan = testPlanRepository.findById(id);
        if (testPlan == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testPlan));
    }

    /**
     * 对测试计划内容进行编辑
     *
     * <p>编辑测试计划内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出测试计划id以调用this.findEntityById检测该测试计划是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该测试计划存在,则调用baseService类中的updateEntity函数修改测试计划内容body
     * 之后调用testPlanRepository.findById获取该测试计划信息
     * 最终返回编辑完成后的测试计划信息
     *
     *</p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回测试计划状态的更新以及更新后的测试计划
     * @throws Exception 抛出异常
     */
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

    /**
     * 新增一个测试计划
     *
     * <p>新增测试计划需要传入创建的对象,上传文件以及用户信息</p>
     *<p>首先通过随机数生成来生成uid,
     * 并调用projectRepository.findById 检测传入的工程ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find project with ID: project ID"
     * 若存在则将获取该ID对应的工程信息
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入新对象testPlan中,
     * 将uid作为新测试计划的testPlan ID,传入的用户信息user作为新测试计划的持有者User
     * 调用processInstanceService.createTestPlanProcess设置新测试计划的流程实例ID
     * 调用BaseService类中的saveEntity将该新测试计划存入数据库
     * 最后返回添加完成后的测试计划信息
     *
     *</p>
     * @param projectID 对应的工程ID
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的测试计划以及测试计划状态的更新
     * @throws Exception 抛出异常
     */
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

        //set project in test plan,
        testPlan.setProject(project);
        this.saveEntity(testPlan, user);

        testPlan = testPlanRepository.findById(uid);
        return processTestPlan(testPlan);
    }


    //删除测试计划
    /**
     * 对测试计划进行删除(不删除相关测试计划文件?)
     *
     * <p>删除测试计划需要传入相应的测试计划信息</p>
     * <p>首先提取出待删除测试计划的TestPlan ID,
     * 并调用testPlansRepository.findById检测该测试计划是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find testPlan with id: id"
     * 若返回值不为空,则调用 project.setTestPlan将其置为NULL以删除该测试计划
     * </p>
     *
     * @param params 待删除测试计划信息
     * @throws Exception 若传入的测试计划信息不存在则抛出异常
     */
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

    /**
     * 处理TestPlan为空的情况
     *
     * @param testPlan 测试计划的信息
     * @return 返回JSONObject形式的测试计划信息
     * @throws Exception 抛出异常
     */
    JSONObject processTestPlan(TestPlan testPlan) throws Exception {
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testPlan));
        JSONObject processState = processInstanceService.queryProcessState(testPlan.getProcessInstanceID());
        jsonObject.putAll(processState);
        if (testPlan != null && testPlan.getProject() != null)
            jsonObject.put("projectID", testPlan.getProject().getId());
        return jsonObject;

    }

    /**
     * 处理TestPlan为空的情况
     *
     * @param testplans 测试计划的信息
     * @return 返回JSONArray形式的测试计划信息
     * @throws Exception 抛出异常
     */
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
