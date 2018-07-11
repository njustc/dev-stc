import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ContractContentView} from "../../Contract";
import {ProjectContentView} from "../../Project";
import {deleteContract, getContractList, newContract} from "../../../services/ContractService";
import {setContractFilter} from "../../../modules/ducks/Contract";
import ContractListComponent from "../components/ContractListComponent";
import {getProjectList} from "SERVICES/ProjectService";

const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    return {
        // dataSource: Object.values(state.Contract.listMap).filter(state.Contract.listFilter),
        dataSource: Object.values(state.Project.listMap).filter((project) => project.contract).filter(state.Contract.listFilter),
        enableNew: authData.functionGroup["Contract"]!==undefined&&authData.functionGroup["Contract"].findIndex(element => element === "ADD")!==-1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            dispatch(addTabAction(id, '合同详情', ContractContentView, {id: id}));
        },
        showProject: (id) => {
            // debugger;
            console.log(id);
            dispatch(addTabAction(id, '项目详情', ProjectContentView, {id: id}));
//            dispatch(setContractContent())
        },
        setListFilter: (listFilter) => dispatch(setContractFilter(listFilter)),
        getContractList: () => getContractList(dispatch),
        deleteContract: (id) => deleteContract(dispatch,id),
        newContract: () => newContract(dispatch),
        getProjectList: () => getProjectList(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractListComponent);