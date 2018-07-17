const SET_LIST = 'Satisfaction/SET_LIST';
const RM_CONTENT = 'Satisfaction/RM_CONTENT';
const SET_CONTENT = 'Satisfaction/SET_CONTENT';
const SET_FILTER = 'Satisfaction/SET_FILTER';
/**
 * @module Satisfaction/SatisfactionState
 */
/**
 * 满意度调查表初始化state
 * @type {{listFilter: (function(): boolean), listMap: {}}}
 */
const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为SatisfactionData
};
/**
 * 满意度调查表reducer
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
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
/**
 * 设置满意度调查表列表
 * @param list
 * @returns {{type: string, payload: *}}
 */
export const setSatisfactionList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};
/**
 * 删除满意度调查表
 * @param id
 * @returns {{type: string, payload: *}}
 */
export const removeSatisfaction = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};
/**
 * 新增或修改一个满意度调查表
 * @param SatisfactionData
 * @returns {{type: string, payload: *}}
 */
export const setSatisfactionContent = (SatisfactionData) => {
    return {
        type: SET_CONTENT,
        payload: SatisfactionData,
    }
};
/**
 * 设置满意度调查表过滤器
 * @param listFilter
 * @returns {{type: string, payload: *}}
 */
export const setSatisfactionFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};