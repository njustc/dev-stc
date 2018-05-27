package com.sinosteel.service;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.Function;
import com.sinosteel.domain.Role;
import com.sinosteel.domain.User;
import com.sinosteel.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class AuthTests {

    private User marketuser;
    private User custom1user;
    private User custom2user;
    @Autowired
    private UserRepository userRepository;

    @Before
    public void testGetUser()
    {
        System.out.println("获取市场部工作人员账号测试");
        marketuser = userRepository.findByUsername("marketing");
        if(marketuser != null)
            System.out.println("获取市场部工作人员账号成功");
        else
            System.out.println("获取市场部工作人员账号失败");

        System.out.println("获取普通用户1账号测试");
        custom1user = userRepository.findByUsername("customer1");
        if(custom1user != null)
            System.out.println("获取普通用户账号1成功");
        else
            System.out.println("获取普通用户账号1失败");

        System.out.println("获取普通用户2账号测试");
        custom2user = userRepository.findByUsername("customer2");
        if(custom2user != null)
            System.out.println("获取普通用户账号2成功");
        else
            System.out.println("获取普通用户账号2失败");

    }
    @Test
    public void testUserRole()
    {
        System.out.println("获取用户对应角色测试");
        List<Role> marketroles = marketuser.getRoles();
        for(Role role : marketroles)
        {
            System.out.println("市场部工作人员role_String = "+ role.getRoleString());
        }
        List<Role> customer1roles = custom1user.getRoles();
        for(Role role : customer1roles)
        {
            System.out.println("普通客户1role_String = " + role.getRoleString());
        }
        List<Role> customer2roles = custom2user.getRoles();
        for(Role role : customer2roles)
        {
            System.out.println("普通客户2role_String = " + role.getRoleString());
        }

    }
    @Test
    public void testUserFunction()
    {
        System.out.println("测试用户功能");
        List<Function> marketuserFunctions = marketuser.getFunctions();
        for(Function function : marketuserFunctions)
        {
            System.out.println("市场部工作人员函数 = " + function.getFunctionType().toString());
        }

        List<Function> customuserFunctions = custom1user.getFunctions();
        for(Function function : customuserFunctions)
        {
            System.out.println("客户1函数 = " + function.getFunctionType().toString());
        }

        List<Function> customuser2Functions = custom2user.getFunctions();

        for(Function function : customuser2Functions)
        {
            System.out.println("客户2函数 = "+function.getFunctionType().toString());
        }
    }
    @Test
    @Transactional
    public void testUserConsign()
    {
        System.out.println("测试用户委托");
        List<Consign> customer1Consigns = custom1user.getConsigns();
        if(customer1Consigns == null)
            System.out.println("客户1没有委托");
        else {
            for (Consign consign : customer1Consigns) {
                System.out.println("客户1委托\n" + consign.getConsignation());
            }
        }
        List<Consign> customer2Consigns = custom2user.getConsigns();
        if(customer2Consigns == null)
            System.out.println("客户2没有委托");
        else {
            for (Consign consign : customer2Consigns) {
                System.out.println("客户2委托\n" + consign.getConsignation());
            }
        }
    }

}
