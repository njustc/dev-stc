import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ContractCheckContentView} from "../../Contract";
import {getContractCheckList} from "../../../services/ContractService";
//import {setContractFilter} from "../../../modules/ducks/Contract";
import ContractCheckListComponent from "../components/ContractCheckListComponent";

const mapStateToProps = (state) => {
    console.log(state);//
    return {
        dataSource: Object.values(state.ContractCheck.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '合同检查表详情', ContractCheckContentView));
//            dispatch(setContractContent())
        },
        setListFilter: (listFilter) => dispatch(setContractFilter(listFilter)),
        getContractCheckList: () => getContractCheckList(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractCheckListComponent);