import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {SatisfactionContentView} from "../../Archive";
import {getSatisfactionList} from "../../../services/ArchiveService";
//import {setTestRecordFilter} from "../../../modules/ducks/Consign";
import SatisfactionListComponent from "../components/SatisfactionListComponent";

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.Satisfaction.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '满意度调查表详情', SatisfactionContentView));
//            dispatch(setConsignContent())
        },
        //setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getSatisfactionList: () => getSatisfactionList(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SatisfactionListComponent);