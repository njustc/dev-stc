package com.sinosteel.service;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Entrust;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class EntrustServerTests {

    @Autowired
    private EntrustService entrustService;
    @Before
    public void testqueryEnrust() throws Exception{
        System.out.println("获取委托测试");
        Entrust entrust = entrustService.queryEntrusts();
        entrustService.updateEntrusts(entrust);
        System.out.println("entrustString = " + entrust.getEntrustString());
    }
    @Test
    public void testUpdateEntrust()throws Exception{
        System.out.println("更新委托测试");
        Entrust entrust = entrustService.queryEntrusts();
        entrust.setEntrustString("这个是一个简单的委托测试");
        System.out.println("正在更新委托");
        entrustService.updateEntrusts(entrust);
        System.out.println("更新委托成功");
        Entrust entrust2 = entrustService.queryEntrusts();
        System.out.println("获取的委托内容为 entrustString = " + entrust2.getEntrustString());
    }
    @Test
    public void testSubmitAndCheckEntrust() throws Exception{
        System.out.println("委托提交测试");
        entrustService.submitEntrust();
        System.out.println("委托提交测试完成");

        System.out.println("委托状态查询测试");
        System.out.println("当前委托状态为: "+entrustService.getEntrustState());
        System.out.println("委托状态查询测试完成");

        System.out.println("委托未通过测试");
        entrustService.rejectEntrust();
        System.out.println("委托未通过测试完成");
    }
    @Test
    public void testGetEntrustState() throws Exception{
        System.out.println("委托状态查询测试");
        System.out.println("当前委托状态为: "+entrustService.getEntrustState());
        System.out.println("委托状态查询测试完成");
    }

}
