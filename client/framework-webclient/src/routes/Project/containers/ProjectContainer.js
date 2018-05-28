import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ConsignContentView} from "../../Consign";
import ProjectComponent from "../components/ProjectComponent";
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
            dispatch(addTabAction(id, '委托详情', ConsignContentView));
//            dispatch(setConsignContent())
        },
        setListFilter: (listFilter) => dispatch(setProjectFilter(listFilter)),
        getProjectList: () => getProjectList(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);