import React, {Component} from 'react';
import TestReportCheckContentComponent from "../components/TestReportCheckContentComponent";
import {connect} from "react-redux";
import {getTestReportCheck, putTestReportCheckState, updateTestReportCheck} from "../../../services/TestReportCheckService";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";

/**
 * @module TestReport/TestReportCheckContentContainer
 */

/**
 * 把store里面的测试样例数据映射到测试报告检查表组件
 * @param state
 * @param ownProps
 * @returns {{testReportCheckData: *, values: {}, disable: boolean, buttonsEnable: *}}
 */
const mapStateToProps = (state, ownProps) => {
    const sysUser = JSON.parse(sessionStorage.getItem('sysUser'));
    const content = state.Project.listMap[ownProps.id].testReportCheck;
    const body = content?content.body:undefined;
    const isQuality = (sysUser.username==="quality");
    return {
        testReportCheckData: content?content:ownProps,
        values:  body ? JSON.parse(body) : {},
        disable: !isQuality,
        buttonsEnable: buttonsEnable(isQuality),
    }
};

/**
 * 按钮显示控制，根据当前用户和状态判断按钮是否可用
 * @param isQuality
 * @returns {Array}
 */
const buttonsEnable = (isQuality) => [{
    content: '保存',
    enable: isQuality,
}];

/**
 * 测试报告检查表相关的数据操作和对应的按钮
 * @param dispatch
 * @returns {Array}
 */
const buttons = (dispatch) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (testReportCheckData,testReportCheck) =>{
        console.log(testReportCheck);
        console.log(testReportCheckData);
        const valueData = {
            id: testReportCheckData.id,
            body: testReportCheck
        };
        updateTestReportCheck(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    }
}];

/**
 * 向测试报告检查表组件分发buttons数组和获取测试报告检查表的方法
 * @param dispatch
 * @param ownProps
 * @returns {{buttons: Array, getValues: (function(*=): void)}}
 */
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id) => getTestReportCheck(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportCheckContentComponent);
