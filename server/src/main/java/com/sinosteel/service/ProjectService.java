package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.*;
import com.sinosteel.repository.ConsignRepository;
import com.sinosteel.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * {@code ProjectService} It's a Project Service 
 * 
 * <p> Including functions:query projects by users, query projects by Project ID,
 * add projects ,delete projects ,edit projects, </p>
 * 
 * @author LBW
 * @author SQW
 * @since 2018/7/15
 * @version 1.0
 * 
 */
//TODO: 并发修改同一project的时候，可能会出问题.
@Service
public class ProjectService extends BaseService<Project>{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;

    @Autowired
    private ConsignService consignService;
    @Autowired
    private ConsignRepository consignRepository;

    @Autowired
    private ContractService contractService;
    @Autowired
    private TestCaseService testCaseService;
    @Autowired
    private TestFunctionService testFunctionService;
    @Autowired
    private TestPlanService testPlanService;
    @Autowired
    private TestReportService testReportService;
    @Autowired
    private TestReportCheckService testReportCheckService;
    @Autowired
    private TestWorkCheckService testWorkCheckService;
    @Autowired
    private SatisfactionSurveyService satisfactionSurveyService;

    /**
     *通过用户查询订工程
     *
     * <p>查询工程需要传入用户身份User</p>
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有合同信息;
     *  如果User身份是工作人员,则调用user.getContracts返回所有的合同信息
     *</p>
     *
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     *
     *
     */

    public JSON queryProjects(User user) throws Exception{
        if(user!=null)
            System.out.println("queryProjects-->query user role:"+user.getRoles().get(0).getRoleName());

        if(user.getRoles().get(0).getRoleName().equals("普通客户")){
            //返回该用户的工程
            List<Project> projects = user.getProjects();
            return processProjects(projects);
        }
        else {
            List<Project> projects = projectRepository.findByAllProjects();
            return processProjects(projects);
        }
    }

    /**
     * 通过工程projectID查询工程
     *
     * <p>查询工程需要传入工程ID projectID</p>
     *
     *  <p>传入工程ID后,首先调用contractRepository.findById 对工程ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的工程信息.
     *  </p>
     *
     * @param id 以String形式传入工程ID
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */

    public JSONObject queryProjectById(String id) throws Exception{
        Project project = projectRepository.findById(id);
        if(project == null) {
            throw new Exception("Not found");
        }
        //return JSON.parseObject(JSON.toJSONString(project));
        return processProject(project);
    }


    /**
     * 新建一个工程
     *
     * <p>新建一个工程必须传入其对应的委托ID与新建工程的用户信息</p>
     *
     *<p>首先通过随机数生成来生成uid,
     * 调用consignRepository.findById检测传入的Consign ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find consign with ID: consign ID",
     * 若该Consign ID存在,则将其对应的委托信息提取出来.
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入project中,
     * 将uid作为新工程的project ID,将Consign ID对应的Consign User作为新工程的持有者User
     * 调用BaseService类中的saveEntity将该新工程存入数据库
     * 最后返回添加完成后的工程信息
     *
     *</p>
     * @param consignID 以String形式传入委托ID
     * @param params 新创建的JSONObject形式的对象
     * @param files 上传的文件
     * @param user 用户信息
     * @return 返回新增的工程信息
     * @throws Exception 如果传入的委托ID不存在则抛出异常
     */
    public JSONObject addProject(String consignID, JSONObject params, List<MultipartFile> files,User user) throws Exception{

        String uid = UUID.randomUUID().toString();
        //String uid = params.getString("id");
        //check consign
        if (consignRepository.findById(consignID) == null)
            throw new Exception("Can't find consign with ID: " + consignID);

        Consign consign = consignRepository.findById(consignID);
        Project project = JSONObject.toJavaObject(params, Project.class);
        project.setId(uid);
        project.setUser(consign.getUser());//将工程的user设置为consign的user而不是当前用户
        project.setConsign(consign);


        //TODO:start process Instance
        /*String processInstanceID = processInstanceService.createProjectProcess(params, user);
          project.setProcessInstanceID(processInstanceID);
         */

        this.saveEntity(project, user);
        project = projectRepository.findById(uid);
        return processProject(project);
    }


    /**
     * 对工程内容进行编辑
     *
     * <p>编辑工程内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出工程id以调用this.findEntityById检测该工程是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该工程存在,则...TODO:更新具体的工程内容
     * 之后调用contractRepository.findById获取该id对应的委托信息,将其对应User设为project的User,
     * 再调用BaseService类下的updateEntity进行更新
     * 最终调返回编辑完成后的合同信息
     * </p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回工程状态的更新以及更新后的工程
     * @throws Exception 抛出异常
     */

    public JSONObject editProject(JSONObject params, List<MultipartFile> files, User user) throws Exception{
        Project tempProject = JSONObject.toJavaObject(params, Project.class);
        Project project;
        if((project = projectRepository.findById(tempProject.getId())) == null) {
            throw new Exception("Not Found");
        }
        //TODO:更新具体的工程内容
        Consign consign = consignRepository.findById(tempProject.getId());
        this.updateEntity(project, consign.getUser());

        project = projectRepository.findById(tempProject.getId());
        return processProject(project);
    }

    /**
     * 对工程进行删除
     *
     * <p>删除工程需要传入相应的工程信息</p>
     * <p>首先提取出待删除工程的Project ID,
     * 并调用projectRepository.findById检测该工程是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find project with id: id"
     * 若返回值不为NULL,检测该工程下对应的contract,testcase,testFunction,testPlan,
     * TestReportCheck,TestReport,TestWorkCheck,并将其全部删除,
     * ,最后调用BaseService类中的deleteEntity删除该工程
     * </p>
     *
     * @param params 待删除工程信息
     * @throws Exception 若传入的工程信息不存在则抛出异常
     */

    public void deleteProject(JSONObject params) throws Exception{
        String uid = params.getString("id");
        Project project = projectRepository.findById(uid);
        if(project == null) {
            throw new Exception("can't find project by id : " + uid);
        }
        //delete all entities in the project.
        Contract contract = project.getContract();
        if (contract != null) {
            contractService.deleteEntity(contract.getId());
        }
        List<TestCase> testCases = project.getTestCase();
        if (testCases != null) {
            for (TestCase testCase: testCases)
                testCaseService.deleteEntity(testCase.getId());
        }
        List<TestFunction> testFunctions = project.getTestFunctions();
        if (testFunctions != null) {
            for (TestFunction testFunction: testFunctions)
                testFunctionService.deleteEntity(testFunction.getId());
        }
        TestPlan testPlan = project.getTestPlan();
        if (testPlan != null) {
            testPlanService.deleteEntity(testPlan.getId());
        }
        TestReportCheck testReportCheck = project.getTestReportCheck();
        if (testReportCheck != null) {
            testReportCheckService.deleteEntity(testReportCheck.getId());
        }
        TestReport testReport = project.getTestReport();
        if (testReport != null) {
            testReportService.deleteEntity(testReport.getId());
        }
        TestWorkCheck testWorkCheck = project.getTestWorkCheck();
        if (testWorkCheck != null) {
            testWorkCheckService.deleteEntity(testWorkCheck.getId());
        }

        this.deleteEntity(uid);
    }

    /**
     * 增加工程状态
     *
     * <p>增加委托状态应传入该工程信息</p>
     *
     * @param projects 工程信息
     * @return 以JSONObject形式返回更新状态后的工程信息
     * @throws Exception 抛出异常
     */
    private JSONArray processProjects(List<Project> projects) throws Exception{
        JSONArray resultArray = new JSONArray();
        //去掉工程内容，添加工程状态
        for (Project project: projects) {
            JSONObject jsonObject = processProject(project);
            resultArray.add(jsonObject);
        }
        return resultArray;
    }

    /**
     * 增加客户姓名，客户ID. MaybeTODO:增加状态
     *
     * <p>须传入该工程信息</p>
     *
     * @param project 待更新的工程信息
     * @return 以JSONObject的形式返回更新后的工程信息
     * @throws Exception 抛出异常
     */

    private JSONObject processProject(Project project) throws Exception {
        Consign consign = project.getConsign();
        Contract contract = project.getContract();
        TestPlan testPlan = project.getTestPlan();
        TestReport testReport = project.getTestReport();
        SatisfactionSurvey satisfactionSurvey = project.getSatisfactionSurvey();
        JSONObject jsonObject = JSON.parseObject(JSON.toJSONString(project));
        //jsonObject.put("username", project.getUser().getUsername());
        //jsonObject.put("userID", project.getUser().getId());
        //jsonObject.put("state",processState);

        //process all entities.
        if (consign != null) {
            jsonObject.put("consign", consignService.processConsign(consign));
        }
        if (contract != null) {
            jsonObject.put("contract", contractService.processContract(contract));
        }
        if (testPlan != null) {
            jsonObject.put("testPlan", testPlanService.processTestPlan(testPlan));
        }
        if (testReport != null) {
            jsonObject.put("testReport", testReportService.processTestReport(testReport));
        }
        if (satisfactionSurvey != null) {
            jsonObject.put("satisfaction", satisfactionSurveyService.processSatisfactionSurvey(satisfactionSurvey));
        }
        return jsonObject;
    }
}
