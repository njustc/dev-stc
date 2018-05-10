package com.sinosteel.activiti;

import com.oracle.tools.packager.Log;
import com.sinosteel.FrameworkApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
 * @author LBW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ConsignActivitiTest {

    private ConsignActiviti consignActiviti = new ConsignActiviti();

    @Before
    public void deployConsignActiviti() {
        Log.debug("start to deploy");
        consignActiviti.deploy();
    }
    @Test
    public void newConsign() {

        consignActiviti.NewConsign("0", "0", "0");
    }

    @Test
    public void getProcessState() {
    }

    @Test
    public void getUserTasks() {
    }

    @Test
    public void submitConsign() {
    }

    @Test
    public void checkConsign() {
    }
}