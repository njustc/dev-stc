package com.njustc.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.njustc.FrameworkApplication;
import com.njustc.domain.User;
import com.njustc.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 *
 * 本测试用来测试TestReport Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>通过用户查询测试报告</td>
 *          <td>queryTestReports</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>新建测试报告</td>
 *          <td>addTestReport</td>
 *          <td>新建成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过测试报告ID查询测试报告</td>
 *          <td>queryTestReportByID</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过工程查询测试报告</td>
 *          <td>queryTestReportsByProject</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>编辑测试报告内容</td>
 *          <td>editTestReport</td>
 *          <td>编辑成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除测试报告</td>
 *          <td>deleteTestReport</td>
 *          <td>queryTestReportByID为空,删除成功</td>
 *      </tr>
 * </table>
 *
 *
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@Transactional
public class TestReportServiceTest {
    private User tester;
    private User customer1;
    private User customer2;

    @Autowired
    private TestReportService testReportService;

    @Autowired
    private UserRepository userRepository;


    @Before
    public void getUser() {
        tester = userRepository.findByUsername("testing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
    }

    @Ignore
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
    }
    @Test
    public void test_SE(){
        System.out.println("=====tester 新建一个测试报告=====");
        JSONObject TestReport = new JSONObject();
        TestReport.put("body", "这是testUser测试中新建的一个测试报告");


        try {

            //test_addTestReport

            String pro_id = "p1";

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

            //test_queryTestReportByProject
            System.out.println("=====通过工程查询该测试报告=====");
            JSON jsonTestReport_pro = testReportService.queryTestReportByProject(pro_id);
            Assert.assertNotNull("通过工程查询测试报告失败",jsonTestReport_pro);
            System.out.println(jsonTestReport_pro);
            
            
            
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
