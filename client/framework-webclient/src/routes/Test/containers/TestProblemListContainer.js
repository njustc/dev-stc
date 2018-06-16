import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestProblemContentView} from "../../Test";
import {getTestProblemList} from "../../../services/TestService";
//import {setTestProblemFilter} from "../../../modules/ducks/Consign";
import TestProblemListComponent from "../components/TestProblemListComponent";

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.TestProblem.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            const key = "测试问题" + id;
            dispatch(addTabAction(key, '测试问题清单详情', TestProblemContentView,{id:id}));
//            dispatch(setConsignContent())
        },
        //setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getTestProblemList: () => getTestProblemList(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestProblemListComponent);