const SET_LIST = 'TestCase/SET_LIST';
const RM_CONTENT = 'TestCase/RM_CONTENT';
const SET_CONTENT = 'TestCase/SET_CONTENT';
const SET_FILTER = 'TestCase/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为TestCaseData
    //TestCaseData为对象，仍然包含id字段
    casesMap: { },
};

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
            const cases = action.payload;
            //console.log(cases);
            return {
                ...state,
                casesMap: cases.reduce((casesMap, TestCaseData) => {
                    casesMap[TestCaseData.id] = TestCaseData;
                    return casesMap;
                }, {}),
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

export const setTestCaseList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeTestCase = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

export const setTestCaseContent = (cases/*TestCaseData*/) => {
    return {
        type: SET_CONTENT,
        payload: cases/*TestCaseData*/,
    }
};

export const setTestCaseFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};