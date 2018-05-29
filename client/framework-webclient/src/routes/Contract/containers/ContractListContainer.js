import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ContractContentView} from "../../Contract";
import {getContractList} from "../../../services/ContractService";
//import {setContractFilter} from "../../../modules/ducks/Contract";
import ContractListComponent from "../components/ContractListComponent";

const mapStateToProps = (state) => {
    console.log(state);//
    return {
        dataSource: Object.values(state.Contract.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '合同详情', ContractContentView));
//            dispatch(setContractContent())
        },
        setListFilter: (listFilter) => dispatch(setContractFilter(listFilter)),
        getContractList: () => getContractList(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractListComponent);