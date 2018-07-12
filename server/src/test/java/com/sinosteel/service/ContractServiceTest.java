package com.sinosteel.service;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Project;
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
    private User tester;
    private User customer1;
    private User customer2;



    @Autowired
    private ContractService contractService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void getUser(){
        marketUser = userRepository.findByUsername("marketing");
        tester = userRepository.findByUsername("testing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername("customer2");
    }
    @Test
    public void test_queryContracts(){
        System.out.println("开始测试工作人员获取合同");
        try {
            JSON result = contractService.queryContracts(marketUser);

            Assert.assertNotNull("工作人员 - 合同查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取合同");
        try {
            JSON result = contractService.queryContracts(customer1);

            Assert.assertNotNull("用户 - 查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test_SE(){
        System.out.println("=====customer1 增加一个合同=====");
        JSONObject contract = new JSONObject();
        contract.put("contractBody", "这是customer1测试中新建的一个合同");

        try {

            //test_addcontract
            String pro_id = "p1";
            JSONObject jsonResult = contractService.addContract(pro_id,contract, null, customer1);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("合同新建失败",id);
            System.out.println("新建成功。合同的ID为: " + id);

            //test_querycontractByID
            System.out.println("=====通过ID查询该合同=====");
            JSONObject jsonContract = contractService.queryContractByID(id);
            Assert.assertNotNull("通过ID合同查询失败",jsonContract);
            System.out.println(jsonContract);

            //test_editcontract
            System.out.println("=====编辑该合同=====");
            String edit_object = "contractBody";
            String edit_contents = "这是customer1在测试中修改的合同";
            jsonContract.put(edit_object,edit_contents );
            jsonContract = contractService.editContract(jsonContract, null, customer1);
            Assert.assertEquals(edit_contents,jsonContract.getString(edit_object));  //检验合同内容修改是否符合预期
            System.out.println(jsonContract);

            //test_deletecontract
            System.out.println("=====删除该合同=====");
            contractService.deleteContract(jsonContract);
            try {
                JSONObject jsonDel = contractService.queryContractByID(id);
                Assert.assertNull("委托删除失败", jsonDel);
            } catch (Exception e) {
                System.out.println("委托删除成功");
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
