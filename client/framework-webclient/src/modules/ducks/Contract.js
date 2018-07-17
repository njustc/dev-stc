const SET_LIST = 'Contract/SET_LIST';
const RM_CONTENT = 'Contract/RM_CONTENT';
const SET_CONTENT = 'Contract/SET_CONTENT';
const SET_FILTER = 'Contract/SET_FILTER';
/**
 * @module Contract/ContractState
 */
/**
 * 合同初始化state
 * @type {{listFilter: (function(): boolean), listMap: {}}}
 */
const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ContractData
};
/**
 * 合同reducer
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
export const ContractReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            // console.log(list);
            return {
                ...state,
                listMap: list.reduce((listMap, ContractData) => {
                    listMap[ContractData.id] = ContractData;
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
            const ContractData = action.payload;
            // console.log(ContractData);
            const newData = {
                ...state.listMap[id],
                ...ContractData,
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
/**
 * 设置合同列表
 * @param list
 * @returns {{type: string, payload: *}}
 */
export const setContractList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};
/**
 * 删除合同
 * @param id
 * @returns {{type: string, payload: *}}
 */
export const removeContract = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};
/**
 * 新增一个合同或修改一个合同的内容
 * @param ContractData
 * @returns {{type: string, payload: *}}
 */
export const setContractContent = (ContractData) => {
    return {
        type: SET_CONTENT,
        payload: ContractData,
    }
};
/**
 * 设置合同过滤器
 * @param listFilter
 * @returns {{type: string, payload: *}}
 */
export const setContractFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};