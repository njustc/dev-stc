package com.sinosteel.Repository;

import com.sinosteel.domain.TestCase;
import com.sinosteel.domain.TestCaseView;
import com.sinosteel.framework.mybatis.TestCaseMapper;
import com.sinosteel.framework.mybatis.UserMapper;
import com.sinosteel.repository.TestCaseRepository;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class TestCaseMapperTests {

    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private TestCaseMapper testCaseMapper;
    @Test
    public void testMapper(){
        TestCase testCase = new TestCase();
        testCase.setId("12345");
        testCase.setProcessInstanceID("111");
        testCase.setTestType("testing");
        testCase.setTestOrder("1");
        testCase.setDesignNote("nothing");
        testCase.setAgreementNote("nothing2");
        testCase.setImplementation("implementation");
        testCase.setPreResult("resultpre");
        testCase.setDesignerName("sjj");
        testCase.setTime1("2018-06-18");
        testCase.setBasis("noting");

        testCaseRepository.save(testCase);

        System.out.println("TestCaseMapper测试开始");
        List<TestCaseView> testCaseViewList = testCaseMapper.getTestCaseByPID("111");
        Assert.assertNotNull(testCaseViewList);
        if(testCaseViewList.size()<1)
        {
            Assert.fail("SIZE < 1\n\n\n");
        }



    }
}
