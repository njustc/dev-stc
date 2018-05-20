const SET_LIST = 'Consign/SET_LIST';
const REMOVE = 'Consign/REMOVE';
const ADD = 'Consign/ADD';
const SET_INDEX = 'Consign/SET_INDEX';
const SET_STATE = 'Consign/SET_STATE';
const SET_CONTENT = 'Consign/SET_CONTENT';
const SET_FILTER = 'Consign/SET_FILTER';

const initialState = {
    listFilter: stateCode => stateCode != 'Finished',//() => true,
    list: [],
    index: -1,
};

export const ConsignReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                list: action.payload,
            };
        case REMOVE:
            return {
                ...state,
                list: state.list.filter(
                    consignData => consignData.id !== action.payload),
            };
        case ADD:
            return {
                ...state,
                list: state.list.concat([action.payload]),
            };
        case SET_STATE: {
            let {index, state} = action.payload;
            index === -1 ? index = state.index :null;
            return {
                ...state,
                list: state.list.map(
                    (consignData, idx) => idx === index ?
                        { ...consignData, state: state} : consignData
                ),
            };
        }
        case SET_INDEX:
            return {
                ...state,
                index: action.payload,
            };
        case SET_CONTENT:
            let {index, values} = action.payload;
            index === -1 ? index = state.index :null;
            return {
                ...state,
                list: state.list.map(
                    (consignData, idx) => idx === index ?
                        { ...consignData, consignation: values } : consignData
                ),
            };
        case SET_FILTER:
            return {
                ...state,
                listFilter: action.payload
            };
        default:
            return state;
    }
};

export const setConsignList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeConsign = (id) => {
    return {
        type: REMOVE,
        payload: id,
    }
};

export const addConsign = (consignData) => {
    return {
        type: ADD,
        payload: consignData,
    }
};

export const setConsignState = (index, state) => {
    return {
        type: SET_STATE,
        payload: {
            index: index,
            state: state,
        },
    }
};

export const setConsignContent = (index, values) => {
    return {
        type: SET_CONTENT,
        payload: {
            index: index,
            values: values,
        }
    }
};

export const setConsignIndex = (index) => {
    return {
        type: SET_INDEX,
        payload: index,
    }
};

export const setFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter
    }
};
