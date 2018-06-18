const SET_LIST = 'TestPlan/SET_LIST';
const RM_CONTENT = 'TestPlan/RM_CONTENT';
const SET_CONTENT = 'TestPlan/SET_CONTENT';
const SET_FILTER = 'TestPlan/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为TestPlantData
    //TestPlanData为对象，仍然包含id字段
};

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
            console.log(TestPlanData);
            const newData = {
                ...state.listMap[id],
                ...TestPlanData,
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

export const setTestPlanList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeTestPlan = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

export const setTestPlanContent = (TestPlanData) => {
    return {
        type: SET_CONTENT,
        payload: TestPlanData,
    }
};

export const setTestPlanFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};