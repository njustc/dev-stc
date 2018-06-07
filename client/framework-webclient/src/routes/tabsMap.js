import {ProjectListView} from "./Project";
import {ConsignListView} from "./Consign";
import {ContractListView, ContractCheckListView} from "./Contract"
import {TestCaseListView, TestRecordListView, TestProblemListView, TestProgramListView} from "./Test";
import {TestReportListView, TestReportCheckListView} from "./TestReport"
import {TestWorkCheckListView, SatisfactionListView} from "./Archive";

const tabsMap = {
    "1" : ProjectListView,
    "2" : ConsignListView,
    "3" : ContractListView,
    "4" : ContractCheckListView,
    "5" : TestProgramListView,
    "6" : TestCaseListView,
    "7" : TestRecordListView,
    "8" : TestProblemListView,
    "9" : TestReportListView,
    "10" : TestReportCheckListView,
    "11" : TestWorkCheckListView,
    "12" : SatisfactionListView
};

export default tabsMap;
