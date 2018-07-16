package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestReport;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.TestReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * {@code TestTestReportService} It's a testTestReports service.
 *
 * Including functions:query testTestReports by user,
 * query testTestReports by project ID,query testTestReports by testTestReports ID,
 * edit testTestReports ,add testTestReports, delete testTestReports..
 *
 * @author LBW
 * @author Lumpy
 * @since 2018/7/15
 * @version 1.0
 *
 */

@Service
public class TestReportService extends BaseService<TestReport>{

    @Autowired
    private TestReportRepository testReportRepository;
    
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;

    /**
     * 通过用户的工程来查询测试报告
     *
     * <p>查询测试报告需要传入用户身份信息User</p>
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有工程,再返回其各个工程名下测试报告信息;
     *  如果User身份是工作人员,则调用testReportRepository.findAllTestReport返回所有的测试报告信息
     *</p>
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
    public JSON queryTestReport(User user) throws Exception{
        if (user !=null){
            System.out.println("queryTestReports --> query user role: " + user.getRoles().get(0).getRoleName());
        }
        if (user.getRoles().get(0).getRoleName().equals("普通客户")){

            //Uesr里有get的方法
            //List<TestReport> testReports = user.getTestReports();

            List<Project> projects = user.getProjects();
            List<TestReport> testReports = new ArrayList<TestReport>();
            for (Project project: projects){
                testReports.add(project.getTestReport());
            }
            return processTestReports(testReports);
        }
        else {
            List<TestReport> testReports =testReportRepository.findByAllTestReports();
            return processTestReports(testReports);
        }
    }

    /**
     * 通过测试报告所属Project ID查询测试报告
     *
     * <p>查询测试报告需要传入工程ID project ID</p>
     *<p>
     * 传入工程ID后会首先调用 projectRepository.findById 对该测试报告对应的工程project进行查找,
     * 若该工程ID不属于任何已存在的工程,则会抛出异常,返回字段"can't find project by id : projectID";
     * 若存在,则调用project.getTestReport 检查该工程是否有测试报告与其对应,
     * 若无法找到,则抛出异常,返回字段"can't find testReports with project:  projectID".
     * 否则返回工程ID为projectID的工程对应的测试报告信息
     *</p>
     * @param projectID 以String形式传入工程ID
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
    public JSON queryTestReportByProject(String projectID) throws Exception {
        Project project = projectRepository.findById(projectID);
        if (project == null) {
            throw new Exception("can't find project by id :" + projectID);
        }
        TestReport  testReport = project.getTestReport();
        if (testReport == null) {
            throw new Exception("can't find testReport with projectID: " + projectID);
        }
        return processTestReport(testReport);
    }

    /**
     * 通过测试报告ID查询测试报告
     *
     * <p>通过测试报告ID查询测试报告需要传入测试报告ID</p>
     *<p>
     *  传入测试报告ID后,首先调用testReportsRepository.findById 对测试报告ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的测试报告信息.
     *</p>
     * @param id 以String形式传入测试报告ID
     * @return 以JSONObject形式返回测试报告ID
     * @throws Exception 抛出异常
     *
     */
    public  JSONObject queryTestReportByID(String id) throws Exception{
        TestReport testReport = testReportRepository.findById(id);
        if (testReport == null){
            throw new Exception("Not Found");
        }
        return JSON.parseObject(JSON.toJSONString(testReport));
    }

    /**
     * 对测试报告内容进行编辑
     *
     * <p>编辑测试报告内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出测试报告id以调用this.findEntityById检测该测试报告是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该测试报告存在,则调用baseService类中的updateEntity函数修改测试报告内容body
     * 之后调用testReportRepository.findById获取该测试报告信息
     * 最终返回编辑完成后的测试报告信息
     *
     *</p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回测试报告状态的更新以及更新后的测试报告
     * @throws Exception 抛出异常
     */
    public JSONObject editTestReport(JSONObject params, List<MultipartFile> files, User user) throws Exception{
        TestReport temTestReport = JSONObject.toJavaObject(params, TestReport.class);
        TestReport testReport;
        if((testReport = testReportRepository.findById(temTestReport.getId())) == null){
            throw  new Exception("Not Found");
        }

        //编辑测试报告内容
        testReport.setBody(temTestReport.getBody());
        this.updateEntity(testReport, user);

        testReport = testReportRepository.findById(temTestReport.getId());
        return  processTestReport(testReport);
    }

    /**
     * 新增一个测试报告
     *
     * <p>新增测试报告需要传入创建的对象,上传文件以及用户信息</p>
     *<p>首先通过随机数生成来生成uid,
     * 并调用projectRepository.findById 检测传入的工程ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find project with ID: project ID"
     * 若存在则将获取该ID对应的工程信息
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入新对象testReport中,
     * 将uid作为新测试报告的testReport ID,传入的用户信息user作为新测试报告的持有者User
     * 调用processInstanceService.createTestReportProcess设置新测试报告的流程实例ID
     * 调用BaseService类中的saveEntity将该新测试报告存入数据库
     * 最后返回添加完成后的测试报告信息
     *
     *</p>
     * @param projectID 对应的工程ID
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的测试报告以及测试报告状态的更新
     * @throws Exception 抛出异常
     */
    public JSONObject addTestReport(String projectID, JSONObject params, List<MultipartFile> files, User user) throws Exception{
        String uid = UUID.randomUUID().toString();
        //String uid = params.getString("id");
        //check project
        if (projectRepository.findById(projectID) == null)
            throw new Exception("Can't find project with ID: " + projectID);

        Project project = projectRepository.findById(projectID);
        TestReport testReport = JSONObject.toJavaObject(params, TestReport.class);
        testReport.setId(uid);


        String processInstanceID = processInstanceService.createTestReportProcess(params, user);
        testReport.setProcessInstanceID(processInstanceID);

        //set testReport in project
        project.setTestReport(testReport);
        projectRepository.save(project);

        //set project in testReport
        testReport.setProject(project);
        this.saveEntity(testReport, user);

        testReport = testReportRepository.findById(uid);
        return processTestReport(testReport);
    }


    /**
     * 对测试报告进行删除
     *
     * <p>删除测试报告需要传入相应的测试报告信息</p>
     * <p>首先提取出待删除测试报告的TestReport ID,
     * 并调用testReportsRepository.findById检测该测试报告是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find testReport with id: id"
     * 若返回值不为空,则调用 project.setTestReport将其置为NULL以删除该测试报告
     * </p>
     *
     * @param params 待删除测试报告信息
     * @throws Exception 若传入的测试报告信息不存在则抛出异常
     */
    public void deleteTestReport(JSONObject params) throws Exception{
        String uid = params.getString("id");
        TestReport testReport = testReportRepository.findById(uid);
        if (testReport == null)
            throw new Exception("Can't find testReport with id: " + uid);
        //delete testReport from project
        Project project = testReport.getProject();
        project.setTestReport(null);

        //delete testReport
        this.deleteEntity(uid);
    }

    //删除测试报告内容
    /**
     * 处理TestReport为空的情况
     *
     * <p>应传入该测试报告信息</p>
     *
     * @param testReports 测试报告信息
     * @return 以JSONArray形式返回更新状态后测试报告信息以及测试报告信息
     * @throws Exception 抛出异常
     */
    private JSONArray processTestReports(List<TestReport> testReports) throws Exception{
        JSONArray resultArray = new JSONArray();
        for (TestReport testReport: testReports) {
            if (testReport != null) {
                JSONObject jsonObject = processTestReport(testReport);
                //jsonObject.remove("body");

                resultArray.add(jsonObject);
            }
        }

        return  resultArray;
    }

    
    /**
     * <p>处理TestReport为空的情况</p>
     *
     * <p>应传入测试报告信息</p>
     *
     * @param testReport 测试报告信息
     * @return 以JSONObject状态返回状态更新后的测试报告
     * @throws Exception 抛出异常
     */
    JSONObject processTestReport(TestReport testReport) throws Exception{
        JSONObject jsonObject = JSON.parseObject(JSON.toJSONString(testReport));
        JSONObject processState = processInstanceService.queryProcessState(testReport.getProcessInstanceID());
        jsonObject.putAll(processState);
        if (testReport != null && testReport.getProject() != null)
            jsonObject.put("projectID", testReport.getProject().getId());
        return jsonObject;
    }
}
