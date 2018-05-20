package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Consign;
import com.sinosteel.repository.ConsignRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ConsignRepositoryTests {

    @Autowired
    private ConsignRepository consignRepository;

    @Test
    public void testfindByAllConsigns()
    {
        System.out.println("==========================================");
        System.out.println("获取所有委托测试开始");
        List<Consign> consignlist = consignRepository.findByAllConsigns();
        for(Consign consign : consignlist)
        {
            System.out.println("获取的记录为：" + consign.getConsignation());
        }
        System.out.println("获取所有委托测试完成");
        System.out.println("==========================================");
    }
    @Test
    public void testfindByAllConsignId()
    {
        System.out.println("===========================================");
        System.out.println("获取所有委托id测试开始");
        List<String> consignIdList = consignRepository.findByAllConsignIds();
        for(String str : consignIdList)
        {
            System.out.println("获取的记录为：" + str);
        }
        System.out.println("获取所有委托id测试完成");
        System.out.println("============================================");
    }
}
