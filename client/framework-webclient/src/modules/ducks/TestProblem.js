const SET_LIST = 'TestProblem/SET_LIST';
const RM_CONTENT = 'TestProblem/RM_CONTENT';
const SET_CONTENT = 'TestProblem/SET_CONTENT';
const SET_FILTER = 'TestProblem/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为TestProblemData
    //TestProblemData为对象，仍然包含id字段
    problemsMap: { },
};

export const TestProblemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            //console.log(list);
            return {
                ...state,
                listMap: list.reduce((listMap, TestProblemData) => {
                    listMap[TestProblemData.id] = TestProblemData;
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
            const TestProblemData = action.payload;
            console.log(TestProblemData);
            const newData = {
                ...state.listMap[id],
                ...TestProblemData,
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
                problemsMap: cases.reduce((problemsMap, TestProblemData) => {
                    problemsMap[TestProblemData.id] = TestProblemData;
                    return problemsMap;
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

export const setTestProblemList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeTestProblem = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

export const setTestProblemContent = (cases/*TestProblemData*/) => {
    return {
        type: SET_CONTENT,
        payload: cases/*TestProblemData*/,
    }
};

export const setTestProblemFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};