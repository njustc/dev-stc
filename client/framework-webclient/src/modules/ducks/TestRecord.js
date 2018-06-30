const SET_LIST = 'TestRecord/SET_LIST';
const RM_CONTENT = 'TestRecord/RM_CONTENT';
const SET_CONTENT = 'TestRecord/SET_CONTENT';
const SET_FILTER = 'TestRecord/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为TestRecordData
    //TestRecordData为对象，仍然包含id字段
};

export const TestRecordReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            console.log(list);
            return {
                ...state,
                listMap: list.reduce((listMap, TestRecordData) => {
                    listMap[TestRecordData.id] = TestRecordData;
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
            const TestRecordData = action.payload;
            // console.log(TestRecordData);
            const newData = {
                ...state.listMap[id],
                ...TestRecordData,
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

export const setTestRecordList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeTestRecord = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

export const setTestRecordContent = (TestRecordData) => {
    return {
        type: SET_CONTENT,
        payload: TestRecordData,
    }
};

export const setTestRecordFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};