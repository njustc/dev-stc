import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestCaseContentView} from "../../Test";
import {getTestCaseList} from "../../../services/TestService";
//import {setTestRecordFilter} from "../../../modules/ducks/Consign";
import TestCaseListComponent from "../components/TestCaseListComponent";

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.TestCase.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '测试用例详情', TestCaseContentView));
//            dispatch(setConsignContent())
        },
        //setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getTestCaseList: () => getTestCaseList(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseListComponent);