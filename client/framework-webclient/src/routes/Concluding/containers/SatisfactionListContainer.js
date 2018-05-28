import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
/*import {ConsignContentView} from "../../Consign";
import {getConsignList} from "../../../services/ConsignService";
import {setConsignFilter} from "../../../modules/ducks/Consign";*/
import SatisfactionListComponent from "../components/SatisfactionListComponent";

const mapStateToProps = (state) => {
    return {
        //dataSource: Object.values(state.Consign.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {/*
        showContent: (id) => {
            dispatch(addTabAction(id, '委托详情', ConsignContentView));
//            dispatch(setConsignContent())
        },
        setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getConsignList: () => getConsignList(dispatch)*/
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SatisfactionListComponent);