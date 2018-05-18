import React, {Component,PropTypes} from 'react';
import ConsignListComponent from "../components/ConsignListComponent";
import {connect} from "react-redux";
import {addTabAction, setState} from "../../../modules/ducks/Layout";
import {setConsignIndex, setConsignList, setConsignState, setFilter} from "../../../modules/ducks/Consign"
import {StaffConsignContentView} from "ROUTES/Consign";
import {httpDelete, httpGet} from "UTILS/FetchUtil";
import {deleteConsign, getConsignList} from "SERVICES/ConsignService";

// todo: 利用第二个参数ownProps来过滤，实现搜索，ownProps是被显示传入的属性值，不包括map进去的
const mapStateToProps = (state, ownProps) => {
    return {
        dataSource: state.Consign.list.filter(state.Consign.listFilter),
        enableNew: false,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showContent: (index) => {
            dispatch(addTabAction('委托详情', StaffConsignContentView));
            dispatch(setConsignIndex(index));
        },
        setListFilter: (newlistFilter) => dispatch(setFilter(newlistFilter)),
        getConsignList: () => getConsignList(dispatch),
        deleteConsign: (id) => deleteConsign(dispatch, id),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignListComponent);
