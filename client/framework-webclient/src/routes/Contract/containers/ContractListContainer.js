import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ContractContentView} from "../../Contract";
import {ProjectContentView} from "../../Project";
import {deleteContract, getContractList, newContract} from "../../../services/ContractService";
import {setContractFilter} from "../../../modules/ducks/Contract";
import ContractListComponent from "../components/ContractListComponent";
import {getProjectList} from "SERVICES/ProjectService";
/**
 * @module Contract/ContractListContainer
 */
/**
 * 把store中的合同列表分发给list页面，计算并传入用户新建委托的权限
 * @param state
 * @returns {{dataSource: any[], enableNew: boolean}}
 */
const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    return {
        dataSource: Object.values(state.Project.listMap).filter((project) => project.contract).filter(state.Contract.listFilter),
        enableNew: authData.functionGroup["Contract"]!==undefined&&authData.functionGroup["Contract"].findIndex(element => element === "ADD")!==-1
    }
};
/**
 * 把设置列表过滤器和合同Tab控制的dispatch方法分发给list页面
 * @param dispatch
 * @returns {{showContent: showContent, showProject: showProject, setListFilter: (function(*=): *), getContractList: (function(): void), deleteContract: (function(*=): void), newContract: (function(): void), getProjectList: (function(): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (param) => {
            const {key,id} = param;
            dispatch(addTabAction(key, '合同详情', ContractContentView, {id: id}));
        },
        showProject: (id) => {
            console.log(id);
            dispatch(addTabAction(id, '项目详情', ProjectContentView, {id: id}));
        },
        setListFilter: (listFilter) => dispatch(setContractFilter(listFilter)),
        getContractList: () => getContractList(dispatch),
        deleteContract: (id) => deleteContract(dispatch,id),
        newContract: () => newContract(dispatch),
        getProjectList: () => getProjectList(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractListComponent);