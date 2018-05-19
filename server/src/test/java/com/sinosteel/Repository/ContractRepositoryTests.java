package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.Contract;
import com.sinosteel.repository.ConsignRepository;
import com.sinosteel.repository.ContractRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ContractRepositoryTests {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private ConsignRepository consignRepository;

    @Test
    @Transactional
    public void testConsignContract()
    {
        System.out.println("============================================");
        System.out.println("测试由委托获取合同");
        List<Consign> consignList =  consignRepository.findByAllConsigns();
        if(consignList!=null) {
            for (Consign consign : consignList) {

                Contract contract = consign.getContract();
                if(contract != null) {
                    System.out.println("合同编号为：" + contract.getId());
                    System.out.println("合同内容为：" + contract.getContractBody());
                }
                else
                    System.out.println("合同为空");
            }
        }
        System.out.println("============================================");
    }

    @Test
    @Transactional
    public void testContractConsign()
    {
        System.out.println("============================================");
        System.out.println("测试由合同获取委托");
        List<Contract> contractList = contractRepository.findByAllContracts();
        for(Contract contract : contractList)
        {
            Consign consign = contract.getConsign();
            System.out.println("委托编号为：" + consign.getId());
            System.out.println("委托内容为：" + consign.getConsignation());
        }
        System.out.println("=============================================");
    }

}
