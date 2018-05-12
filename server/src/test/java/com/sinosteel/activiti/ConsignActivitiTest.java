//package com.sinosteel.activiti;
//
//import com.sinosteel.FrameworkApplication;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.boot.test.SpringApplicationConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import static org.junit.Assert.*;
//
///**
// * @author LBW
// */
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringApplicationConfiguration(FrameworkApplication.class)
//public class ConsignActivitiTest {
//
//    private ConsignActiviti consignActiviti = new ConsignActiviti();
//
//    @Before
//    public void deployConsignActiviti() {
//        consignActiviti.deploy();
//    }
//    @Test
//    public void newConsign() {
//
//        String processInstanceID =  consignActiviti.createConsignProcess("0", "0");
//        assertNotNull(processInstanceID);
//        System.out.println("委托实例成功创建。 ProcessInstanceID: " + processInstanceID);
//
//        String queryResult = consignActiviti.getProcessState(processInstanceID);
//        assertNotNull(queryResult);
//        System.out.println(queryResult);
//
//        System.out.println("正在测试提交委托");
//        consignActiviti.submitConsign(processInstanceID, "0");
//        System.out.println(consignActiviti.getProcessState(processInstanceID));
//
//        consignActiviti.setWorker(processInstanceID, "1");
//
//        System.out.println("正在测试否决委托");
//        consignActiviti.checkConsign(false, processInstanceID, "1" );
//        System.out.println(consignActiviti.getProcessState(processInstanceID));
//
//        System.out.println("正在测试提交委托");
//        consignActiviti.submitConsign(processInstanceID, "0");
//        System.out.println(consignActiviti.getProcessState(processInstanceID));
//
//        consignActiviti.setWorker(processInstanceID, "1");
//
//        System.out.println("正在测试通过委托");
//        consignActiviti.checkConsign(true, processInstanceID, "1" );
//        System.out.println(consignActiviti.getProcessState(processInstanceID));
//    }
//
//
//
//    @Test
//    public void getUserTasks() {
//    }
//
//    @Test
//    public void submitConsign() {
//    }
//
//    @Test
//    public void checkConsign() {
//    }
//}