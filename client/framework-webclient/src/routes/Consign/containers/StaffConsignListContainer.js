import React, {Component,PropTypes} from 'react';
import ConsignListComponent from "../components/ConsignListComponent";
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
//import {setConsignIndex, setConsignState, setFilter} from "MODULES/ducks/Consign"
import {StaffConsignContentView} from "ROUTES/Consign";
import {deleteConsign, getConsignContent, updateConsign} from "SERVICES/ConsignService";
import {setConsignFilter} from "../../../modules/ducks/Consign";

const mapStateToProps = (state) => {
    return {
        dataSource: state.Consign.list.filter(state.Consign.listFilter),
        enableNew: false,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (index) => {
            dispatch(addTabAction('id', '委托详情', StaffConsignContentView));
            getConsignContent(dispatch, index, id);
            dispatch(setConsignIndex(index));

        },
        setListFilter: (listFilter) => dispatch(setConsignFilter(listFilter)),
        getConsignList: () => getConsignList(dispatch),
        deleteConsign: (id) => deleteConsign(dispatch, id),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignListComponent);
