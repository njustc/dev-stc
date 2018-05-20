import React, {Component,PropTypes} from 'react';
import {connect} from "react-redux";
import {addTabAction} from "MODULES/ducks/Layout";
import {StaffConsignContentView,UserConsignContentView} from "../../Consign";
import ProjectComponent from "../components/ProjectComponent";
const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.Project.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showContent: (id) => {
            const sysUser = JSON.parse(sessionStorage.getItem('sysUser')).username;
            const ContentView = sysUser==='marketing'?StaffConsignContentView:UserConsignContentView;
            dispatch(addTabAction(id, '委托详情', ContentView));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);