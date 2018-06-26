package com.sinosteel.framework.mybatis;

import com.sinosteel.domain.TestCaseView;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TestCaseMapper {
    @Select(
        "SELECT TestCaseView FROM VIEW_SYS_TESTCASES testcase WHERE testcase.PROCESS_INSTANCE_ID = #{PID}"
    )
    List<TestCaseView> getTestCaseByPID(@Param("PID")String pid);

}
