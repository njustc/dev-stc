import {SystemReducer} from "./ducks/System";
import {LayoutReducer} from "./ducks/Layout";
import {ProjectReducer} from "./ducks/Project";
import {ConsignReducer} from "./ducks/Consign";
import {ContractReducer} from "./ducks/Contract";
import {TestProgramReducer,TestCaseReducer,TestRecordReducer,TestProblemReducer} from "./ducks/Test";
//import {ReportReducer} from "./ducks/Report";
//import {ArchiveReducer} from "./ducks/Archive";

export const moduleReducers = {
    System: SystemReducer,
    Layout: LayoutReducer,
    Project: ProjectReducer,
    Consign: ConsignReducer,
    Contract: ContractReducer,
    TestProgram: TestProgramReducer,
    TestCase: TestCaseReducer,
    TestRecord: TestRecordReducer,
    TestProblem: TestProblemReducer,
    //Report: ReportReducer,
    //Archive: ArchiveReducer,
};