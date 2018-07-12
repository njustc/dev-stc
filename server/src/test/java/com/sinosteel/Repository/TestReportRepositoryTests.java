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
