package com.sinosteel.Repository;


import com.sinosteel.FrameworkApplication;
import com.sinosteel.repository.ProjectRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import com.sinosteel.domain.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ProjectRepositoryTests {

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    @Transactional
    public void testProject(){

        Project project = new Project();
        project.setId("FW");
        projectRepository.save(project);
        Project projectfind = projectRepository.findById("FW");
        Assert.assertNotNull("project为空",projectfind);

       // project.setContract(null);
        projectRepository.save(project);
        projectRepository.delete("FW");

        projectfind = projectRepository.findById("FW");

        Assert.assertNull("project不为空",projectfind);
    }
}
