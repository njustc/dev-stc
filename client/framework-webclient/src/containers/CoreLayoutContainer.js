import { connect } from 'react-redux'
import CoreLayout from 'layouts/CoreLayout'
import {setActiveKey, addTabAction, removeTabAction} from "MODULES/ducks/Layout";
import React from "react";
import {getProjectList} from "../services/ProjectService";
import {getConsignList} from "../services/ConsignService";
/**
 * @module CoreLayout/CoreLayoutContainer
 */
/**
 * 把store中的系统用户，Tab数组，当前活跃Tab键值，侧边栏数据分发给CoreLayout界面
 * @param state store数据
 * @returns {{sysUser: ({}|initialState.sysUser|sysUser), panes: (Array|*), activeKey: *, sider: ({}|initialState.siderData|siderData|Function)}}
 */
const mapStateToProps = (state) => {
    return {
        sysUser: state.System.sysUser,
        panes: state.Layout.panes,
        activeKey: state.Layout.activeKey,
        sider: state.System.siderData
    }
};
/**
 * 把store的Tab控制的Action，和从数据库获取项目，委托列表的方法分发给CoreLayout页面
 * @function
 * @param dispatch 分发action并触发state变化的方法
 * @returns {{addTab: addTab, removeTab: removeTab, switchTab: (function(*=): *), getProjectList: (function(): void), getConsignList: (function(): void)}}
 */
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
