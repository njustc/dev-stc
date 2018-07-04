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
    public void testCaseAdd(){
        //获取user
        User user = userRepository.findByUsername("testing");
        System.out.println("获取的User id = "+user.getId());
        //添加project
        Project project = new Project();
        project.setId("1");
        project.setUser(user);
        projectRepository.save(project);
        //添加testcase;
        TestCase testcase = new TestCase();
        testcase.setId("1");
        testcase.setBody("fuck it");
        testcase.setProject(project);
        testCaseRepository.save(testcase);
        List<TestCase> testCaseList = new ArrayList<TestCase>();
        testCaseList.add(testcase);
        project.setTestCase(testCaseList);

        List<Project> projectList = user.getProjects();
        if(projectList==null)
            projectList = new ArrayList<Project>();
        projectList.add(project);
        user.setProjects(projectList);
        userRepository.save(user);

    }
}
