import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestCaseContentView} from "../../Test";
import {deleteTestCase, getTestCaseList, newTestCase} from "../../../services/TestCaseService";
import {setTestCaseFilter} from "../../../modules/ducks/TestCase";
import TestCaseListComponent from "../components/TestCaseListComponent";
import {ProjectContentView} from "../../Project";
/**
 * @module TestCase/TestCaseListContainer
 */

/**
 * 把store中的测试用例分发给list页面
 * @param state
 * @returns {{dataSource: any[]}}
 */
const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(state.Consign.listMap);
    return {
        dataSource: Object.values(state.Project.listMap).filter((project) => project.testCase).filter(state.TestCase.listFilter),
        //enableNew: authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "ADD")!==-1
    }
};

/**
 * 把设置列表过滤器和测试用例Tab控制的dispatch方法分发给list页面
 * @param dispatch
 * @returns {{showContent: showContent, showProject: showProject, setListFilter: (function(*=): *), getTestCaseList: (function(): void), deleteTestCase: (function(*=): void)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            // debugger;
            const key = "测试用例" + id;
            dispatch(addTabAction(key, '测试用例详情', TestCaseContentView, {id: id}));
//            dispatch(setConsignContent())
        },
        showProject: (id) => {
            // debugger;
            // console.log(id);
            dispatch(addTabAction(id, '项目详情', ProjectContentView, {id: id}));
//            dispatch(setContractContent())
        },
        setListFilter: (listFilter) => dispatch(setTestCaseFilter(listFilter)),
        getTestCaseList: () => getTestCaseList(dispatch),
        deleteTestCase: (id) => deleteTestCase(dispatch,id),
        //newTestCase: () => newTestCase(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseListComponent);