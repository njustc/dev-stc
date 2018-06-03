package com.sinosteel.activiti;

import com.sinosteel.FrameworkApplication;
import org.activiti.spring.integration.Activiti;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
* @author LBW&Paul
 */

@IntegrationTest
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@SpringApplicationConfiguration(classes=MyActiviti.class)
public class ConsignActivitiTest {

    @Autowired
    private BaseActiviti baseActiviti;
    @Autowired
    private ConsignActiviti consignActiviti;

  /*新建委托测试*/

    @Test
    public void newConsign() throws Exception{

       String processInstanceID =  consignActiviti.createConsignProcess("0", "汤聪");
        assertNotNull(processInstanceID);
       System.out.println("委托实例成功创建。 ProcessInstanceID: " + processInstanceID);

        String queryResult = baseActiviti.getProcessState(processInstanceID);
        assertNotNull(queryResult);
        System.out.println(queryResult);
    }

    /*提交委托测试*/
    @Test
    public void submitConsign() throws Exception{
        String processInstanceID =  consignActiviti.createConsignProcess("0", "0");
        assertNotNull(processInstanceID);
        String processInstanceID1 =  consignActiviti.createConsignProcess("1", "0");
        assertNotNull(processInstanceID);
        System.out.println("委托实例成功创建。 ProcessInstanceID: " + processInstanceID);
        System.out.println("委托实例成功创建。 ProcessInstanceID: " + processInstanceID1);
        System.out.println(baseActiviti.getUserTasks("0"));

       System.out.println("正在测试提交委托");
        consignActiviti.submit(processInstanceID, "0");
       consignActiviti.submit(processInstanceID1, "0");
       System.out.println(baseActiviti.getProcessState(processInstanceID));
        System.out.println(baseActiviti.getProcessState(processInstanceID1));
    }

    /*审核委托测试*/
    @Test
    public void checkConsign() throws Exception{
        String processInstanceID =  consignActiviti.createConsignProcess("0", "0");
        assertNotNull(processInstanceID);
        System.out.println("委托实例成功创建  ProcessInstanceID: " + processInstanceID);

        String queryResult = baseActiviti.getProcessState(processInstanceID);
        assertNotNull(queryResult);
        consignActiviti.submit(processInstanceID, "0");

        System.out.println("正在测试否决委托");
        consignActiviti.reviewConsign("reviewreject", processInstanceID, "W1" );
        System.out.println(baseActiviti.getProcessState(processInstanceID));
        //consignActiviti.queryHistoricActivitiyInstance(processInstanceID);
        consignActiviti.submit(processInstanceID, "0");

        System.out.println("正在测试通过委托");
        consignActiviti.reviewConsign("reviewpass", processInstanceID, "W1" );
        System.out.println(baseActiviti.getProcessState(processInstanceID));
    }

    /*根据客户ID查询测试*/
    @Test
    public void getClientTasks() throws Exception{
        String processInstanceID =  consignActiviti.createConsignProcess("Con0", "Cit0");
        assertNotNull(processInstanceID);
        String processInstanceID1 =  consignActiviti.createConsignProcess("Con1", "Cit0");
        assertNotNull(processInstanceID1);
        String processInstanceID2 =  consignActiviti.createConsignProcess("Con2", "Cit1");
        assertNotNull(processInstanceID2);
        System.out.println("委托实例成功创建  ProcessInstanceID: " + processInstanceID);
        System.out.println("委托实例成功创建  ProcessInstanceID: " + processInstanceID1);
        System.out.println("委托实例成功创建  ProcessInstanceID: " + processInstanceID2);
        System.out.println("正在测试客户查询");
       // System.out.println(consignActiviti.getUserTasks("Cit0"));
        //System.out.println(consignActiviti.getUserTasks("Cit1"));
        //System.out.println(consignActiviti.getUserTasks("Cit2"));
        System.out.println("Cit0提交一个委托后");
        consignActiviti.submit(processInstanceID, "Cit0");
       // System.out.println(consignActiviti.getUserTasks("Cit0"));
    }

    /*查询测试人员待处理的委托*/
    @Test
    public void getWorkerTasks()throws Exception
    {
        String processInstanceID =  consignActiviti.createConsignProcess("Con0", "Cit0");
        assertNotNull(processInstanceID);
        String processInstanceID1 =  consignActiviti.createConsignProcess("Con1", "Cit0");
        assertNotNull(processInstanceID1);
        String processInstanceID2 =  consignActiviti.createConsignProcess("Con2", "Cit1");
        assertNotNull(processInstanceID2);
        System.out.println("委托实例成功创建  ProcessInstanceID: " + processInstanceID);
        System.out.println("委托实例成功创建  ProcessInstanceID: " + processInstanceID1);
        System.out.println("委托实例成功创建  ProcessInstanceID: " + processInstanceID2);
        consignActiviti.submit(processInstanceID, "Cit0");
        consignActiviti.submit(processInstanceID1, "Cit0");
        consignActiviti.submit(processInstanceID2, "Cit1");
        System.out.println("正在测试测试人员查询");
        //System.out.println(consignActiviti.GetWorkerTasks());
        System.out.println("通过第一个合同");
        consignActiviti.reviewConsign("pass",processInstanceID,"W1");
        System.out.println("正在测试测试人员查询");
        //System.out.println(consignActiviti.GetWorkerTasks());
   }
}

