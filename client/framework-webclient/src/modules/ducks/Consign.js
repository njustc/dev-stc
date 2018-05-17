const SET_LIST = 'Consign/SET_LIST';
const SET_INDEX = 'Consign/SET_INDEX';
const SET_STATUS = 'Consign/SET_STATUS';
const SET_CONTENT = 'Consign/SET_CONTENT';
const SET_FILTER = 'Consign/SET_FILTER';

const initialState = {
    listFilter: () => true,
    list: [],
    index: -1,
};

export const ConsignReducer = (state = initialState, action) => {
      switch (action.type) {
          case SET_LIST:
              return {
                  ...state,
                  list: action.payload,
              };
          case SET_STATUS: {
              let {index, status} = action.payload;
              index === -1 ? index = state.index :null;
              const newList = state.list;
              newList[index].status = status;
              return {
                  ...state,
                  list: newList,
              };
          }
          case SET_INDEX:
              return {
                  ...state,
                  index: action.payload,
              };
          case SET_CONTENT:
              let {index, values} = action.payload;
              index === -1 ? index = state.index :null;
              const newList = state.list;
              newList[index].consignation = values;
              return {
                  ...state,
                  list: newList,
              };
          case SET_FILTER:
              return {
                  ...state,
                  listFilter: action.payload
              };
          default:
              return state;
      }
};

export const setConsignList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const setConsignStatus = (index, status) => {
    return {
        type: SET_STATUS,
        payload: {
            index: index,
            status: status,
        },
    }
};

export const setConsignContent = (index, values) => {
    return {
        type: SET_CONTENT,
        payload: {
            index: index,
            values: values,
        }
    }
};

export const setConsignIndex = (index) => {
    return {
        type: SET_INDEX,
        payload: index,
    }
};

export const setFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter
    }
};
