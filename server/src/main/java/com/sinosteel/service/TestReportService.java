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

/**
 * @author LBW & Lumpy
 */

@Service
public class TestReportService extends BaseService<TestReport>{

    @Autowired
    private TestReportRepository testReportRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;

    public JSON queryTestReport(User user) throws Exception{
        if (user !=null){
            System.out.println("queryTestReports --> query user role: " + user.getRoles().get(0).getRoleName());
        }
        if (user.getRoles().get(0).getRoleName().equals("普通客户")){
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


    public  JSONObject queryTestReportByID(String id) throws Exception{
        TestReport testReport = testReportRepository.findById(id);
        if (testReport == null){
            throw new Exception("Not Found");
        }
        return JSON.parseObject(JSON.toJSONString(testReport));
    }


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


    public JSONObject addTestReport(JSONObject params, List<MultipartFile> files, User user) throws Exception{
        //String uid = UUID.randomUUID().toString();
        String uid = params.getString("id");
        //check project
        if (projectRepository.findById(uid) == null)
            throw new Exception("Can't find project with ID: " + uid);

        TestReport testReport = JSONObject.toJavaObject(params, TestReport.class);
        testReport.setId(uid);
        testReport.setProject(projectRepository.findById(uid));

        this.saveEntity(testReport,user);

        testReport = testReportRepository.findById(uid);
        return processTestReport(testReport);
    }


    public void deleteTestReport(JSONObject params){
        String uid = params.getString("id");
        this.deleteEntity(uid);
    }

    //删除测试报告内容 Todo：添加状态
    private JSONArray processTestReports(List<TestReport> testReports) throws Exception{
        JSONArray resultArray = new JSONArray();
        for (TestReport testReport: testReports){
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testReport));
            jsonObject.remove("report");
            resultArray.add(jsonObject);
        }

        return  resultArray;
    }

    //Todo: 增加测试报告状态
    private  JSONObject processTestReport(TestReport testReport) throws Exception{
        JSONObject jsonObject = JSON.parseObject(JSON.toJSONString(testReport));
        return  jsonObject;
    }
}
