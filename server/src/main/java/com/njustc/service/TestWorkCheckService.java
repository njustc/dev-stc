package com.njustc.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.njustc.domain.Project;
import com.njustc.domain.TestWorkCheck;
import com.njustc.domain.User;
import com.njustc.repository.ProjectRepository;
import com.njustc.repository.TestWorkCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * {@code TestWorkCheckService} It's a testWorkChecks service.
 *
 * Including functions:query testWorkChecks by user,
 * query testWorkChecks by project ID,query testWorkChecks by testWorkChecks ID,
 * edit testWorkChecks ,add testWorkChecks, delete testWorkChecks..
 *
 * @author LBW
 * @author SQW
 * @since 2018/7/15
 * @version 1.0
 *
 */

@Service
public class TestWorkCheckService extends BaseService<TestWorkCheck> {
    @Autowired
    private TestWorkCheckRepository testWorkCheckRepository;
    @Autowired
    private ProjectRepository projectRepository;

    //testWorkCheck不需要添加状态
    //@Autowired
    //private ProcessInstanceService processInstanceService;


    /**
     * 通过用户的工程来查询测试工作检查
     *
     * <p>查询测试工作检查需要传入用户身份信息User</p>
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有工程,再返回其各个工程名下测试工作检查信息;
     *  如果User身份是工作人员,则调用testWorkCheckRepository.findAllTestWorkCheck返回所有的测试工作检查信息
     *</p>
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
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

            //System.out.println(testWorkChecks);
            return processTestWorkChecks(testWorkChecks);
        }
        else
        {
            List<TestWorkCheck> testWorkChecks = testWorkCheckRepository.findByAllTestWorkChecks();
            //有效处理testWorkCheck为空
            return processTestWorkChecks(testWorkChecks);
        }
    }

    /**
     * 通过测试工作检查所属Project ID查询测试工作检查
     *
     * <p>查询测试工作检查需要传入工程ID project ID</p>
     *<p>
     * 传入工程ID后会首先调用 projectRepository.findById 对该测试工作检查对应的工程project进行查找,
     * 若该工程ID不属于任何已存在的工程,则会抛出异常,返回字段"can't find project by id : projectID";
     * 若存在,则调用project.getTestWorkCheck 检查该工程是否有测试工作检查与其对应,
     * 若无法找到,则抛出异常,返回字段"can't find testWorkChecks with project:  projectID".
     * 否则返回工程ID为projectID的工程对应的测试工作检查信息
     *</p>
     * @param projectID 以String形式传入工程ID
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
    public JSON queryTestWorkCheckByProject(String projectID) throws Exception{
        if (projectRepository.findById(projectID) == null) {
            throw new Exception("can't find project by id :" + projectID);
        }
        Project project = projectRepository.findById(projectID);

        TestWorkCheck testWorkCheck = project.getTestWorkCheck();
        if (testWorkCheck == null) {
            throw new  Exception("can't find testWorkCheck with projectID: " + projectID);
        }
        return processTestWorkCheck(testWorkCheck);
    }

    /**
     * 通过测试工作检查ID查询测试工作检查
     *
     * <p>通过测试工作检查ID查询测试工作检查需要传入测试工作检查ID</p>
     *<p>
     *  传入测试工作检查ID后,首先调用testWorkChecksRepository.findById 对测试工作检查ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的测试工作检查信息.
     *</p>
     * @param id 以String形式传入测试工作检查ID
     * @return 以JSONObject形式返回测试工作检查ID
     * @throws Exception 抛出异常
     *
     */
    public JSONObject queryTestWorkCheckByID(String id) throws Exception{
        TestWorkCheck testWorkCheck = testWorkCheckRepository.findById(id);
        if (testWorkCheck == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testWorkCheck));
    }

    /**
     * 对测试工作检查内容进行编辑
     *
     * <p>编辑测试工作检查内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出测试工作检查id以调用this.findEntityById检测该测试工作检查是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该测试工作检查存在,则调用baseService类中的updateEntity函数修改测试工作检查内容,
     * 可修改项包括:Body ,Version, Acendtime,Client,Fcendtime,Softwarename,Testworker,Starttime.
     * 之后调用testWorkCheckRepository.findById获取该测试工作检查信息
     * 最终返回编辑完成后的测试工作检查信息
     *
     *</p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回测试工作检查状态的更新以及更新后的测试工作检查
     * @throws Exception 抛出异常
     */
    public JSONObject editTestWorkCheck(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestWorkCheck temptestWorkCheck = JSONObject.toJavaObject(params, TestWorkCheck.class);
        TestWorkCheck testWorkCheck;
        if ((testWorkCheck = this.findEntityById(temptestWorkCheck.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试结果时只编辑内容
        //testWorkCheck = temptestWorkCheck;
        testWorkCheck.setBody(temptestWorkCheck.getBody());
        testWorkCheck.setVersion(temptestWorkCheck.getVersion());
        testWorkCheck.setAcendtime(temptestWorkCheck.getAcendtime());
        testWorkCheck.setClient(temptestWorkCheck.getClient());
        testWorkCheck.setFcendtime(temptestWorkCheck.getFcendtime());
        testWorkCheck.setSoftwarename(temptestWorkCheck.getSoftwarename());
        testWorkCheck.setTestworker(temptestWorkCheck.getTestworker());
        testWorkCheck.setStarttime(temptestWorkCheck.getStarttime());

        this.updateEntity(testWorkCheck, user);

        testWorkCheck = testWorkCheckRepository.findById(temptestWorkCheck.getId());
        return processTestWorkCheck(testWorkCheck);
    }

    /**
     * 新增一个测试工作检查
     *
     * <p>新增测试工作检查需要传入创建的对象,上传文件以及用户信息</p>
     *<p>首先通过随机数生成来生成uid,
     * 并调用projectRepository.findById 检测传入的工程ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find project with ID: project ID"
     * 若存在则将获取该ID对应的工程信息
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入新对象testWorkCheck中,
     * 将uid作为新测试工作检查的testWorkCheck ID,传入的用户信息user作为新测试工作检查的持有者User
     * 调用processInstanceService.createTestWorkCheckProcess设置新测试工作检查的流程实例ID
     * 调用BaseService类中的saveEntity将该新测试工作检查存入数据库
     * 最后返回添加完成后的测试工作检查信息
     *
     *</p>
     * @param projectID 对应的工程ID
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的测试工作检查以及测试工作检查状态的更新
     * @throws Exception 抛出异常
     */
    public JSONObject addTestWorkCheck(String projectID, JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //随机生成id
        String uid = UUID.randomUUID().toString();
        //String uid = params.getString("id");
        //check project
        if (projectRepository.findById(projectID) == null)
            throw new Exception("Can't find project with ID: " + projectID);

        Project project = projectRepository.findById(projectID);

        TestWorkCheck testWorkCheck=JSONObject.toJavaObject(params,TestWorkCheck.class);
        testWorkCheck.setId(uid);


        project.setTestWorkCheck(testWorkCheck);
        projectRepository.save(project);

        testWorkCheck.setProject(project);
        this.saveEntity(testWorkCheck, user);


        testWorkCheck = testWorkCheckRepository.findById(uid);
        return processTestWorkCheck(testWorkCheck);
    }


    /**
     * 对测试工作检查进行删除
     *
     * <p>删除测试工作检查需要传入相应的测试工作检查信息</p>
     * <p>首先提取出待删除测试工作检查的TestWorkCheck ID,
     * 并调用testWorkChecksRepository.findById检测该测试工作检查是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find testWorkCheck with id: id"
     * 若返回值不为空,则调用 project.setTestWorkCheck将其置为NULL以删除该测试工作检查
     * </p>
     *
     * @param params 待删除测试工作检查信息
     * @throws Exception 若传入的测试工作检查信息不存在则抛出异常
     */
    public void deleteTestWorkCheck(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        TestWorkCheck testWorkCheck = testWorkCheckRepository.findById(uid);
        if (testWorkCheck == null)
            throw new Exception("Can't find testWorkCheck with id: " + uid);

        Project project = testWorkCheck.getProject();
        project.setTestWorkCheck(null);

        this.deleteEntity(uid);
    }

    /**
     * 处理TestWorkCheck为空的情况
     *
     * @param testWorkCheck 测试检查工作的信息
     * @return 返回JSONObject形式的测试检查工作信息
     * @throws Exception 抛出异常
     */
    private JSONObject processTestWorkCheck(TestWorkCheck testWorkCheck) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testWorkCheck));
        //jsonObject.put("state", processState);
        if (testWorkCheck != null && testWorkCheck.getProject() != null)
            jsonObject.put("projectID", testWorkCheck.getProject().getId());
        return jsonObject;

    }

    /**
     * 处理TestWorkCheck为空的情况
     *
     * @param testWorkChecks 测试检查工作的信息
     * @return 返回JSONArray形式的测试工作检查信息
     * @throws Exception 抛出异常
     */
    private  JSONArray processTestWorkChecks(List<TestWorkCheck> testWorkChecks) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestWorkCheck testWorkCheck: testWorkChecks) {
            JSONObject jsonObject = processTestWorkCheck(testWorkCheck);
            //jsonObject.remove("testWorkCheck");
            //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
