package com.njustc.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.njustc.activiti.ProcessInstanceService;
import com.njustc.domain.Project;
import com.njustc.domain.TestRecord;
import com.njustc.domain.User;
import com.njustc.repository.ProjectRepository;
import com.njustc.repository.TestRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * {@code TestRecordService} It's a testRecord Service
 *
 * Including functions:query testRecords by user,
 * query testRecords by project ID,query testRecords by testRecords ID,
 * edit testRecords ,add testRecords, delete testRecords.
 * 
 * 
 * @author LBW
 * @author SQW
 * @since 2018/7/15
 * @version 1.0
 * 
 */

@Service
public class TestRecordService extends BaseService<TestRecord> {
    @Autowired
    private TestRecordRepository testRecordRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


    //以工程为来源查询testRecord

    /**
     *通过用户的工程来查询测试记录
     *
     * <p>查询测试记录需要传入用户身份信息User</p>
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有工程,再返回其各个工程名下测试记录信息;
     *  如果User身份是工作人员,则调用testRecordRepository.findAllTestRecord返回所有的测试记录信息
     *</p> 
     * 
     * 
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
    public JSON queryTestRecords(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestRecords--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<Project> projects = user.getProjects();
            List<TestRecord> testRecords = new ArrayList<TestRecord>();
            for (Project project: projects){
                testRecords.addAll(project.getTestRecords());
            }
            //TODO:对测试结果进行处理，去掉具体内容,并且添加测试结果状态
            return processTestRecords(testRecords);
        }
        else
        {
            List<TestRecord> testRecords = testRecordRepository.findByAllTestRecords();
            //对测试结果进行处理，去掉具体内容,并且添加测试结果状态
            return processTestRecords(testRecords);
        }
    }
    
    /**
     * 通过测试记录ID查询测试记录
     *
     * <p>通过测试记录ID查询测试记录需要传入测试记录ID</p>
     *<p>
     *  传入测试记录ID后,首先调用testRecordsRepository.findById 对测试记录ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的测试记录信息.
     *</p>
     * @param id 以String形式传入测试记录ID
     * @return 以JSONObject形式返回测试记录ID
     * @throws Exception 抛出异常
     *
     */
    public JSONObject queryTestRecordByID(String id) throws Exception{
        TestRecord testRecord = testRecordRepository.findById(id);
        if (testRecord == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testRecord));
    }

    /**
     * 对测试记录内容进行编辑
     *
     * <p>编辑测试记录内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出测试记录id以调用this.findEntityById检测该测试记录是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该测试记录存在,则调用baseService类中的updateEntity函数修改测试记录内容body
     * 之后调用testRecordRepository.findById获取该测试记录信息
     * 最终返回编辑完成后的测试记录信息
     *
     *</p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回测试记录状态的更新以及更新后的测试记录
     * @throws Exception 抛出异常
     */
    public JSONObject editTestRecord(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestRecord temptestRecord = JSONObject.toJavaObject(params, TestRecord.class);
        TestRecord testRecord;
        if ((testRecord = this.findEntityById(temptestRecord.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试结果时只编辑内容
        testRecord.setBody(temptestRecord.getBody());
        this.updateEntity(testRecord, user);

        //TODO:return the testRecord with STATE!
        testRecord = testRecordRepository.findById(temptestRecord.getId());
        return processTestRecord(testRecord);
    }

    /**
     * 新增一个测试记录
     *
     * <p>新增测试记录需要传入创建的对象,上传文件以及用户信息</p>
     *<p>首先通过随机数生成来生成uid,
     * 并调用projectRepository.findById 检测传入的工程ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find project with ID: project ID"
     * 若存在则将获取该ID对应的工程信息
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入新对象testRecord中,
     * 将uid作为新测试记录的testRecord ID,传入的用户信息user作为新测试记录的持有者User
     * 调用processInstanceService.createTestRecordProcess设置新测试记录的流程实例ID
     * 调用BaseService类中的saveEntity将该新测试记录存入数据库
     * 最后返回添加完成后的测试记录信息
     *
     *</p>
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的测试记录以及测试记录状态的更新
     * @throws Exception 抛出异常
     */
    public JSONObject addTestRecord(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //String uid=UUID.randomUUID().toString();
        String uid = params.getString("id");
        //check project
        if (projectRepository.findById(uid) == null)
            throw new Exception("Can't find project with ID: " + uid);

        TestRecord testRecord=JSONObject.toJavaObject(params,TestRecord.class);
        testRecord.setId(uid);
        testRecord.setProject(projectRepository.findById(uid));

        //TODO:start activiti process
        //String procID = processInstanceService.createTestRecordProcess(params, user);
        //testRecord.setProcessInstanceID(procID);
        this.saveEntity(testRecord, user);

        //TODO:添加testRecord状态
        testRecord = testRecordRepository.findById(uid);
        return processTestRecord(testRecord);
    }


    //删除测试结果（不删除相关测试结果文件?）
    /**
     * 对测试记录进行删除
     *
     * <p>删除测试记录需要传入相应的测试记录信息</p>
     * <p>首先提取出待删除测试记录的TestRecord ID,
     * 并调用testRecordsRepository.findById检测该测试记录是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find testRecord with id: uid"
     * 若返回值不为空,则调用 baseService类下的deleteEntity以删除该测试记录
     * </p>
     *
     * @param params 待删除测试记录信息
     * @throws Exception 若传入的测试记录信息不存在则抛出异常
     */
    public void deleteTestRecord(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        TestRecord testRecord = testRecordRepository.findById(uid);
        if (testRecord == null)
            throw new Exception("Can't find testRecord with id: " + uid);
        this.deleteEntity(uid);
    }


    /**
     * 去掉测试结果内容
     *
     * @param testRecord 测试记录的信息
     * @return 返回JSONObject形式的测试记录信息
     * @throws Exception 抛出异常
     */
    private JSONObject processTestRecord(TestRecord testRecord) throws Exception {
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testRecord));
        JSONObject processState = processInstanceService.queryProcessState(testRecord.getProcessInstanceID());
        jsonObject.putAll(processState);
        return jsonObject;

    }

    //去掉测试结果内容,TODO:添加状态
    /**
     * <p>去掉测试结果内容</p>
     *
     * @param testRecords 测试记录的信息
     * @return 返回JSONArray形式的测试记录信息
     * @throws Exception 抛出异常
     */
    private  JSONArray processTestRecords(List<TestRecord> testRecords) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestRecord testRecord: testRecords) {
            JSONObject jsonObject = processTestRecord(testRecord);
            //jsonObject.remove("testRecord");

            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
