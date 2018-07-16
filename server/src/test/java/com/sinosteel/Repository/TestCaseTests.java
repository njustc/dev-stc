package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestCase;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.TestCaseRepository;
import com.sinosteel.repository.UserRepository;
import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;

import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * 这个类用来测试TestCase类对应repository的增删查功能
 * <table>
 * @author FW
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
@Transactional
public class TestCaseTests {

    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    @Transactional
    public void testTestCase(){
        TestCase testcase = new TestCase();
        testcase.setId("case");
        Project project = projectRepository.findById("test");

        testcase.setProject(project);
        projectRepository.save(project);
        testCaseRepository.save(testcase);
        TestCase testcasefind = testCaseRepository.findById("case");
        Assert.assertNotNull("testcase为空",testcasefind);

        testCaseRepository.save(testcase);
        testCaseRepository.delete("case");
        testcasefind = testCaseRepository.findById("case");
        Assert.assertNull("testcase不为空",testcasefind);
    }
}
