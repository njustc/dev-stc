import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ConsignContentView} from "../../Consign";
import {getConsign} from "../../../services/ConsignService";
import {deleteConsign, getConsignList, newConsign} from "../../../services/ConsignService";
import {setConsignFilter} from "../../../modules/ducks/Consign";
import ConsignListComponent from "../components/ConsignListComponent";
/**
 * @module Consign/ConsignListContainer
 */
/**
 * 把store中的委托列表分发给list页面，计算并传入用户新建委托的权限
 * @param state
 * @returns {{dataSource: any[], enableNew: boolean}}
 */
const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(state.Consign.listMap);
    return {
        dataSource: Object.values(state.Consign.listMap).filter(state.Consign.listFilter),
        enableNew: authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "ADD")!==-1
}
};
/**
 * 把设置列表过滤器和委托Tab控制的dispatch方法分发给list页面
 * @param dispatch
 * @returns {{showContent: showContent, setListFilter: (function(*=): *), getConsignList: (function(): void), deleteConsign: (function(*=): void), newConsign: (function(): void)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            // getConsign(dispatch,id);
            dispatch(addTabAction(id, '委托详情', ConsignContentView, {id: id}));
//            dispatch(setConsignContent())
        },
        setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getConsignList: () => getConsignList(dispatch),
        deleteConsign: (id) => deleteConsign(dispatch,id),
        newConsign: () => newConsign(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignListComponent);