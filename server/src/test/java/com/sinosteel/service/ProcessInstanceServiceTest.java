package com.sinosteel.service;

import com.sinosteel.FrameworkApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.awt.*;

import static org.junit.Assert.*;

/**
 * @author LBW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ProcessInstanceServiceTest {

    @Autowired
    private ProcessInstanceService processInstanceService;

    @Test
    public void queryProcessState() {
    }

    @Test
    public void updateProcessState() {
    }
}