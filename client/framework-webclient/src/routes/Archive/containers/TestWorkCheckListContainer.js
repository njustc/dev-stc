import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestWorkCheckContentView} from "../index";
import {deleteTestWorkCheck, getTestWorkCheckList, newTestWorkCheck} from "../../../services/TestWorkCheckService";
import {setTestWorkCheckFilter} from "../../../modules/ducks/TestWorkCheck";
import TestWorkCheckListComponent from "../components/TestWorkCheckListComponent";
import {ProjectContentView} from "../../Project";
/**
 * @module TestWorkCheck/TestWorkCheckListContainer
 */
/**
 * 把store中的测试工作检查表分发给list页面
 * @param state
 * @returns {{dataSource: any[], enableNew: boolean}}
 */
const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(state.TestWorkCheck.listMap);
    return {
        dataSource: Object.values(state.Project.listMap).filter((project) => project.testWorkCheck).filter(state.TestWorkCheck.listFilter),
        enableNew: authData.functionGroup["TestWorkCheck"]!==undefined&&authData.functionGroup["TestWorkCheck"].findIndex(element => element === "ADD")!==-1
    }
};
/**
 * 把设置列表过滤器和测试工作检查表Tab控制的dispatch方法分发给list页面
 * @param dispatch
 * @returns {{showContent: showContent, showProject: showProject, setListFilter: (function(*=): *), getTestWorkCheckList: (function(): void), deleteTestWorkCheck: (function(*=): void), newTestWorkCheck: (function(): void)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (param) => {
            const {key,id} = param;
            dispatch(addTabAction(key, '工作检查详情', TestWorkCheckContentView, {id: id}));
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