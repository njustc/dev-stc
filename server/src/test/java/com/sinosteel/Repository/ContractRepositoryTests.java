package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Contract;
import com.sinosteel.repository.ContractRepository;
import org.junit.Assert;
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
        List<Contract> contracts = contractRepository.findByAllContracts();
        Assert.assertNotNull("所有项目为空",contracts);
    }

}
