import {ProjectView} from "./Project";
import {ConsignListView} from "./Consign";
import {TestCaseListView, TestRecordListView, TestProblemListView} from "./Test";

const tabsMap = {
    "1" : ProjectView,
    "2" : ConsignListView,
    //"3" : ContractListView,
    "6" : TestCaseListView,
    "7" : TestRecordListView,
    "8" : TestProblemListView

};

export default tabsMap;
