
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

/**
 * @author LBW,Lumpy
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
    public class ConsignServiceTest {

    private User marketUser;
    private User customer1;
    private User customer2;

    @Autowired
    private ConsignService consignService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void getUser() {
        marketUser = userRepository.findByUsername("marketing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
    }
    @Test
    public void queryConsigns() {
        System.out.println("开始测试工作人员获取委托");
        try {
            JSON result = consignService.queryConsigns(marketUser);

            Assert.assertNotNull("工作人员 - 委托查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取委托");
        try {
            JSON result = consignService.queryConsigns(customer1);

            Assert.assertNotNull("用户 - 委托查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }



    @Test
    public void testCURD() {
        System.out.println("=====customer1 增加一个委托=====");
        JSONObject consign = new JSONObject();
        consign.put("consignation", "这是customer1测试中新建的一个委托");

        try {

            //test_addconsign
            JSONObject jsonResult = consignService.addConsign(consign, null, customer1);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("委托新建失败",id);
            System.out.println("新建成功。委托的ID为: " + id);

            //test_queryconsignByID
            System.out.println("=====通过ID查询该委托=====");
            JSONObject jsonConsign = consignService.queryConsignByID(id);
            Assert.assertNotNull("通过ID委托查询失败",jsonConsign);
            System.out.println(jsonConsign);

            //test_editconsign
            System.out.println("=====编辑该委托=====");
            String edit_object = "consignation";
            String edit_contents = "这是customer1在测试中修改的委托";
            jsonConsign.put(edit_object,edit_contents );
            jsonConsign = consignService.editConsign(jsonConsign, null, customer1);
            Assert.assertEquals(edit_contents,jsonConsign.getString(edit_object));  //检验委托内容修改是否符合预期
            System.out.println(jsonConsign);

            //test_deleteconsign
            System.out.println("=====删除该委托=====");
            consignService.deleteConsign(jsonConsign);
            JSONObject jsonDel = consignService.queryConsignByID(id);
            Assert.assertNull("委托删除失败",jsonDel);
            System.out.println("委托删除成功");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}