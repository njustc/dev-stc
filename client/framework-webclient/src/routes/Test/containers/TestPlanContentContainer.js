import React, {Component} from 'react';
import TestPlanContentComponent from "../components/TestPlanContentComponent";
import {connect} from "react-redux";
import {getTestPlan} from "../../../services/TestPlanService";

const mapStateToProps = (state,ownProps) => {
    return {
        testPlanData: state.TestPlan.listMap[ownProps.id],
        values: {},/*fetch consign with pro id*/
        contractData: {},/*fetch data with pro id*/
        disable: true,
        // buttons: buttons,
    }
};

const buttons = (dispatch) => [{
    content: '保存',
    onClick: () =>{

    }
},{
    content: '提交',
    onClick: () =>{

    }
},{
    content: '通过',
    onClick: () =>{

    }
},{
    content: '否决',
    onClick: () =>{

    }
}];

const mapDispatchToProps = (dispatch) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id) => getTestPlan(dispatch,id),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestPlanContentComponent);
