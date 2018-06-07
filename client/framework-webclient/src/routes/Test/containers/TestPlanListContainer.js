import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {TestPlanContentView} from "../../Test";
import {getTestPlanList, newTestPlan} from "../../../services/TestService";
//import {setTestRecordFilter} from "../../../modules/ducks/Consign";
import TestPlanListComponent from "../components/TestPlanListComponent";
import {deleteContract, newContract} from "../../../services/ContractService";

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.TestPlan.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '测试方案详情', TestPlanContentView));
//            dispatch(setConsignContent())
        },
        //setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getTestPlanList: () => getTestPlanList(dispatch),
        newTestPlan: () => newTestPlan(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestPlanListComponent);