package com.sinosteel.Repository;


import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.TestFunction;
import com.sinosteel.repository.TestFunctionRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

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
 *         <td>新建软件功能表</td>
 *         <td>new + save</td>
 *         <td>FindById成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除软件功能表</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *         </tr>
 * <table>
 * @author FW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class TestFunctionRepositoryTests {

    @Autowired
    private TestFunctionRepository testFunctionRepository;

    @Test
    @Transactional
    public void testTestFunction(){
       TestFunction testFunction = new TestFunction();
        testFunction.setId("func");
        testFunctionRepository.save(testFunction);
        TestFunction testFunctionfind =testFunctionRepository.findById("func");
        Assert.assertNotNull("TestFunction为空",testFunctionfind);

        testFunctionRepository.save(testFunction);
        testFunctionRepository.delete("func");

        testFunctionfind = testFunctionRepository.findById("func");

        Assert.assertNull("testFunction不为空",testFunctionfind);
    }
}
