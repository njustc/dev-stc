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
