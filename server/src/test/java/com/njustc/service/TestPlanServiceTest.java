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
 * 本测试用来测试TestPlan Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>通过用户查询测试计划</td>
 *          <td>queryTestPlans</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>新建测试计划</td>
 *          <td>addTestPlan</td>
 *          <td>新建成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过测试计划ID查询测试计划</td>
 *          <td>queryTestPlanByID</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过工程查询测试计划</td>
 *          <td>queryTestPlansByProject</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>编辑测试计划内容</td>
 *          <td>editTestPlan</td>
 *          <td>编辑成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除测试计划</td>
 *          <td>deleteTestPlan</td>
 *          <td>queryTestPlanByID为空,删除成功</td>
 *      </tr>
 * </table>
 *
 *
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@Transactional
public class TestPlanServiceTest {
    private User tester;
    private User customer1;
    private User customer2;

    @Autowired
    private TestPlanService testPlanService;

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
    public void test_queryTestPlans(){
        System.out.println("开始测试工作人员获取测试计划");
        try {
            JSON result = testPlanService.queryTestPlans(tester);

            Assert.assertNotNull("工作人员 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取测试计划");
        try {
            JSON result = testPlanService.queryTestPlans(customer1);

            Assert.assertNotNull("用户 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test_SE(){
        System.out.println("=====tester 新建一个测试计划=====");
        JSONObject TestPlan = new JSONObject();
        TestPlan.put("body", "这是testUser测试中新建的一个测试计划");


        try {

//test_addTestPlan
            String pro_id = "p1";
            JSONObject jsonResult = testPlanService.addTestPlan(pro_id,TestPlan,null,tester);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试计划新建失败",id);
            System.out.println("测试计划新建成功, 测试计划的信息为: " + jsonResult);

            //test_queryTestPlansByID
            System.out.println("=====通过ID查询该测试计划=====");
            JSONObject jsonTestPlan = testPlanService.queryTestPlanByID(id);
            Assert.assertNotNull("通过ID查询测试计划失败",jsonTestPlan);
            System.out.println("通过ID查询测试计划成功,测试计划信息为:"+ jsonTestPlan);

            //test_editTestPlan
            System.out.println("=====编辑该测试计划内容=====");
            String edit_object = "body";
            String edit_contents = "这是tester在测试中修改的测试计划";
            jsonTestPlan.put(edit_object,edit_contents );
            jsonTestPlan = testPlanService.editTestPlan(jsonTestPlan, null, tester);
            Assert.assertEquals("测试计划修改失败",edit_contents,jsonTestPlan.getString(edit_object));  //检验计划内容修改是否符合预期
            System.out.println("测试计划修改成功:测试计划信息为" + jsonTestPlan);

            //test_deleteTestPlan
            System.out.println("=====删除该测试计划=====");
            testPlanService.deleteTestPlan(jsonResult);
            try{
                JSONObject jsonDel = testPlanService.queryTestPlanByID(id);
                Assert.assertNull("测试计划删除失败",jsonDel);
            }
            catch (Exception e){
                System.out.println("测试计划删除成功");
            }

        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
