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
public class ProjectServiceTest {

    private User marketUser;
    private User customer1;
    private User customer2;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void getUser() {
        marketUser = userRepository.findByUsername("marketing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
    }
    @Test
    public void Test_queryProjects(){
        System.out.println("测试工作人员获取工程");
        try {
            JSON result = projectService.queryProjects(marketUser);

            Assert.assertNotNull("工作人员 -工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取工程");
        try {
            JSON result = projectService.queryProjects(customer1);

            Assert.assertNotNull("用户 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Test
    public void test_SE(){
        System.out.println("=====customer1 新建一个工程项目=====");
        JSONObject Project = new JSONObject();
        Project.put("ProjectBody", "这是customer1测试中新建的一个工程");

        try {

            //test_addProject
            JSONObject jsonResult = projectService.addProject(Project, null, customer1);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("工程新建失败",id);
            System.out.println("工程新建成功, 工程的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryProjectsById
            System.out.println("=====通过ID查询该工程=====");
            JSONObject jsonProject = projectService.queryProjectById(id);
            Assert.assertNotNull("通过ID查询工程失败",jsonProject);
            System.out.println(jsonProject);

            //test_editProject
            System.out.println("=====编辑该工程内容====="); //暂无修改内容，暂不做测试


            //test_deleteProject
            System.out.println("=====删除该工程=====");
            projectService.deleteProject(jsonProject);
            JSONObject jsonDel = projectService.queryProjectById(id);
            Assert.assertNull("工程删除失败",jsonDel);
            System.out.println("工程删除成功");


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
