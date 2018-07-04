import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ProjectContentView} from "../../Project";
import {deleteProject, getProjectList, getProjectState} from "../../../services/ProjectService";
import {setProjectFilter} from "../../../modules/ducks/Project";
import ProjectListComponent from "../components/ProjectListComponent";

const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    // console.log(state.Project.listMap);
    return {
        dataSource: Object.values(state.Project.listMap).filter(state.Project.listFilter),
        //enableNew: authData.functionGroup["Project"]!==undefined&&authData.functionGroup["Project"].findIndex(element => element === "ADD")!==-1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            // debugger;
            const key = '项目' + id;
            dispatch(addTabAction(key, '项目详情', ProjectContentView, {id: id}));
//          dispatch(setProjectContent())
        },
        setListFilter: (listFilter) => dispatch(setProjectFilter(listFilter)),
        getProjectList: () => getProjectList(dispatch),
        deleteProject: (id) => deleteProject(dispatch,id),
        getProjectState: (id,callback) => getProjectState(dispatch,id,/*(state) => {console.log(state);}*/callback),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListComponent);