package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.Project;
import com.sinosteel.repository.ConsignRepository;
import com.sinosteel.repository.ProjectRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ConsignRepositoryTests {

    @Autowired
    private ConsignRepository consignRepository;

    @Autowired
    private ProjectRepository projectRepository;
    @Test
    public void testConsignProject() {
        Consign consign = new Consign();

        consign.setId("1");


        Project project = projectRepository.findById("test");
        project.setConsign(consign);
        consign.setProject(project);
        consignRepository.save(consign);
        projectRepository.save(project);


        Consign consignfind = consignRepository.findById("1");

        Assert.assertNotNull("consign为空",consignfind);

        consignRepository.delete("1");

        consignfind = consignRepository.findById("1");

        Assert.assertNull("consign不为空",consignfind);


    }
}