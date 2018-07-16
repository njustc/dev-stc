const SET_LIST = 'TestPlan/SET_LIST';
const RM_CONTENT = 'TestPlan/RM_CONTENT';
const SET_CONTENT = 'TestPlan/SET_CONTENT';
const SET_FILTER = 'TestPlan/SET_FILTER';
/**
 * @module TestPlan/TestPlanState
 */
/**
 * 测试方案初始化state
 * @type {{listFilter: (function(): boolean), listMap: {}}}
 */
const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为TestPlantData
    //TestPlanData为对象，仍然包含id字段
};

/**
 * 测试方案Reducer
 * @param state 当前状态
 * @param action 传入的action
 * @returns {*} 返回新状态
 * @constructor
 */
export const TestPlanReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            console.log(list);
            return {
                ...state,
                listMap: list.reduce((listMap, TestPlanData) => {
                    listMap[TestPlanData.id] = TestPlanData;
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
            const TestPlanData = action.payload;
            // console.log(TestPlanData);
            const newData = {
                ...state.listMap[id],
                ...TestPlanData,
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
 * 设置测试方案列表
 * @param list 测试方案列表
 * @returns {{type: string, payload: *}}
 */
export const setTestPlanList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

/**
 * 删除测试方案
 * @param id 需要删除的测试方案id
 * @returns {{type: string, payload: *}}
 */
export const removeTestPlan = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

/**
 * 新增一个测试方案，或修改一个测试方案的内容
 * @param TestPlanData 新增或需要修改的测试方案
 * @returns {{type: string, payload: *}}
 */
export const setTestPlanContent = (TestPlanData) => {
    return {
        type: SET_CONTENT,
        payload: TestPlanData,
    }
};

/**
 * 设置测试方案过滤器
 * @param listFilter 过滤条件
 * @returns {{type: string, payload: *}}
 */
export const setTestPlanFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};