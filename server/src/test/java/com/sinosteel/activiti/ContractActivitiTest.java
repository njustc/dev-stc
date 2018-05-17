package com.sinosteel.activiti;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
 * @author Paul
 */

@IntegrationTest
@RunWith(SpringJUnit4ClassRunner.class)
//@SpringApplicationConfiguration(FrameworkApplication.class)
@SpringApplicationConfiguration(classes=MyActiviti.class)

public class ContractActivitiTest {

    @Autowired
    private  ContractActiviti contractActiviti;

    @Test
    public void testNewConsign()
    {
        String processInstanceID =  contractActiviti.createContractProcess("0","0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
    }
}
