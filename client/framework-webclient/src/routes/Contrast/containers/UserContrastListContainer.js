import React, {Component,PropTypes} from 'react';
import ContrastListComponent from "../component/ContrastListComponent";
import {connect} from "react-redux";
import {
    addContrast,
    removeContrast,
    setContrastIndex,
    setContrastList,
    setFilter
} from "../../../modules/ducks/Contrast"
import {UserContrastContentView} from "ROUTES/Contrast";
//import {deleteContrast, getContrastContent, getContrastList, newContrast} from "SERVICES/ContrastService";
import {addTabAction} from "MODULES/ducks/Layout";

const mapStateToProps = (state) => {
    return {
        dataSource: state.Contrast.list.filter(state.Contrast.listFilter),
        enableNew: true,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (index, id) => {
            dispatch(addTabAction('id', '合同详情', UserContrastContentView));
            getContrastContent(dispatch, index, id);
            dispatch(setContrastIndex(index));
        },
        newContrast: () => console.log('new a Contrast here'),//newContrast(dispatch),
//        getContrastList: () => getContrastList(dispatch),
//        deleteContrast: (id) => deleteContrast(dispatch, id),
        setListFilter: (listFilter) => dispatch(setFilter(listFilter)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ContrastListComponent);
