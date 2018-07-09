import React, {Component} from 'react';
import TestCaseContentComponent from "../components/TestCaseContentComponent";
import {message} from 'antd';
import {connect} from "react-redux";
import {getTestCase, putTestCaseState, updateTestCase, addTestCase} from "../../../services/TestCaseService";
import {STATUS} from "../../../services/common";
import {newTestReport} from "../../../services/TestReportService";
import {newContract} from "../../../services/ContractService";
import {newTestPlan} from "../../../services/TestPlanService";
import {getProjectList} from "SERVICES/ProjectService";
/*TODO:表单内容和按钮的可视及禁用情况*/
const mapStateToProps = (state, ownProps) => {
    // debugger;
    // const content = state.TestCase.listMap[ownProps.id];
    // const authData = JSON.parse(sessionStorage.getItem('authData'));
    // const body = content?state.TestCase.listMap[ownProps.id].body:undefined;
    // const ToBeSubmit = content?state.TestCase.listMap[ownProps.id].state!=="TobeSubmit":false;
    // const isEditVisible = authData.functionGroup["TestCase"]!==undefined&&authData.functionGroup["TestCase"].findIndex(element => element === "EDIT")!==-1;
    // const isSubmitVisible = content&&content.operation&&content.operation.findIndex(element => element === 'Submit')!==-1;
    // const isReviewVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ReviewPass')!==-1;
    return {
        dataSource: undefined,
        // projectData: content?state.TestCase.listMap[ownProps.id]:ownProps,
        projectData: state.Project.listMap[ownProps.id],
        values: state.Project.listMap[ownProps.id].testCase,
        // disable:ToBeSubmit||(!isEditVisible),
        // buttonsEnable: buttonsEnable(isEditVisible,isSubmitVisible,isReviewVisible),
    }
};

const buttonsEnable = (isEditVisible,isSubmitVisible,isReviewVisible) => [{
    content: '保存',
    enable: isEditVisible&&isSubmitVisible,
},{
    content: '提交',
    enable: isSubmitVisible,
},{
    content: '通过',
    enable: isReviewVisible,
},{
    content: '否决',
    enable: isReviewVisible,
}];

const buttons = (dispatch) => [{
    content: '保存',
    onClick: (testCaseData,testCaseBody) =>{
        const valueData = {
            id: testCaseData.id,
            body: testCaseBody
        };
        updateTestCase(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    },
},{
    content: '提交',
    onClick: (testCaseData,testCaseBody) =>{
        const valueData = {
            id: testCaseData.id,
            body: testCaseBody
        };
        updateTestCase(dispatch,valueData,(status)=> {
            if (status === STATUS.SUCCESS) {
                const putData = {
                    "object": "testCase",
                    "operation": "Submit"
                };
                const {id, processInstanceID} = testCaseData;
                putTestCaseState(dispatch, processInstanceID, putData, id, (status) => {
                    console.log(status);
                    if (status === STATUS.SUCCESS) message.success('提交成功');
                    else message.error('提交失败');
                });
            }
            else message.error('提交失败');
        });
    },
    // enable: isEditVisible
},{
    content: '通过',
    onClick: (testCaseData,processNo) =>{
        const putData = {
            "object": "testCase",
            "operation": "ReviewPass",
        };
        const {id,processInstanceID} = testCaseData;
        putTestCaseState(dispatch,processInstanceID,putData,id,(status)=>{
            //console.log(status);
            if(status===STATUS.SUCCESS) message.success('通过成功');
            else message.error('通过失败');
        });
    },
    // enable: isReviewVisible
},{
    content: '否决',
    onClick: (testCaseData,testCaseBody) =>{
        const putData = {
            "object": "testCase",
            "operation": "ReviewReject"
        };
        const {id,processInstanceID} = testCaseData;
        putTestCaseState(dispatch,processInstanceID,putData,id,(status)=>{
            if(status=STATUS.SUCCESS) message.success('已否决');
            else message.error('否决失败');
        });
    },
    // enable: isReviewVisible
}];

const mapDispatchToProps = (dispatch) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id, processInstanceID) => {
            getTestCase(dispatch, id);
        },
        getProjectList: () => getProjectList(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseContentComponent);
