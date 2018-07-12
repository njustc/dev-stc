package com.sinosteel.activiti;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.User;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.service.ConsignService;
import com.sinosteel.service.ContractService;
import com.sinosteel.service.TestPlanService;
import com.sinosteel.service.UserService;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import springfox.documentation.spring.web.json.Json;
import static org.junit.Assert.assertNotNull;

/**
 * @author ZWH
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class TestPlanActivitiTest {
    @Autowired
    private ProcessInstanceService processInstanceService;
    @Autowired
    private UserService userService;
    //测试中使用的用户
    private User customer1;
    private User customer2;
    private User marketing;
    private User testing;

    private String processInstanceId;
    private String prId1;
    private String prId3;
    private String prId2;
    @Before
    public void setUp() {
        customer1 = userService.getUserByUsername("customer1");
        marketing = userService.getUserByUsername("marketing");
        customer2 = userService.getUserByUsername("customer2");
        testing = userService.getUserByUsername("testing");

        JSONObject jsonObject0 = new JSONObject();
        JSONObject jsonObject1 = new JSONObject();
        JSONObject jsonObject2 = new JSONObject();
        try {
            processInstanceId=processInstanceService.createContractProcess(jsonObject1,customer1);
            prId1=processInstanceService.createTestPlanProcess(jsonObject2,marketing);
            prId3=processInstanceService.createTestReportProcess(jsonObject0,marketing);
            prId2=processInstanceService.createConsignProcess(jsonObject0,customer2);
            Assert.assertNotNull(prId1);
            Assert.assertNotNull(processInstanceId);
            Assert.assertNotNull(prId3);
            //  prId2=processInstanceService.createConsignProcess(jsonObject0,customer2);
            //consignJson = consignService.addConsign(jsonObject, null, customer1);
            // contractJson= contractService.addContract(jsonObject1,null,customer2);
            //testplanJson=testPlanService.addTestPlan(jsonObject2,null,customer1);
            // Assert.assertNotNull(prId2);
            // Assert.assertNotNull(contractJson);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Test
    public void queryProcessState() {
        JSONObject state = new JSONObject();
        try {
            //state = processInstanceService.queryProcessState(consignJson.getString("processInstanceID"));
            state=processInstanceService.queryProcessState(processInstanceId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(state);
        //确认state不为空
        assertNotNull(state.getString("state"));
    }
    @Test
    public void updateProcessTestPlanState() {
        try {
            JSONObject state ;
            System.out.println("======查询测试方案状态========");
            System.out.println(processInstanceService.queryProcessState(prId1));
            System.out.println("======customer1提交测试方案=======");
            //构造提交委托请求
            Request request = new Request();
            request.setUser(marketing);
            JSONObject writeJson = new JSONObject();
            //writeJson.put("comments",null);
            writeJson.put("operation", "Write");
            writeJson.put("object", "testplan");
            request.setParams(writeJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            state = processInstanceService.queryProcessState(prId1);
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======工作人员否决测试方案======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject rejectJson = new JSONObject();
            //rejectJson.put("comments","rejectreject");
            rejectJson.put("operation", "ReviewReject");
            rejectJson.put("object", "testplan");
            rejectJson.put("comments","no no no");
            request.setParams(rejectJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            state = processInstanceService.queryProcessState(prId1);
            Assert.assertEquals("TobeWrite",state.getString("state"));

            System.out.println("======customer2再次请求======");
            //构造提交委托请求
            request = new Request();
            request.setUser(customer2);
            request.setParams(writeJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            state = processInstanceService.queryProcessState(prId1);
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======工作人员通过测试方案======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject passJson = new JSONObject();
            rejectJson.put("comments","pass pass");
            passJson.put("operation", "ReviewPass");
            passJson.put("object", "testplan");
            request.setParams(passJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            state = processInstanceService.queryProcessState(prId1);
            Assert.assertEquals("TobeConfirm",state.getString("state"));

            System.out.println("=====客户通过测试方案======");
            request=new Request();
            request.setUser(customer2);
            JSONObject confirmJson=new JSONObject();
            confirmJson.put("comments","comfirmpasspass");
            confirmJson.put("operation","ConfirmPass");
            confirmJson.put("object","testplan");
            request.setParams(confirmJson);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            System.out.println(processInstanceService.getComments(processInstanceId));
            state = processInstanceService.queryProcessState(prId1);
            Assert.assertEquals("TobeImplement",state.getString("state"));

            System.out.println("=====客户实施测试方案======");
            request=new Request();
            request.setUser(customer2);
            JSONObject implementJson=new JSONObject();
            implementJson.put("operation","Implement");
            implementJson.put("object","testplan");
            request.setParams(implementJson);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            state = processInstanceService.queryProcessState(prId1);
            // System.out.println(processInstanceService.getTaskData(prId1));
            Assert.assertEquals("Finished",state.getString("state"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Test
    public void updateProcessTestPlanState2() {
        try {
            JSONObject state ;
            System.out.println("======查询测试方案状态========");
            System.out.println(processInstanceService.queryProcessState(prId1));

            System.out.println("======测试部工作人员提交测试方案=======");
            //构造提交测试方案请求
            Request request = new Request();
            request.setUser(testing);
            JSONObject writeJson = new JSONObject();
            //writeJson.put("comments",null);
            writeJson.put("operation", "Write");
            writeJson.put("object", "testplan");
            request.setParams(writeJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            state = processInstanceService.queryProcessState(prId1);
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======测试部主任否决测试方案======");
            //构造提交委托请求
            request = new Request();
            request.setUser(testing);
            JSONObject rejectJson = new JSONObject();
            //rejectJson.put("comments","rejectreject");
            rejectJson.put("operation", "ReviewReject");
            rejectJson.put("object", "testplan");
            rejectJson.put("comments","no no no");
            request.setParams(rejectJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            state = processInstanceService.queryProcessState(prId1);
            Assert.assertEquals("TobeWrite",state.getString("state"));

            System.out.println("======测试部工作人员再次提交测试方案======");
            //构造提交委托请求
            request = new Request();
            request.setUser(testing);
            request.setParams(writeJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            state = processInstanceService.queryProcessState(prId1);
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======测试部主任通过测试方案======");
            //构造提交委托请求
            request = new Request();
            request.setUser(testing);
            JSONObject passJson = new JSONObject();
            rejectJson.put("comments","pass pass");
            passJson.put("operation", "ReviewPass");
            passJson.put("object", "testplan");
            request.setParams(passJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            state = processInstanceService.queryProcessState(prId1);
            Assert.assertEquals("TobeConfirm",state.getString("state"));

            System.out.println("=====质量部通过测试方案======");
            request=new Request();
            request.setUser(testing);
            JSONObject confirmJson=new JSONObject();
            rejectJson.put("comments","comfirmpasspass");
            confirmJson.put("operation","ConfirmPass");
            confirmJson.put("object","testplan");
            request.setParams(confirmJson);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            System.out.println(processInstanceService.getComments(processInstanceId));
            state = processInstanceService.queryProcessState(prId1);
            Assert.assertEquals("TobeImplement",state.getString("state"));

            System.out.println("=====测试部工作人员实施测试方案======");
            request=new Request();
            request.setUser(testing);
            JSONObject implementJson=new JSONObject();
            implementJson.put("operation","Implement");
            implementJson.put("object","testplan");
            request.setParams(implementJson);
            System.out.println(processInstanceService.updateProcessState(prId1, request));
            state = processInstanceService.queryProcessState(prId1);
            // System.out.println(processInstanceService.getTaskData(prId1));
            Assert.assertEquals("Finished",state.getString("state"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //测试结束后删除该委托
    @After
    public void cleanUp() {
        //consignService.deleteConsign(prId0);
        //contractService.deleteContract(contractJson);
    }
}