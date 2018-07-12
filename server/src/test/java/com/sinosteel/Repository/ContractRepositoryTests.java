package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Contract;
import com.sinosteel.domain.Project;
import com.sinosteel.repository.ContractRepository;
import com.sinosteel.repository.ProjectRepository;
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
//@Transactional
public class ContractRepositoryTests {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    public void testContractProject()
    {
        Contract contract = new Contract();
        contract.setId("1");
        //contract.setUser();
        Project project = projectRepository.findById("test");
        project.setContract(contract);
        contract.setProject(project);
        contractRepository.save(contract);
        projectRepository.save(project);


        Contract contractfind = contractRepository.findById("1");

        Assert.assertNotNull("contract为空",contractfind);

        project.setContract(null);
        projectRepository.save(project);
        contractRepository.delete("1");

        contractfind = contractRepository.findById("1");

        Assert.assertNull("contract不为空",contractfind);

    }

}
