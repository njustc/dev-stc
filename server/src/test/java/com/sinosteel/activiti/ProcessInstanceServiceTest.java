package com.sinosteel.activiti;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.FrameworkApplication;
//import com.sinosteel.activiti.MyActiviti;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.User;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.service.ConsignService;
import com.sinosteel.service.ContractService;
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
public class ProcessInstanceServiceTest {

    @Autowired
    private ProcessInstanceService processInstanceService;
    @Autowired
    private ConsignService consignService;
    @Autowired
    private UserService userService;
    @Autowired
    private ContractService contractService;

    //测试中使用的代表consign的 jsonObject
    private JSONObject consignJson;
    //测试中使用的用户
    private JSONObject contractJson;
    private User customer1;
    private User marketing;
    private User customer2;
    @Before
    public void setUp() {
        customer1 = userService.getUserByUsername("customer1");
        marketing = userService.getUserByUsername("marketing");
        customer2 = userService.getUserByUsername("customer2");

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("consignation", "这是customer1在ProcessInstanceServiceTest中新建的委托");
        JSONObject jsonObject1 = new JSONObject();
       // jsonObject.put("contractation", "这是customer2在ProcessInstanceServiceTest中新建的hetong");
        try {
            consignJson = consignService.addConsign(jsonObject, null, customer1);
            contractJson= contractService.addContract(jsonObject1,null,customer2);
            Assert.assertNotNull(consignJson);
            Assert.assertNotNull(contractJson);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void queryProcessState() {
        JSONObject state = new JSONObject();
        try {
            state = processInstanceService.queryProcessState(consignJson.getString("processInstanceID"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(state);
        //确认state不为空
        assertNotNull(state.getString("state"));
    }

    //TODO: It turns out that we can't update processState too quickly, so now I use Thread.sleep() to make it slow.
    @Test
    public void  updateProcessState() {
        JSONObject state = new JSONObject();
        try {
            System.out.println("======查询委托状态========");
            System.out.println(processInstanceService.queryProcessState(consignJson.getString("processInstanceID")));

            System.out.println("======customer1提交委托=======");
            //构造提交委托请求
            Request request = new Request();
            request.setUser(customer1);
            JSONObject submitJson = new JSONObject();
            submitJson.put("operation", "submit");
            submitJson.put("object", "consign");
            request.setParams(submitJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(consignJson.getString("processInstanceID"), request));
            state = processInstanceService.queryProcessState(consignJson.getString("processInstanceID"));
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======市场部人员否决委托======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject rejectJson = new JSONObject();
            rejectJson.put("operation", "reviewreject");
            rejectJson.put("object", "consign");
            request.setParams(rejectJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(consignJson.getString("processInstanceID"), request));
            state = processInstanceService.queryProcessState(consignJson.getString("processInstanceID"));
            Assert.assertEquals("TobeSubmit",state.getString("state"));

            System.out.println("======customer1再次委托======");
            //构造提交委托请求
            request = new Request();
            request.setUser(customer1);
            request.setParams(submitJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(consignJson.getString("processInstanceID"), request));
            state = processInstanceService.queryProcessState(consignJson.getString("processInstanceID"));
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======市场部人员通过委托======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject passJson = new JSONObject();
            passJson.put("operation", "reviewpass");
            passJson.put("object", "consign");
            request.setParams(passJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(consignJson.getString("processInstanceID"), request));
            state = processInstanceService.queryProcessState(consignJson.getString("processInstanceID"));
            Assert.assertEquals("Finished",state.getString("state"));
        } catch (Exception e) {
            e.printStackTrace();
        }

        //contract
        try {
            System.out.println("======查询合同状态========");
            System.out.println(processInstanceService.queryProcessState(contractJson.getString("processInstanceID")));
            System.out.println("======marketing提交合同=======");
            //构造提交合同请求
            Request request = new Request();
            request.setUser(marketing);
            JSONObject submitJson = new JSONObject();
            submitJson.put("operation", "submit");
            submitJson.put("object", "contract");
            request.setParams(submitJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            state = processInstanceService.queryProcessState(contractJson.getString("processInstanceID"));
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======市场部人员否决合同======");
            //构造提交合同请求
            request = new Request();
            request.setUser(marketing);
            JSONObject rejectJson = new JSONObject();
            rejectJson.put("operation", "reviewreject");
            rejectJson.put("object", "contract");
            request.setParams(rejectJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            state = processInstanceService.queryProcessState(contractJson.getString("processInstanceID"));
            Assert.assertEquals("TobeSubmit",state.getString("state"));

            System.out.println("======marketing再次合同======");
            //构造提交合同请求
            request = new Request();
            request.setUser(marketing);
            request.setParams(submitJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            state = processInstanceService.queryProcessState(contractJson.getString("processInstanceID"));
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======市场部人员通过合同======");
            //构造提交合同请求
            request = new Request();
            request.setUser(marketing);
            JSONObject passJson = new JSONObject();
            passJson.put("operation", "reviewpass");
            passJson.put("object", "contract");
            request.setParams(passJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            state = processInstanceService.queryProcessState(contractJson.getString("processInstanceID"));
            Assert.assertEquals("TobeConfirm",state.getString("state"));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    @Test
    public void  updateProcessContractState() {
        try {
            System.out.println("======查询合同状态========");
            System.out.println(processInstanceService.queryProcessState(contractJson.getString("processInstanceID")));
            System.out.println("======customer2提交合同=======");
            //构造提交委托请求
            Request request = new Request();
            request.setUser(customer2);
            JSONObject submitJson = new JSONObject();
            submitJson.put("operation", "submit");
            submitJson.put("object", "contract");
            request.setParams(submitJson);

            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println("======工作人员否决合同======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject rejectJson = new JSONObject();
            rejectJson.put("operation", "reviewreject");
            rejectJson.put("object", "contract");
            request.setParams(rejectJson);

            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));

            System.out.println("======customer2再次请求======");
            //构造提交委托请求
            request = new Request();
            request.setUser(customer2);
            request.setParams(submitJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));

            System.out.println("======工作人员通过合同======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject passJson = new JSONObject();
            passJson.put("operation", "reviewpass");
            passJson.put("object", "contract");
            request.setParams(passJson);

            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));

            System.out.println("=====客户通过合同======");

            request=new Request();
            request.setUser(customer2);
            JSONObject confirmJson=new JSONObject();
            confirmJson.put("operation","confirmpass");
            confirmJson.put("object","contract");
            request.setParams(confirmJson);
            System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //测试结束后删除该委托
    @After
    public void cleanUp() {
        consignService.deleteConsign(consignJson);
        contractService.deleteContract(contractJson);
    }
}