package com.sinosteel.service;

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

    @Before
    public void testqueryConsign(){
        System.out.println("获取委托测试");
        Consign consign = consignService.queryConsigns();
        consignService.updateConsigns(consign);
        System.out.println("ConsignString = " + consign.getConsignation());
        System.out.println("获取委托测试成功");
    }
    @Test
    public void testUpdateConsign(){
        System.out.println("更新委托测试");
        Consign consign = consignService.queryConsigns();
        consign.setConsignation("这个是一个简单的委托测试");
        System.out.println("正在更新委托");
        consignService.updateConsigns(consign);
        System.out.println("更新委托成功");
        Consign Consign2 = consignService.queryConsigns();
        System.out.println("获取的委托内容为 ConsignString = " + Consign2.getConsignation());
    }
    @Test
    public void testSubmitAndCheckConsign(){
        System.out.println("委托提交测试");
        consignService.submitConsign();
        System.out.println("委托提交测试完成");

        System.out.println("委托状态查询测试");
        System.out.println("当前委托状态为: "+consignService.getConsignState());
        System.out.println("委托状态查询测试完成");

        System.out.println("委托未通过测试");
        consignService.rejectConsign();
        System.out.println("委托未通过测试完成");

        System.out.println("委托状态查询测试");
        System.out.println("当前委托状态为: "+ consignService.getConsignState());
        System.out.println("委托状态查询测试完成");
    }
    @Test
    public void testGetConsignState(){
        System.out.println("委托状态查询测试");
        System.out.println("当前委托状态为: " + consignService.getConsignState());
        System.out.println("委托状态查询测试完成");
    }

}
