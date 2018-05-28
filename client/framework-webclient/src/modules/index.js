import {SystemReducer} from "./ducks/System";
import {LayoutReducer} from "./ducks/Layout";
import {ProjectReducer} from "./ducks/Project";
import {ConsignReducer} from "./ducks/Consign";
import {ContractReducer} from "./ducks/Contract";
//import {TestReducer} from "./ducks/Test";
//import {ReportReducer} from "./ducks/Report";
//import {ArchiveReducer} from "./ducks/Archive";

export const moduleReducers = {
    System: SystemReducer,
    Layout: LayoutReducer,
    Project: ProjectReducer,
    Consign: ConsignReducer,
    Contract: ContractReducer,
    //Test: TestReducer,
    //Report: ReportReducer,
    //Archive: ArchiveReducer,
};