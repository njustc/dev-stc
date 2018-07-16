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

/**
 * ConsignRepository
 * 这个类是用来测试xxxx
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ConsignRepositoryTests {

    @Autowired
    private ConsignRepository consignRepository;

    @Autowired
    private ProjectRepository projectRepository;

    /**
     * testConsignPoroject
     * 测试过程
     * <ol>
     *  <li>新建委托</li>
     *  <li>查找委托</li>
     *  <li>删除委托</li>
     *  <li>确认是否删除</li>
     * </ol>
     * 测试结果
     * <ol>
     *     <li>查找委托时，不为空</li>
     *     <li></li>
     * </ol>
     */
    @Test
    @Transactional
    public void testConsignProject() {
        Consign consign = new Consign();

        consign.setId("1");

        consign.setProject(projectRepository.findById("test"));
        consignRepository.save(consign);

        Consign consignfind = consignRepository.findById("1");

        Assert.assertNotNull("consign为空",consignfind);

        consignRepository.delete("1");


    }
}