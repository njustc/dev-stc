import {SystemReducer} from "./ducks/System";
import {LayoutReducer} from "./ducks/Layout";
import {ProjectReducer} from "./ducks/Project";
import {ConsignReducer} from "./ducks/Consign";
import {ContractReducer/*,ContractCheckReducer*/} from "./ducks/Contract";
import {TestProgramReducer,TestCaseReducer,TestRecordReducer,TestProblemReducer} from "./ducks/Test";
import {TestReportReducer/*,TestReportCheckReducer*/} from "./ducks/TestReport";
import {TestWorkCheckReducer,SatisfactionReducer} from "./ducks/Archive";

export const moduleReducers = {
    System: SystemReducer,
    Layout: LayoutReducer,
    Project: ProjectReducer,
    Consign: ConsignReducer,
    Contract: ContractReducer,
    //ContractCheck: ContractCheckReducer,
    TestProgram: TestProgramReducer,
    TestCase: TestCaseReducer,
    TestRecord: TestRecordReducer,
    TestProblem: TestProblemReducer,
    TestReport: TestReportReducer,
    //TestReportCheck: TestReportCheckReducer,
    TestWorkCheck: TestWorkCheckReducer,
    Satisfaction: SatisfactionReducer,
};