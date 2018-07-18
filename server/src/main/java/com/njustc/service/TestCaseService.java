package com.njustc.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.njustc.domain.Project;
import com.njustc.domain.TestCase;
import com.njustc.domain.User;
import com.njustc.repository.ProjectRepository;
import com.njustc.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * {@code TestCaseService} It's a testCase Service
 *
 * Including functions:query testCases by user,
 * query testCases by project ID,query testCases by testCases ID,
 * edit testCases ,add testCases, delete testCases.
 *
 *
 * @author LBW
 * @author SQW
 * @since 2018/7/15
 * @version 1.0
 *
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
    /**
     *通过用户的工程来查询测试样例
     *
     * <p>查询测试样例需要传入用户身份信息User</p>
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有工程,再返回其各个工程名下测试样例信息;
     *  如果User身份是工作人员,则调用testCaseRepository.findAllTestCase返回所有的测试样例信息
     *</p> 
     *
     *
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
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

    /**
     * 通过测试样例所属Project ID查询测试样例
     *
     * <p>查询测试样例需要传入工程ID project ID</p>
     *<p>
     * 传入工程ID后会首先调用 projectRepository.findById 对该测试样例对应的工程project进行查找,
     * 若该工程ID不属于任何已存在的工程,则会抛出异常,返回字段"can't find project by id : projectID";
     * 若存在,则调用project.getTestCase 检查该工程是否有测试样例与其对应,
     * 若无法找到,则抛出异常,返回字段"can't find testCases with project:  projectID".
     * 否则返回工程ID为projectID的工程对应的测试样例信息
     *</p>
     * @param projectID 以String形式传入工程ID
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
    public JSON queryTestCasesByProject(String projectID) throws Exception{
        if (projectRepository.findById(projectID) == null) {
            throw new Exception("Can't find project ID: " + projectID);
        }
        Project project = projectRepository.findById(projectID);
        List<TestCase> testCases = project.getTestCase();

        return  processTestCases(testCases);

    }

    /**
     * 通过测试样例ID查询测试样例
     *
     * <p>通过测试样例ID查询测试样例需要传入测试样例ID</p>
     *<p>
     *  传入测试样例ID后,首先调用testCasesRepository.findById 对测试样例ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的测试样例信息.
     *</p>
     * @param id 以String形式传入测试样例ID
     * @return 以JSONObject形式返回测试样例ID
     * @throws Exception 抛出异常
     *
     */
    public JSONObject queryTestCaseByID(String id) throws Exception{
        TestCase testCase = testCaseRepository.findById(id);
        if (testCase == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testCase));
    }

    //改动测试计划
    /**
     * 对测试样例内容进行编辑
     *
     * <p>编辑测试样例内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出测试样例id以调用this.findEntityById检测该测试样例是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该测试样例存在,则调用baseService类中的updateEntity函数修改测试样例内容body
     * 之后调用testCaseRepository.findById获取该测试样例信息
     * 最终返回编辑完成后的测试样例信息
     *
     *</p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回测试样例状态的更新以及更新后的测试样例
     * @throws Exception 抛出异常
     */
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
    /**
     * 新增一个测试样例
     *
     * <p>新增测试样例需要传入创建的对象,上传文件以及用户信息</p>
     *<p>首先通过随机数生成来生成uid,
     * 并调用projectRepository.findById 检测传入的工程ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find project with ID: project ID"
     * 若存在则将获取该ID对应的工程信息
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入新对象testCase中,
     * 将uid作为新测试样例的testCase ID,传入的用户信息user作为新测试样例的持有者User
     * 调用processInstanceService.createTestCaseProcess设置新测试样例的流程实例ID
     * 调用BaseService类中的saveEntity将该新测试样例存入数据库
     * 最后返回添加完成后的测试样例信息
     *
     *</p>
     * @param projectID 工程ID
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的测试样例以及测试样例状态的更新
     * @throws Exception 抛出异常
     */
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
    /**
     * 对测试样例进行删除
     *
     * <p>删除测试样例需要传入相应的测试样例信息</p>
     * <p>首先提取出待删除测试样例的TestCase ID,
     * 并调用testCasesRepository.findById检测该测试样例是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find testCase with id: uid"
     * 若返回值不为空,则调用 baseService类下的deleteEntity以删除该测试样例
     * </p>
     *
     * @param params 待删除测试样例信息
     * @throws Exception 若传入的测试样例信息不存在则抛出异常
     */
    public void deleteTestCase(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        TestCase testCase = testCaseRepository.findById(uid);
        if (testCase == null)
            throw new Exception("Can't find testCase with id: " + uid);
        this.deleteEntity(uid);
    }


    /**
     * <p>去掉测试结果内容</p>
     *
     * @param testCase 测试样例的信息
     * @return 返回JSONObject形式的测试样例信息
     * @throws Exception 抛出异常
     */
    private JSONObject processTestCase(TestCase testCase) throws Exception {
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testCase));
        if (testCase != null && testCase.getProject() != null)
            jsonObject.put("projectID", testCase.getProject().getId());
        return JSON.parseObject(JSONObject.toJSONString(testCase));
    }

    //简单处理TestCase的内容，解决查询时TestCase为空的情况
    /**
     * <p>去掉测试结果内容</p>
     *
     * @param testCases 测试样例的信息
     * @return 返回JSONArray形式的测试样例信息
     * @throws Exception 抛出异常
     */
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
