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
 *<table border="1">
 *     <tr>
 *     </tr><th>测试内容</th>
 *     <th>对应操作</th>
 *     <th>测试结果</th>
 *     </tr>
 *     <tr>
 *         <td>新建测试问题/td>
 *         <td>new + save</td>
 *         <td>FindById成功</td>
 *          </tr>
 *          <td>删除对应项</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *         </tr>
 * <table>
 * @author FW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class TestBugRepositoryTests {

    @Autowired
    private TestBugRepository testBugRepository;

    @Test
    @Transactional

    public void testTestBugRepository(){


    }
}
