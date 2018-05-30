import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {ConsignContentView} from "../../Consign";
import {deleteConsign, getConsignList, newConsign} from "../../../services/ConsignService";
import {setConsignFilter} from "../../../modules/ducks/Consign";
import ConsignListComponent from "../components/ConsignListComponent";

const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //console.log(state.Consign.listMap);
    return {
        dataSource: Object.values(state.Consign.listMap),
        enableNew: authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "ADD")!==-1
}
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            // debugger;
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