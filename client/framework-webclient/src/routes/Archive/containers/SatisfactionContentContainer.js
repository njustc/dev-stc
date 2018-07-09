import React, {Component} from 'react';
import SatisfactionContentComponent from "../components/SatisfactionContentComponent";
import {connect} from "react-redux";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";
import {updateSatisfaction,putSatisfactionState} from "../../../services/ArchiveService";

const mapStateToProps = (state, ownProps) => {
    // debugger;
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(authData);
    const content = state.Project.listMap[ownProps.id].satisfaction;
    const body = content?content.body:undefined;

    const isEditVisible = authData.functionGroup["Satisfaction"]!==undefined&&authData.functionGroup["Satisfaction"].findIndex(element => element === "EDIT")!==-1;

    return {
        // satisfactionData: {},/*fetch data with pro id*/
        satisfactionData: content?content:ownProps,
        values:  body ? JSON.parse(body) : {},
        disable: false/*authData.functionGroup["Satisfaction"]===undefined||authData.functionGroup["Satisfaction"].findIndex(element => element === "EDIT")===-1||state.Satisfaction.listMap[ownProps.id].state!=="TobeSubmit"*/,
        //curKey: state.Layout.activeKey, /*TODO: 将当前页面id保存为组件静态变量，通过此id获取页面内容*/
        //buttonDisabled: state.Satisfaction.listMap[ownProps.id].state==="TobeCheck"
        /*buttonDisabled: authData.functionGroup["Satisfaction"]===undefined ||authData.functionGroup["Satisfaction"].findIndex(element => element === "EDIT")===-1
            ? state.Satisfaction.listMap[ownProps.id].state==="TobeSubmit"||state.Satisfaction.listMap[ownProps.id].state==="Finished"
            : state.Satisfaction.listMap[ownProps.id].state==="TobeReview"||state.Satisfaction.listMap[ownProps.id].state==="Finished"*/
        buttonsEnable: buttonsEnable(isEditVisible),
    }
};

const buttonsEnable = (isEditVisible) => [{
    content: '提交',
    enable: isEditVisible,
}
];

const buttons = (dispatch) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '提交',
    onClick: (satisfactionData,satisfaction) =>{
        const valueData = {
            id: satisfactionData.id,
            body: satisfaction
        };
        updateSatisfaction(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('提交成功');
            else message.error('提交失败');
        });
    }
}];

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        buttons: buttons(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SatisfactionContentComponent);
