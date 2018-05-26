package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.User;
import com.sinosteel.repository.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.transaction.Transactional;

import static org.junit.Assert.*;

/**
 * @author LBW
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
    @Transactional
    public void queryConsigns() {
        System.out.println("开始测试工作人员获取委托");
        try {
            JSON result = consignService.queryConsigns(marketUser);
            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取委托");
        try {
            JSON result = consignService.queryConsigns(customer1);
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
            JSONObject jsonResult = consignService.addConsign(consign, null, customer1);
            String id = jsonResult.getString("id");
            System.out.println("新建成功。委托的ID为: " + id);
            System.out.println("=====查询该委托=====");
            JSONObject jsonConsign = consignService.queryConsignByID(id);
            System.out.println(jsonConsign);
            System.out.println("=====编辑该委托=====");
            jsonConsign.put("consignation", "这是customer1在测试中修改的委托");
            jsonConsign = consignService.editConsign(jsonConsign, null, customer1);
            System.out.println(jsonConsign);
            System.out.println("=====删除该委托=====");
            consignService.deleteConsign(jsonConsign);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}