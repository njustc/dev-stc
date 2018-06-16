
import React, {Component} from 'react';
import ConsignContentComponent from "../components/ConsignContentComponent";
import {message} from 'antd';
import {connect} from "react-redux";
import {getConsign, getConsignState, putConsignState, updateConsign} from "../../../services/ConsignService";
import {newProject} from "../../../services/ProjectService";
import {STATUS} from "../../../services/common";
/*TODO:表单内容和按钮的可视及禁用情况*/
const mapStateToProps = (state, ownProps) => {
    // debugger;
    const content = state.Consign.listMap[ownProps.id];
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const consignation = content?state.Consign.listMap[ownProps.id].consignation:undefined;
    const ToBeSubmit = content?state.Consign.listMap[ownProps.id].state!=="TobeSubmit":false;
    const isEditVisible = authData.functionGroup["Consign"]===undefined||authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    return {
        consignData: content?state.Consign.listMap[ownProps.id]:ownProps,
        values: consignation ? JSON.parse(consignation) : {},
        disable: ToBeSubmit||(!isEditVisible)
    }
};

const buttons = (dispatch,isEditVisible,isReviewVisible) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (consignData,consignation) =>{
        const valueData = {
            id: consignData.id,
            consignation: consignation
        };
        updateConsign(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    },
    enable: isEditVisible
},{
    content: '提交',
    onClick: (consignData,consignation) =>{
        const valueData = {
            id: consignData.id,
            consignation: consignation
        };
        updateConsign(dispatch,valueData,(status)=> {
            if (status === STATUS.SUCCESS) {
                const putData = {
                    "object": "consign",
                    "operation": "Submit"
                };
                const {id, processInstanceID} = consignData;
                putConsignState(dispatch, processInstanceID, putData, id, (status) => {
                    console.log(status);
                    if (status === STATUS.SUCCESS) message.success('提交成功');
                    else message.error('提交失败');
                });
            }
            else message.error('提交失败');
        });
    },
    enable: isEditVisible
},{
    content: '通过',
    onClick: (consignData,processNo) =>{
        const putData = {
            "object": "consign",
            "operation": "ReviewPass",
        };
        const {id,processInstanceID} = consignData;
        putConsignState(dispatch,processInstanceID,putData,id,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('通过成功');
            else message.error('通过失败');
        });
        newProject(dispatch,id,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('流程新建成功');
            else message.error('流程新建失败');
        });
    },
    enable: isReviewVisible
},{
    content: '否决',
    onClick: (consignData,consignation) =>{
        const putData = {
            "object": "consign",
            "operation": "ReviewReject"
        };
        const {id,processInstanceID} = consignData;
        putConsignState(dispatch,processInstanceID,putData,id,(status)=>{
            console.log(status);
            if(status=STATUS.SUCCESS) message.success('已否决');
            else message.error('否决失败');
        });
    },
    enable: isReviewVisible
}];

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const operation = JSON.parse(sessionStorage.getItem('operation'));
    //const isVisible = authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    const isEditVisible = authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    var isReviewVisible = operation!=undefined&&operation!=null;
    if(isReviewVisible === true){
        isReviewVisible = false;
        for(var i of operation){
            if(i == 'ReviewPass') {
                isReviewVisible = true;
            }
        }
    }
    console.log(isReviewVisible);
    return {
        buttons: buttons(dispatch,isEditVisible,isReviewVisible).filter(button => button.enable===true),
        getValues: (id,processInstanceID) => {
            getConsign(dispatch,id);
            getConsignState(dispatch,processInstanceID,id);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);
