import React, {Component} from 'react';
import TestReportContentComponent from "../components/TestReportContentComponent";
import {connect} from "react-redux";
import {getTestReport, putTestReportState, updateTestReport} from "../../../services/TestReportService";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";

/**
 * @module TestReport/TestReportContentContainer
 */

/**
 * 把store里面的测试报告数据映射到测试报告组件，根据store数据计算页面编辑权限，计算并传入buttonsEnable数组
 * @param state {object} store中数据
 * @param ownProps {object} 创建组件时传入的数据
 * @returns {{testReportData: *, projectData: *, values: {}, disable: boolean, buttonsEnable: *}}
 */
const mapStateToProps = (state, ownProps) => {
    // debugger;
    const sysUser = JSON.parse(sessionStorage.getItem('sysUser'));
    const content = state.Project.listMap[ownProps.id].testReport;
    const body = content?content.body:undefined;
    const testPlanState = content?content.state:"error";
    const isCustomer = (sysUser.username==="customer1"||sysUser.username==="customer2")
    const isMarketing = (sysUser.username==="marketing");
    const isTesting = (sysUser.username==="testing");
    const isQuality = (sysUser.username==="quality");
    const isSubmitVisible = content&&content.operation&&content.operation.findIndex(element => element === 'Write')!==-1;
    const isReviewVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ReviewPass')!==-1;
    const isApproveVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ApprovePass')!==-1;
    const isConfirmVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ConfirmPass')!==-1;
    const isSendVisible = content&&content.operation&&content.operation.findIndex(element => element === 'Send')!==-1;

    return {
        testReportData: content?content:ownProps,
        projectData: state.Project.listMap[ownProps.id],
        values:  body ? JSON.parse(body) : {},
        disable: testPlanState!=='TobeWrite',
        buttonsEnable: buttonsEnable(isCustomer,isMarketing,isTesting,isQuality,isSubmitVisible,isReviewVisible,isApproveVisible,isSendVisible,isConfirmVisible),
    }
};

/**
 * 按钮显示控制，根据当前用户和状态判断按钮是否可用
 * @param isCustomer {boolean} 是否为客户
 * @param isMarketing {boolean} 是否为市场部成员
 * @param isTesting {boolean} 是否为测试部成员
 * @param isQuality {boolean} 是否为质量部成员
 * @param isSubmitVisible {boolean} 是否可以提交
 * @param isReviewVisible {boolean} 是否可以评审
 * @param isApproveVisible {boolean} 是否可以通过
 * @param isSendVisible {boolean} 是否可以发放
 * @param isConfirmVisible {boolean} 是否可以确认
 * @returns {Array}
 */
const buttonsEnable = (isCustomer,isMarketing,isTesting,isQuality,isSubmitVisible,isReviewVisible,isApproveVisible,isSendVisible,isConfirmVisible) => [{
    content: '保存',
    enable: isTesting&&isSubmitVisible,
},{
    content: '提交',
    enable: isTesting&&isSubmitVisible,
},{
    content: '通过',
    enable: isTesting&&isReviewVisible,
},{
    content: '否决',
    enable: isTesting&&isReviewVisible,
},{
    content: '批准',
    enable: isQuality&&isApproveVisible,
},{
    content: '不批准',
    enable: isQuality&&isApproveVisible,
},{
    content: '发放',
    enable: isMarketing&&isSendVisible,
},{
    content: '确认',
    enable: isCustomer&&isConfirmVisible,
},{
    content: "拒绝",
    enable: isCustomer&&isConfirmVisible,
}
];

/**
 * 测试报告相关的数据操作和对应的按钮
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {Array}
 */
const buttons = (dispatch) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (testReportData,testReport) =>{
        console.log(testReport);
        const valueData = {
            id: testReportData.id,
            body: testReport
        };
        updateTestReport(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    }
},{
    content: '提交',
    onClick: (testReportData,testReport) =>{
        console.log(testReportData);
        console.log(testReport);
        const valueData = {
            id: testReportData.id,
            body: testReport
        };
        updateTestReport(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS){
                const putData = {
                    "object": "testReport",
                    "operation": "Submit"
                };
                const {processInstanceID,id} = testReportData;
                console.log(putData);
                putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{
                    console.log(status);
                    if(status===STATUS.SUCCESS) message.success('提交成功');
                    else message.error('提交失败');
                });
            }
            else message.error('更新失败');
        });
    }
},{
    content: '评审',
    onClick: (testReportData,testReport) =>{
        const putData = {
            "object": "testReport",
            "operation": "ReviewPass"
        };
        const {processInstanceID,id} = testReportData;
        putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            console.log(status===STATUS.SUCCESS);
            if(status===STATUS.SUCCESS) message.success('批准成功');
            else message.error('批准失败');
        });
    }
},{
    content: '否决',
    onClick: (testReportData,testReport) =>{
        const putData = {
            "object": "testReport",
            "operation": "ReviewReject"
        };
        const {processInstanceID,id} = testReportData;
        putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            if(status===STATUS.SUCCESS) message.success('已否决');
            else message.error('否决失败');
        });
    }
},{
    content: '发放',
    onClick: (testReportData,testReport) =>{
        const putData = {
            "object": "testReport",
            "operation": "Send"
        };
        const {processInstanceID,id} = testReportData;
        putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            if(status===STATUS.SUCCESS) message.success('已发放');
            else message.error('发放失败');
        });
    }
},{
    content: '确认',
    onClick: (testReportData,testReport) =>{
        const putData = {
            "object": "testReport",
            "operation": "ConfirmPass"
        };
        const {processInstanceID,id} = testReportData;
        putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            if(status===STATUS.SUCCESS) message.success('确认成功');
            else message.error('确认失败');
        });
    }
},{
    content: '拒绝',
    onClick: (testReportData,testReport) =>{
        const putData = {
            "object": "testReport",
            "operation": "ConfirmReject"
        };
        const {processInstanceID,id} = testReportData;
        putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            if(status===STATUS.SUCCESS) message.success('已拒绝');
            else message.error('拒绝失败');
        });
    }
},{
    content: '批准',
        onClick: (testReportData,testReport) =>{
        const putData = {
            "object": "testReport",
            "operation": "ApprovePass"
        };
        const {processInstanceID,id} = testReportData;
        putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            if(status===STATUS.SUCCESS) message.success('确认成功');
            else message.error('确认失败');
        });
    }
},{
    content: '不批准',
        onClick: (testReportData,testReport) =>{
        const putData = {
            "object": "testReport",
            "operation": "ApproveReject"
        };
        const {processInstanceID,id} = testReportData;
        putTestReportState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            if(status===STATUS.SUCCESS) message.success('已拒绝');
            else message.error('拒绝失败');
        });
    }
}];

/**
 * 向测试报告组件分发buttons数组和获取测试报告的方法
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {{buttons: Array, getValues: (function(*=): void)}}
 */
const mapDispatchToProps = (dispatch) => {
    console.log("here");
    return {
        buttons: buttons(dispatch),
        getValues: (id) => getTestReport(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportContentComponent);
