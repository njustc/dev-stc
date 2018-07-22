package com.njustc.service;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * <p>将service层API单元测试样例进行捆绑,以便进行批量运行测试代码</p>
 *
 * @author Lumpy
 */

@RunWith(Suite.class)
@Suite.SuiteClasses({
        ConsignServiceTest.class,
        ContractServiceTest.class,
        ProjectServiceTest.class,
        SatisfationSurveyServiceTest.class,
        TestBugServiceTest.class,
        TestCaseServiceTest.class,
        TestFunctionServiceTest.class,
        TestPlanServiceTest.class,
        TestReportCheckServiceTest.class,
        TestReportServiceTest.class,
        TestWorkCheckServiceTest.class
})
/**
 * 运行捆绑类,以批量运行测试代码
 */
public class SuitTest {
}
