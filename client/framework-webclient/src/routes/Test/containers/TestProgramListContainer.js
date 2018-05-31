import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestProgramContentView} from "../../Test";
import {getTestProgramList} from "../../../services/TestService";
//import {setTestRecordFilter} from "../../../modules/ducks/Consign";
import TestProgramListComponent from "../components/TestProgramListComponent";

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.TestProgram.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '测试方案详情', TestProgramContentView));
//            dispatch(setConsignContent())
        },
        //setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getTestProgramList: () => getTestProgramList(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestProgramListComponent);