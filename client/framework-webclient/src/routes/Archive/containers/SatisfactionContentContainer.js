import React, {Component} from 'react';
import SatisfactionContentComponent from "../components/SatisfactionContentComponent";
import {connect} from "react-redux";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";
import {updateSatisfaction,putSatisfactionState} from "../../../services/ArchiveService";

const mapStateToProps = (state, ownProps) => {
    // debugger;
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

const buttonsEnable = (isEditVisible) => [{
    content: '保存',
    enable: isEditVisible,
}
];

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

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        buttons: buttons(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SatisfactionContentComponent);
