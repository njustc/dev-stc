package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Contract;
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

    @Test
    @Transactional
    public void testContractProject()
    {
        System.out.println("================================");
        System.out.println("合同项目测试开始");
        List<Contract> contracts = contractRepository.findByAllContracts();
        for(Contract contract : contracts) {
            System.out.println("合同内容为：" + contract.getContractBody());
            System.out.println("合同所属的项目名称为：" + contract.getProject().getName());
            System.out.println("合同所对应的项目的委托内容为:" + contract.getProject().getConsign().getConsignation());
            System.out.println("合同所对应的用户为：" + contract.getProject().getUser().getUsername());
            System.out.println("-----------------------------");
        }
        System.out.println("================================");
    }

}
