import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestWorkCheckContentView} from "../index";
import {deleteTestWorkCheck, getTestWorkCheckList, newTestWorkCheck} from "../../../services/TestWorkCheckService";
import {setTestWorkCheckFilter} from "../../../modules/ducks/TestWorkCheck";
import TestWorkCheckListComponent from "../components/TestWorkCheckListComponent";
import {ProjectContentView} from "../../Project";

const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(state.TestWorkCheck.listMap);
    return {
        dataSource: Object.values(state.Project.listMap).filter((project) => project.testWorkCheck).filter(state.TestWorkCheck.listFilter),
        enableNew: authData.functionGroup["TestWorkCheck"]!==undefined&&authData.functionGroup["TestWorkCheck"].findIndex(element => element === "ADD")!==-1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            // debugger;
            const key = "报告检查" + id;
            dispatch(addTabAction(key, '报告检查详情', TestWorkCheckContentView, {id: id}));
//            dispatch(setTestWorkCheckContent())
        },
        showProject: (id) => {
            // debugger;
            console.log(id);
            dispatch(addTabAction(id, '项目详情', ProjectContentView, {id: id}));
//            dispatch(setContractContent())
        },
        setListFilter: (listFilter) => dispatch(setTestWorkCheckFilter(listFilter)),
        getTestWorkCheckList: () => getTestWorkCheckList(dispatch),
        deleteTestWorkCheck: (id) => deleteTestWorkCheck(dispatch,id),
        newTestWorkCheck: () => newTestWorkCheck(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestWorkCheckListComponent);