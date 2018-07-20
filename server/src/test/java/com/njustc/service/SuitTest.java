package com.njustc.service;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
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
        TestRecordServiceTest.class,
        TestReportCheckServiceTest.class,
        TestReportServiceTest.class,
        TestWorkCheckServiceTest.class
})

public class SuitTest {
}
