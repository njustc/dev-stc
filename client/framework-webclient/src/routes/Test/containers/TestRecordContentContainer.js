import React, {Component} from 'react';
import TestRecordContentComponent from "../components/TestRecordContentComponent";
import {message} from 'antd';
import {connect} from "react-redux";
import {getTestRecord, putTestRecordState, updateTestRecord} from "../../../services/TestRecordService";
import {STATUS} from "../../../services/common";
/*TODO:表单内容和按钮的可视及禁用情况*/
const mapStateToProps = (state, ownProps) => {
    // debugger;
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const record = state.TestRecord.listMap[ownProps.id].record;
    return {
        // consignData: {},/*fetch data with pro id*/
        testRecordData: state.TestRecord.listMap[ownProps.id],
        values: record ? JSON.parse(record) : {},
        /*TODO*///disable: authData.functionGroup["Consign"]===undefined||authData.functionGroup["Consign"].findIndex(element => element === "EDIT")===-1||state.Consign.listMap[ownProps.id].state!=="TobeSubmit",
        curKey: state.Layout.activeKey, /*TODO: 将当前页面id保存为组件静态变量，通过此id获取页面内容*/
        //buttonDisabled: state.Consign.listMap[ownProps.id].state==="TobeCheck"
        /*buttonDisabled: authData.functionGroup["Consign"]===undefined ||authData.functionGroup["Consign"].findIndex(element => element === "EDIT")===-1
            ? state.Consign.listMap[ownProps.id].state==="TobeSubmit"||state.Consign.listMap[ownProps.id].state==="Finished"
            : state.Consign.listMap[ownProps.id].state==="TobeCheck"||state.Consign.listMap[ownProps.id].state==="Finished"*/
        buttonsDisabled:[

        ]
    }
};

const buttons = (dispatch,isEditVisible,isReviewVisible) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (testRecordData,record) =>{
        const valueData = {
            id: testRecordData.id,
            record: record
        };
        updateTestRecord(dispatch,valueData,(status)=>{console.log(status);});

        if(status=STATUS.SUCCESS) message.success('保存成功');
        else message.error('保存失败');
    },
    enable: isEditVisible
},{
    content: '提交',
    onClick: (testRecordData,record) =>{
        const valueData = {
            id: testRecordData.id,
            record: record
        };
        updateTestRecord(dispatch,valueData,(status)=>{console.log(status);});
        if(status=STATUS.SUCCESS){
            const putData = {
                "object": "record",
                "operation": "submit"
            };
            const {processInstanceID,id} = testRecordData;
            putTestRecordState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);});

            if(status=STATUS.SUCCESS) message.success('提交成功');
            else message.error('提交失败');
        }
        else message.error('提交失败');
    },
    enable: isEditVisible
},{
    content: '通过',
    onClick: (testRecordData,ProcessNo) =>{
        const putData = {
            "object": "record",
            "operation": "reviewpass",
            "number": ProcessNo
        };
        const {processInstanceID,id} = testRecordData;
        putTestRecordState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);});

        if(status=STATUS.SUCCESS) message.success('通过成功');
        else message.error('通过失败');
    },
    enable: isReviewVisible
},{
    content: '否决',
    onClick: (testRecordData,record) =>{
        const putData = {
            "object": "record",
            "operation": "reviewreject"
        };
        const {processInstanceID,id} = testRecordeData;
        putTestRecordState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);});

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
        getValues: (id) => getTestRecord(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestRecordContentComponent);
