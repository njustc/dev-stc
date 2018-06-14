const TPG_SET_LIST = 'TestPlan/SET_LIST';
const TPG_SET_CONTENT = 'TestPlan/SET_CONTENT';
const TC_SET_LIST = 'TestCase/SET_LIST';
const TR_SET_LIST = 'TestRecord/SET_LIST';
const TPB_SET_LIST = 'TestProblem/SET_LIST';
/*const RM_CONTENT = 'TestRecord/RM_CONTENT';
const SET_CONTENT = 'TestRecord/SET_CONTENT';
const SET_FILTER = 'TestRecord/SET_FILTER';*/

const initialTestPlanState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ConsignData
    //ConsignData为对象，仍然包含id字段
};
const initialTestCaseState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ConsignData
    //ConsignData为对象，仍然包含id字段
};
const initialTestRecordState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ConsignData
    //ConsignData为对象，仍然包含id字段
};
const initialTestProblemState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ConsignData
    //ConsignData为对象，仍然包含id字段
};

export const TestPlanReducer = (state = initialTestPlanState, action) => {
    switch (action.type) {
        case TPG_SET_LIST:
            const list = action.payload;
            return {
                ...state,
                listMap: list.reduce((listMap, TestPlanData) => {
                    listMap[TestPlanData.id] = TestPlanData;
                    return listMap;
                }, {}),
            };
        case TPG_SET_CONTENT: {
            const {id} = action.payload;
            const TestPlanData = action.payload;
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
        default:
            return state;
    }
};

export const setTestPlanList = (list) => {
    return {
        type: TPG_SET_LIST,
        payload: list,
    }
};

export const setTestPlanContent = (data) => {
    return {
        type: TPG_SET_CONTENT,
        payload: data,
    }
};

export const TestCaseReducer = (state = initialTestCaseState, action) => {
    switch (action.type) {
        case TC_SET_LIST:
            const list = action.payload;
            return {
                ...state,
                listMap: list.reduce((listMap, TestCaseData) => {
                    listMap[TestCaseData.id] = TestCaseData;
                    return listMap;
                }, {}),
            };
        /*case RM_CONTENT:
            const id = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: undefined,
                },
            };
        case SET_CONTENT: {
            const {id} = action.payload;
            const ConsignData = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: ConsignData,
                },
            };
        }
        case SET_FILTER:
            const listFilter = action.payload;
            return {
                ...state,
                listFilter: listFilter,
            };*/
        default:
            return state;
    }
};

export const setTestCaseList = (list) => {
    return {
        type: TC_SET_LIST,
        payload: list,
    }
};

export const TestRecordReducer = (state = initialTestRecordState, action) => {
    switch (action.type) {
        case TR_SET_LIST:
            const list = action.payload;
            return {
                ...state,
                listMap: list.reduce((listMap, TestRecordData) => {
                    listMap[TestRecordData.id] = TestRecordData;
                    return listMap;
                }, {}),
            };
        /*case RM_CONTENT:
            const id = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: undefined,
                },
            };
        case SET_CONTENT: {
            const {id} = action.payload;
            const ConsignData = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: ConsignData,
                },
            };
        }
        case SET_FILTER:
            const listFilter = action.payload;
            return {
                ...state,
                listFilter: listFilter,
            };*/
        default:
            return state;
    }
};

export const setTestRecordList = (list) => {
    return {
        type: TR_SET_LIST,
        payload: list,
    }
};

export const TestProblemReducer = (state = initialTestProblemState, action) => {
    switch (action.type) {
        case TPB_SET_LIST:
            const list = action.payload;
            return {
                ...state,
                listMap: list.reduce((listMap, TestProblemData) => {
                    listMap[TestProblemData.id] = TestProblemData;
                    return listMap;
                }, {}),
            };
        /*case RM_CONTENT:
            const id = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: undefined,
                },
            };
        case SET_CONTENT: {
            const {id} = action.payload;
            const ConsignData = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: ConsignData,
                },
            };
        }
        case SET_FILTER:
            const listFilter = action.payload;
            return {
                ...state,
                listFilter: listFilter,
            };*/
        default:
            return state;
    }
};

export const setTestProblemList = (list) => {
    return {
        type: TPB_SET_LIST,
        payload: list,
    }
};