import React, {Component} from 'react';
import ConsignContentComponent from "../components/ConsignContentComponent";
import {message} from 'antd';
import {connect} from "react-redux";
import {getConsign, getConsignState, putConsignState, updateConsign} from "../../../services/ConsignService";
import {newProject} from "../../../services/ProjectService";
import {newContract} from "../../../services/ContractService";
import {globalOperation, STATUS} from "../../../services/common";
// import "./common"
/*TODO:表单内容和按钮的可视及禁用情况*/
const mapStateToProps = (state, ownProps) => {
    // debugger;
    const content = state.Consign.listMap[ownProps.id];
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const consignation = content?state.Consign.listMap[ownProps.id].consignation:undefined;
    console.log('raw', consignation);
    console.log('consignation', consignation ? JSON.parse(consignation): {});
    const ToBeSubmit = content?state.Consign.listMap[ownProps.id].state!=="TobeSubmit":false;
    const isEditVisible = authData.functionGroup["Consign"]===undefined||authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    console.log(content);
    console.log(content.operation[0]);
    const isSubmitVisible = true||content&&content.operation
        &&(typeof(content.operation)==="string"?JSON.parse(content.operation).findIndex(element => element === 'Submit')!==-1:
        content.operation.findIndex(element => element === 'Submit')!==-1);
    const isReviewVisible = true||content&&content.operation&&content.operation.findIndex(element => element === 'ReviewPass')!==-1;
    return {
        consignData: content?state.Consign.listMap[ownProps.id]:ownProps,
        values: consignation ? JSON.parse(consignation) : {},
        disable: ToBeSubmit||(!isEditVisible),
        buttonsEnable: buttonsEnable(isEditVisible,isSubmitVisible,isReviewVisible),
    }
};

const buttonsEnable = (isEditVisible,isSubmitVisible,isReviewVisible) => [{
    content: '保存',
    enable: isEditVisible,
},{
    content: '提交',
    enable: isSubmitVisible,
},{
    content: '通过',
    enable: isReviewVisible,
},{
    content: '否决',
    enable: isReviewVisible,
}];

const buttons = (dispatch) => [{/*TODO:buttons的显示和禁用还存在问题*/
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
    // enable: isEditVisible
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
            if(status===STATUS.SUCCESS){
                message.success('流程新建成功');
                newContract(dispatch,id,(status)=>{
                    console.log(status);
                    if(status===STATUS.SUCCESS) message.success('合同新建成功');
                    else message.error('合同新建失败');
                });
            }
            else message.error('流程新建失败');
        });
    },
    // enable: isReviewVisible
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
    // enable: isReviewVisible
}];

const mapDispatchToProps = (dispatch,ownProps) => {
    // const content = state.Consign.listMap[ownProps.id];
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    let operationData = {};
    console.log(ownProps.processInstanceID);
    console.log(ownProps.id);
    // getConsignState(dispatch,(data)=>{operationData = data.operation;})
    // const operationData = JSON.parse(sessionStorage.getItem('operation'+ownProps.id));
    const isEditVisible = authData.functionGroup["Consign"]===undefined||authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    // const isSubmitVisible = content&&content.Operation&&content.Operation.findIndex('Submit')!==-1;
    // const isReviewVisible = content&&content.Operation&&content.Operation.findIndex('ReviewPass')!==-1;
    // console.log(operationData);
    // const {operation} = operationData;
    // // console.log(operation);
    // var isReviewVisible = operation!=undefined&&operation!=null;
    // if(isReviewVisible === true){
    //     isReviewVisible = false;
    //     operation.forEach(function(element){
    //         console.log(element);
    //         if(element == 'ReviewPass') {
    //             isReviewVisible = true;
    //         }
    //     })
    // }
    // console.log(isReviewVisible);
    return {
        buttons: buttons(dispatch),//,isEditVisible).filter((button) => {
        //     console.log(ownProps.buttonsEnable);
        //     ownProps.buttonsEnable.forEach(function(element){
        //         if(element.content === button.content){
        //             return element.enable;
        //         }
        //     })
        // }),
        getValues: (id,processInstanceID) => {
            getConsignState(dispatch,processInstanceID,id);
            // console.log("hahaha");
            getConsign(dispatch,id);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);
