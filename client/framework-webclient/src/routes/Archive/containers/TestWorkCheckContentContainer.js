import React, {Component} from 'react';
import TestWorkCheckContentComponent from "../components/TestWorkCheckContentComponent";
import {connect} from "react-redux";
import {getTestWorkCheck, putTestWorkCheckState, updateTestWorkCheck} from "../../../services/TestWorkCheckService";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";
/**
 * @module TestWorkCheck/TestWorkCheckContentContainer
 */
/**
 * 把store里面的测试工作检查表数据映射到组件，根据store数据计算页面编辑权限，计算并传入buttonsEnable数组
 * @param state {object} store数据
 * @param ownProps {object} 创建组件时传入的数据
 * @returns {{testWorkCheckData: *, values: {}, disable: boolean, buttonsEnable: *}}
 */
const mapStateToProps = (state, ownProps) => {
    const sysUser = JSON.parse(sessionStorage.getItem('sysUser'));
    const content = state.Project.listMap[ownProps.id].testWorkCheck;
    const body = content?content.body:undefined;
    const isQuality = (sysUser.username==="quality");
    const consign = state.Project.listMap[ownProps.id].consign;
    const projectCode = state.Project.listMap[ownProps.id].code;
    const consignBody = consign.consignation?JSON.parse(consign.consignation):{};
    const softWareName = consignBody.softwareName?consignBody.softwareName:"未填写";
    const unitCompany = consignBody.consignUnitC?consignBody.consignUnitC:"未填写";

    return {
        softWareName: softWareName,
        unitCompany: unitCompany,
        projectCode: projectCode,
        testWorkCheckData: content?content:ownProps,
        values:  body ? JSON.parse(body) : {},
        disable: !isQuality,
        buttonsEnable: buttonsEnable(isQuality),
    }
};
/**
 * 按钮显示控制，根据当前用户和状态判断按钮是否可用
 * @param isQuality {boolean} 是否是质量部成员
 * @returns {Array}
 */
const buttonsEnable = (isQuality) => [{
    content: '保存',
    enable: isQuality,
}];
/**
 * 测试工作检查表相关的数据操作和对应的按钮
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {Array}
 */
const buttons = (dispatch) => [{
    content: '保存',
    onClick: (testWorkCheckData, testWorkCheck) => {
        console.log(testWorkCheck);
        const valueData = {
            id: testWorkCheckData.id,
            body: testWorkCheck
        };
        updateTestWorkCheck(dispatch, valueData, (status) => {
            console.log(status);
            if (status === STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    }
}
];
/**
 * 向测试工作检查表组件分发buttons数组和获取检查表的方法
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {{buttons: Array, getValues: (function(*=): void)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id) => getTestWorkCheck(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestWorkCheckContentComponent);
