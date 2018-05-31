import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ContractContentView} from "../../Contract";
import {setContractFilter} from "../../../modules/ducks/Contract";
import ContractListComponent from "../components/ContractListComponent";
import {deleteContract, getContractList, newContract} from "../../../services/ContractService";

const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    console.log(state.Contract.listMap);
    return {
        dataSource: Object.values(state.Contract.listMap),
        enableNew: authData.functionGroup["Contract"]!==undefined&&authData.functionGroup["Contract"].findIndex(element => element === "ADD")!==-1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '合同详情', ContractContentView));
//            dispatch(setContractContent())
        },
        setListFilter: (listFilter) => dispatch(setContractFilter(listFilter)),
        getContractList: () => getContractList(dispatch),
        deleteContract: (id) => deleteContract(dispatch,id),
        newContract: () => newContract(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractListComponent);