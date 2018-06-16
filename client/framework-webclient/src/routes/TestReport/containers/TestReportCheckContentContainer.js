import React, {Component} from 'react';
import TestReportCheckContentComponent from "../components/TestReportCheckContentComponent";
import {connect} from "react-redux";
import {getTestReportCheck} from "../../../services/TestReportCheckService";

const mapStateToProps = (state) => {
    return {
        values: {},/*fetch consign with pro id*/
        testReportCheckData: {},/*fetch data with pro id*/
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
        getValues: (id) => getTestReportCheck(dispatch,id),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportCheckContentComponent);
