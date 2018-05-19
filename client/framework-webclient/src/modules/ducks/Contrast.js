const SET_LIST = 'Contrast/SET_LIST';
const REMOVE = 'Contrast/REMOVE';
const ADD = 'Contrast/ADD';
const SET_INDEX = 'Contrast/SET_INDEX';
const SET_STATE = 'Contrast/SET_STATE';
const SET_CONTENT = 'Contrast/SET_CONTENT';
const SET_FILTER = 'Contrast/SET_FILTER';

const initialState = {
    listFilter: stateCode => stateCode != 'Finished',//() => true,
    list: [],
    index: -1,
};

export const ContrastReducer = (state = initialState, action) => {
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
                    ContrastData => ContrastData.id !== action.payload),
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
                    (ContrastData, idx) => idx === index ?
                        { ...ContrastData, state: state} : ContrastData
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
                    (ContrastData, idx) => idx === index ?
                        { ...ContrastData, Contrastation: values } : ContrastData
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

export const setContrastList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeContrast = (id) => {
    return {
        type: REMOVE,
        payload: id,
    }
};

export const addContrast = (ContrastData) => {
    return {
        type: ADD,
        payload: ContrastData,
    }
};

export const setContrastState = (index, state) => {
    return {
        type: SET_STATE,
        payload: {
            index: index,
            state: state,
        },
    }
};

export const setContrastContent = (index, values) => {
    return {
        type: SET_CONTENT,
        payload: {
            index: index,
            values: values,
        }
    }
};

export const setContrastIndex = (index) => {
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
