import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {deleteTestReport, getTestReportList, newTestReport} from "../../../services/TestReportService";
import {setTestReportFilter} from "../../../modules/ducks/TestReport";
import TestReportListComponent from "../components/TestReportListComponent";
import {TestReportContentView} from "../index";
import {ProjectContentView} from "../../Project";

/**
 * @module TestReport/TestReportListContainer
 */
/**
 * 把store中的测试报告分发给list页面
 * @param state
 * @returns {{dataSource: any[], enableNew: boolean}}
 */
const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(state.TestReport.listMap);
    return {
        dataSource: Object.values(state.Project.listMap).filter((project) => project.testReport).filter(state.TestReport.listFilter),
        enableNew: authData.functionGroup["TestReport"]!==undefined&&authData.functionGroup["TestReport"].findIndex(element => element === "ADD")!==-1
    }
};

/**
 * 把设置列表过滤器和测试报告Tab控制的dispatch方法分发给list页面
 * @param dispatch
 * @returns {{showContent: showContent, showProject: showProject, setListFilter: (function(*=): *), getTestReportList: (function(): void), deleteTestReport: (function(*=): void), newTestReport: (function(): void)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (param) => {
            const {key,id} = param;
            dispatch(addTabAction(key, '测试报告详情', TestReportContentView, {id: id}));
        },
        showProject: (id) => {
            dispatch(addTabAction(id, '项目详情', ProjectContentView, {id: id}));
        },
        setListFilter: (listFilter) => dispatch(setTestReportFilter(listFilter)),
        getTestReportList: () => getTestReportList(dispatch),
        deleteTestReport: (id) => deleteTestReport(dispatch,id),
        newTestReport: () => newTestReport(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportListComponent);