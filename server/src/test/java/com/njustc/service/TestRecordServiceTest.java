package com.njustc.service;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.njustc.FrameworkApplication;
import com.njustc.domain.User;
import com.njustc.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 *
 * 本测试用来测试TestRecord Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>通过用户查询测试记录</td>
 *          <td>queryTestRecords</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>新建测试记录</td>
 *          <td>addTestRecord</td>
 *          <td>新建成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过测试记录ID查询测试记录</td>
 *          <td>queryTestRecordByID</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>通过工程查询测试记录</td>
 *          <td>queryTestRecordsByProject</td>
 *          <td>查询成功</td>
 *      </tr>
 *      <tr>
 *          <td>编辑测试记录内容</td>
 *          <td>editTestRecord</td>
 *          <td>编辑成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除测试记录</td>
 *          <td>deleteTestRecord</td>
 *          <td>queryTestRecordByID为空,删除成功</td>
 *      </tr>
 * </table>
 *
 *
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
//@Transactional
public class TestRecordServiceTest {

    private User tester;
    private User customer1;
    private User customer2;

    @Autowired
    private TestRecordService testRecordService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void getUser() {
        tester = userRepository.findByUsername("testing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
    }

    @Ignore
    public void test_queryTestRecords(){
        System.out.println("开始测试工作人员获取测试报告检查");
        try {
            JSON result = testRecordService.queryTestRecords(tester);

            Assert.assertNotNull("工作人员 - 工程查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Ignore
    public void test_SE(){
        System.out.println("=====tester 新建一个测试报告检查=====");
        JSONObject TestRecord = new JSONObject();
        TestRecord.put("body", "这是testUser测试中新建的一个测试报告检查");


        try {

            //test_addTestRecord
            JSONObject jsonProject = projectService.queryProjectById("p2");
            String pro_id = jsonProject.getString("id");
            JSONObject jsonResult = testRecordService.addTestRecord(jsonProject, null, tester);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试报告检查新建失败",id);
            System.out.println("测试报告检查新建成功, 测试报告检查的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryTestRecordsByID
            System.out.println("=====通过ID查询该测试报告检查=====");
            JSONObject jsonTestRecord = testRecordService.queryTestRecordByID(id);
            Assert.assertNotNull("通过ID查询测试报告检查失败",jsonTestRecord);
            System.out.println(jsonTestRecord);




            //test_editTestRecord
            System.out.println("=====编辑该测试报告检查内容=====");
            String edit_object = "body";
            String edit_contents = "这是tester在测试中修改的测试报告检查";
            jsonTestRecord.put(edit_object,edit_contents );
            jsonTestRecord = testRecordService.editTestRecord(jsonTestRecord, null, tester);
            Assert.assertEquals("测试报告检查修改失败",edit_contents,jsonTestRecord.getString(edit_object));  //检验报告检查内容修改是否符合预期
            System.out.println(jsonTestRecord);


            //test_deleteTestRecord
            System.out.println("=====删除该测试报告检查=====");
            testRecordService.deleteTestRecord(jsonTestRecord);
            try{
                JSONObject jsonDel = testRecordService.queryTestRecordByID(id);
                Assert.assertNull("测试报告检查删除失败",jsonDel);
            }
            catch (Exception e){
                System.out.println("测试报告检查删除成功");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
