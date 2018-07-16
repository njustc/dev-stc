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

/**
 * 这个类用来测试project类对应repository的增删查功能
 * <br/>
 * <table border="1" summary="">
 *     <tr>
 *     <th><b>测试内容</b></th>
 *     <th><b>对应操作</b></th>
 *     <th><b>测试结果</b></th>
 *     </tr>
 *     <tr>
 *         <td>新建项目</td>
 *         <td>new project + save</td>
 *         <td>FindById成功</td>
 *     </tr>
 *     <tr>
 *          <td>删除项目</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *     </tr>
 * </table>
 * @author FW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ProjectRepositoryTests {

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    @Transactional
    public void testProject(){

        Project project = new Project();
        project.setId("2018");
        projectRepository.save(project);
        Project projectfind = projectRepository.findById("2018");
        Assert.assertNotNull("project为空",projectfind);

       // project.setContract(null);
        projectRepository.save(project);
        projectRepository.delete("2018");

        projectfind = projectRepository.findById("2018");

        Assert.assertNull("project不为空",projectfind);
    }
}
