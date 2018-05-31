import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestRecordContentView} from "../../Test";
import {getTestRecordList} from "../../../services/TestService";
//import {setTestRecordFilter} from "../../../modules/ducks/Consign";
import TestRecordListComponent from "../components/TestRecordListComponent";

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.TestRecord.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '测试记录详情', TestRecordContentView));
//            dispatch(setConsignContent())
        },
        //setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getTestRecordList: () => getTestRecordList(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestRecordListComponent);