package com.sinosteel.Repository;


import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestFunction;
import com.sinosteel.repository.TestFunctionRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class TestFunctionRepositoryTests {

    @Autowired
    private TestFunctionRepository testFunctionRepository;

    @Test
    @Transactional
    public void testTestFunction(){
       TestFunction testFunction = new TestFunction();
        testFunction.setId("func");
        testFunctionRepository.save(testFunction);
        TestFunction testFunctionfind =testFunctionRepository.findById("func");
        Assert.assertNotNull("TestFunction为空",testFunctionfind);

        testFunctionRepository.save(testFunction);
        testFunctionRepository.delete("func");

        testFunctionfind = testFunctionRepository.findById("func");

        Assert.assertNull("testFunction不为空",testFunctionfind);
    }
}
