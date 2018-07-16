package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.User;
import com.sinosteel.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
@Transactional
public class TestReportServiceTest {
    private User tester;
    private User customer1;
    private User customer2;

    @Autowired
    private TestReportService testReportService;

    @Autowired
    private ConsignService consignService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository userRepository;


    @Before
    public void getUser() {
        tester = userRepository.findByUsername("testing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
    }

    @Test
    public void test_queryTestReports(){
        System.out.println("开始测试工作人员获取测试报告");
        try {
            JSON result = testReportService.queryTestReport(tester);

            Assert.assertNotNull("工作人员 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取测试报告");
        try {
            JSON result = testReportService.queryTestReport(customer1);

            Assert.assertNotNull("用户 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Test
    public void test_SE(){
        System.out.println("=====tester 新建一个测试报告=====");
        JSONObject TestReport = new JSONObject();
        TestReport.put("body", "这是testUser测试中新建的一个测试报告");


        try {

            //test_addTestReport
            JSONObject consign = new JSONObject();
            JSONObject jsonConsign = consignService.addConsign(consign,null,tester);
            JSONObject project = new JSONObject();
            String consign_id = jsonConsign.getString("id");
            JSONObject jsonProject = projectService.addProject(consign_id,project,null,tester);
            String pro_id = jsonProject.getString("id");

            JSONObject jsonResult = testReportService.addTestReport(pro_id,TestReport, null, tester);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试报告新建失败",id);
            System.out.println("测试报告新建成功, 测试报告的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryTestReportsByID
            System.out.println("=====通过ID查询该测试报告=====");
            JSONObject jsonTestReport = testReportService.queryTestReportByID(id);
            Assert.assertNotNull("通过ID查询测试报告检失败",jsonTestReport);
            System.out.println(jsonTestReport);


            //test_editTestReport
            System.out.println("=====编辑该测试报告内容=====");
            String edit_object = "body";
            String edit_contents = "这是tester在测试中修改的测试报告";
            jsonTestReport.put(edit_object,edit_contents );
            jsonTestReport = testReportService.editTestReport(jsonTestReport, null, tester);
            Assert.assertEquals("测试报告修改失败",edit_contents,jsonTestReport.getString(edit_object));  //检验报告内容修改是否符合预期
            System.out.println(jsonTestReport);


            //test_deleteTestReport
            System.out.println("=====删除该测试报告=====");

            testReportService.deleteTestReport(jsonTestReport);
            try{
                JSONObject jsonDel = testReportService.queryTestReportByID(id);
                Assert.assertNull("测试报告删除失败",jsonDel);
            }
            catch (Exception e){
                System.out.println("测试报告删除成功");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
