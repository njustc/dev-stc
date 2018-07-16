package com.sinosteel.Repository;


import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.TestFunction;
import org.junit.Assert;
import com.sinosteel.domain.TestPlan;
import com.sinosteel.repository.TestPlanRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

/**
 * 这个类用来测试TestPlan类对应repository的增删查功能
 *<table border="1">
 *     <tr>
 *     </tr><th>测试内容</th>
 *     <th>对应操作</th>
 *     <th>测试结果</th>
 *     </tr>
 *     <tr>
 *         <td>新建测试方案<td>
 *         <td>new + save</td>
 *         <td>FindById成功</td>
 *          </tr>
 *          <td>删除测试方案</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *         </tr>
 * <table>
 * @author FW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class TestPlanRepositoryTests {
    @Autowired
    private TestPlanRepository testPlanRepository;

    @Test
    @Transactional
    public void testTestPlan(){
        TestPlan testPlan = new TestPlan();
        testPlan.setId("plan");
        testPlanRepository.save(testPlan);
        TestPlan testPlanfind =testPlanRepository.findById("plan");
        Assert.assertNotNull("TestPlan为空",testPlanfind);

        testPlanRepository.save(testPlan);
        testPlanRepository.delete("plan");
        testPlanfind =null;
        testPlanfind = testPlanRepository.findById("plan");
        Assert.assertNull("testPlan不为空",testPlanfind);
    }

}
