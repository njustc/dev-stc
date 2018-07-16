import { connect } from 'react-redux'
import CoreLayout from 'layouts/CoreLayout'
import {setActiveKey, addTabAction, removeTabAction} from "MODULES/ducks/Layout";
import React from "react";
import {getProjectList} from "../services/ProjectService";
import {getConsignList} from "../services/ConsignService";

const mapStateToProps = (state) => {
    // console.log(state.Layout.panes);
    return {
        sysUser: state.System.sysUser,
        panes: state.Layout.panes,
        activeKey: state.Layout.activeKey,
        sider: state.System.siderData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTab: (key, name, component) => {
            getProjectList(dispatch);
            dispatch(addTabAction(key, name , component));
        },
        removeTab: (targetKey) => {
            dispatch(removeTabAction(targetKey));
        },
        switchTab: (activeKey) => dispatch(setActiveKey(activeKey)),
        getProjectList: () => getProjectList(dispatch),
        getConsignList: () => getConsignList(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
