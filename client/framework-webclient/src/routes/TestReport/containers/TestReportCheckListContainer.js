import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestReportCheckContentView} from "../../TestReport";
import {deleteTestReportCheck, getTestReportCheckList, newTestReportCheck} from "../../../services/TestReportCheckService";
import {setTestReportCheckFilter} from "../../../modules/ducks/TestReportCheck";
import TestReportCheckListComponent from "../components/TestReportCheckListComponent";

const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(state.TestReportCheck.listMap);
    return {
        dataSource: Object.values(state.TestReportCheck.listMap),
        enableNew: authData.functionGroup["TestReportCheck"]!==undefined&&authData.functionGroup["TestReportCheck"].findIndex(element => element === "ADD")!==-1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            // debugger;
            dispatch(addTabAction(id, '报告检查详情', TestReportCheckContentView, {id: id}));
//            dispatch(setTestReportCheckContent())
        },
        setCheckListFilter: (listFilter) => dispatch(setTestReportCheckFilter(listFilter)),
        getTestReportCheckList: () => getTestReportCheckList(dispatch),
        deleteTestReportCheck: (id) => deleteTestReportCheck(dispatch,id),
        newTestReportCheck: () => newTestReportCheck(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportCheckListComponent);