package com.njustc.service;

import com.njustc.FrameworkApplication;
import com.njustc.domain.Consign;
import com.njustc.domain.Function;
import com.njustc.domain.Role;
import com.njustc.domain.User;
import com.njustc.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * 本测试用来测试Auth Service
 * <table border = "1" summary="">
 *      <tr>
 *          <th>测试内容</th>
 *          <th>测试操作</th>
 *          <th>测试结果</th>
 *      </tr>
 *      <tr>
 *          <td>获取用户</td>
 *          <td>findByUsername</td>
 *          <td>返回用户名,获取成功</td>
 *      </tr>
 *      <tr>
 *          <td>获取用户身份</td>
 *          <td>getRoles</td>
 *          <td>返回用户身份,获取成功</td>
 *      </tr>
 *      <tr>
 *          <td>获取用户功能</td>
 *          <td>getFunctions</td>
 *          <td>返回用户功能,获取成功</td>
 *      </tr>
 *      <tr>
 *          <td>获取用户委托</td>
 *          <td>testUserConsign</td>
 *          <td>返回用户委托,获取成功</td>
 *      </tr>
 * </table>
 *
 *
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class AuthTests {

    private User marketuser;
    private User custom1user;
    private User custom2user;
    @Autowired
    private UserRepository userRepository;


    /**
     * 测试获取用户
     */
    @Before
    public void testGetUser()
    {
        marketuser = userRepository.findByUsername("marketing");
        Assert.assertNotNull("marketuser获取失败",marketuser);
        custom1user = userRepository.findByUsername("customer1");
        Assert.assertNotNull("customer1获取失败",custom1user);
        custom2user = userRepository.findByUsername("customer2");
        Assert.assertNotNull("customer2获取失败",custom2user);

    }

    /**
     * 测试获取用户身份
     */
    @Test
    public void testUserRole()
    {
        List<Role> marketroles = marketuser.getRoles();
        List<Role> customer1roles = custom1user.getRoles();
        List<Role> customer2roles = custom2user.getRoles();
        Assert.assertNotNull("marketrole获取失败",marketroles);
        Assert.assertNotNull("customer1role获取失败",customer1roles);
        Assert.assertNotNull("customer2role获取失败",customer2roles);

    }

    /**
     * 测试获取用户功能
     */
    @Test
    public void testUserFunction()
    {
        System.out.println("测试用户功能");
        List<Function> marketuserFunctions = marketuser.getFunctions();
        Assert.assertNotNull("marketFunction获取失败",marketuserFunctions);

        List<Function> customuserFunctions = custom1user.getFunctions();
        Assert.assertNotNull("customFunction获取失败",customuserFunctions);

        List<Function> customuser2Functions = custom2user.getFunctions();

        Assert.assertNotNull("custom2Function获取失败",customuser2Functions);

    }

    /**
     * 测试获取用户委托
     */
    @Test
  //  @Transactional
    public void testUserConsign()
    {
        System.out.println("测试用户委托");
        List<Consign> customer1Consigns = custom1user.getConsigns();
        Assert.assertNotNull("用户1委托获取失败",customer1Consigns);

        List<Consign> customer2Consigns = custom2user.getConsigns();
        Assert.assertNotNull("用户2委托获取失败",customer2Consigns);
    }

}
