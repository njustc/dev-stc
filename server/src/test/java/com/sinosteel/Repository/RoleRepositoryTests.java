package com.sinosteel.Repository;


import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Function;
import com.sinosteel.domain.Role;
import com.sinosteel.repository.FunctionRepository;
import com.sinosteel.repository.RoleRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import javax.transaction.Transactional;
import java.util.List;

/**
 * 这个类用来测试role类对应repository和role对应function；
 * <br>
 * 其中role代表角色 例：市场部 .etc
 * <br>
 * <table border="1" summary="">
 *     <tr>
 *     <th><b>测试内容</b></th>
 *     <th><b>对应操作</b></th>
 *     <th><b>测试结果</b></th>
 *     </tr>
 *     <tr>
 *         <td>获取角色信息</td>
 *         <td>executeHql</td>
 *         <td>得到角色不为空</td>
 *     </tr>
 *     <tr>
 *          <td>读取角色功能列表</td>
 *         <td>getFunctions</td>
 *         <td>（List）function</td>
 *     </tr>
 * </table>
 * @author FW
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class RoleRepositoryTests {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private FunctionRepository functionRepository;


    @Test
  // @Transactional
    public void testRoleFunction()
    {
        System.out.println("测试角色对应Function");
        List<Role> roles = roleRepository.executeHql("Select role from Role role where 1=1",null);

        //List<Function> allfunctions = functionRepository.executeHql("Select function from Function function where 1=1",null);
        Assert.assertNotNull("角色为空",roles);
        for (Role role : roles){
            List<Function> functions = role.getFunctions();
            Assert.assertNotNull("functions为空",functions);
            for (Function function : functions)
            {
                Assert.assertNotNull("function为空",function);
            }
        }
    }

}
