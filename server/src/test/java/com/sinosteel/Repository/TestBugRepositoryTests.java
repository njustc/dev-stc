package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.SatisfactionSurvey;
import com.sinosteel.repository.TestBugRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

/**
 * 这个类用来测试TestBug类对应repository的增删查功能
 * <br>
 *<table border="1"summary="">
 *     <tr>
 *     <th><b>测试内容</b></th>
 *     <th><b>对应操作</b></th>
 *     <th><b>测试结果</b></th>
 *     </tr>
 *     <tr>
 *         <td>新建测试问题</td>
 *         <td>new + save</td>
 *         <td>FindById成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除对应项</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *       </tr>
 * </table>
 * @author FW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class TestBugRepositoryTests {

    @Autowired
    private TestBugRepository testBugRepository;

    @Test
   // @Transactional

    public void testTestBugRepository(){


    }
}
