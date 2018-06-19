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
public class TestBugServiceTest {

    private User testUser;
    private User customer1;
    private User customer2;

    @Autowired
    private TestBugService testBugService;

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
        System.out.println("=====testUser 新建一个测试Bug=====");
        JSONObject TestBug = new JSONObject();
        //TestBug.put("body", "这是customer1测试中新建的一个测试Bug");

        try {

            //test_addTestBug
            JSONObject jsonResult = testBugService.addTestBug(TestBug, null, testUser);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试Bug新建失败",id);
            System.out.println("测试Bug新建成功, 测试Bug的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryTestBugsByID
            System.out.println("=====通过ID查询该测试Bug=====");
            JSONObject jsonTestBug = testBugService.queryTestBugByID(id);
            Assert.assertNotNull("通过ID查询测试Bug失败",jsonTestBug);
            System.out.println(jsonTestBug);

            /*
            //test_editTestBug
            System.out.println("=====编辑该测试Bug内容=====");
            String edit_object = "body";
            String edit_contents = "这是testUser在测试中修改的测试Bug";
            jsonTestBug.put(edit_object,edit_contents );
            jsonTestBug = testBugService.editTestBug(jsonTestBug, null, testUser);
            Assert.assertEquals("测试Bug修改失败",edit_contents,jsonTestBug.getString(edit_object));  //检验Bug内容修改是否符合预期
            System.out.println(jsonTestBug);
            */

            //test_deleteTestBug
            System.out.println("=====删除该测试Bug=====");
            testBugService.deleteTestBug(jsonTestBug);
            JSONObject jsonDel = testBugService.queryTestBugByID(id);
            Assert.assertNull("测试Bug删除失败",jsonDel);
            System.out.println("测试Bug删除成功");


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

