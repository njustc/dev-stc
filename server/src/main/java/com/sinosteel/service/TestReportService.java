package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.User;
import com.sinosteel.domain.TestReport;
import com.sinosteel.repository.TestReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * @author LBW & Lumpy
 */

@Service
public class TestReportService extends BaseService<TestReport>{

    @Autowired
    private TestReportRepository testReportRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;

    public JSON queryTestReport(User user) throws Exception{
        if (user !=null){
            System.out.println("queryTestReports --> query user role: " + user.getRoles().get(0).getRoleName());
        }
        if (user.getRoles().get(0).getRoleName().equals("普通客户")){
            List<TestReport> testReports = user.getTestReports();
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
        testReport.setReport(temTestReport.getReport());
        this.updateEntity(testReport, user);

        testReport = testReportRepository.findById(temTestReport.getId());
        return  processTestReport(testReport);
    }


    public JSONObject addTestReport(JSONObject params, List<MultipartFile> files, User user) throws Exception{
        String uid = UUID.randomUUID().toString();

        TestReport testReport = JSONObject.toJavaObject(params, TestReport.class);
        testReport.setId(uid);

        this.saveEntity(testReport,user);

        testReport = testReportRepository.findById(uid);
        return processTestReport(testReport);
    }


    public void deleteTestReport(JSONObject params){
        String uid = params.getString("id");
        this.deleteEntity(uid);
    }


    private JSONArray processTestReports(List<TestReport> testReports) throws Exception{
        JSONArray resultArray = new JSONArray();
        for (TestReport testReport: testReports){
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testReport));
            resultArray.add(jsonObject);
        }

        return  resultArray;
    }


    private  JSONObject processTestReport(TestReport testReport) throws Exception{
        JSONObject jsonObject = JSON.parseObject(JSON.toJSONString(testReport));
        return  jsonObject;
    }
}
