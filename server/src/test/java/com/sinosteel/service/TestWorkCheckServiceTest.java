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
public class TestWorkCheckServiceTest {
    private User tester;
    private User customer1;
    private User customer2;

    @Autowired
    private TestWorkCheckService testWorkCheckService;

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
        System.out.println("开始测试用户获取测试工作检查");
        try {
            JSON result = testWorkCheckService.queryTestWorkChecks(customer1);

            Assert.assertNotNull("用户 - 工程查询失败",result);

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
        TestWorkCheck.put("body", "这是testUser测试中新建的一个测试工作检查");


        try {

            //test_addTestWorkCheck
            JSONObject consign = new JSONObject();
            JSONObject jsonConsign = consignService.addConsign(consign,null,tester);
            JSONObject project = new JSONObject();
            String consign_id = jsonConsign.getString("id");
            JSONObject jsonProject = projectService.addProject(consign_id,project,null,tester);
            String pro_id = jsonProject.getString("id");
            JSONObject jsonResult = testWorkCheckService.addTestWorkCheck(pro_id,jsonProject, null, tester);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试工作检查新建失败",id);
            System.out.println("测试工作检查新建成功, 测试工作检查的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryTestWorkChecksByID
            System.out.println("=====通过ID查询该测试工作检查=====");
            JSONObject jsonTestWorkCheck = testWorkCheckService.queryTestWorkCheckByID(id);
            Assert.assertNotNull("通过ID查询测试工作检查失败",jsonTestWorkCheck);
            System.out.println(jsonTestWorkCheck);


            //test_editTestWorkCheck
            System.out.println("=====编辑该测试工作检查内容=====");
            String edit_object = "body";
            String edit_contents = "这是tester在测试中修改的测试工作检查";
            jsonTestWorkCheck.put(edit_object,edit_contents );
            jsonTestWorkCheck = testWorkCheckService.editTestWorkCheck(jsonTestWorkCheck, null, tester);
            Assert.assertEquals("测试工作检查修改失败",edit_contents,jsonTestWorkCheck.getString(edit_object));  //检验工作检查内容修改是否符合预期
            System.out.println(jsonTestWorkCheck);


            //test_deleteTestWorkCheck
            System.out.println("=====删除该测试工作检查=====");
            testWorkCheckService.deleteTestWorkCheck(jsonTestWorkCheck);
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
