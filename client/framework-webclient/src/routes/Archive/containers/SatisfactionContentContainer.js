import React, {Component} from 'react';
import SatisfactionContentComponent from "../components/SatisfactionContentComponent";
import {connect} from "react-redux";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";
import {updateSatisfaction,putSatisfactionState} from "../../../services/ArchiveService";
/**
 * @module Satisfaction/SatisfactionContentContainer
 */
/**
 * 把store里面的满意度调查表数据映射到组件，根据store数据计算页面编辑权限，计算并传入buttonsEnable数组
 * @param state
 * @param ownProps
 * @returns {{satisfactionData: *, values: {}, consignUnit: string, softwareName: *, disableC: boolean, disableQ: boolean, buttonsEnable: *}}
 */
const mapStateToProps = (state, ownProps) => {
    const sysUser = JSON.parse(sessionStorage.getItem('sysUser'));
    const content = state.Project.listMap[ownProps.id].satisfaction;
    const consign = state.Project.listMap[ownProps.id].consign;
    const consignation = consign.consignation?JSON.parse(consign.consignation):{};
    const body = content?content.body:undefined;
    const isCustomer = (sysUser.username==="customer1"||sysUser.username==="customer2");
    const isMarketing = (sysUser.username==="marketing");
    return {
        satisfactionData: content?content:ownProps,
        values:  body ? JSON.parse(body) : {},
        consignUnit: consignation.consignUnitC?consignation.consignUnitC:"未填写",
        softwareName: consignation.softwareName?consignation.softwareName:"未填写",
        disableC: !isCustomer,
        disableQ: !isMarketing,
        buttonsEnable: buttonsEnable(isCustomer||isMarketing),
    }
};
/**
 * 按钮显示控制，根据当前用户和状态判断按钮是否可用
 * @param isEditVisible
 * @returns {Array}
 */
const buttonsEnable = (isEditVisible) => [{
    content: '保存',
    enable: isEditVisible,
}
];
/**
 * 满意度调查表相关的数据操作和对应的按钮
 * @param dispatch
 * @returns {Array}
 */
const buttons = (dispatch) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (satisfactionData,satisfaction) =>{
        const valueData = {
            id: satisfactionData.id,
            body: satisfaction
        };
        updateSatisfaction(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    }
}];
/**
 * 向组件分发buttons数组
 * @param dispatch
 * @param ownProps
 * @returns {{buttons: Array}}
 */
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        buttons: buttons(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SatisfactionContentComponent);
