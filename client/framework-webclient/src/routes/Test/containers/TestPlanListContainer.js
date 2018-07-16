import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestPlanContentView} from "../../Test";
import {deleteTestPlan,getTestPlanList, newTestPlan} from "../../../services/TestPlanService";
import {setTestPlanFilter} from "../../../modules/ducks/TestPlan";
import TestPlanListComponent from "../components/TestPlanListComponent";
import {ProjectContentView} from "../../Project";
//import {deleteContract, newContract} from "../../../services/ContractService";

/**
 * @module Test/TestPlanListContainer
 */
/**
 * 把store中的测试方案分发给list页面
 * @param state
 * @returns {{dataSource: any[]}}
 */
const mapStateToProps = (state) => {
    return {
        // dataSource: Object.values(state.TestPlan.listMap).filter(state.TestPlan.listFilter),
        dataSource: Object.values(state.Project.listMap).filter(project => project.testPlan).filter(state.TestPlan.listFilter),
    }
};

/**
 * 把设置列表过滤器和测试方案Tab控制的dispatch方法分发给list页面
 * @param dispatch
 * @returns {{showContent: showContent, showProject: showProject, setListFilter: (function(*=): *), getTestPlanList: (function(): void), deleteTestPlan: (function(*=): void), newTestPlan: (function(): void)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (params) => {
            const {key,id} = params;
            dispatch(addTabAction(key, '测试方案详情', TestPlanContentView,{id:id}));
        },
        showProject: (id) => {
            console.log(id);
            dispatch(addTabAction(id, '项目详情', ProjectContentView, {id: id}));
        },
        setListFilter: (listFilter) => dispatch(setTestPlanFilter(listFilter)),
        getTestPlanList: () => getTestPlanList(dispatch),
        deleteTestPlan: (id) => deleteTestPlan(dispatch,id),
        newTestPlan: () => newTestPlan(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestPlanListComponent);