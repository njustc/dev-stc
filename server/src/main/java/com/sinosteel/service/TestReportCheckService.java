package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
 * {@code TestReportCheckService} It's a testReportChecks service.
 *
 * Including functions:query testReportChecks by user,
 * query testReportChecks by project ID,query testReportChecks by testReportChecks ID,
 * edit testReportChecks ,add testReportChecks, delete testReportChecks.
 *
 * @author LBW
 * @author SQW
 * @since 2018/7/15
 * @version 1.0
 *
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

    /**
     * 通过用户的工程来查询测试报告检查
     *
     * <p>查询测试报告检查需要传入用户身份信息User</p>
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有工程,再返回其各个工程名下测试报告检查信息;
     *  如果User身份是工作人员,则调用testReportCheckRepository.findAllTestReportCheck返回所有的测试报告检查信息
     *</p>
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
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

    /**
     * 通过测试报告检查所属Project ID查询测试报告检查
     *
     * <p>查询测试报告检查需要传入工程ID project ID</p>
     *<p>
     * 传入工程ID后会首先调用 projectRepository.findById 对该测试报告检查对应的工程project进行查找,
     * 若该工程ID不属于任何已存在的工程,则会抛出异常,返回字段"can't find project by id : projectID";
     * 若存在,则调用project.getTestReportCheck 检查该工程是否有测试报告检查与其对应,
     * 若无法找到,则抛出异常,返回字段"can't find testReportChecks with project:  projectID".
     * 否则返回工程ID为projectID的工程对应的测试报告检查信息
     *</p>
     * @param projectID 以String形式传入工程ID
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
    public JSON queryTestReportCheckByProject(String projectID) throws Exception {
        if (projectRepository.findById(projectID) == null) {
            throw new Exception("can't find project by id : " + projectID);
        }
        Project project = projectRepository.findById(projectID);
        TestReportCheck testReportCheck = project.getTestReportCheck();
        if (testReportCheck == null)
            throw new Exception("can't find testReportCheck with projectID: " + projectID);

        return processTestReportCheck(testReportCheck);
    }

    /**
     * 通过测试报告检查ID查询测试报告检查
     *
     * <p>通过测试报告检查ID查询测试报告检查需要传入测试报告检查ID</p>
     *<p>
     *  传入测试报告检查ID后,首先调用testReportChecksRepository.findById 对测试报告检查ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的测试报告检查信息.
     *</p>
     * @param id 以String形式传入测试报告检查ID
     * @return 以JSONObject形式返回测试报告检查ID
     * @throws Exception 抛出异常
     *
     */
    public JSONObject queryTestReportCheckByID(String id) throws Exception{
        TestReportCheck testReportCheck = testReportCheckRepository.findById(id);
        if (testReportCheck == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testReportCheck));
    }

    /**
     * 对测试报告检查内容进行编辑
     *
     * <p>编辑测试报告检查内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出测试报告检查id以调用this.findEntityById检测该测试报告检查是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该测试报告检查存在,则调用baseService类中的updateEntity函数修改测试报告检查内容body
     * 之后调用testReportCheckRepository.findById获取该测试报告检查信息
     * 最终返回编辑完成后的测试报告检查信息
     *
     *</p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回测试报告检查状态的更新以及更新后的测试报告检查
     * @throws Exception 抛出异常
     */
    public JSONObject editTestReportCheck(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestReportCheck temptestReportCheck = JSONObject.toJavaObject(params, TestReportCheck.class);
        TestReportCheck testReportCheck;
        if ((testReportCheck = testReportCheckRepository.findById(temptestReportCheck.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试结果时只编辑内容
        testReportCheck.setBody(temptestReportCheck.getBody());
        this.updateEntity(testReportCheck, user);

        testReportCheck = testReportCheckRepository.findById(temptestReportCheck.getId());
        return processTestReportCheck(testReportCheck);
    }

    /**
     * 新增一个测试报告检查
     *
     * <p>新增测试报告检查需要传入创建的对象,上传文件以及用户信息</p>
     *<p>首先通过随机数生成来生成uid,
     * 并调用projectRepository.findById 检测传入的工程ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find project with ID: project ID"
     * 若存在则将获取该ID对应的工程信息
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入新对象testReportCheck中,
     * 将uid作为新测试报告检查的testReportCheck ID,传入的用户信息user作为新测试报告检查的持有者User
     * 调用processInstanceService.createTestReportCheckProcess设置新测试报告检查的流程实例ID
     * 调用BaseService类中的saveEntity将该新测试报告检查存入数据库
     * 最后返回添加完成后的测试报告检查信息
     *
     *</p>
     * @param projectID 对应的工程ID
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的测试报告检查以及测试报告检查状态的更新
     * @throws Exception 抛出异常
     */
    public JSONObject addTestReportCheck(String projectID, JSONObject params,List<MultipartFile> files,User user) throws Exception {

        String uid =  UUID.randomUUID().toString();//随机生成testReportCheck的id
        //String uid= params.getString("id");

        //check project
        if (projectRepository.findById(projectID) == null)
            throw new Exception("Can't find project with ID: " + projectID);

        Project project = projectRepository.findById(projectID);
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


    /**
     * 对测试报告检查进行删除
     *
     * <p>删除测试报告检查需要传入相应的测试报告检查信息</p>
     * <p>首先提取出待删除测试报告检查的TestReportCheck ID,
     * 并调用testReportChecksRepository.findById检测该测试报告检查是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find testReportCheck with id: id"
     * 若返回值不为空,则调用 project.setTestReportCheck将其置为NULL以删除该测试报告检查
     * </p>
     *
     * @param params 待删除测试报告检查信息
     * @throws Exception 若传入的测试报告检查信息不存在则抛出异常
     */
    public void deleteTestReportCheck(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        TestReportCheck testReportCheck = testReportCheckRepository.findById(uid);
        if (testReportCheck == null)
            throw new Exception("Can't find testReportCheck with id: " + uid);

        Project project = testReportCheck.getProject();
        project.setTestReportCheck(null);

        this.deleteEntity(uid);
    }


    /**
     * 处理TestReportCheck为空的情况
     * 
     * @param testReportCheck 测试报告检查的信息
     * @return 返回JSONObject形式的测试报告检查信息
     * @throws Exception 抛出异常
     */
    private JSONObject processTestReportCheck(TestReportCheck testReportCheck) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testReportCheck));
        if (testReportCheck != null && testReportCheck.getProject() != null)
            jsonObject.put("projectID", testReportCheck.getProject().getId());
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    /**
     * 处理TestReportCheck为空的情况
     * 
     * @param testReportChecks 测试检查报告的信息
     * @return 返回JSONArray形式的测试报告检查信息
     * @throws Exception 抛出异常
     */
    private  JSONArray processTestReportChecks(List<TestReportCheck> testReportChecks) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestReportCheck testReportCheck: testReportChecks) {
            JSONObject jsonObject = processTestReportCheck(testReportCheck);
            //jsonObject.remove("testReportCheck");
            //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
