package com.sinosteel.Repository;


import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Contract;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.User;
import com.sinosteel.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    public void testUserProject()
    {
        System.out.println("=================================");
        System.out.println("用户项目测试");
        User user = userRepository.findByUsername("customer1");
        List<Project> projects = user.getProjects();
        for(Project project : projects)
        {
            System.out.println("项目名称为："+ project.getName());
            System.out.println("项目对应的用户名称："+project.getUser().getUsername());
            System.out.println("项目对应的委托：" + project.getConsign().getConsignation());
            System.out.println("项目对应的合同: " + project.getContract().getContractBody());
            System.out.println("---------------------------------");
        }
        System.out.println("************************************");
        List<Contract> contracts = user.getContracts();
        for(Contract contract :contracts){
            System.out.println("合同为" + contract.getContractBody());
        }
        System.out.println("=================================");
    }

}
