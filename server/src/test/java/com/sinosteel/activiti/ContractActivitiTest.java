package com.sinosteel.activiti;

import com.sinosteel.FrameworkApplication;
import org.activiti.spring.integration.Activiti;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

/*
 * @author Paul
 */


@IntegrationTest
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@SpringApplicationConfiguration(classes=MyActiviti.class)

public class ContractActivitiTest {

    @Autowired
    private BaseActiviti baseActiviti;
    @Autowired
    private ContractActiviti contractActiviti;
    @Test
    //测试新建合同
    public void testNewContract()throws Exception
    {
        System.out.println("创建合同测试");
        List<String> workerIds=new ArrayList<String>();
        workerIds.add("W0");
        workerIds.add("W1");
        workerIds.add("W2");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","W0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));
    }

    @Test
    //测试提交合同
    public void testSubmitContract()throws Exception
    {
        List<String> workerIds=new ArrayList<String>();
        workerIds.add("W0");
        workerIds.add("W1");
        workerIds.add("W2");
       // System.out.println("创建合同测试");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","W0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));
        String processInstanceID1 =  contractActiviti.createContractProcess("Contract1","C1","W0");
        assertNotNull(processInstanceID1);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID1);

        System.out.println("提交合同测试C0");
        contractActiviti.submit(processInstanceID,"C0");
        System.out.println("合同流程ID "+processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("提交合同测试C1");
        contractActiviti.submit(processInstanceID1,"C1");
        System.out.println("合同流程ID "+processInstanceID1+"  "+baseActiviti.getProcessState(processInstanceID1));
    }

    @Test
    //测试审核合同
    public void testCheckContract()throws Exception
    {
        List<String> workerIds=new ArrayList<String>();
        workerIds.add("W0");
        workerIds.add("W1");
        workerIds.add("W2");
        //System.out.println("创建合同测试");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","W0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        String processInstanceID1 =  contractActiviti.createContractProcess("Contract1","C1","W0");
        assertNotNull(processInstanceID1);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID1);

        contractActiviti.submit(processInstanceID,"C0");
        contractActiviti.submit(processInstanceID1,"C1");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));
        System.out.println(processInstanceID1+"  "+baseActiviti.getProcessState(processInstanceID1));

        System.out.println("评审合同不通过测试");
        contractActiviti.reviewContract(processInstanceID,"W0","reviewreject");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("评审合同通过测试");
        contractActiviti.reviewContract(processInstanceID1,"W1","reviewpass");
        System.out.println(processInstanceID1+"  "+baseActiviti.getProcessState(processInstanceID1));
        System.out.println(baseActiviti.queryHistoricTask(processInstanceID));
        System.out.println(baseActiviti.queryHistoricTask(processInstanceID1));
    }

    @Test
    //测试确认合同
    public void testConfirmContract()throws Exception
    {
        List<String> workerIds=new ArrayList<String>();
        workerIds.add("W0");
        workerIds.add("W1");
        workerIds.add("W2");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","W0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        String processInstanceID1 =  contractActiviti.createContractProcess("Contract1","C1","W0");
        assertNotNull(processInstanceID1);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID1);

        System.out.println("测试确认合同");

        contractActiviti.submit(processInstanceID,"C0");
        contractActiviti.submit(processInstanceID1,"C1");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));
        System.out.println(processInstanceID1+"  "+baseActiviti.getProcessState(processInstanceID1));

        contractActiviti.reviewContract(processInstanceID,"W0","reviewpass");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));
        contractActiviti.reviewContract(processInstanceID1,"W0","reviewreject");
        System.out.println(processInstanceID1+"  "+baseActiviti.getProcessState(processInstanceID1));

        System.out.println("确认合同不通过测试");
        contractActiviti.confirmContract(processInstanceID,"C0","confirmreject");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("确认合同通过测试");
        contractActiviti.confirmContract(processInstanceID1,"C1","confirmreject");
        System.out.println(processInstanceID1+"  "+baseActiviti.getProcessState(processInstanceID1));
    }

    @Test
    //测试查询合同状态
    public void testgetContractProcesstasks()throws Exception
    {
        List<String> workerIds=new ArrayList<String>();
        workerIds.add("W0");
        workerIds.add("W1");
        workerIds.add("W2");
        System.out.println("创建合同测试");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","W0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("提交合同测试");
        contractActiviti.submit(processInstanceID,"C0");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("评审合同不通过测试");
        contractActiviti.reviewContract(processInstanceID,"W0","reviewreject");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("提交合同测试");
        contractActiviti.submit(processInstanceID,"C0");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("评审合同通过测试");
        contractActiviti.reviewContract(processInstanceID,"W0","reviewpass");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("确认合同不通过测试");
        contractActiviti.confirmContract(processInstanceID,"C0","confirmreject");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("提交合同测试");
        contractActiviti.submit(processInstanceID,"C0");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("评审合同通过测试");
        contractActiviti.reviewContract(processInstanceID,"W0","reviewpass");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("确认合同通过测试");
        contractActiviti.confirmContract(processInstanceID,"C0","confirmpass");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));

        System.out.println("合同流程ID错误测试");
        System.out.println("1000"+"  "+baseActiviti.getProcessState("1000"));
    }

    @Test
    //测试查询市场部主任和质量部主任工作列表
    public void testGetTwoTasks()throws Exception
    {
        List<String> workerIds=new ArrayList<String>();
        workerIds.add("W0");
        workerIds.add("W1");
        workerIds.add("W2");
        String processInstanceID =  contractActiviti.createContractProcess("Contract0","C0","W0");
        assertNotNull(processInstanceID);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID);
        String processInstanceID1 =  contractActiviti.createContractProcess("Contract1","C1","W0");
        assertNotNull(processInstanceID1);
        System.out.println("合同实例成功创建。 ProcessInstanceID: " + processInstanceID1);

        contractActiviti.submit(processInstanceID,"C0");
        contractActiviti.submit(processInstanceID1,"C1");
        System.out.println(processInstanceID+"  "+baseActiviti.getProcessState(processInstanceID));
        System.out.println(processInstanceID1+"  "+baseActiviti.getProcessState(processInstanceID1));
        //System.out.println(contractActiviti.getMarketEmployerTasks("E0"));
        //System.out.println(contractActiviti.getQualityEmployerTasks("Q0"));
    }
}
