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
 * 本测试用来测试TestWorkCheck Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>通过用户查询测试工作检查</td>
 *          <td>queryTestWorkChecks</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>新建测试工作检查</td>
 *          <td>addTestWorkCheck</td>
 *          <td>新建成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过测试工作检查ID查询测试工作检查</td>
 *          <td>queryTestWorkCheckByID</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过工程查询测试工作检查</td>
 *          <td>queryTestWorkChecksByProject</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>编辑测试工作检查内容</td>
 *          <td>editTestWorkCheck</td>
 *          <td>编辑成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除测试工作检查</td>
 *          <td>deleteTestWorkCheck</td>
 *          <td>queryTestWorkCheckByID为空,删除成功</td>
 *      </tr>
 * </table>
 *
 *
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@Transactional

public class TestWorkCheckServiceTest {
    private User tester;
    private User customer1;
    private User customer2;

    @Autowired
    private TestWorkCheckService testWorkCheckService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void getUser() {
        tester = userRepository.findByUsername("testing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
    }

    @Test
    public void test_queryTestWorkChecks(){
        System.out.println("开始测试工作人员获取测试工作检查");
        try {
            JSON result = testWorkCheckService.queryTestWorkChecks(tester);

            Assert.assertNotNull("工作人员 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test_SE(){
        System.out.println("=====tester 新建一个测试工作检查=====");
        JSONObject TestWorkCheck = new JSONObject();

        TestWorkCheck.put("body", "这是tester测试中新建的一个测试工作检查");
        TestWorkCheck.put("version","版本1.0.0.0.0.0.0.0.0");
        TestWorkCheck.put("acendtime","2014");
        TestWorkCheck.put("client","Client_1");
        TestWorkCheck.put("fcendtime","2018");
        TestWorkCheck.put("softwarename","Creampie Simulator");
        TestWorkCheck.put("testworker","Van");
        TestWorkCheck.put("starttime","2022");

        try {

            //test_addTestWorkCheck

            String pro_id = "p1";
            JSONObject jsonResult = testWorkCheckService.addTestWorkCheck(pro_id,TestWorkCheck, null, tester);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试工作检查新建失败",id);
            System.out.println("测试工作检查新建成功, 测试工作检查的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryTestWorkChecksByID
            System.out.println("=====通过ID查询该测试工作检查=====");
            JSONObject jsonTestWorkCheck = testWorkCheckService.queryTestWorkCheckByID(id);
            Assert.assertNotNull("通过ID查询测试工作检查失败",jsonTestWorkCheck);
            System.out.println(jsonTestWorkCheck);


            //test_queryTestWorkCheckByProject
            System.out.println("=====通过工程查询该测试工作检查=====");
            JSON jsonTestWorkCheck_pro = testWorkCheckService.queryTestWorkCheckByProject(pro_id);
            Assert.assertNotNull("通过工程查询测试工作检查失败",jsonTestWorkCheck_pro);
            System.out.println(jsonTestWorkCheck_pro);

            //test_editTestWorkCheck
            System.out.println("=====编辑该测试工作检查内容=====");

            String edit_object_body = "body";
            String edit_body = "这是tester在测试中修改的测试工作检查";
            jsonTestWorkCheck.put(edit_object_body,edit_body);

            String edit_object_version = "version";
            String edit_version = "1.1.1.1.1.1.1.1.1";
            jsonTestWorkCheck.put(edit_object_version,edit_version);

            String edit_object_acendtime = "acendtime";
            String edit_acendtime = "2014_2014";
            jsonTestWorkCheck.put(edit_object_acendtime,edit_acendtime);

            String edit_object_client = "client";
            String edit_client = "I'm a fucking Client";
            jsonTestWorkCheck.put(edit_object_client,edit_client);

            String edit_object_fcendtime = "fcendtime";
            String edit_fecndtime = "2018_2018";
            jsonTestWorkCheck.put(edit_object_fcendtime,edit_fecndtime);

            String edit_object_testworker = "testworker";
            String edit_testworker = "Van and his handsome guys";
            jsonTestWorkCheck.put(edit_object_testworker,edit_testworker);

            String edit_object_softwarename = "softwarename";
            String edit_softwarename = "Creampie Simulator_1.1";
            jsonTestWorkCheck.put(edit_object_softwarename,edit_softwarename);

            String edit_object_starttime = "starttime";
            String edit_starttime = "2022_2022";
            jsonTestWorkCheck.put(edit_object_starttime,edit_starttime);

            jsonTestWorkCheck = testWorkCheckService.editTestWorkCheck(jsonTestWorkCheck, null, tester);
            /**
             * 检测修改内容是否符合预期
             */
            Assert.assertEquals("测试工作检查Body修改失败",edit_body,jsonTestWorkCheck.getString(edit_object_body));
            Assert.assertEquals("测试工作Version检查修改失败",edit_version,jsonTestWorkCheck.getString(edit_object_version));
            Assert.assertEquals("测试工作检查acendtime修改失败",edit_acendtime,jsonTestWorkCheck.getString(edit_object_acendtime));
            Assert.assertEquals("测试工作检查client修改失败",edit_client,jsonTestWorkCheck.getString(edit_object_client));
            Assert.assertEquals("测试工作检查fcendtime修改失败",edit_fecndtime,jsonTestWorkCheck.getString(edit_object_fcendtime));
            Assert.assertEquals("测试工作检查softwarename修改失败",edit_softwarename,jsonTestWorkCheck.getString(edit_object_softwarename));
            Assert.assertEquals("测试工作检查test_worker修改失败",edit_testworker,jsonTestWorkCheck.getString(edit_object_testworker));
            Assert.assertEquals("测试工作检查starttime修改失败",edit_starttime,jsonTestWorkCheck.getString(edit_object_starttime));
            System.out.println(jsonTestWorkCheck);

            //test_deleteTestWorkCheck
            System.out.println("=====删除该测试工作检查=====");
            testWorkCheckService.deleteTestWorkCheck(jsonResult);
            try{
                JSONObject jsonDel = testWorkCheckService.queryTestWorkCheckByID(id);
                Assert.assertNull("测试工作检查删除失败",jsonDel);
            }
            catch (Exception e){
                System.out.println("测试工作检查删除成功");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
