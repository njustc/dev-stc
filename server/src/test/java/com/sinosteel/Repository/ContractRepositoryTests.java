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
/**
 * 这个类用来测试contract类对应repository的增删查功能
 *<table border="1">
 *     <tr>
 *     </tr><th>测试内容</th>
 *     <th>对应操作</th>
 *     <th>测试结果</th>
 *     </tr>
 *     <tr>
 *         <td>新建合同</td>
 *         <td>set project && save</td>
 *         <td>FindById成功</td>
 *          </tr>
 *          <td>删除合同</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *         </tr>
 * <table>
 * @author FW
 */

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
