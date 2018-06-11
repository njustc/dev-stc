import React, {Component} from 'react';
import TestCaseContentComponent from "../components/TestCaseContentComponent";
import {message} from 'antd';
import {connect} from "react-redux";
import {getTestCase, putTestCaseState, updateTestCase} from "../../../services/TestCaseService";
import {STATUS} from "../../../services/common";
/*TODO:表单内容和按钮的可视及禁用情况*/
const mapStateToProps = (state, ownProps) => {
    // debugger;
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const testcase = state.TestCase.listMap[ownProps.id].testcase;
    return {
        // consignData: {},/*fetch data with pro id*/
        testCaseData: state.TestCase.listMap[ownProps.id],
        values: testcase ? JSON.parse(testcase) : {},
        /*TODO*///disable: authData.functionGroup["Consign"]===undefined||authData.functionGroup["Consign"].findIndex(element => element === "EDIT")===-1||state.Consign.listMap[ownProps.id].state!=="TobeSubmit",
        curKey: state.Layout.activeKey, /*TODO: 将当前页面id保存为组件静态变量，通过此id获取页面内容*/
        //buttonDisabled: state.Consign.listMap[ownProps.id].state==="TobeCheck"
        /*buttonDisabled: authData.functionGroup["Consign"]===undefined ||authData.functionGroup["Consign"].findIndex(element => element === "EDIT")===-1
            ? state.Consign.listMap[ownProps.id].state==="TobeSubmit"||state.Consign.listMap[ownProps.id].state==="Finished"
            : state.Consign.listMap[ownProps.id].state==="TobeCheck"||state.Consign.listMap[ownProps.id].state==="Finished"*/
    }
};

const buttons = (dispatch,isEditVisible,isReviewVisible) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (testCaseData,testcase) =>{
        const valueData = {
            id: testCaseData.id,
            testcase: testcase
        };
        updateTestCase(dispatch,valueData,(status)=>{
            console.log(status);

        if(status===STATUS.SUCCESS) message.success('保存成功');
        else message.error('保存失败');
        });
    },
    enable: isEditVisible
},{
    content: '提交',
    onClick: (testCaseData,testcase) =>{
        const valueData = {
            id: testCaseData.id,
            testcase: testcase
        };
        updateTestCase(dispatch,valueData,(status)=>{
            console.log(status);
        if(status===STATUS.SUCCESS){
            const putData = {
                "object": "testcase",
                "operation": "Submit"
            };
            const {processInstanceID,id} = testCaseData;
            putTestCaseState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);});

            if(status=STATUS.SUCCESS) message.success('提交成功');
            else message.error('提交失败');
        }
        else message.error('提交失败');
        });
    },
    enable: isEditVisible
},{
    content: '通过',
    onClick: (testCaseData,ProcessNo) =>{
        const putData = {
            "object": "testcase",
            "operation": "ReviewPass",
            "number": ProcessNo
        };
        const {processInstanceID,id} = testCaseData;
        putTestCaseState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);});

        if(status=STATUS.SUCCESS) message.success('通过成功');
        else message.error('通过失败');
    },
    enable: isReviewVisible
},{
    content: '否决',
    onClick: (testCaseData,testcase) =>{
        const putData = {
            "object": "testcase",
            "operation": "ReviewReject"
        };
        const {processInstanceID,id} = testCaseData;
        putTestCaseState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);});

        if(status=STATUS.SUCCESS) message.success('已否决');
        else message.error('否决失败');
    },
    enable: isReviewVisible
}];

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //const isVisible = authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    const isEditVisible = true||authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    const isReviewVisible = true||authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "REVIEW")!==-1;
    return {
        buttons: buttons(dispatch,isEditVisible,isReviewVisible).filter(button => button.enable===true),
        getValues: (id) => getTestCase(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseContentComponent);
