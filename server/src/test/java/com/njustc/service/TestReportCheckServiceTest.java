package com.njustc.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.njustc.FrameworkApplication;
import com.njustc.domain.User;
import com.njustc.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 *
 * 本测试用来测试TestReportCheck Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>通过用户查询测试报告检查</td>
 *          <td>queryTestReportChecks</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>新建测试报告检查</td>
 *          <td>addTestReportCheck</td>
 *          <td>新建成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过测试报告检查ID查询测试报告检查</td>
 *          <td>queryTestReportCheckByID</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过工程查询测试报告检查</td>
 *          <td>queryTestReportChecksByProject</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>编辑测试报告检查内容</td>
 *          <td>editTestReportCheck</td>
 *          <td>编辑成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除测试报告检查</td>
 *          <td>deleteTestReportCheck</td>
 *          <td>queryTestReportCheckByID为空,删除成功</td>
 *      </tr>
 * </table>
 *
 *
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@Transactional
public class TestReportCheckServiceTest {
    
    private User tester;
    private User customer1;
    private User customer2;

    @Autowired
    private TestReportCheckService testReportCheckService;

    @Autowired
    private UserRepository userRepository;


    /**
     * 获取用户信息,将其作为之后测试方法时的参数
     */
    @Before
    public void getUser() {
        tester = userRepository.findByUsername("testing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
    }

    /**
     * 所测试的方法:根据用户所对应工程查询测试报告检查
     */
    @Test
    public void testqueryTestReportChecks(){
        System.out.println("开始测试工作人员获取测试报告检查");
        try {
            JSON result = testReportCheckService.queryTestReportChecks(tester);

            Assert.assertNotNull("工作人员 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 所测试的方法:新建测试报告检查,通过ID查询测试报告检查,通过工程ID查询测试报告检查,编辑测试报告检查内容,删除测试报告检查
     */
    @Test
    public void testTestReportCheck(){
        System.out.println("=====tester 新建一个测试报告检查=====");
        JSONObject TestReportCheck = new JSONObject();
        TestReportCheck.put("body", "这是testUser测试中新建的一个测试报告检查");


        try {

            //testaddTestReportCheck

            String pro_id = "p1";
            JSONObject jsonResult = testReportCheckService.addTestReportCheck(pro_id,TestReportCheck, null, tester);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试报告检查新建失败",id);
            System.out.println("测试报告检查新建成功, 测试报告检查的ID为: " + id);
            System.out.println(jsonResult);

            //testqueryTestReportChecksByID
            System.out.println("=====通过ID查询该测试报告检查=====");
            JSONObject jsonTestReportCheck = testReportCheckService.queryTestReportCheckByID(id);
            Assert.assertNotNull("通过ID查询测试报告检查失败",jsonTestReportCheck);
            System.out.println(jsonTestReportCheck);

            //testqueryTestReportCheckByProject
            System.out.println("=====通过工程查询该测试报告检查=====");
            JSON jsonTestReportCheck_pro = testReportCheckService.queryTestReportCheckByProject(pro_id);
            Assert.assertNotNull("通过工程查询测试报告检查失败",jsonTestReportCheck_pro);
            System.out.println(jsonTestReportCheck_pro);
            
            
            //testeditTestReportCheck
            System.out.println("=====编辑该测试报告检查内容=====");
            String edit_object = "body";
            String edit_contents = "这是tester在测试中修改的测试报告检查";
            jsonTestReportCheck.put(edit_object,edit_contents );
            jsonTestReportCheck = testReportCheckService.editTestReportCheck(jsonTestReportCheck, null, tester);
            Assert.assertEquals("测试报告检查修改失败",edit_contents,jsonTestReportCheck.getString(edit_object));  //检验报告检查内容修改是否符合预期
            System.out.println(jsonTestReportCheck);


            //testdeleteTestReportCheck
            System.out.println("=====删除该测试报告检查=====");
            testReportCheckService.deleteTestReportCheck(jsonTestReportCheck);
            try{
                JSONObject jsonDel = testReportCheckService.queryTestReportCheckByID(id);
                Assert.assertNull("测试报告检查删除失败",jsonDel);
            }
            catch (Exception e){
                System.out.println("测试报告检查删除成功");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
