import React from "react";

const SET_STATE = "Layout/SET_STATE";
const SET_ACTIVEKEY = "Layout/SET_ACTIVEKEY"

const initialState = {
    panes: [],
    activeKey: ''
};

export const LayoutReducer = (state = initialState, action) =>{
    switch(action.type) {
        case SET_STATE:
            return action.payload;
        case SET_ACTIVEKEY:
            return {
                ...state,
                activeKey: action.payload
            };
        default:
            return state;
    }
};

export const setState = (newState) =>{
    return {
        type: SET_STATE,
        payload: newState
    };
};

export const setActiveKey = (activekey) => {
    return {
        type: SET_ACTIVEKEY,
        payload: activekey
    }
};