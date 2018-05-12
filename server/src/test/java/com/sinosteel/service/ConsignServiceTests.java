<<<<<<< HEAD
//package com.sinosteel.service;
//
//import com.sinosteel.FrameworkApplication;
//import com.sinosteel.domain.Consign;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.SpringApplicationConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringApplicationConfiguration(FrameworkApplication.class)
//public class ConsignServiceTests {
//
//    @Autowired
//    private ConsignService consignService;
//
//    @Before
//    public void testqueryConsign(){
//        System.out.println("获取委托测试");
//        Consign consign = consignService.queryConsigns();
//        consignService.updateConsigns(consign);
//        System.out.println("ConsignString = " + consign.getConsignation());
//        System.out.println("获取委托测试成功");
//    }
//    @Test
//    public void testUpdateConsign(){
//        System.out.println("更新委托测试");
//        Consign consign = consignService.queryConsigns();
//        consign.setConsignation("这个是一个简单的委托测试");
//        System.out.println("正在更新委托");
//        consignService.updateConsigns(consign);
//        System.out.println("更新委托成功");
//        Consign Consign2 = consignService.queryConsigns();
//        System.out.println("获取的委托内容为 ConsignString = " + Consign2.getConsignation());
//    }
//
//}
=======
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
        consignService.editConsign(consign);
        System.out.println("ConsignString = " + consign.getConsignation());
        System.out.println("获取委托测试成功");
    }
    @Test
    public void testUpdateConsign(){
        System.out.println("更新委托测试");
        Consign consign = consignService.queryConsigns();
        consign.setConsignation("这个是一个简单的委托测试");
        System.out.println("正在更新委托");
        consignService.editConsign(consign);
        System.out.println("更新委托成功");
        Consign Consign2 = consignService.queryConsigns();
        System.out.println("获取的委托内容为 ConsignString = " + Consign2.getConsignation());
    }

}
>>>>>>> be2ae897b068946ed264d076696bf31eb7a01d02
