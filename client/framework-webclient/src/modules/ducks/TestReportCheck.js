const SET_LIST = 'TestReportCheck/SET_LIST';
const RM_CONTENT = 'TestReportCheck/RM_CONTENT';
const SET_CONTENT = 'TestReportCheck/SET_CONTENT';
const SET_FILTER = 'TestReportCheck/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为TestReportCheckData
    //TestReportCheckData为对象，仍然包含id字段
};

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
            console.log(TestReportCheckData);
            const newData = {
                ...state.listMap[id],
                ...TestReportCheckData,
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

export const setTestReportCheckList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeTestReportCheck = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

export const setTestReportCheckContent = (TestReportCheckData) => {
    return {
        type: SET_CONTENT,
        payload: TestReportCheckData,
    }
};

export const setTestReportCheckFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};