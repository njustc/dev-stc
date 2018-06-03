import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ContractCheckContentView} from "../../Contract";
import {deleteContractCheck, getContractCheckList, newContractCheck} from "../../../services/ContractService";
import {setContractCheckFilter} from "../../../modules/ducks/Contract";
import ContractCheckListComponent from "../components/ContractCheckListComponent";

const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    return {
        dataSource: Object.values(state.ContractCheck.listMap),
        enableNew: authData.functionGroup["ContractCheck"]!==undefined&&authData.functionGroup["ContractCheck"].findIndex(element => element === "ADD")!==-1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            // debugger;
            dispatch(addTabAction(id, '委托详情', ContractCheckContentView, {id: id}));
//            dispatch(setContractCheckContent())
        },
        setListFilter: (listFilter) => dispatch(setContractCheckFilter(listFilter)),
        getContractCheckList: () => getContractCheckList(dispatch),
        deleteContractCheck: (id) => deleteContractCheck(dispatch,id),
        newContractCheck: () => newContractCheck(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractCheckListComponent);