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
 * 该类用来测试委托流程实例在调用接口后状态变化情况
 * <table border="1">
 *     <tr>
 *         <th>执行操作</th>
 *         <th>预期状态</th>
 *     </tr>
 *     <tr>
 *         <td>查询委托状态</td>
 *         <td>&nbsp;</td>
 *     </tr>
 *     <tr>
 *         <td>customer1提交委托</td>
 *         <td>TobeReview</td>
 *     </tr>
 *     <tr>
 *         <td>市场部人员否决委托</td>
 *         <td>TobeSubmit</td>
 *     </tr>
 *     <tr>
 *         <td>customer1再次委托</td>
 *         <td>TobeReview</td>
 *     </tr>
 *     <tr>
 *         <td>市场部人员通过委托</td>
 *         <td>Finished</td>
 *     </tr>
 * <table>
 *
 * @author zwh
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ConsignActivitiTest {
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
    public void  updateProcessConsignState() {
        JSONObject state ;
        try {
            System.out.println("======查询委托状态========");
            System.out.println(processInstanceService.queryProcessState(prId2));

            System.out.println("======customer1提交委托=======");
            //构造提交委托请求
            Request request = new Request();
            request.setUser(customer1);
            JSONObject submitJson = new JSONObject();
            submitJson.put("operation", "Submit");
            submitJson.put("object", "consign");
            request.setParams(submitJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId2, request));
            state = processInstanceService.queryProcessState(prId2);
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======市场部人员否决委托======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject rejectJson = new JSONObject();
            rejectJson.put("operation", "ReviewReject");
            rejectJson.put("object", "consign");
            rejectJson.put("comments","notok");
            request.setParams(rejectJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId2, request));
            System.out.println(processInstanceService.getComments(processInstanceId));
            state = processInstanceService.queryProcessState(prId2);
            Assert.assertEquals("TobeSubmit",state.getString("state"));

            System.out.println("======customer1再次委托======");
            //构造提交委托请求
            request = new Request();
            request.setUser(customer1);
            request.setParams(submitJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId2, request));
            state = processInstanceService.queryProcessState(prId2);
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======市场部人员通过委托======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject passJson = new JSONObject();
            passJson.put("operation", "ReviewPass");
            passJson.put("object", "consign");
            passJson.put("comments","itsok");
            request.setParams(passJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId2, request));
            System.out.println(processInstanceService.getComments(processInstanceId));
            state = processInstanceService.queryProcessState(prId2);
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