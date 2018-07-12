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
        user.setId("1008");
        userRepository.save(user);
       User userfind =userRepository.findByUsername("user1");
        Assert.assertNotNull("TestWorkCheck为空",userfind);

        userRepository.save(user);
        userRepository.delete("1008");
        userfind = userRepository.findByUsername("user1");
        Assert.assertNull("testReportCheck不为空",userfind);
    }

}
