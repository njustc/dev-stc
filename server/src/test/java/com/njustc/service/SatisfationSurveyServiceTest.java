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
 * 本测试用来测试SatisfactionSurvey Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>通过用户查询用户满意度调查表</td>
 *          <td>querySatisfactionSurveys</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>新建用户满意度调查表</td>
 *          <td>addSatisfactionSurvey</td>
 *          <td>新建成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过用户满意度调查表ID查询用户满意度调查表</td>
 *          <td>querySatisfactionSurveyByID</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过工程查询用户满意度调查表</td>
 *          <td>querySatisfactionSurveysByProject</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>编辑用户满意度调查表内容</td>
 *          <td>editSatisfactionSurvey</td>
 *          <td>编辑成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除用户满意度调查表</td>
 *          <td>deleteSatisfactionSurvey</td>
 *          <td>querySatisfactionSurveyByID为空,删除成功</td>
 *      </tr>
 * </table>
 *
 * 
 * @author Lumpy
 */


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@Transactional
public class SatisfationSurveyServiceTest {
    private User tester;
    private User customer1;
    private User customer2;

    @Autowired
    private  SatisfactionSurveyService satisfactionSurveyService;

    @Autowired
    private  ConsignService consignService;

    @Autowired
    private  ProjectService projectService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void getUser(){
        tester = userRepository.findByUsername("testing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername("customer2");
    }

    @Test
    public void test_querySatisfationSurvey(){
        System.out.println("开始测试工作人员获取用户满意度调查表");
        try{
            JSON result = satisfactionSurveyService.querySatisfactionSurveys(tester);

            Assert.assertNotNull("工作人员 - 用户满意度调查表查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取用户满意度调查表");
        try{
            JSON result = satisfactionSurveyService.querySatisfactionSurveys(customer1);

            Assert.assertNotNull("用户 - 用户满意度调查表查询失败",result);

            System.out.println(result);
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }



    @Test
    public void test_SE(){
        System.out.println("=====tester 新建一个用户满意度调查表=====");
        JSONObject SatisfactionSurvey = new JSONObject();
        SatisfactionSurvey.put("body", "这是tester测试中新建的一个用户满意度调查表");

        try {

            //test_addSatisfactionSurvey

            String pro_id = "p1";
            JSONObject jsonResult = satisfactionSurveyService.addSatisfactionSurvey(pro_id,SatisfactionSurvey, null,tester);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("用户满意度调查表新建失败",id);
            System.out.println("用户满意度调查表新建成功, 用户满意度调查表的ID为: " + id);
            System.out.println(jsonResult);

            //test_querySatisfactionSurveysByID
            System.out.println("=====通过ID查询该用户满意度调查表=====");
            JSONObject jsonSatisfactionSurvey = satisfactionSurveyService.querySatisfactionSurveyByID(id);
            Assert.assertNotNull("通过ID查询用户满意度调查表失败",jsonSatisfactionSurvey);
            System.out.println(jsonSatisfactionSurvey);

            //test_querySatisfactionSurveyByProject
            System.out.println("=====通过工程查询该用户满意调查表=====");
            JSON jsonSatisfactionSurvey_pro = satisfactionSurveyService.querySatisfactionSurveysByProject(pro_id);
            Assert.assertNotNull("通过工程查询用户满意度调查表失败",jsonSatisfactionSurvey_pro);
            System.out.println(jsonSatisfactionSurvey_pro);

            //test_editSatisfactionSurvey
            System.out.println("=====编辑该用户满意度调查表内容=====");
            String edit_object = "body";
            String edit_contents = "这是tester在测试中修改的用户满意度调查表";
            jsonSatisfactionSurvey.put(edit_object,edit_contents );
            jsonSatisfactionSurvey = satisfactionSurveyService.editSatisfactionSurvey(jsonSatisfactionSurvey, null, tester);
            Assert.assertEquals("用户满意度调查表修改失败",edit_contents,jsonSatisfactionSurvey.getString(edit_object));  //检验Case内容修改是否符合预期
            System.out.println(jsonSatisfactionSurvey);


            //test_deleteSatisfactionSurvey
            System.out.println("=====删除该用户满意度调查表=====");
            satisfactionSurveyService.deleteSatisfactionSurvey(jsonResult);
            try{
                JSONObject jsonDel = satisfactionSurveyService.querySatisfactionSurveyByID(id);
                Assert.assertNull("用户满意度调查表删除失败",jsonDel);
            }
            catch (Exception e){
                System.out.println("用户满意度调查表删除成功");
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
