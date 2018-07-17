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
import org.springframework.transaction.annotation.Transactional;


/**
 *
 * 本测试用来测试TestFunction Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>通过用户查询测试功能</td>
 *          <td>queryTestFunctions</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>新建测试功能</td>
 *          <td>addTestFunction</td>
 *          <td>新建成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过测试功能ID查询测试功能</td>
 *          <td>queryTestFunctionByID</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过工程查询测试功能</td>
 *          <td>queryTestFunctionsByProject</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>编辑测试功能内容</td>
 *          <td>editTestFunction</td>
 *          <td>编辑成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除测试功能</td>
 *          <td>deleteTestFunction</td>
 *          <td>queryTestFunctionByID为空,删除成功</td>
 *      </tr>
 * </table>
 *
 *
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
@Transactional
public class TestFunctionServiceTest {

    private User tester;
    private User customer1;
    private User customer2;
    private User marketUser;

    @Autowired
    private TestFunctionService testFunctionService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ConsignService consignService;

    @Before
    public void getUser() {

        marketUser = userRepository.findByUsername("marketing");
        tester = userRepository.findByUsername("testing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername("customer2");
    }
    
    @Test
    public void test_querytestFunction(){
        System.out.println("开始测试工作人员获取测试样例");
        try {
            JSON result = testFunctionService.queryTestFunctions(tester);

            Assert.assertNotNull("工作人员 - 测试样例查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取测试样例");
        try {
            JSON result = testFunctionService.queryTestFunctions(customer1);

            Assert.assertNotNull("用户 - 测试样例查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testSE(){
        System.out.println("=====tester 新建一个测试功能=====");
        JSONObject TestFunction = new JSONObject();
        TestFunction.put("body","这是tester在测试中新建的一个测试功能");

        try{
            //test_addTestFunction
            String pro_id = "p1";
            JSONObject jsonResult = testFunctionService.addTestFunction(pro_id,TestFunction,null,tester);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试功能新建失败",id);
            System.out.println("测试功能新建成功, 测试功能的信息为: " + jsonResult);

            //test_queryTestFunctionsByID
            System.out.println("=====通过ID查询该测试功能=====");
            JSONObject jsonTestFunction = testFunctionService.queryTestFunctionByID(id);
            Assert.assertNotNull("通过ID查询测试功能失败",jsonTestFunction);
            System.out.println("通过ID查询测试功能成功,测试功能信息为:"+ jsonTestFunction);

            //test_editTestFunction
            System.out.println("=====编辑该测试功能内容=====");
            String edit_object = "body";
            String edit_contents = "这是tester在测试中修改的测试功能";
            jsonTestFunction.put(edit_object,edit_contents );
            jsonTestFunction = testFunctionService.editTestFunction(jsonTestFunction, null, tester);
            Assert.assertEquals("测试功能修改失败",edit_contents,jsonTestFunction.getString(edit_object));  //检验功能内容修改是否符合预期
            System.out.println("测试功能修改成功:测试功能信息为" + jsonTestFunction);

            //test_deleteTestFunction
            System.out.println("=====删除该测试功能=====");
            testFunctionService.deleteTestFunction(jsonResult);
            try{
                JSONObject jsonDel = testFunctionService.queryTestFunctionByID(id);
                Assert.assertNull("测试功能删除失败",jsonDel);
            }
            catch (Exception e){
                System.out.println("测试功能删除成功");
            }

        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
