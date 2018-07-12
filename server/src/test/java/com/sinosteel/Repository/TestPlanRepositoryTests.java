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
        testPlanRepository.delete("paln");

        testPlanfind = testPlanRepository.findById("paln");

        Assert.assertNull("testPlan不为空",testPlanfind);
    }

}
