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
public class ProcessInstanceServiceTest {

    @Autowired
    private ProcessInstanceService processInstanceService;
    @Autowired
    private UserService userService;
    //测试中使用的用户
    private User customer1;
    private User customer2;
    private User marketing;
    private User testing;
    //private User qa;
    //private User marketingdirector;
    //private User testingdirector;

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

    //It turns out that we can't update processState too quickly, so now I use Thread.sleep() to make it slow.
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
    @Test
    public void  updateProcessContractState() {
        try {
            JSONObject state ;
            System.out.println("======查询合同状态========");
            //System.out.println(processInstanceService.queryProcessState(contractJson.getString("processInstanceID")));
            System.out.println(processInstanceService.queryProcessState(processInstanceId));
            System.out.println("======customer2提交合同=======");
            //构造提交委托请求
            Request request = new Request();
            request.setUser(customer2);
            JSONObject submitJson = new JSONObject();
            submitJson.put("operation", "Submit");
            submitJson.put("object", "contract");
            request.setParams(submitJson);

            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("TobeReview",state.getString("state"));
            System.out.println("======工作人员否决合同======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject rejectJson = new JSONObject();
            rejectJson.put("operation", "ReviewReject");
            rejectJson.put("object", "contract");
            rejectJson.put("comments","notoknotok");
            request.setParams(rejectJson);

            Thread.sleep(2000);
           // System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("TobeSubmit",state.getString("state"));
            System.out.println("======customer2再次请求======");
            //构造提交委托请求
            request = new Request();
            request.setUser(customer2);
            request.setParams(submitJson);
            Thread.sleep(2000);
           // System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("TobeReview",state.getString("state"));
            System.out.println("======工作人员通过合同======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject passJson = new JSONObject();
            passJson.put("operation", "ReviewPass");
            passJson.put("object", "contract");
            passJson.put("comments","okokok");
            request.setParams(passJson);

            Thread.sleep(2000);
           // System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            state = processInstanceService.queryProcessState(processInstanceId);
            System.out.println(processInstanceService.getComments(processInstanceId));
            Assert.assertEquals("TobeConfirm",state.getString("state"));
            System.out.println("=====客户通过合同======");

            request=new Request();
            request.setUser(customer2);
            JSONObject confirmJson=new JSONObject();
            confirmJson.put("operation","ConfirmPass");
            confirmJson.put("object","contract");
            confirmJson.put("comments","okokokoko!!!");
            request.setParams(confirmJson);
          //  System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("Finished",state.getString("state"));
            System.out.println(processInstanceService.getComments(processInstanceId));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Test
    public void  updateProcessContractState2() {
        try {
            JSONObject state ;
            System.out.println("======查询合同状态========");
            //System.out.println(processInstanceService.queryProcessState(contractJson.getString("processInstanceID")));
            System.out.println(processInstanceService.queryProcessState(processInstanceId));

            System.out.println("======customer1提交合同=======");
            //构造提交委托请求
            Request request = new Request();
            request.setUser(customer1);
            JSONObject submitJson = new JSONObject();
            submitJson.put("operation", "Submit");
            submitJson.put("object", "contract");
            request.setParams(submitJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======市场部主任否决合同======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject rejectJson = new JSONObject();
            rejectJson.put("operation", "ReviewReject");
            rejectJson.put("object", "contract");
            rejectJson.put("comments","to be more");
            request.setParams(rejectJson);
            Thread.sleep(2000);
            // System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            System.out.println(processInstanceService.getComments(processInstanceId));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("TobeSubmit",state.getString("state"));

            System.out.println("======customer1再次请求======");
            //构造提交委托请求
            request = new Request();
            request.setUser(customer1);
            request.setParams(submitJson);
            Thread.sleep(2000);
            // System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======市场部主任通过合同======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject passJson = new JSONObject();
            passJson.put("operation", "ReviewPass");
            passJson.put("object", "contract");
            passJson.put("comments","can be pass");
            request.setParams(passJson);
            Thread.sleep(2000);
            // System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("TobeConfirm",state.getString("state"));

            System.out.println("=====customer1不通过合同======");
            request=new Request();
            request.setUser(customer1);
            JSONObject confirmJson=new JSONObject();
            confirmJson.put("operation","ConfirmReject");
            confirmJson.put("object","contract");
            confirmJson.put("comments","can not be confirmed");
            request.setParams(confirmJson);
            //  System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("TobeSubmit",state.getString("state"));

            System.out.println("======customer1再再次请求======");
            //构造提交委托请求
            request = new Request();
            request.setUser(customer1);
            request.setParams(submitJson);
            Thread.sleep(2000);
            // System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("======质量部主任通过合同======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject passJson2 = new JSONObject();
            passJson2.put("operation", "ReviewPass");
            passJson2.put("object", "contract");
            passJson2.put("comments","pass pass");
            request.setParams(passJson2);
            Thread.sleep(2000);
            // System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            System.out.println(processInstanceService.getComments(processInstanceId));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("TobeConfirm",state.getString("state"));

            System.out.println("=====customer1通过合同======");
            request=new Request();
            request.setUser(customer1);
            JSONObject confirmJson2=new JSONObject();
            confirmJson2.put("operation","ConfirmPass");
            confirmJson2.put("object","contract");
            confirmJson2.put("comments","pass pass pass");
            request.setParams(confirmJson2);
            //  System.out.println(processInstanceService.updateProcessState(contractJson.getString("processInstanceID"), request));
            System.out.println(processInstanceService.updateProcessState(processInstanceId, request));
            System.out.println(processInstanceService.getComments(processInstanceId));
            state = processInstanceService.queryProcessState(processInstanceId);
            Assert.assertEquals("Finished",state.getString("state"));
        } catch (Exception e) {
            e.printStackTrace();
        }
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
    @Test
    public void updateProcessTestReportState() {
        try {
            JSONObject state = new JSONObject();
            System.out.println("======查询测试报告状态========");
            System.out.println(processInstanceService.queryProcessState(prId3));
            System.out.println(processInstanceService.getUserOperation(prId3));
            System.out.println("======customer1提交测试报告=======");
            //构造提交委托请求
            Request request = new Request();
            request.setUser(marketing);
            JSONObject writeJson = new JSONObject();
            writeJson.put("operation", "Write");
            writeJson.put("object", "testreport");
            request.setParams(writeJson);

            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeReview",state.getString("state"));
            System.out.println("======工作人员否决测试报告======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject rejectJson = new JSONObject();
            rejectJson.put("operation", "ReviewReject");
            rejectJson.put("object", "testreport");
            rejectJson.put("comments","non np n p ");
            request.setParams(rejectJson);

            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getComments(processInstanceId));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeWrite",state.getString("state"));
            System.out.println("======customer2再次请求======");
            //构造提交委托请求
            request = new Request();
            request.setUser(customer2);
            request.setParams(writeJson);
            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeReview",state.getString("state"));
            System.out.println("======工作人员通过测试报告======");
            //构造提交委托请求
            request = new Request();
            request.setUser(marketing);
            JSONObject passJson = new JSONObject();
            passJson.put("operation", "ReviewPass");
            passJson.put("object", "testreport");
            passJson.put("comments","pass pass ");
            request.setParams(passJson);

            Thread.sleep(2000);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeApprove",state.getString("state"));
            System.out.println("=====主任否决测试报告======");

            request=new Request();
            request.setUser(customer2);
            JSONObject confirmJson=new JSONObject();
            confirmJson.put("operation","ApproveReject");
            confirmJson.put("object","testreport");
            confirmJson.put("comments","approve reject");
            request.setParams(confirmJson);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getComments(prId3));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeWrite",state.getString("state"));
            System.out.println("=====工作人员再次提交======");

            request=new Request();
            request.setUser(customer2);
            JSONObject implementJson=new JSONObject();
            implementJson.put("operation","Write");
            implementJson.put("object","testreport");
            request.setParams(implementJson);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeReview",state.getString("state"));

            System.out.println("=====主任通过测试报告======");
            request=new Request();
            request.setUser(customer2);
            implementJson=new JSONObject();
            implementJson.put("operation","ReviewPass");
            implementJson.put("object","testreport");
            implementJson.put("comments","pass");
            request.setParams(implementJson);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeApprove",state.getString("state"));

            System.out.println("=====主任通过测试报告======");
            request=new Request();
            request.setUser(customer2);
            implementJson=new JSONObject();
            implementJson.put("operation","ApprovePass");
            implementJson.put("object","testreport");
            implementJson.put("comments","pass");
            request.setParams(implementJson);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getComments(prId3));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeSend",state.getString("state"));

            System.out.println("=====发放测试报告======");
            request=new Request();
            request.setUser(customer2);
            implementJson=new JSONObject();
            implementJson.put("operation","Send");
            implementJson.put("object","testreport");
            request.setParams(implementJson);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeConfirm",state.getString("state"));

            System.out.println("=====确认测试报告======");
            request=new Request();
            request.setUser(customer2);
            implementJson=new JSONObject();
            implementJson.put("operation","ConfirmPass");
            implementJson.put("object","testreport");
            implementJson.put("comments","pass");
            request.setParams(implementJson);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("Satisfaction",state.getString("state"));

            System.out.println("=====满意度测试报告======");
            request=new Request();
            request.setUser(customer2);
            implementJson=new JSONObject();
            implementJson.put("operation","SatisfactoryFeedback");
            implementJson.put("object","testreport");
            request.setParams(implementJson);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeDone",state.getString("state"));

            System.out.println("=====结项测试报告======");
            request=new Request();
            request.setUser(customer2);
            implementJson=new JSONObject();
            implementJson.put("operation","Done");
            implementJson.put("object","testreport");
            request.setParams(implementJson);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
            Assert.assertEquals("TobeFiling",state.getString("state"));

            System.out.println("=====归档测试报告======");
            request=new Request();
            request.setUser(customer2);
            implementJson=new JSONObject();
            implementJson.put("operation","File");
            implementJson.put("object","testreport");
            request.setParams(implementJson);
            System.out.println(processInstanceService.updateProcessState(prId3, request));
            System.out.println(processInstanceService.getUserOperation(prId3));
            state = processInstanceService.queryProcessState(prId3);
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