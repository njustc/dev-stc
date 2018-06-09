import {ProjectListView} from "./Project";
import {ConsignListView} from "./Consign";
import {ContractListView/*, ContractCheckListView*/} from "./Contract"
import {TestCaseListView, TestRecordListView, TestProblemListView, TestPlanListView} from "./Test";
import {TestReportListView, TestReportCheckListView} from "./TestReport"
import {TestWorkCheckListView, SatisfactionListView} from "./Archive";

const tabsMap = {
    "1" : ProjectListView,
    "2" : ConsignListView,
    "3" : ContractListView,
    "4" : TestPlanListView,
    "5" : TestCaseListView,
    "6" : TestRecordListView,
    "7" : TestProblemListView,
    "8" : TestReportListView,
    "9" : TestReportCheckListView,
    "10" : TestWorkCheckListView,
    "11" : SatisfactionListView
};

export default tabsMap;
