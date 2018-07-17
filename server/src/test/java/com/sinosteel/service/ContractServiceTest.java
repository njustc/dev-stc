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
 * 本测试用来测试Contract Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>通过用户查询合同</td>
 *          <td>queryContracts</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>新建合同</td>
 *          <td>addContract</td>
 *          <td>新建成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过合同ID查询合同</td>
 *          <td>queryContractByID</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过工程查询合同</td>
 *          <td>queryContractsByProject</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>编辑合同内容</td>
 *          <td>editContract</td>
 *          <td>编辑成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除合同</td>
 *          <td>deleteContract</td>
 *          <td>queryContractByID为空,删除成功</td>
 *      </tr>
 * </table>
 *
 *
 * @author Lumpy
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@Transactional
public class ContractServiceTest {

    private User marketUser;
    private User tester;
    private User customer1;
    private User customer2;


    @Autowired
    private ContractService contractService;

    @Autowired
    private ProjectService projectService;

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
            JSON result = contractService.queryContracts(tester);

            Assert.assertNotNull("工作人员 - 合同查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取合同");
        try {
            JSON result = contractService.queryContracts(tester);

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

            //test_querycnotractByProject
            System.out.println("=====通过工程查询该合同=====");
            JSON jsonContract_pro = contractService.queryContractsByProject(pro_id);
            Assert.assertNotNull("通过工程查询合同失败",jsonContract_pro);
            System.out.println(jsonContract_pro);

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
            contractService.deleteContract(jsonResult);
            try {
                JSONObject jsonDel = contractService.queryContractByID(id);
                Assert.assertNull("合同删除失败", jsonDel);
            } catch (Exception e) {
                System.out.println("合同删除成功");
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
