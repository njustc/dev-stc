package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestBug;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.TestBugRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * {@code TestTestBugService} It's a testTestBug service.
 *
 * Including functions:query testTestBugs by user,
 * query testTestBugs by testTestBugs ID,
 * edit testTestBugs ,add testTestBugs, delete testTestBugs..
 *
 * @author LBW
 * @author SQW
 * @since 2018/7/15
 * @version 1.0
 *
 */

@Service
public class TestBugService extends BaseService<TestBug> {
    @Autowired
    private TestBugRepository testBugRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


    /**
     * 通过用户的工程来查询测试错误
     *
     * <p>查询测试错误需要传入用户身份信息User</p>
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有工程,再返回其各个工程名下测试错误信息;
     *  如果User身份是工作人员,则调用testBugRepository.findAllTestBug返回所有的测试错误信息
     *</p>
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
    public JSON queryTestBugs(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestCases--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<Project> projects = user.getProjects();
            List<TestBug> testBugs = new ArrayList<TestBug>();
            for (Project project: projects){
                testBugs.addAll(project.getTestBugs());
            }
            //TODO:对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestBugs(testBugs);
        }
        else
        {
            List<TestBug> testBugs = testBugRepository.findByAllTestBugs();
            //对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processTestBugs(testBugs);
        }
    }
    
    /**
     * 通过测试错误ID查询测试错误
     *
     * <p>通过测试错误ID查询测试错误需要传入测试错误ID</p>
     *<p>
     *  传入测试错误ID后,首先调用testBugsRepository.findById 对测试错误ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的测试错误信息.
     *</p>
     * @param id 以String形式传入测试错误ID
     * @return 以JSONObject形式返回测试错误ID
     * @throws Exception 抛出异常
     *
     */
    public JSONObject queryTestBugByID(String id) throws Exception{
        TestBug testBug = testBugRepository.findById(id);
        if (testBug == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testBug));
    }

    /**
     * 对测试错误内容进行编辑
     *
     * <p>编辑测试错误内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出测试错误id以调用this.findEntityById检测该测试错误是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该测试错误存在,则调用baseService类中的updateEntity函数修改测试错误内容body
     * 之后调用testBugRepository.findById获取该测试错误信息
     * 最终返回编辑完成后的测试错误信息
     *
     *</p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回测试错误状态的更新以及更新后的测试错误
     * @throws Exception 抛出异常
     */
    public JSONObject editTestBug(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestBug temptestBug = JSONObject.toJavaObject(params, TestBug.class);
        TestBug testBug;
        if ((testBug = this.findEntityById(temptestBug.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试计划时时只编辑内容
        testBug.setBody(temptestBug.getBody());
        this.updateEntity(testBug, user);

        //TODO:return the consign with STATE!
        testBug = testBugRepository.findById(temptestBug.getId());
        return processTestBug(testBug);
    }

    /**
     * 新增一个测试错误
     *
     * <p>新增测试错误需要传入创建的对象,上传文件以及用户信息</p>
     *<p>首先通过随机数生成来生成uid,
     * 并调用projectRepository.findById 检测传入的工程ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find project with ID: project ID"
     * 若存在则将获取该ID对应的工程信息
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入新对象testBug中,
     * 将uid作为新测试错误的testBug ID,传入的用户信息user作为新测试错误的持有者User
     * 调用processInstanceService.createTestBugProcess设置新测试错误的流程实例ID
     * 调用BaseService类中的saveEntity将该新测试错误存入数据库
     * 最后返回添加完成后的测试错误信息
     *
     *</p>
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的测试错误以及测试错误状态的更新
     * @throws Exception 抛出异常
     */
    public JSONObject addTestBug(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //String uid=UUID.randomUUID().toString();
        String uid = params.getString("id");
        //check project
        if (projectRepository.findById(uid) == null)
            throw new Exception("Can't find project with ID: " + uid);

        TestBug testBug=JSONObject.toJavaObject(params,TestBug.class);
        testBug.setId(uid);
        testBug.setProject(projectRepository.findById(uid));

        //TODO:start activiti process
        //String procID = processInstanceService.createTestCaseProcess(params, user);
        //testCase.setProcessInstanceID(procID);
        this.saveEntity(testBug, user);

        //TODO:添加testBug状态
        testBug = testBugRepository.findById(uid);
        return processTestBug(testBug);
    }


    //删除测试错误（不删除相关测试计划文件?）
    /**
     * 对测试错误进行删除
     *
     * <p>删除测试错误需要传入相应的测试错误信息</p>
     * <p>首先提取出待删除测试错误的TestBug ID,
     * 并调用testBugsRepository.findById检测该测试错误是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find testBug with id: id"
     * 若返回值不为空,则调用 project.setTestBug将其置为NULL以删除该测试错误
     * </p>
     *
     * @param params 待删除测试错误信息
     */
    public void deleteTestBug(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    //T
    /**
     * TODO:增加测试计划状态
     *
     * <p>应传入该测试错误信息</p>
     *
     * @param testBug 测试错误信息
     * @return 以JSONArray形式返回更新状态后测试错误信息以及测试错误信息
     * @throws Exception 传入的测试错误信息不存在则抛出异常
     */
    private JSONObject processTestBug(TestBug testBug) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testCase.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testBug));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    //
    /**
     * 去掉测试计划内容,TODO:添加状态
     *
     * <p>应传入测试错误信息</p>
     *
     * @param testBugs 测试错误信息
     * @return 以JSONObject状态返回状态更新后的测试错误
     * @throws Exception 抛出异常
     */
    private  JSONArray processTestBugs(List<TestBug> testBugs) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestBug testBug: testBugs) {
            JSONObject jsonObject = processTestBug(testBug);
            //jsonObject.remove("testBug");
            //String processState = (String) processInstanceService.queryProcessState(testCase.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
