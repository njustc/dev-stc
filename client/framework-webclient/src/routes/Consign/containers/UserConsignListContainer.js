import React, {Component,PropTypes} from 'react';
import ConsignListComponent from "../components/ConsignListComponent";
import {connect} from "react-redux";
import {
    addConsign,
    removeConsign,
    setConsignIndex,
    setConsignList,
    setFilter
} from "../../../modules/ducks/Consign"
import {UserConsignContentView} from "ROUTES/Consign";
import {deleteConsign, getConsignList, newConsign} from "SERVICES/ConsignService";
import {addTabAction} from "MODULES/ducks/Layout";

const mapStateToProps = (state) => {
    return {
        dataSource: state.Consign.list.filter(state.Consign.listFilter),
        enableNew: true,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (index) => {
            dispatch(addTabAction('id', '委托详情', UserConsignContentView));
            dispatch(setConsignIndex(index));
        },
        newConsign: () => newConsign(dispatch),
        getConsignList: () => getConsignList(dispatch),
        deleteConsign: (id) => deleteConsign(dispatch, id),
        setListFilter: (listFilter) => dispatch(setFilter(listFilter)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ConsignListComponent);
