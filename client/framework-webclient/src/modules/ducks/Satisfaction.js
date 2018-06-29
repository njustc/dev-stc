const SET_LIST = 'Satisfaction/SET_LIST';
const RM_CONTENT = 'Satisfaction/RM_CONTENT';
const SET_CONTENT = 'Satisfaction/SET_CONTENT';
const SET_FILTER = 'Satisfaction/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为SatisfactionData
    //SatisfactionData为对象，仍然包含id字段
};

export const SatisfactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            console.log(list);
            return {
                ...state,
                listMap: list.reduce((listMap, SatisfactionData) => {
                    listMap[SatisfactionData.id] = SatisfactionData;
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
            const SatisfactionData = action.payload;
            const newData = {
                ...state.listMap[id],
                ...SatisfactionData,
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

export const setSatisfactionList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeSatisfaction = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

export const setSatisfactionContent = (SatisfactionData) => {
    return {
        type: SET_CONTENT,
        payload: SatisfactionData,
    }
};

export const setSatisfactionFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};