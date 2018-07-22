package com.njustc.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.njustc.FrameworkApplication;
import com.njustc.domain.User;
import com.njustc.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * 本测试用来测试Consign Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>通过用户查询委托</td>
 *          <td>queryConsigns</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>新建委托</td>
 *          <td>addConsign</td>
 *          <td>新建成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过委托ID查询委托</td>
 *          <td>queryConsignByID</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过工程查询委托</td>
 *          <td>queryConsignsByProject</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>编辑委托内容</td>
 *          <td>editConsign</td>
 *          <td>编辑成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除委托</td>
 *          <td>deleteConsign</td>
 *          <td>queryConsignByID为空,删除成功</td>
 *      </tr>
 * </table>
 *
 *
 *
 * @author LBW
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@Transactional
    public class ConsignServiceTest {

    private User marketUser;
    private User customer1;
    private User customer2;
    private User tester;

    @Autowired
    private ConsignService consignService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void getUser() {
        marketUser = userRepository.findByUsername("marketing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
        tester = userRepository.findByUsername("testing");
    }

    @Ignore
    public void test_queryConsigns() {
        System.out.println("开始测试工作人员获取委托");
        try {
            JSON result = consignService.queryConsigns(marketUser);

            Assert.assertNotNull("工作人员 - 委托查询失败", result);

            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test_CURD() {
        System.out.println("=====customer1 增加一个委托=====");
        JSONObject consign = new JSONObject();
        consign.put("consignation", "这是customer1测试中新建的一个委托");

        try {

            //test_addconsign
            JSONObject jsonResult = consignService.addConsign(consign, null, customer1);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("委托新建失败", id);
            System.out.println("新建成功。委托的ID为: " + id);

            //test_queryconsignByID
            System.out.println("=====通过ID查询该委托=====");
            JSONObject jsonConsign = consignService.queryConsignByID(id);
            Assert.assertNotNull("通过ID委托查询失败", jsonConsign);
            System.out.println("查询成功.委托信息为:" + jsonConsign);

            //test_queryconsingByProject
            System.out.println("=====通过工程查询委托=====");
            String pro_id = "p1";
            JSON jsonConsign_pro = consignService.queryConsignsByProject(pro_id);
            Assert.assertNotNull("通过工程查询委托失败", jsonConsign_pro);
            System.out.println("查询成功.委托信息为:" + jsonConsign_pro);

            //test_editconsign
            System.out.println("=====编辑该委托=====");
            String edit_object = "consignation";
            String edit_contents = "这是customer1在测试中修改的委托";
            jsonConsign.put(edit_object, edit_contents);
            jsonConsign = consignService.editConsign(jsonConsign, null, customer1);
            Assert.assertEquals(edit_contents, jsonConsign.getString(edit_object));  //检验委托内容修改是否符合预期
            System.out.println("编辑成功.委托信息为:" + jsonConsign);

            //test_deleteconsign
            System.out.println("=====删除该委托=====");
            consignService.deleteConsign(jsonConsign);
            try {
                JSONObject jsonDel = consignService.queryConsignByID(id);
                Assert.assertNull("委托删除失败", jsonDel);
            } catch (Exception e) {
                System.out.println("委托删除成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}