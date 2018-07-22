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

import javax.transaction.Transactional;

/**
 *
 * 本测试用来测试TestBug Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>通过用户查询测试错误</td>
 *          <td>queryTestBugs</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>新建测试错误</td>
 *          <td>addTestBug</td>
 *          <td>新建成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过测试错误ID查询测试错误</td>
 *          <td>queryTestBugByID</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过工程查询测试错误</td>
 *          <td>queryTestBugsByProject</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>编辑测试错误内容</td>
 *          <td>editTestBug</td>
 *          <td>编辑成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除测试错误</td>
 *          <td>deleteTestBug</td>
 *          <td>queryTestBugByID为空,删除成功</td>
 *      </tr>
 * </table>
 *
 *
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@Transactional
public class TestBugServiceTest {

    private User tester;
    private User customer1;
    private User customer2;

    @Autowired
    private TestBugService testBugService;


    @Autowired
    private ProjectService projectService;

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
     * 所测试方法:根据用户对应工程查询测试错误
     */
    @Test
    public void testqueryTestBugs(){
        System.out.println("开始测试工作人员获取测试Bug");
        try {
            JSON result = testBugService.queryTestBugs(tester);

            Assert.assertNotNull("工作人员 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 所测试的方法:新建测试错误,根据ID查询测试错误,根据工程ID查询测试错误,编辑测试错误内容,删除测试错误
     */
    @Test
    public void testTestBug(){
        System.out.println("=====tester 新建一个测试Bug=====");
        JSONObject TestBug = new JSONObject();
        TestBug.put("body", "这是testUser测试中新建的一个测试Bug");


        try {

            //testaddTestBug

            String consign_id = "consign1";
            JSONObject project = projectService.queryProjectById("p1");
            JSONObject jsonProject = projectService.addProject(consign_id,project,null,tester);
            JSONObject jsonResult = testBugService.addTestBug(jsonProject, null, tester);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试Bug新建失败",id);
            System.out.println("测试Bug新建成功, 测试Bug的ID为: " + id);
            System.out.println(jsonResult);

            //testqueryTestBugsByID
            System.out.println("=====通过ID查询该测试Bug=====");
            JSONObject jsonTestBug = testBugService.queryTestBugByID(id);
            Assert.assertNotNull("通过ID查询测试Bug失败",jsonTestBug);
            System.out.println(jsonTestBug);


            //testeditTestBug
            System.out.println("=====编辑该测试Bug内容=====");
            String edit_object = "body";
            String edit_contents = "这是tester在测试中修改的测试Bug";
            jsonTestBug.put(edit_object,edit_contents );
            jsonTestBug = testBugService.editTestBug(jsonTestBug, null, tester);
            Assert.assertEquals("测试Bug修改失败",edit_contents,jsonTestBug.getString(edit_object));  //检验Bug内容修改是否符合预期
            System.out.println(jsonTestBug);


            //testdeleteTestBug
            System.out.println("=====删除该测试Bug=====");
            testBugService.deleteTestBug(jsonTestBug);
            try{
                JSONObject jsonDel = testBugService.queryTestBugByID(id);
                Assert.assertNull("测试Bug删除失败",jsonDel);
            }
            catch (Exception e){
                System.out.println("测试Bug删除成功");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

