import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {SatisfactionContentView} from "../../Archive";
import {getSatisfactionList} from "../../../services/ArchiveService";
import SatisfactionListComponent from "../components/SatisfactionListComponent";
import {getProjectList} from "SERVICES/ProjectService";
import {ProjectContentView} from "../../Project";
import {setSatisfactionFilter} from "../../../modules/ducks/Satisfaction";
/**
 * @module Satisfaction/SatisfactionListContainer
 */
/**
 * 把store中的满意度调查表分发给list页面
 * @param state
 * @returns {{dataSource: any[]}}
 */
const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.Project.listMap).filter(project => project.satisfaction).filter(state.Satisfaction.listFilter),
    }
};
/**
 * 把设置列表过滤器和满意度调查表Tab控制的dispatch方法分发给list页面
 * @param dispatch
 * @returns {{showContent: showContent, showProject: showProject, setListFilter: (function(*=): *), getSatisfactionList: (function()), getProjectList: (function(): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (param) => {
            const {key,id} = param;
            dispatch(addTabAction(key, '满意度调查表详情', SatisfactionContentView,{id:id}));
        },
        showProject: (id) => {
            console.log(id);
            dispatch(addTabAction(id, '项目详情', ProjectContentView, {id: id}));
        },
        setListFilter: (listFilter) => dispatch(setSatisfactionFilter(listFilter)),
        getSatisfactionList: () => getSatisfactionList(dispatch),
        getProjectList: () => getProjectList(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SatisfactionListComponent);