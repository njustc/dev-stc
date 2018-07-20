import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ProjectContentView} from "../../Project";
import {deleteProject, getProjectList, getProjectState} from "../../../services/ProjectService";
import {setProjectFilter} from "../../../modules/ducks/Project";
import ProjectListComponent from "../components/ProjectListComponent";
/**
 * @module Project/ProjectListContainer
 */
/**
 * 把store中的项目列表分发给list页面
 * @param state
 * @returns {{dataSource: any[]}}
 */
const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.Project.listMap).filter(state.Project.listFilter),
    }
};
/**
 * 把设置列表过滤器和项目Tab控制的dispatch方法分发给list页面
 * @param dispatch
 * @returns {{showContent: showContent, setListFilter: (function(*=): *), getProjectList: (function(): void), deleteProject: (function(*=): void), getProjectState: (function(*=, *=): void)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            const key = '项目' + id;
            dispatch(addTabAction(key, '项目详情', ProjectContentView, {id: id}));
        },
        setListFilter: (listFilter) => dispatch(setProjectFilter(listFilter)),
        getProjectList: () => getProjectList(dispatch),
        deleteProject: (id) => deleteProject(dispatch,id),
        getProjectState: (id,callback) => getProjectState(dispatch,id,/*(state) => {console.log(state);}*/callback),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListComponent);