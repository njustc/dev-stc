package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Assert;
import com.sinosteel.domain.TestReportCheck;
import com.sinosteel.repository.TestReportCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class TestReportCheckRepositoryTests {
    @Autowired
    private TestReportCheckRepository testReportCheckRepository;

    @Test
    @Transactional

    public void testTesReportCheck(){
        TestReportCheck testReportCheck = new TestReportCheck();
        testReportCheck.setId("check");
        testReportCheckRepository.save(testReportCheck);
        TestReportCheck testReportCheckfind =testReportCheckRepository.findById("check");
        Assert.assertNotNull("TestReportCheck为空",testReportCheckfind);

        testReportCheckRepository.save(testReportCheck);
        testReportCheckRepository.delete("check");
        testReportCheckfind =null;
        testReportCheckfind = testReportCheckRepository.findById("check");
        Assert.assertNull("testReportCheck不为空",testReportCheckfind);
    }
}
