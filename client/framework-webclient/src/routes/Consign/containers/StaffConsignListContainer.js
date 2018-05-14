import React, {Component,PropTypes} from 'react';
import ConsignListComponent from "../components/ConsignListComponent";
import {connect} from "react-redux";
import {addTabAction, setState} from "../../../modules/ducks/Layout";
import {setFilter} from "../../../modules/ducks/Consign"
import {StaffConsignContentView} from "ROUTES/Consign";

// todo: 利用第二个参数ownProps来过滤，实现搜索，ownProps是被显示传入的属性值，不包括map进去的
const mapStateToProps = (state, ownProps) => {
    return {
        dataSource: state.Consign.list.filter(state.Consign.listFilter),
        enableNew: false,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showContent: () => dispatch(addTabAction('details', '委托详情', StaffConsignContentView)),
        setListFilter: (newlistFilter) => dispatch(setFilter(newlistFilter)),
        deleteConsign: (id) => {
            console.log('delete', id);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignListComponent);
