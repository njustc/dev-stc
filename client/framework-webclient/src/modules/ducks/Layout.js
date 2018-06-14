import React from "react";
import ProjectListComponent from "../../routes/Project/components/ProjectListComponent";
import {mainKey} from "LAYOUTS/CoreLayout";
const SET_STATE = "Layout/SET_STATE";
const SET_ACTIVE_KEY = "Layout/SET_ACTIVE_KEY";
const ADD_TAB = "Layout/ADD_TAB";
const REMOVE_TAB = 'Layout/REMOVE_TAB';

const initialState = {
    panes: [],
    activeKey: mainKey,
};

const  containsPane = (key, panes) => {
    for(let i=0; i<panes.length; i++) {
        if(key === panes[i].key) {
            return true;
        }
    }
    return false;
};

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
            const KEY = key + name;
            if (!containsPane(key, panes)) {
                panes.push({title: name, content: React.createElement(component, props), key: KEY});
            }
            return {
                panes: panes,
                activeKey: KEY,
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
                activeKey = mainKey;
            }
            return {
                panes: panes,
                activeKey: activeKey,
            };
        default:
            return state;
    }
};

export const setActiveKey = (activekey) => {
    return {
        type: SET_ACTIVE_KEY,
        payload: activekey
    }
};

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

export const removeTabAction = (key) => {
    return {
        type: REMOVE_TAB,
        payload: key,
    }
};
