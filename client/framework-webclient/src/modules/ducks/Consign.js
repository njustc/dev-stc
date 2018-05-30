const SET_LIST = 'Consign/SET_LIST';
const RM_CONTENT = 'Consign/RM_CONTENT';
const SET_CONTENT = 'Consign/SET_CONTENT';
const SET_FILTER = 'Consign/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ConsignData
    //ConsignData为对象，仍然包含id字段
};

export const ConsignReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            console.log(list);
            return {
                ...state,
                listMap: list.reduce((listMap, ConsignData) => {
                    listMap[ConsignData.id] = ConsignData;
                    return listMap;
                }, {}),
            };
        case RM_CONTENT:
            const id = action.payload;
            const newListMap = state.listMap;
            delete newListMap[id];
            return {
                ...state,
                listMap: newListMap
            };
        case SET_CONTENT: {
            const {id} = action.payload;
            const ConsignData = action.payload;
            const newData = {
                ...ConsignData,
                ...state.listMap[id],
            };
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: newData,
                },
            };
        }
        case SET_FILTER:
            const listFilter = action.payload;
            return {
                ...state,
                listFilter: listFilter,
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
        type: RM_CONTENT,
        payload: id,
    }
};

export const setConsignContent = (ConsignData) => {
    return {
        type: SET_CONTENT,
        payload: ConsignData,
    }
};

export const setConsignFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};