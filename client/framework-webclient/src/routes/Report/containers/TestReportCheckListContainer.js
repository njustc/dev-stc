import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestReportCheckContentView} from "../../Archive";
import {getTestReportCheckList} from "../../../services/ReportService";
//import {setTestRecordFilter} from "../../../modules/ducks/Consign";
import TestReportCheckListComponent from "../components/TestReportCheckListComponent";

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.TestReportCheck.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '测试报告检查表详情', TestReportCheckContentView));
//            dispatch(setConsignContent())
        },
        //setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getTestReportCheckList: () => getTestReportCheckList(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportCheckListComponent);