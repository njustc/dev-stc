import React, {Component} from 'react';
import ContractContentComponent from "../components/ContractContentComponent";
import {connect} from "react-redux";
import {getContract, putContractState, updateContract} from "../../../services/ContractService";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";

const mapStateToProps = (state, ownProps) => {
    // debugger;
    const sysUser = JSON.parse(sessionStorage.getItem('sysUser'));
    const content = state.Project.listMap[ownProps.id].contract;
    const contractBody = content?content.contractBody:undefined;
    const contractState = content?content.state:"error";
    const isCustomer = (sysUser.username==="customer1"||sysUser.username==="customer2");
    const isMarketing = (sysUser.username==="marketing");
    const isSubmitVisible = content&&content.operation&&content.operation.findIndex(element => element === 'Submit')!==-1;
    const isReviewVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ReviewPass')!==-1;
    const isConfirmVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ConfirmPass')!==-1;

    return {
        contractData: content?content:ownProps,
        values:  contractBody ? JSON.parse(contractBody) : {},
        disable: !(contractState==="TobeSubmit"&&isMarketing),
        disableM: !(isCustomer&&isConfirmVisible),
        buttonsEnable: buttonsEnable(isCustomer,isMarketing,isSubmitVisible,isReviewVisible,isConfirmVisible),
    }
};

const buttonsEnable = (isCustomer,isMarketing,isSubmitVisible,isReviewVisible,isConfirmVisible) => [{
    content: '保存',
    enable: isMarketing&&isSubmitVisible,
},{
    content: '提交',
    enable: isMarketing&&isSubmitVisible,
},{
    content: '通过',
    enable: isMarketing&&isReviewVisible,
},{
    content: '否决',
    enable: isMarketing&&isReviewVisible,
},{
    content: '确认',
    enable: isCustomer&&isConfirmVisible,
},{
    content: "拒绝",
    enable: isCustomer&&isConfirmVisible,
}
];

const buttons = (dispatch) => [{/*TODO:buttons的显示和禁用还存在问题*/
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
}];

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id) => getContract(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractContentComponent);
