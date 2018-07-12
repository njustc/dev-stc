package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestCase;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.TestCaseRepository;
import com.sinosteel.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;

import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
@Transactional
public class TestCaseTests {

    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    public void testTestCase(){

    }
}
