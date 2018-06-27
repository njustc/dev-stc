import React, {Component} from 'react';
import ContractContentComponent from "../components/ContractContentComponent";
import {connect} from "react-redux";
import {getContract, putContractState, updateContract} from "../../../services/ContractService";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";

const mapStateToProps = (state, ownProps) => {
    // debugger;
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(authData);
    const content = state.Contract.listMap[ownProps.id];
    const contractBody = content?content.contractBody:undefined;

    const isEditVisible = authData.functionGroup["Consign"]!==undefined||authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    const isSubmitVisible = content&&content.operation&&(typeof(content.operation)==="string"?JSON.parse(content.operation).findIndex(element => element === 'Submit')!==-1:
        content.operation.findIndex(element => element === 'Submit')!==-1);
    const isReviewVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ReviewPass')!==-1;
    const isConfirmVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ConfirmPass')!==-1;

    return {
        // contractData: {},/*fetch data with pro id*/
        contractData: content?state.Contract.listMap[ownProps.id]:ownProps,
        values:  contractBody ? JSON.parse(contractBody) : {},
        disable: false/*authData.functionGroup["Contract"]===undefined||authData.functionGroup["Contract"].findIndex(element => element === "EDIT")===-1||state.Contract.listMap[ownProps.id].state!=="TobeSubmit"*/,
        //curKey: state.Layout.activeKey, /*TODO: 将当前页面id保存为组件静态变量，通过此id获取页面内容*/
        //buttonDisabled: state.Contract.listMap[ownProps.id].state==="TobeCheck"
        /*buttonDisabled: authData.functionGroup["Contract"]===undefined ||authData.functionGroup["Contract"].findIndex(element => element === "EDIT")===-1
            ? state.Contract.listMap[ownProps.id].state==="TobeSubmit"||state.Contract.listMap[ownProps.id].state==="Finished"
            : state.Contract.listMap[ownProps.id].state==="TobeReview"||state.Contract.listMap[ownProps.id].state==="Finished"*/
        buttonsEnable: buttonsEnable(isEditVisible,isSubmitVisible,isReviewVisible,isConfirmVisible),
    }
};

const buttonsEnable = (isEditVisible,isSubmitVisible,isReviewVisible,isConfirmVisible) => [{
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
},{
    content: '确认',
    enable: isConfirmVisible,
},{
    content: "拒绝",
    enable: isConfirmVisible,
}
];

const buttons = (dispatch,isEditVisible,isReviewVisible,isConfirmVisible) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (contractData,contract) =>{
        console.log(contract);
        const valueData = {
            id: contractData.id,
            contractBody: contract
        };
        updateContract(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    },
    enable: isEditVisible
},{
    content: '提交',
    onClick: (contractData,contract) =>{
        const valueData = {
            id: contractData.id,
            contractBody: contract
        };
        updateContract(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS){
                const putData = {
                    "object": "contract",
                    "operation": "Submit"
                };
                const {processInstanceID,id} = contractData;
                console.log(putData);
                putContractState(dispatch,processInstanceID,putData,id,(status)=>{
                    console.log(status);
                    if(status===STATUS.SUCCESS) message.success('提交成功');
                    else message.error('提交失败');
                });
            }
            else message.error('更新失败');
        });
    },
    enable: isEditVisible
},{
    content: '通过',
    onClick: (contractData,contract) =>{
        const putData = {
            "object": "contract",
            "operation": "ReviewPass"
        };
        const {processInstanceID,id} = contractData;
        putContractState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

        console.log(status===STATUS.SUCCESS);
        if(status===STATUS.SUCCESS) message.success('通过成功');
        else message.error('通过失败');
        });
    },
    enable: isReviewVisible
},{
    content: '否决',
    onClick: (contractData,contract) =>{
        const putData = {
            "object": "contract",
            "operation": "ReviewReject"
        };
        const {processInstanceID,id} = contractData;
        putContractState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

        if(status===STATUS.SUCCESS) message.success('已否决');
        else message.error('否决失败');
        });
    },
    enable: isReviewVisible
},{
    content: '确认',
    onClick: (contractData,contract) =>{
        const putData = {
            "object": "contract",
            "operation": "ConfirmPass"
        };
        const {processInstanceID,id} = contractData;
        putContractState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

        if(status===STATUS.SUCCESS) message.success('确认成功');
        else message.error('确认失败');
        });
    },
    enable: isConfirmVisible
},{
    content: '拒绝',
    onClick: (contractData,contract) =>{
        const putData = {
            "object": "contract",
            "operation": "ConfirmReject"
        };
        const {processInstanceID,id} = contractData;
        putContractState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);

        if(status===STATUS.SUCCESS) message.success('已拒绝');
        else message.error('拒绝失败');
        });
    },
    enable: isConfirmVisible
}];

const mapDispatchToProps = (dispatch,ownProps) => {
    console.log(ownProps);
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //const isVisible = true;//authData.functionGroup["Contract"]!==undefined&&authData.functionGroup["Contract"].findIndex(element => element === "EDIT")!==-1;
    const isEditVisible = true||authData.functionGroup["Contract"]!==undefined&&authData.functionGroup["Contract"].findIndex(element => element === "EDIT")===1;
    const isReviewVisible = true||authData.functionGroup["Contract"]!==undefined&&authData.functionGroup["Contract"].findIndex(element => element === "REVIEW")===1;
    const isConfirmVisible = true||authData.functionGroup["Contract"]!==undefined&&authData.functionGroup["Contract"].findIndex(element => element === "CONFIRM")===1;
    return {
        buttons: buttons(dispatch,isEditVisible,isReviewVisible,isConfirmVisible).filter(button => button.enable===true),
        getValues: (id) => getContract(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractContentComponent);
