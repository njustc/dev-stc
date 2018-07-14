package com.sinosteel.Repository;


import com.sinosteel.FrameworkApplication;
import org.junit.runner.RunWith;
import org.junit.Assert;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.sinosteel.domain.TestReport;
import org.springframework.beans.factory.annotation.Autowired;
import com.sinosteel.repository.TestReportRepository;
import javax.transaction.Transactional;
import org.junit.Test;

/**
 * 这个类用来测试TestFunction类对应repository的增删查功能
 *<table border="1">
 *     <tr>
 *     </tr><th>测试内容</th>
 *     <th>对应操作</th>
 *     <th>测试结果</th>
 *     </tr>
 *     <tr>
 *         <td>新建测试报告表td>
 *         <td>new + save</td>
 *         <td>FindById成功</td>
 *          </tr>
 *          <td>删除测试报告表</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *         </tr>
 * <table>
 * @author FW
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class TestReportRepositoryTests {
    @Autowired
    private TestReportRepository testReportRepository;

    @Test
    @Transactional
    public void testTesReport(){
        TestReport testReport = new TestReport();
        testReport.setId("report");
        testReportRepository.save(testReport);
        TestReport testReportfind =testReportRepository.findById("report");
        Assert.assertNotNull("TestReport为空",testReportfind);

        testReportRepository.save(testReport);
        testReportRepository.delete("report");
        testReportfind =null;
        testReportfind = testReportRepository.findById("report");
        Assert.assertNull("testReportCheck不为空",testReportfind);
    }
}
