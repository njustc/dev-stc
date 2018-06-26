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
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
@Transactional
public class TestRecordServiceTest {

    private User testUser;
    private User customer1;
    private User customer2;

    @Autowired
    private TestRecordService testRecordService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void getUser() {
        testUser = userRepository.findByUsername("testing");
        customer1 = userRepository.findByUsername("customer1");
        customer2 = userRepository.findByUsername(("customer2"));
    }
    @Test
    public void Test_queryTestRecords(){
        System.out.println("测试工作人员获取测试记录");
        try {
            JSON result = testRecordService.queryTestRecords(testUser);

            Assert.assertNotNull("工作人员 -测试记录查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("开始测试用户获取测试记录");
        try {
            JSON result = testRecordService.queryTestRecords(customer1);

            Assert.assertNotNull("用户 - 测试记录查询失败",result);

            System.out.println(result);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Test
    public void test_SE(){
        System.out.println("=====testUser 新建一个测试记录=====");
        JSONObject TestRecord = new JSONObject();
        TestRecord.put("body", "这是testUser测试中新建的一个测试记录");

        try {

            //test_addTestRecord
            JSONObject jsonResult = testRecordService.addTestRecord(TestRecord, null, testUser);
            String id = jsonResult.getString("id");
            Assert.assertNotNull("测试记录新建失败",id);
            System.out.println("测试记录新建成功, 测试记录的ID为: " + id);
            System.out.println(jsonResult);

            //test_queryTestRecordsByID
            System.out.println("=====通过ID查询该测试记录=====");
            JSONObject jsonTestRecord = testRecordService.queryTestRecordByID(id);
            Assert.assertNotNull("通过ID查询测试记录失败",jsonTestRecord);
            System.out.println(jsonTestRecord);

            //test_editTestRecord
            System.out.println("=====编辑该测试记录内容=====");
            String edit_object = "body";
            String edit_contents = "这是testUser在测试中修改的测试记录";
            jsonTestRecord.put(edit_object,edit_contents );
            jsonTestRecord = testRecordService.editTestRecord(jsonTestRecord, null, testUser);
            Assert.assertEquals("测试记录修改失败",edit_contents,jsonTestRecord.getString(edit_object));  //检验记录内容修改是否符合预期
            System.out.println(jsonTestRecord);

            //test_deleteTestRecord
            System.out.println("=====删除该测试记录=====");
            testRecordService.deleteTestRecord(jsonTestRecord);
            JSONObject jsonDel = testRecordService.queryTestRecordByID(id);
            Assert.assertNull("测试记录删除失败",jsonDel);
            System.out.println("测试记录删除成功");


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
