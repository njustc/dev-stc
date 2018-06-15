package com.sinosteel.service;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.User;
import com.sinosteel.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

/**
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
@Transactional
public class ContractServiceTest {

    private User marketUser;
    private User customer1;
    private User customer2;

    @Autowired
    private ContractService contractService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void get_User(){
        marketUser = userRepository.findByUsername("marketUser");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername("customer2");
    }

    @Test
    public void Test_queryContracts(){
        System.out.println("测试工作人员获取合同");
        try {
            JSON result = contractService.queryContracts(marketUser);

            Assert.assertNotNull("工作人员 -合同查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取合同");
        try {
            JSON result = contractService.queryContracts(customer1);

            Assert.assertNotNull("用户 - 合同查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test_SE(){
        System.out.println("=====customer1 新建一个合同=====");
        JSONObject contract = new JSONObject();
        contract.put("contractBody", "这是customer1测试中新建的一个合同");

        try {

            //test_addcontract
            JSONObject jsonResult = contractService.addContract(contract, null, customer1);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("合同新建失败",id);
            System.out.println("合同新建成功, 合同的ID为: " + id);
            System.out.println(jsonResult);

            //test_querycontractsByID
            System.out.println("=====通过ID查询该合同=====");
            JSONObject jsonContract = contractService.queryContractByID(id);
            Assert.assertNotNull("通过ID查询合同失败",jsonContract);
            System.out.println(jsonContract);

            //test_editcontract
            System.out.println("=====编辑该合同内容=====");
            String edit_object = "contractBody";
            String edit_contents = "这是customer1在测试中修改的合同";
            jsonContract.put(edit_object,edit_contents );
            jsonContract = contractService.editContract(jsonContract, null, customer1);
            Assert.assertEquals("合同修改失败",edit_contents,jsonContract.getString(edit_object));  //检验合同内容修改是否符合预期
            System.out.println(jsonContract);

            //test_deletecontract
            System.out.println("=====删除该合同=====");
            contractService.deleteContract(jsonContract);
            JSONObject jsonDel = contractService.queryContractByID(id);
            Assert.assertNull("合同删除失败",jsonDel);
            System.out.println("合同删除成功");


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
