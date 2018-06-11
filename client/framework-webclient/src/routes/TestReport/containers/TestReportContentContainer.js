import React, {Component} from 'react';
import TestReportContentComponent from "../components/TestReportContentComponent";
import {message} from 'antd';
import {connect} from "react-redux";
import {getTestReport, putTestReportState, updateTestReport} from "../../../services/TestReportService";
import {STATUS} from "../../../services/common";
/*TODO:表单内容和按钮的可视及禁用情况*/
const mapStateToProps = (state, ownProps) => {
    // debugger;
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(authData);
    const testReport = state.TestReport.listMap[ownProps.id].testReport;
    return {
        // testReportData: {},/*fetch data with pro id*/
        testReportData: state.TestReport.listMap[ownProps.id],
        values: testReport ? JSON.parse(testReport) : {},
        disable: authData.functionGroup["TestReport"]===undefined||authData.functionGroup["TestReport"].findIndex(element => element === "EDIT")===-1||state.testReport.listMap[ownProps.id].state!=="TobeSubmit",
    }
};

const buttons = (dispatch,isEditVisible,isReviewVisible) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (testReportData,testReport) =>{
        const valueData = {
            id: testReportData.id,
            testReport: testReport
        };
        updateTestReport(dispatch,valueData,(status)=>{console.log(status);});

        if(status=STATUS.SUCCESS) message.success('保存成功');
        else message.error('保存失败');
    },
    enable: isEditVisible
},{
    content: '提交',
    onClick: (testReportData,testReport) =>{
        const valueData = {
            id: testReportData.id,
            testReport: testReport
        };
        updateTestReport(dispatch,valueData,(status)=>{console.log(status);});
        if(status=STATUS.SUCCESS){
            const putData = {
                "object": "testReport",
                "operation": "Submit"
            };
            const {processInstanceID,id} = testReportData;
            putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);});

            if(status=STATUS.SUCCESS) message.success('提交成功');
            else message.error('提交失败');
        }
        else message.error('提交失败');
    },
    enable: isEditVisible
},{
    content: '通过',
    onClick: (testReportData,testReport) =>{
        const putData = {
            "object": "testReport",
            "operation": "ReviewPass"
        };
        const {processInstanceID,id} = testReportData;
        putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);});

        if(status=STATUS.SUCCESS) message.success('通过成功');
        else message.error('通过失败');
    },
    enable: isReviewVisible
},{
    content: '否决',
    onClick: (testReportData,testReport) =>{
        const putData = {
            "object": "testReport",
            "operation": "ReviewReject"
        };
        const {processInstanceID,id} = testReportData;
        putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);});

        if(status=STATUS.SUCCESS) message.success('已否决');
        else message.error('否决失败');
    },
    enable: isReviewVisible
}];

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //const isVisible = authData.functionGroup["testReport"]!==undefined&&authData.functionGroup["testReport"].findIndex(element => element === "EDIT")!==-1;
    const isEditVisible = true||authData.functionGroup["TestReport"]!==undefined&&authData.functionGroup["TestReport"].findIndex(element => element === "EDIT")===1;
    const isReviewVisible = authData.functionGroup["TestReport"]!==undefined&&authData.functionGroup["TestReport"].findIndex(element => element === "REVIEW")===1;
    return {
        buttons: buttons(dispatch,isEditVisible,isReviewVisible).filter(button => button.enable===true),
        getValues: (id) => getTestReport(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportContentComponent);
