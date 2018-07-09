import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {SatisfactionContentView} from "../../Archive";
import {getSatisfactionList} from "../../../services/ArchiveService";
//import {setTestRecordFilter} from "../../../modules/ducks/Consign";
import SatisfactionListComponent from "../components/SatisfactionListComponent";
import {getProjectList} from "SERVICES/ProjectService";

const mapStateToProps = (state) => {
    return {
        // dataSource: Object.values(state.Satisfaction.listMap).filter(state.Satisfaction.listFilter),
        dataSource: Object.values(state.Project.listMap).filter(project => project.satisfaction).filter(state.Satisfaction.listFilter),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            const key = "满意度" + id;
            dispatch(addTabAction(key, '满意度调查表详情', SatisfactionContentView,{id:id}));
        },
        //setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getSatisfactionList: () => getSatisfactionList(dispatch),
        getProjectList: () => getProjectList(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SatisfactionListComponent);