package com.sinosteel.Repository;


import com.sinosteel.FrameworkApplication;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.sinosteel.domain.TestWorkCheck;
import com.sinosteel.repository.TestWorkCheckRepository;
import javax.transaction.Transactional;
import org.junit.Test;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 这个类用来测试TestFunction类对应repository的增删查功能
 *<table border="1">
 *     <tr>
 *     </tr><th>测试内容</th>
 *     <th>对应操作</th>
 *     <th>测试结果</th>
 *     </tr>
 *     <tr>
 *         <td>新建测试工作检查表td>
 *         <td>new + save</td>
 *         <td>FindById成功</td>
 *          </tr>
 *          <td>删除该表</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *         </tr>
 * <table>
 * @author FW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class TestWorkCheckRepositoryTests {
    @Autowired
    private TestWorkCheckRepository testWorkCheckRepository;

    @Test
    @Transactional
    public void testTesReport(){
        TestWorkCheck testWorkCheck = new TestWorkCheck();
        testWorkCheck.setId("workcheck");
        testWorkCheckRepository.save(testWorkCheck);
        TestWorkCheck testWorkCheckfind =testWorkCheckRepository.findById("workcheck");
        Assert.assertNotNull("TestWorkCheck为空",testWorkCheckfind);

        testWorkCheckRepository.save(testWorkCheck);
        testWorkCheckRepository.delete("workcheck");
        testWorkCheckfind =null;
        testWorkCheckfind = testWorkCheckRepository.findById("workcheck");
        Assert.assertNull("testReportCheck不为空",testWorkCheckfind);
    }
}
