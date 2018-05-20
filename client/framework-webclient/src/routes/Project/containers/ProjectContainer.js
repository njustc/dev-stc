import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {StaffConsignContentView,UserConsignContentView} from "../../Consign";
const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.Project.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            const sysUser = sessionStorage.getItem('sysUser')
            const ContentView = sysUser==='customer'?UserConsignContentView:StaffConsignContentView;
            dispatch(addTabAction(id, '委托详情', ContentView));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);