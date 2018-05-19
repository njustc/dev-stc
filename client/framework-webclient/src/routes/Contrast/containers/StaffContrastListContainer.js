import React, {Component,PropTypes} from 'react';
import ContrastListComponent from "../component/ContrastListComponent";
import {connect} from "react-redux";
import {addTabAction, setState} from "../../../modules/ducks/Layout";
import {setContrastIndex, setFilter} from "../../../modules/ducks/Contrast"
import {StaffContrastContentView} from "../../../routes/Contrast";
//import {deleteContrast, getContrastList, putContrast} from "../../../services/ContrastService";

const mapStateToProps = (state) => {
    return {
        dataSource: state.Contrast.list.filter(state.Contrast.listFilter),
        enableNew: false,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (index) => {
            dispatch(addTabAction('id', '合同详情', StaffContrastContentView));
            dispatch(setContrastIndex(index));

        },
        setListFilter: (listFilter) => dispatch(setFilter(listFilter)),
//        getContrastList: () => getContrastList(dispatch),
//        deleteContrast: (id) => deleteContrast(dispatch, id),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContrastListComponent);