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
public class TestCaseServiceTest {

    private User tester;
    private User customer1;
    private User customer2;

    @Autowired
    private TestCaseService testCaseService;

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
    public void test_queryTestCase(){
        System.out.println("开始测试工作人员获取测试Case");
        try {
            JSON result = testCaseService.queryTestCases(tester);

            Assert.assertNotNull("工作人员 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取工程");
        try {
            JSON result = testCaseService.queryTestCases(customer1);

            Assert.assertNotNull("用户 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Test
    public void test_SE(){
        System.out.println("=====testUser 新建一个测试样例=====");
        JSONObject TestCase = new JSONObject();
        TestCase.put("body", "这是customer1测试中新建的一个测试样例");

        try {

            //test_addTestCase
            JSONObject consign = new JSONObject();
            JSONObject jsonConsign = consignService.addConsign(consign,null,tester);
            JSONObject project = new JSONObject();
            String consign_id = jsonConsign.getString("id");
            JSONObject jsonProject = projectService.addProject(consign_id,project,null,tester);
            String pro_id = jsonProject.getString("id");
            JSONObject jsonResult = testCaseService.addTestCase(pro_id,jsonProject, null,tester);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试Case新建失败",id);
            System.out.println("测试Case新建成功, 测试Case的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryTestCasesByID
            System.out.println("=====通过ID查询该测试Case=====");
            JSONObject jsonTestCase = testCaseService.queryTestCaseByID(id);
            Assert.assertNotNull("通过ID查询测试Case失败",jsonTestCase);
            System.out.println(jsonTestCase);


            //test_editTestCase
            System.out.println("=====编辑该测试Case内容=====");
            String edit_object = "body";
            String edit_contents = "这是tester在测试中修改的测试Case";
            jsonTestCase.put(edit_object,edit_contents );
            jsonTestCase = testCaseService.editTestCase(jsonTestCase, null, tester);
            Assert.assertEquals("测试Case修改失败",edit_contents,jsonTestCase.getString(edit_object));  //检验Case内容修改是否符合预期
            System.out.println(jsonTestCase);


            //test_deleteTestCase
            System.out.println("=====删除该测试Case=====");
            testCaseService.deleteTestCase(jsonTestCase);
            try{
                JSONObject jsonDel = testCaseService.queryTestCaseByID(id);
                Assert.assertNull("测试Case删除失败",jsonDel);
            }
            catch (Exception e){
                System.out.println("测试Case删除成功");
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
