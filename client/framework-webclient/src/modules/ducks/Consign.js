const SET_LIST = 'Consign/SET_LIST';
const RM_CONTENT = 'Consign/RM_CONTENT';
const SET_CONTENT = 'Consign/SET_CONTENT';
const SET_FILTER = 'Consign/SET_FILTER';
/**
 * @module Consign/ConsignState
 */
/**
 * 委托初始化state
 * @type {{listFilter: (function(): boolean), listMap: {}}}
 */
const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ConsignData
    //ConsignData为对象，仍然包含id字段
};
/**
 * 委托Reducer
 * @param state 当前状态
 * @param action 传入的action
 * @returns {*} 返回新状态
 * @constructor
 */
export const ConsignReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            // console.log(list);
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
                ...state.listMap[id],
                ...ConsignData,
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
 * 设置委托列表
 * @function
 * @param list 委托列表
 * @returns {{type: string, payload: *}}
 */
export const setConsignList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};
/**
 * 删除委托
 * @function
 * @param id 需要删除的委托id
 * @returns {{type: string, payload: *}}
 */
export const removeConsign = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};
/**
 * 新增一个委托，或修改一个委托的内容
 * @function
 * @param ConsignData 新增或需要修改的委托单
 * @returns {{type: string, payload: *}}
 */
export const setConsignContent = (ConsignData) => {
    return {
        type: SET_CONTENT,
        payload: ConsignData,
    }
};
/**
 * 设置委托过滤器
 * @function
 * @param listFilter 过滤条件
 * @returns {{type: string, payload: *}}
 */
export const setConsignFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};