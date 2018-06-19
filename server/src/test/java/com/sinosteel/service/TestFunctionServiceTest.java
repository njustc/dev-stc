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
public class TestFunctionServiceTest {

    private User testUser;
    private User customer1;
    private User customer2;

    @Autowired
    private TestFunctionService testFunctionService;

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
        System.out.println("=====testUser 新建一个测试功能=====");
        JSONObject TestFunction = new JSONObject();
        //TestFunction.put("body", "这是customer1测试中新建的一个测试功能");

        try {
/*
            //test_addTestFunction
            JSONObject jsonResult = testFunctionService.addTestFunction(TestFunction, null, testUser);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试功能新建失败",id);
            System.out.println("测试功能新建成功, 测试功能的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryTestFunctionsByID
            System.out.println("=====通过ID查询该测试功能=====");
            JSONObject jsonTestFunction = testFunctionService.queryTestFunctionByID(id);
            Assert.assertNotNull("通过ID查询测试功能失败",jsonTestFunction);
            System.out.println(jsonTestFunction);

            /*
            //test_editTestFunction
            System.out.println("=====编辑该测试功能内容=====");
            String edit_object = "body";
            String edit_contents = "这是testUser在测试中修改的测试功能";
            jsonTestFunction.put(edit_object,edit_contents );
            jsonTestFunction = testFunctionService.editTestFunction(jsonTestFunction, null, testUser);
            Assert.assertEquals("测试功能修改失败",edit_contents,jsonTestFunction.getString(edit_object));  //检验功能内容修改是否符合预期
            System.out.println(jsonTestFunction);


            //test_deleteTestFunction
            System.out.println("=====删除该测试功能=====");
            testFunctionService.deleteTestFunction(jsonTestFunction);
            JSONObject jsonDel = testFunctionService.queryTestFunctionByID(id);
            Assert.assertNull("测试功能删除失败",jsonDel);
            System.out.println("测试功能删除成功");
*/

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
