import { connect } from 'react-redux'
import CoreLayout from 'layouts/CoreLayout'
import {setActiveKey, addTabAction, removeTabAction} from "MODULES/ducks/Layout";
import React from "react";

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
            dispatch(addTabAction(key, name , component));
        },
        removeTab: (targetKey) => {
            dispatch(removeTabAction(targetKey));
        },
        switchTab: (activeKey) => dispatch(setActiveKey(activeKey))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
