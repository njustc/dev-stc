import React from "react";
import ProjectListComponent from "../../routes/Project/components/ProjectListComponent";
import {mainKey} from "LAYOUTS/CoreLayout";
const SET_STATE = "Layout/SET_STATE";
const SET_ACTIVE_KEY = "Layout/SET_ACTIVE_KEY";
const ADD_TAB = "Layout/ADD_TAB";
const REMOVE_TAB = 'Layout/REMOVE_TAB';
/**
 * @module CoreLayout/LayoutState
 */
/**
 * 主页面初始化状态，Tab数组为空，活跃键也为空
 * @type {{panes: Array, activeKey: string}}
 */
const initialState = {
    panes: [],
    activeKey: "",
};
/**
 * 判断数组里是否包含含有某个键的元素
 * @param key 需要搜索的键
 * @param panes 目标数组
 * @returns {boolean} 如果数组中存在该元素则返回true，否则false
 */
const  containsPane = (key, panes) => {
    for(let i=0; i<panes.length; i++) {
        if(key === panes[i].key) {
            return true;
        }
    }
    return false;
};
/**
 * 主页面reducer
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
export const LayoutReducer = (state = initialState, action) =>{
    switch(action.type) {
        case SET_ACTIVE_KEY:
            return {
                ...state,
                activeKey: action.payload
            };
        case ADD_TAB: {
            // debugger;
            const panes = state.panes.slice();
            const {key, name, component, props} = action.payload;
            if (!containsPane(key, panes)) {
                panes.push({title: name, content: React.createElement(component, props), key: key});
            }
            return {
                panes: panes,
                activeKey: key,
            };
        }
        case REMOVE_TAB:
            let lastIndex = -1;
            const targetKey = action.payload;
            let {panes, activeKey} = state;
            panes.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
            panes = panes.filter(pane => pane.key !== targetKey);
            if (lastIndex >= 0 && activeKey === targetKey) {
                activeKey = panes[lastIndex].key;
            }
            else if (lastIndex < 0 && panes.length > 0) {
                activeKey = panes[0].key;
            }
            else {
                activeKey = "";
            }
            return {
                panes: panes,
                activeKey: activeKey,
            };
        default:
            return state;
    }
};
/**
 * 设置当前活跃的键，使当前页面切换到该键值对应的页面
 * @param activekey
 * @returns {{type: string, payload: *}}
 */
export const setActiveKey = (activekey) => {
    return {
        type: SET_ACTIVE_KEY,
        payload: activekey
    }
};
/**
 * 依据参数新增一个页面
 * @param key 键值
 * @param name 页面名
 * @param component 对应组件
 * @param props ownprops参数
 * @returns {{type: string, payload: {key: *, name: *, component: *, props: *}}}
 */
export const addTabAction = (key, name, component, props) => {
    return {
        type: ADD_TAB,
        payload: {
            key: key,
            name: name,
            component: component,
            props: props,
        },
    }
};
/**
 * 依据键值删除页面
 * @param key
 * @returns {{type: string, payload: *}}
 */
export const removeTabAction = (key) => {
    return {
        type: REMOVE_TAB,
        payload: key,
    }
};
