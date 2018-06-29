const SET_LIST = 'TestWorkCheck/SET_LIST';
const RM_CONTENT = 'TestWorkCheck/RM_CONTENT';
const SET_CONTENT = 'TestWorkCheck/SET_CONTENT';
const SET_FILTER = 'TestWorkCheck/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为TestWorkCheckData
    //TestWorkCheckData为对象，仍然包含id字段
};

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

export const setTestWorkCheckList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeTestWorkCheck = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

export const setTestWorkCheckContent = (TestWorkCheckData) => {
    return {
        type: SET_CONTENT,
        payload: TestWorkCheckData,
    }
};

export const setTestWorkCheckFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};