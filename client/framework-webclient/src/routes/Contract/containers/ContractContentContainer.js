import React, {Component} from 'react';
import ContractContentComponent from "../components/ContractContentComponent";
import {connect} from "react-redux";
import {getContract, putContractState, updateContract} from "../../../services/ContractService";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";
/**
 * @module Contract/ContractContentContainer
 */
/**
 * 把store里面的合同数据映射到委托组件，根据store数据计算页面编辑权限，计算并传入buttonsEnable数组
 * @param state {object} store数据
 * @param ownProps {object} 创建组件时传入的数据
 * @returns {{contractData: *, values: {}, disable: boolean, buttonsEnable: *}}
 */
const mapStateToProps = (state, ownProps) => {
    const sysUser = JSON.parse(sessionStorage.getItem('sysUser'));
    const content = state.Project.listMap[ownProps.id].contract;
    const contractBody = content?content.contractBody:undefined;
    const contractState = content?content.state:"error";
    const isCustomer = (sysUser.username==="customer1"||sysUser.username==="customer2");
    const isMarketing = (sysUser.username==="marketing");
    const isManager = (sysUser.username==="marketingManager");
    const isSubmitVisible = content&&content.operation&&content.operation.findIndex(element => element === 'Submit')!==-1;
    const isReviewVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ReviewPass')!==-1;
    const isConfirmVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ConfirmPass')!==-1;
    return {
        contractData: content?content:ownProps,
        values:  contractBody ? JSON.parse(contractBody) : {},
        disable: !(isMarketing&&contractState==="TobeSubmit"),
        disableM: !(isCustomer&&isConfirmVisible),
        buttonsEnable: buttonsEnable(isCustomer,isMarketing,isManager,isSubmitVisible,isReviewVisible,isConfirmVisible),
    }
};
/**
 * 按钮显示控制，根据当前用户和状态判断按钮是否可用
 * @param isCustomer {boolean} 是否是客户
 * @param isMarketing {boolean} 是否是市场部成员
 * @param isManager {boolean} 是否是市场部主任
 * @param isSubmitVisible {boolean} 是否可以提交
 * @param isReviewVisible {boolean} 是否可以评审
 * @param isConfirmVisible {boolean} 是否可以确认
 * @returns {Array}
 */
const buttonsEnable = (isCustomer,isMarketing,isManager,isSubmitVisible,isReviewVisible,isConfirmVisible) => [{
    content: '保存',
    enable: isMarketing&&isSubmitVisible,
},{
    content: '提交',
    enable: isMarketing&&isSubmitVisible,
},{
    content: '通过',
    enable: isManager&&isReviewVisible,
},{
    content: '否决',
    enable: isManager&&isReviewVisible,
},{
    content: '确认',
    enable: isCustomer&&isConfirmVisible,
},{
    content: "拒绝",
    enable: isCustomer&&isConfirmVisible,
}
];
/**
 * 合同相关的数据操作和对应的按钮
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {Array}
 */
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
/**
 * 向合同组件分发buttons数组和获取委托的方法
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {{buttons: Array, getValues: (function(*=): void)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id) => getContract(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractContentComponent);
