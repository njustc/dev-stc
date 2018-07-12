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
