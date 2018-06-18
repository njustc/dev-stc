package com.sinosteel.service;

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
public class TestCaseServiceTest {

    private User testUser;
    private User customer1;
    private User customer2;

    @Autowired
    private TestCaseService testCaseService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void getUser() {
        testUser = userRepository.findByUsername("testing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
    }

    @Test
    public void test_SE(){
        System.out.println("=====testUser 新建一个测试样例=====");
        JSONObject TestCase = new JSONObject();
        //TestCase.put("body", "这是customer1测试中新建的一个测试样例");

        try {
/*
            //test_addTestCase
            JSONObject jsonResult = testCaseService.addTestCase(TestCase, null, testUser);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试样例新建失败",id);
            System.out.println("测试样例新建成功, 测试样例的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryTestCasesByID
            System.out.println("=====通过ID查询该测试样例=====");
            JSONObject jsonTestCase = testCaseService.queryTestCaseByID(id);
            Assert.assertNotNull("通过ID查询测试样例失败",jsonTestCase);
            System.out.println(jsonTestCase);

            /*
            //test_editTestCase
            System.out.println("=====编辑该测试样例内容=====");
            String edit_object = "body";
            String edit_contents = "这是testUser在测试中修改的测试样例";
            jsonTestCase.put(edit_object,edit_contents );
            jsonTestCase = testCaseService.editTestCase(jsonTestCase, null, testUser);
            Assert.assertEquals("测试样例修改失败",edit_contents,jsonTestCase.getString(edit_object));  //检验样例内容修改是否符合预期
            System.out.println(jsonTestCase);


            //test_deleteTestCase
            System.out.println("=====删除该测试样例=====");
            testCaseService.deleteTestCase(jsonTestCase);
            JSONObject jsonDel = testCaseService.queryTestCaseByID(id);
            Assert.assertNull("测试样例删除失败",jsonDel);
            System.out.println("测试样例删除成功");
*/

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
