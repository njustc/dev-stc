const SET_LIST = 'TestCase/SET_LIST';
const RM_CONTENT = 'TestCase/RM_CONTENT';
const SET_CONTENT = 'TestCase/SET_CONTENT';
const SET_FILTER = 'TestCase/SET_FILTER';

/**
 * @module TestCase/TestCaseState
 */
/**
 * 测试用例表初始化state
 * @type {{listFilter: (function(): boolean), listMap: {}, casesMap: {}}}
 */
const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: {},  //项目集合，用key-value表示，key为id，value为TestCaseData
    //TestCaseData为对象，仍然包含id字段
    casesMap: { },
};

/**
 * 测试用例表Reducer
 * @param state 当前状态
 * @param action 传入的action
 * @returns {*} 返回新状态
 * @constructor
 */
export const TestCaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            //console.log(list);
            return {
                ...state,
                listMap: list.reduce((listMap, TestCaseData) => {
                    listMap[TestCaseData.id] = TestCaseData;
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
            /*const {id} = action.payload;
            const TestCaseData = action.payload;
            console.log(TestCaseData);
            const newData = {
                ...state.listMap[id],
                ...TestCaseData,
            };
            console.log(newData);
            console.log(state.listMap[id]);
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: newData,
                },*/
            /*TODO*/
            //console.log(cases);
            return {
                ...state,
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
 * 设置测试用例表列表
 * @function
 * @param list 测试用例表列表
 * @returns {{type: string, payload: *}}
 */
export const setTestCaseList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

/**
 * 删除测试用例表
 * @function
 * @param id 需要删除的测试用例表id
 * @returns {{type: string, payload: *}}
 */
export const removeTestCase = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

/**
 * 新增一个测试用例表，或修改一个测试用例表的内容
 * @param cases 新增或需要修改的测试用例表
 * @returns {{type: string, payload: *}}
 */
export const setTestCaseContent = (cases/*TestCaseData*/) => {
    return {
        type: SET_CONTENT,
        payload: cases/*TestCaseData*/,
    }
};

/**
 * 设置测试用例表过滤器
 * @function
 * @param listFilter 过滤条件
 * @returns {{type: string, payload: *}}
 */
export const setTestCaseFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};