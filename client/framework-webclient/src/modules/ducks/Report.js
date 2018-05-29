const TR_SET_LIST = 'TestReport/SET_LIST';
/*const RM_CONTENT = 'Contract/RM_CONTENT';
const SET_CONTENT = 'Contract/SET_CONTENT';
const SET_FILTER = 'Contract/SET_FILTER';*/
const TRC_SET_LIST = 'TestReportCheck/SET_LIST';

const initialTestReportState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ContractData
    //ContractData为对象，仍然包含id字段
};

export const TestReportReducer = (state = initialTestReportState, action) => {
    switch (action.type) {
        case TR_SET_LIST:
            const list = action.payload;
            return {
                ...state,
                listMap: list.reduce((listMap, TestReportData) => {
                    listMap[TestReportData.id] = TestReportData;
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
            const ContractData = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: ContractData,
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

export const setTestReportList = (list) => {
    return {
        type: TR_SET_LIST,
        payload: list,
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

const initialTestReportCheckState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ContractData
    //ContractData为对象，仍然包含id字段
};

export const TestReportCheckReducer = (state = initialTestReportCheckState, action) => {
    switch (action.type) {
        case TRC_SET_LIST:
            const list = action.payload;
            return {
                ...state,
                listMap: list.reduce((listMap, TestReportCheckData) => {
                    listMap[TestReportCheckData.id] = TestReportCheckData;
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
            const ContractData = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: ContractData,
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

export const setTestReportCheckList = (list) => {
    return {
        type: TRC_SET_LIST,
        payload: list,
    }
};