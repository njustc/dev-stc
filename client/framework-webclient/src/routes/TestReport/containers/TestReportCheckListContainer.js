import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestReportCheckContentView} from "../index";
import {deleteTestReportCheck, getTestReportCheckList, newTestReportCheck} from "../../../services/TestReportCheckService";
import {setTestReportCheckFilter} from "../../../modules/ducks/TestReportCheck";
import TestReportCheckListComponent from "../components/TestReportCheckListComponent";
import {ProjectContentView} from "../../Project";

const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(state.TestReportCheck.listMap);
    return {
        dataSource: Object.values(state.Project.listMap).filter((project) => project.testReportCheck).filter(state.TestReportCheck.listFilter),
        enableNew: authData.functionGroup["TestReportCheck"]!==undefined&&authData.functionGroup["TestReportCheck"].findIndex(element => element === "ADD")!==-1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            // debugger;
            const key = "报告检查" + id;
            dispatch(addTabAction(key, '报告检查详情', TestReportCheckContentView, {id: id}));
//            dispatch(setTestReportCheckContent())
        },
        showProject: (id) => {
            // debugger;
            console.log(id);
            dispatch(addTabAction(id, '项目详情', ProjectContentView, {id: id}));
//            dispatch(setContractContent())
        },
        setListFilter: (listFilter) => dispatch(setTestReportCheckFilter(listFilter)),
        getTestReportCheckList: () => getTestReportCheckList(dispatch),
        deleteTestReportCheck: (id) => deleteTestReportCheck(dispatch,id),
        newTestReportCheck: () => newTestReportCheck(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportCheckListComponent);