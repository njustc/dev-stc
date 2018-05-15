const SET_LIST = 'Consign/SET_LIST';
const SET_INDEX = 'Consign/SET_INDEX';
const SET_STATUS = 'Consign/SET_STATUS';
const SET_FILTER = 'Consign/SET_FILTER';

const initialState = {
    listFilter: () => true,
    list: [],
    index: -1,
};

// **************
// **************

export const ConsignReducer = (state = initialState, action) => {
      switch (action.type) {
          case SET_LIST:
              return {
                  ...state,
                  list: action.payload,
              };
          case SET_STATUS:
              const {index, status} = action.payload;
              const newList = state.list;
              newList[index].status = status;
              return {
                  ...state,
                  list: newList,
              };
          case SET_INDEX:
              return {
                  ...state,
                  index: action.payload,
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
