import React, {Component,PropTypes} from 'react';
import ConsignListComponent from "../components/ConsignListComponent";
import {connect} from "react-redux";
import {addTabAction, setState} from "MODULES/ducks/Layout";
import {setConsignIndex, setConsignState, setFilter} from "MODULES/ducks/Consign"
import {StaffConsignContentView} from "ROUTES/Consign";
import {deleteConsign, getConsignList} from "SERVICES/ConsignService";

const mapStateToProps = (state) => {
    return {
        dataSource: state.Consign.list.filter(state.Consign.listFilter),
        enableNew: false,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (index) => {
            dispatch(addTabAction('委托详情', StaffConsignContentView));
            dispatch(setConsignIndex(index));
        },
        setListFilter: (listFilter) => dispatch(setFilter(listFilter)),
        getConsignList: () => getConsignList(dispatch),
        deleteConsign: (id) => deleteConsign(dispatch, id),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignListComponent);
