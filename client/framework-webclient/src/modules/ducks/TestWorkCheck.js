const SET_LIST = 'TestWorkCheck/SET_LIST';
const RM_CONTENT = 'TestWorkCheck/RM_CONTENT';
const SET_CONTENT = 'TestWorkCheck/SET_CONTENT';
const SET_FILTER = 'TestWorkCheck/SET_FILTER';
/**
 * @module TestWorkCheck/TestWorkCheckState
 */
/**
 * 测试工作检查表初始化state
 * @type {{listFilter: (function(): boolean), listMap: {}}}
 */
const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为TestWorkCheckData
};
/**
 * 测试工作检查表reducer
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
export const TestWorkCheckReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            return {
                ...state,
                listMap: list.reduce((listMap, TestWorkCheckData) => {
                    listMap[TestWorkCheckData.id] = TestWorkCheckData;
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
            const TestWorkCheckData = action.payload;
            const newData = {
                ...state.listMap[id],
                ...TestWorkCheckData,
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
 * 设置测试工作检查表列表
 * @param list
 * @returns {{type: string, payload: *}}
 */
export const setTestWorkCheckList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};
/**
 * 删除测试工作检查表
 * @param id
 * @returns {{type: string, payload: *}}
 */
export const removeTestWorkCheck = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};
/**
 * 新增或修改一个测试工作检查表
 * @param TestWorkCheckData
 * @returns {{type: string, payload: *}}
 */
export const setTestWorkCheckContent = (TestWorkCheckData) => {
    return {
        type: SET_CONTENT,
        payload: TestWorkCheckData,
    }
};
/**
 * 设置测试工作检查表过滤器
 * @param listFilter
 * @returns {{type: string, payload: *}}
 */
export const setTestWorkCheckFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};