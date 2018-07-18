import React, {Component} from 'react';
import TestPlanContentComponent from "../components/TestPlanContentComponent";
import {connect} from "react-redux";
import {getTestPlan, putTestPlanState, updateTestPlan} from "../../../services/TestPlanService";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";

/**
 * @module Test/TestPlanContentContainer
 */

/**
 * 把store里面的测试方案数据映射到测试方案组件，根据store数据计算页面编辑权限，计算并传入buttonsEnable数组
 * @param state {object} store中数据
 * @param ownProps {object} 创建组件时传入的数据
 * @returns {{testPlanData: *, values: {}, disable: boolean, buttonsEnable: *}}
 */

const mapStateToProps = (state, ownProps) => {
    const sysUser = JSON.parse(sessionStorage.getItem('sysUser'));
    const content = state.Project.listMap[ownProps.id].testPlan;
    const body = content?content.body:undefined;
    const testPlanState = content?content.state:"error";
    const isTesting = (sysUser.username==="testing");
    const isQuality = (sysUser.username==="quality");
    const isSubmitVisible = content&&content.operation&&content.operation.findIndex(element => element === 'Write')!==-1;
    const isReviewVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ReviewPass')!==-1;
    const isConfirmVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ConfirmPass')!==-1;

    return {
        testPlanData: content?content:ownProps,
        values:  body ? JSON.parse(body) : {},
        disable: testPlanState!=="TobeWrite",
        buttonsEnable: buttonsEnable(isTesting,isQuality,isSubmitVisible,isReviewVisible,isConfirmVisible),
    }
};

/**
 * 按钮显示控制，根据当前用户和状态判断按钮是否可用
 * @param isTesting {boolean} 是否为测试部成员
 * @param isQuality {boolean} 是否为质量部成员
 * @param isSubmitVisible {boolean} 是否可以提交
 * @param isReviewVisible {boolean} 是否可以评审
 * @param isConfirmVisible {boolean} 是否可以确认
 * @returns {Array}
 */
const buttonsEnable = (isTesting,isQuality,isSubmitVisible,isReviewVisible,isConfirmVisible) => [{
    content: '保存',
    enable: isTesting&&isSubmitVisible,
},{
    content: '提交',
    enable: isTesting&&isSubmitVisible,
},{
    content: '通过',
    enable: isQuality&&isReviewVisible,
},{
    content: '否决',
    enable: isQuality&&isReviewVisible,
},{
    content: '确认',
    enable: isTesting&&isConfirmVisible,
},{
    content: "拒绝",
    enable: isTesting&&isConfirmVisible,
}
];

/**
 * 测试方案相关的数据操作和对应的按钮
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {Array}
 */
const buttons = (dispatch) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (testPlanData,testPlan) =>{
        console.log(testPlan);
        const valueData = {
            id: testPlanData.id,
            body: testPlan
        };
        updateTestPlan(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    }
},{
    content: '提交',
    onClick: (testPlanData,testPlan) =>{
        console.log(testPlanData);
        console.log(testPlan);
        const valueData = {
            id: testPlanData.id,
            body: testPlan
        };
        updateTestPlan(dispatch,valueData,(status)=>{
            if(status===STATUS.SUCCESS){
                const putData = {
                    "object": "testPlan",
                    "operation": "Submit"
                };
                const {processInstanceID,id} = testPlanData;
                console.log(putData);
                putTestPlanState(dispatch,processInstanceID,putData,id,(status)=>{
                    console.log(status);
                    if(status===STATUS.SUCCESS) message.success('提交成功');
                    else message.error('提交失败');
                });
            }
            else message.error('更新失败');
        });
    }
},{
    content: '通过',
    onClick: (testPlanData,testPlan) =>{
        const putData = {
            "object": "testPlan",
            "operation": "ReviewPass"
        };
        const {processInstanceID,id} = testPlanData;
        putTestPlanState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            console.log(status===STATUS.SUCCESS);
            if(status===STATUS.SUCCESS) message.success('通过成功');
            else message.error('通过失败');
        });
    }
},{
    content: '否决',
    onClick: (testPlanData,testPlan) =>{
        const putData = {
            "object": "testPlan",
            "operation": "ReviewReject"
        };
        const {processInstanceID,id} = testPlanData;
        putTestPlanState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            if(status===STATUS.SUCCESS) message.success('已否决');
            else message.error('否决失败');
        });
    }
},{
    content: '确认',
    onClick: (testPlanData,testPlan) =>{
        const putData = {
            "object": "testPlan",
            "operation": "ConfirmPass"
        };
        const {processInstanceID,id} = testPlanData;
        putTestPlanState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            if(status===STATUS.SUCCESS) message.success('确认成功');
            else message.error('确认失败');
        });
    }
},{
    content: '拒绝',
    onClick: (testPlanData,testPlan) =>{
        const putData = {
            "object": "testPlan",
            "operation": "ConfirmReject"
        };
        const {processInstanceID,id} = testPlanData;
        putTestPlanState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

            if(status===STATUS.SUCCESS) message.success('已拒绝');
            else message.error('拒绝失败');
        });
    }
}];

/**
 * 向测试方案组件分发buttons数组和获取测试方案的方法
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {{buttons: Array, getValues: (function(*=): void)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id) => getTestPlan(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestPlanContentComponent);
