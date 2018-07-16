package com.sinosteel.Repository;


import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Contract;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.User;
import com.sinosteel.repository.UserRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.List;

/**
 * 这个类用来测试TestFunction类对应repository的增删查功能
 * <br/>
 *<table border="1" summary="">
 *     <tr>
 *     <th><b>测试内容</b></th>
 *     <th><b>对应操作</b></th>
 *     <th><b>测试结果</b></th>
 *     </tr>
 *     <tr>
 *         <td>新建用户</td>
 *         <td>new + save</td>
 *         <td>FindById成功</td>
 *      <tr/>
 *      <tr>
 *          <td>删除该用户</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *      </tr>
 * </table>
 * @author FW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    public void testUserProject()
    {
        User user = new User();
        user.setName("user1");
        user.setId("10086");
        userRepository.save(user);
       User userfind =userRepository.findById("10086");
        Assert.assertNotNull("TestWorkCheck为空",userfind);

        userRepository.save(user);
        userRepository.delete("10086");
        userfind = userRepository.findById("10086");
        Assert.assertNull("testReportCheck不为空",userfind);
    }

}
