import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestReportContentView} from "../../Report";
import {getTestReportList} from "../../../services/ReportService";
//import {setTestRecordFilter} from "../../../modules/ducks/Consign";
import TestReportListComponent from "../components/TestReportListComponent";

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.TestReport.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '测试报告详情', TestReportContentView));
//            dispatch(setConsignContent())
        },
        //setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getTestReportList: () => getTestReportList(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportListComponent);