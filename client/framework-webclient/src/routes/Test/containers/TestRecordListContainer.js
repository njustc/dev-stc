import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestRecordContentView} from "../../Test";
import {deleteTestRecord, getTestRecordList, newTestRecord} from "../../../services/TestRecordService";
import {setTestRecordFilter} from "../../../modules/ducks/TestRecord";
import TestRecordListComponent from "../components/TestRecordListComponent";

const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(state.Consign.listMap);
    return {
        dataSource: Object.values(state.TestRecord.listMap),
        //enableNew: authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "ADD")!==-1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            // debugger;
            dispatch(addTabAction(id, '测试记录详情', TestRecordContentView, {id: id}));
//            dispatch(setConsignContent())
        },
        setListFilter: (listFilter) => dispatch(setTestRecordFilter(listFilter)),
        getTestRecordList: () => getTestRecordList(dispatch),
        deleteTestRecord: (id) => deleteTestRecord(dispatch,id),
        //newTestRecord: () => newTestRecord(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestRecordListComponent);