package com.sinosteel.service;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Consign;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ConsignServiceTests {

    @Autowired
    private ConsignService consignService;

    @Autowired
    private UserService userService;

    @Test
    public void testqueryConsign(){
        System.out.println("获取工作人员委托测试");
        JSONObject queryResults = consignService.queryConsigns(userService.getUserByUsername("admin"));
        System.out.println(queryResults);
        System.out.println("获取工作人员委托测试成功");
    }
    @Test
    public void testUpdateConsign(){

    }

}
