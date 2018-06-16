const SET_LIST = 'TestReport/SET_LIST';
const RM_CONTENT = 'TestReport/RM_CONTENT';
const SET_CONTENT = 'TestReport/SET_CONTENT';
const SET_FILTER = 'TestReport/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为TestReportData
    //TestReportData为对象，仍然包含id字段
};

export const TestReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            console.log(list);
            return {
                ...state,
                listMap: list.reduce((listMap, TestReportData) => {
                    listMap[TestReportData.id] = TestReportData;
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
            const TestReportData = action.payload;
            console.log(TestReportData);
            const newData = {
                ...state.listMap[id],
                ...TestReportData,
            };
            console.log(newData);
            console.log(state.listMap[id]);
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

export const setTestReportList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeTestReport = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

export const setTestReportContent = (TestReportData) => {
    return {
        type: SET_CONTENT,
        payload: TestReportData,
    }
};

export const setTestReportFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};