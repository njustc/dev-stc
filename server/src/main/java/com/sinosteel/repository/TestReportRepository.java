package com.sinosteel.repository;

import com.fasterxml.jackson.databind.ser.Serializers;
import com.sinosteel.domain.TestReport;
import org.springframework.stereotype.Repository;

@Repository
public interface TestReportRepository extends BaseRepository<TestReport> {

}
