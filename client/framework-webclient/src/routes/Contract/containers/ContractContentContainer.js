import React, {Component} from 'react';
import ContractContentComponent from "../components/ContractContentComponent";
import {connect} from "react-redux";
import {getContract, putContractState, updateContract} from "../../../services/ContractService";

const mapStateToProps = (state, ownProps) => {
    // debugger;
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(authData);
    const contract = state.Contract.listMap[ownProps.id].contract;
    return {
        // contractData: {},/*fetch data with pro id*/
        contractData: state.Contract.listMap[ownProps.id],
        values: contract ? JSON.parse(contract) : {},
        disable: false/*authData.functionGroup["Contract"]===undefined||authData.functionGroup["Contract"].findIndex(element => element === "EDIT")===-1||state.Contract.listMap[ownProps.id].state!=="TobeSubmit"*/,
        curKey: state.Layout.activeKey, /*TODO: 将当前页面id保存为组件静态变量，通过此id获取页面内容*/
        //buttonDisabled: state.Contract.listMap[ownProps.id].state==="TobeCheck"
        buttonDisabled: authData.functionGroup["Contract"]===undefined ||authData.functionGroup["Contract"].findIndex(element => element === "EDIT")===-1
            ? state.Contract.listMap[ownProps.id].state==="TobeSubmit"||state.Contract.listMap[ownProps.id].state==="Finished"
            : state.Contract.listMap[ownProps.id].state==="TobeCheck"||state.Contract.listMap[ownProps.id].state==="Finished"
    }
};

const buttons = (dispatch,isVisible) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (contractData,contract) =>{
        const valueData = {
            id: contractData.id,
            contract: contract
        };
        updateContract(dispatch,valueData);
    },
    enable: isVisible,
},{
    content: '提交',
    onClick: (contractData,contract) =>{
        const valueData = {
            id: contractData.id,
            contract: contract
        };
        updateContract(dispatch,valueData);

        const putData = {
            "object": "contract",
            "operation": "submit"
        };
        const {processInstanceID,id} = contractData;
        putContractState(dispatch,processInstanceID,putData,id);
    },
    enable: isVisible
},{
    content: '通过',
    onClick: (contractData,contract) =>{
        const putData = {
            "object": "contract",
            "operation": "pass"
        };
        const {processInstanceID,id} = contractData;
        putContractState(dispatch,processInstanceID,putData,id);
    },
    enable: !isVisible
},{
    content: '否决',
    onClick: (contractData,contract) =>{
        const putData = {
            "object": "contract",
            "operation": "reject"
        };
        const {processInstanceID,id} = contractData;
        putContractState(dispatch,processInstanceID,putData,id);
    },
    enable: !isVisible
}];

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const isVisible = true;//authData.functionGroup["Contract"]!==undefined&&authData.functionGroup["Contract"].findIndex(element => element === "EDIT")!==-1;
    return {
        buttons: buttons(dispatch,isVisible).filter(button => button.enable===true),
        getValues: (id) => getContract(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractContentComponent);
