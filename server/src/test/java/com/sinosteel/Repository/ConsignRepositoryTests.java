package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Consign;
import com.sinosteel.repository.ConsignRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ConsignRepositoryTests {

    @Autowired
    private ConsignRepository consignRepository;

    @Test
    @Transactional
    public void testConsignProject() {
        System.out.println("================================");
        System.out.println("委托项目测试开始");
        List<Consign> consigns = consignRepository.findByAllConsigns();
        for(Consign consign : consigns)
        {
            System.out.println("委托内容为：" + consign.getConsignation());
            System.out.println("委托所对应的项目名称为：" +  consign.getProject().getName());
            System.out.println("委托所对应的用户名称为：" + consign.getProject().getUser().getUsername());
            System.out.println("委托所对应的合同为：" + consign.getProject().getContract().getContractBody());
            System.out.println("-------------------------------");
        }
        System.out.println("==================================");
    }
}
