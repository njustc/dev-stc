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
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
@Transactional
public class TestPlanServiceTest {

    private User marketUser;
    private User customer1;
    private User customer2;

    @Autowired
    private TestPlanService testPlanService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void getUser() {
        marketUser = userRepository.findByUsername("marketing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
    }

    @Test
    public void test_SE(){
        System.out.println("=====customer1 新建一个测试计划=====");
        JSONObject TestPlan = new JSONObject();
        TestPlan.put("plan", "这是customer1测试中新建的一个测试计划");

        try {

            //test_addTestPlan
            JSONObject jsonResult = testPlanService.addTestPlan(TestPlan, null, customer1);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试计划新建失败",id);
            System.out.println("测试计划新建成功, 测试计划的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryTestPlansByID
            System.out.println("=====通过ID查询该测试计划=====");
            JSONObject jsonTestPlan = testPlanService.queryTestPlanByID(id);
            Assert.assertNotNull("通过ID查询测试计划失败",jsonTestPlan);
            System.out.println(jsonTestPlan);

            //test_editTestPlan
            System.out.println("=====编辑该测试计划内容=====");
            String edit_object = "plan";
            String edit_contents = "这是customer1在测试中修改的测试计划";
            jsonTestPlan.put(edit_object,edit_contents );
            jsonTestPlan = testPlanService.editTestPlan(jsonTestPlan, null, customer1);
            Assert.assertEquals("测试计划修改失败",edit_contents,jsonTestPlan.getString(edit_object));  //检验报告内容修改是否符合预期
            System.out.println(jsonTestPlan);

            //test_deleteTestPlan
            System.out.println("=====删除该测试计划=====");
            testPlanService.deleteTestPlan(jsonTestPlan);
            JSONObject jsonDel = testPlanService.queryTestPlanByID(id);
            Assert.assertNull("测试计划删除失败",jsonDel);
            System.out.println("测试计划删除成功");


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
