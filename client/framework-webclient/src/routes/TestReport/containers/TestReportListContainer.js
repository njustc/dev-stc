import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {deleteTestReport, getTestReportList, newTestReport} from "../../../services/TestReportService";
import {setTestReportFilter} from "../../../modules/ducks/TestReport";
import TestReportListComponent from "../components/TestReportListComponent";
import {TestReportContentView} from "../index";
import {ProjectContentView} from "../../Project";

const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(state.TestReport.listMap);
    return {
        dataSource: Object.values(state.Project.listMap).filter((project) => project.testReport).filter(state.TestReport.listFilter),
        enableNew: authData.functionGroup["TestReport"]!==undefined&&authData.functionGroup["TestReport"].findIndex(element => element === "ADD")!==-1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '测试报告详情', TestReportContentView, {id: id}));
//            dispatch(setTestReportContent())
        },
        showProject: (id) => {
            // debugger;
            // console.log(id);
            dispatch(addTabAction(id, '项目详情', ProjectContentView, {id: id}));
//            dispatch(setContractContent())
        },
        setListFilter: (listFilter) => dispatch(setTestReportFilter(listFilter)),
        getTestReportList: () => getTestReportList(dispatch),
        deleteTestReport: (id) => deleteTestReport(dispatch,id),
        newTestReport: () => newTestReport(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportListComponent);