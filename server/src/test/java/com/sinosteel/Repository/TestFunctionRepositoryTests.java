package com.sinosteel.Repository;


import com.sinosteel.FrameworkApplication;
import com.sinosteel.repository.TestFunctionRepository;
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

    }
}
