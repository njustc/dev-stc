package com.njustc.Repository;

import com.njustc.FrameworkApplication;
import com.njustc.domain.Contract;
import com.njustc.domain.Project;
import com.njustc.repository.ContractRepository;
import com.njustc.repository.ProjectRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * 这个类用来测试contract类对应repository的增删查功能<br>
 * <table border="1" summary="">
 *     <tr>
 *     <th><b>测试内容</b></th>
 *     <th><b>对应操作</b></th>
 *     <th><b>测试结果</b></th>
 *     </tr>
 *     <tr>
 *         <td>新建合同</td>
 *         <td>new + save</td>
 *         <td>FindById成功</td>
 *     </tr>
 *     <tr>
 *          <td>删除合同</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *     </tr>
 * </table>
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
