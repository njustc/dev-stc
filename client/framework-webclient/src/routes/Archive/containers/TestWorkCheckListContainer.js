import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestWorkCheckContentView} from "../../Archive";
import {getTestWorkCheckList} from "../../../services/ArchiveService";
//import {setTestRecordFilter} from "../../../modules/ducks/Consign";
import TestWorkCheckListComponent from "../components/TestWorkCheckListComponent";

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.TestWorkCheck.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '测试工作报告表详情', TestWorkCheckContentView,{id:id}));
//            dispatch(setConsignContent())
        },
        //setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getTestWorkCheckList: () => getTestWorkCheckList(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestWorkCheckListComponent);