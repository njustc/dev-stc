const S_SET_LIST = 'Satisfaction/SET_LIST';
const S_SET_CONTENT = 'Satisfaction/SET_CONTENT';
const TWC_SET_LIST = 'TestWorkCheck/SET_LIST';
const TWC_SET_CONTENT = 'TestWorkCheck/SET_CONTENT';

/*const RM_CONTENT = 'Contract/RM_CONTENT';
const SET_CONTENT = 'Contract/SET_CONTENT';
const SET_FILTER = 'Contract/SET_FILTER';*/

const initialSatisfactionState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ContractData
    //ContractData为对象，仍然包含id字段
};

export const SatisfactionReducer = (state = initialSatisfactionState, action) => {
    switch (action.type) {
        case S_SET_LIST:
            const list = action.payload;
            return {
                ...state,
                listMap: list.reduce((listMap, SatisfactionData) => {
                    listMap[SatisfactionData.id] = SatisfactionData;
                    return listMap;
                }, {}),
            };
        // case RM_CONTENT:
        //     const id = action.payload;
        //     return {
        //         ...state,
        //         listMap: {
        //             ...state.listMap,
        //             [id]: undefined,
        //         },
        //     };
        case S_SET_CONTENT:
            const {id} = action.payload;
            const SatisfactionData = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: SatisfactionData,
                },
            };
        // case SET_FILTER:
        //     const listFilter = action.payload;
        //     return {
        //         ...state,
        //         listFilter: listFilter,
        //     };
        default:
            return state;
    }
};

export const setSatisfactionList = (list) => {
    return {
        type: S_SET_LIST,
        payload: list,
    }
};

export const setSatisfactionContent = (data) =>{
    return {
        type: S_SET_CONTENT,
        payload: data
    }
};
/*
export const removeContract = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};
export const setContractContent = (ContractData) => {
    return {
        type: SET_CONTENT,
        payload: ContractData,
    }
};
export const setContractFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};
*/

const initialTestWorkCheckState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ContractData
    //ContractData为对象，仍然包含id字段
};

export const TestWorkCheckReducer = (state = initialTestWorkCheckState, action) => {
    switch (action.type) {
        case TWC_SET_LIST:
            const list = action.payload;
            return {
                ...state,
                listMap: list.reduce((listMap, TestWorkCheckData) => {
                    listMap[TestWorkCheckData.id] = TestWorkCheckData;
                    return listMap;
                }, {}),
            };
        // case RM_CONTENT:
        //     const id = action.payload;
        //     return {
        //         ...state,
        //         listMap: {
        //             ...state.listMap,
        //             [id]: undefined,
        //         },
        //     };
        case TWC_SET_CONTENT: {
            const {id} = action.payload;
            const TWCData = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: TWCData,
                },
            };
        }
        // case SET_FILTER:
        //     const listFilter = action.payload;
        //     return {
        //         ...state,
        //         listFilter: listFilter,
        //     };
        default:
            return state;
    }
};

export const setTestWorkCheckList = (list) => {
    return {
        type: TWC_SET_LIST,
        payload: list,
    }
};

export const setTestWorkCheckContent = (data) =>{
    return {
        type: TWC_SET_CONTENT,
        payload: data
    }
};