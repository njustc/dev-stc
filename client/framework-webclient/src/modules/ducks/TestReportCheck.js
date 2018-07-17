const SET_LIST = 'TestReportCheck/SET_LIST';
const RM_CONTENT = 'TestReportCheck/RM_CONTENT';
const SET_CONTENT = 'TestReportCheck/SET_CONTENT';
const SET_FILTER = 'TestReportCheck/SET_FILTER';

/**
 * @module TestReportCheck/TestReportCheckState
 */

/**
 * 测试报告检查表初始化state
 * @type {{listFilter: (function(): boolean), listMap: {}}}
 */
const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为TestReportCheckData
    //TestReportCheckData为对象，仍然包含id字段
};

/**
 * 测试报告检查表Reducer
 * @param state 当前状态
 * @param action 传入的action
 * @returns {*} 返回新状态
 * @constructor
 */
export const TestReportCheckReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            console.log(list);
            return {
                ...state,
                listMap: list.reduce((listMap, TestReportCheckData) => {
                    listMap[TestReportCheckData.id] = TestReportCheckData;
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
            const TestReportCheckData = action.payload;
            // console.log(TestReportCheckData);
            const newData = {
                ...state.listMap[id],
                ...TestReportCheckData,
            };
            // console.log(newData);
            // console.log(state.listMap[id]);
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
 * 设置测试报告检查表列表
 * @function
 * @param list 测试报告检查表列表
 * @returns {{type: string, payload: *}}
 */
export const setTestReportCheckList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

/**
 * 删除测试报告检查表
 * @function
 * @param id 需要删除的测试报告检查表id
 * @returns {{type: string, payload: *}}
 */
export const removeTestReportCheck = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

/**
 * 新增一个测试报告检查表，或修改一个测试报告检查表的内容
 * @param TestReportCheckData 新增或需要修改的测试报告检查表
 * @returns {{type: string, payload: *}}
 */
export const setTestReportCheckContent = (TestReportCheckData) => {
    return {
        type: SET_CONTENT,
        payload: TestReportCheckData,
    }
};

/**
 * 设置测试报告检查表过滤器
 * @function
 * @param listFilter 过滤条件
 * @returns {{type: string, payload: *}}
 */
export const setTestReportCheckFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};