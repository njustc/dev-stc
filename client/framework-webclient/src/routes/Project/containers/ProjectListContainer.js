import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ConsignContentView} from "../../Consign";
import ProjectListComponent from "../components/ProjectListComponent";
import {getProjectList} from "../../../services/ProjectService";
import {setProjectFilter} from "../../../modules/ducks/Project";
import {setConsignContent} from "../../../modules/ducks/Consign";

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.Project.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '流程详情', ProjectContentView));
//            dispatch(setConsignContent())
        },
        setListFilter: (listFilter) => dispatch(setProjectFilter(listFilter)),
        getProjectList: () => getProjectList(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListComponent);