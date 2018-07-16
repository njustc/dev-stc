package com.sinosteel.Repository;

import com.sinosteel.FrameworkApplication;
import com.sinosteel.domain.SatisfactionSurvey;
import com.sinosteel.repository.SatisfactionSurveyRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
/**
 * 这个类用来测试SatisfactionSurvey类对应repository的增删查功能
 * <br/>
 *<table border="1"summary="">
 *     <tr>
 *     <th><b>测试内容</b></th>
 *     <th><b>对应操作</b></th>
 *     <th><b>测试结果</b></th>
 *     </tr>
 *     <tr>
 *         <td>新建满意度调查表</td>
 *         <td>new + save</td>
 *         <td>FindById成功</td>
 *      </tr>
 *      <tr>
 *          <td>删除满意度调查表</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *      </tr>
 * <table>
 * @author FW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class SatisfactionSurveyRepositoryTests {

    @Autowired
    private SatisfactionSurveyRepository satisfactionSurveyRepository;

    @Test
    @Transactional
    public void testSatisfactionSurvey(){
        SatisfactionSurvey satisfactionsurvey = new SatisfactionSurvey();
        satisfactionsurvey.setId("name");
        satisfactionsurvey.setAlteredUserName("FW");
        satisfactionSurveyRepository.save(satisfactionsurvey);
        SatisfactionSurvey satisfactionsurveyfind =  satisfactionSurveyRepository.findById("name");
        Assert.assertNotNull(" satisfactionSurvey为空", satisfactionsurveyfind);


        satisfactionSurveyRepository.save(satisfactionsurvey);
        satisfactionSurveyRepository.delete("name");

        satisfactionsurveyfind =satisfactionSurveyRepository.findById("name");

        Assert.assertNull("satisfactionsurvey不为空",satisfactionsurveyfind);
    }

}
