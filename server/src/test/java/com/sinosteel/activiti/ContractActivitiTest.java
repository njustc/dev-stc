package com.sinosteel.activiti;

import com.sinosteel.FrameworkApplication;
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
@SpringApplicationConfiguration(FrameworkApplication.class)
//@SpringApplicationConfiguration(classes=MyActiviti.class)

public class ContractActivitiTest {

    @Autowired
    private ConsignActiviti consignActiviti;

    @Autowired
    private  ContractActiviti contractActiviti;

    @Test
    //测试新建合同
    public void testNewContract()
    {
        System.out.println("创建合同测试");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","E0","Q0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));
    }

    @Test
    //测试提交合同
    public void testSubmitContract()
    {
       // System.out.println("创建合同测试");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","E0","Q0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));
        String processInstanceID1 =  contractActiviti.createContractProcess("Contract1","C1","E0","Q0");
        assertNotNull(processInstanceID1);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID1);

        System.out.println("提交合同测试C0");
        contractActiviti.submitContract(processInstanceID,"C0");
        System.out.println("合同流程ID "+processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("提交合同测试C1");
        contractActiviti.submitContract(processInstanceID1,"C1");
        System.out.println("合同流程ID "+processInstanceID1+"  "+contractActiviti.getContractProcessState(processInstanceID1));
    }

    @Test
    //测试审核合同
    public void testCheckContract()
    {
        //System.out.println("创建合同测试");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","E0","Q0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        String processInstanceID1 =  contractActiviti.createContractProcess("Contract1","C1","E0","Q0");
        assertNotNull(processInstanceID1);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID1);

        contractActiviti.submitContract(processInstanceID,"C0");
        contractActiviti.submitContract(processInstanceID1,"C1");
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));
        System.out.println(processInstanceID1+"  "+contractActiviti.getContractProcessState(processInstanceID1));

        System.out.println("评审合同不通过测试");
        contractActiviti.checkContract(processInstanceID,"E0",false);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("评审合同通过测试");
        contractActiviti.checkContract(processInstanceID1,"E0",true);
        System.out.println(processInstanceID1+"  "+contractActiviti.getContractProcessState(processInstanceID1));

    }

    @Test
    //测试确认合同
    public void testConfirmContract()
    {
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","E0","Q0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        String processInstanceID1 =  contractActiviti.createContractProcess("Contract1","C1","E0","Q0");
        assertNotNull(processInstanceID1);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID1);

        System.out.println("测试确认合同");

        contractActiviti.submitContract(processInstanceID,"C0");
        contractActiviti.submitContract(processInstanceID1,"C1");
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));
        System.out.println(processInstanceID1+"  "+contractActiviti.getContractProcessState(processInstanceID1));

        contractActiviti.checkContract(processInstanceID,"E0",true);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));
        contractActiviti.checkContract(processInstanceID1,"E0",true);
        System.out.println(processInstanceID1+"  "+contractActiviti.getContractProcessState(processInstanceID1));

        System.out.println("确认合同不通过测试");
        contractActiviti.confirmContract(processInstanceID,"C0",false);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("确认合同通过测试");
        contractActiviti.confirmContract(processInstanceID1,"C1",true);
        System.out.println(processInstanceID1+"  "+contractActiviti.getContractProcessState(processInstanceID1));
    }

    @Test
    //测试查询合同状态
    public void testgetContractProcesstasks()
    {
        System.out.println("创建合同测试");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","E0","Q0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("提交合同测试");
        contractActiviti.submitContract(processInstanceID,"C0");
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("评审合同不通过测试");
        contractActiviti.checkContract(processInstanceID,"W0",false);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("提交合同测试");
        contractActiviti.submitContract(processInstanceID,"C0");
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("评审合同通过测试");
        contractActiviti.checkContract(processInstanceID,"W0",true);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("确认合同不通过测试");
        contractActiviti.confirmContract(processInstanceID,"C0",false);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("提交合同测试");
        contractActiviti.submitContract(processInstanceID,"C0");
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("评审合同通过测试");
        contractActiviti.checkContract(processInstanceID,"W0",true);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("确认合同通过测试");
        contractActiviti.confirmContract(processInstanceID,"C0",true);
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));

        System.out.println("合同流程ID错误测试");
        System.out.println("1000"+"  "+contractActiviti.getContractProcessState("1000"));
    }

    @Test
    //测试查询市场部主任和质量部主任工作列表
    public void testGetTwoTasks()
    {
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","E0","Q0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        String processInstanceID1 =  contractActiviti.createContractProcess("Contract1","C1","E0","Q0");
        assertNotNull(processInstanceID1);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID1);

        contractActiviti.submitContract(processInstanceID,"C0");
        contractActiviti.submitContract(processInstanceID1,"C1");
        System.out.println(processInstanceID+"  "+contractActiviti.getContractProcessState(processInstanceID));
        System.out.println(processInstanceID1+"  "+contractActiviti.getContractProcessState(processInstanceID1));
        //System.out.println(contractActiviti.getMarketEmployerTasks("E0"));
        //System.out.println(contractActiviti.getQualityEmployerTasks("Q0"));
    }

    @Test
    public void testParralel()
    {
        System.out.println("创建合同测试");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","E0","Q0");
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        String processInstanceID1 =  consignActiviti.createConsignProcess("Consign0", "C0");
        assertNotNull(processInstanceID);
        System.out.println("委托实例成功创建。 ProcessInstanceID: " + processInstanceID1);
        System.out.println(contractActiviti.getUserTasks("C0"));

    }
}
