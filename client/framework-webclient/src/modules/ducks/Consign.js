const GET_LIST = 'Consign/GET_LIST';
const GET_CONTENT = 'Consign/GET_CONTENT';
const NEW = 'Consign/NEW';
const SET_CONTENT = 'Consign/SET_CONTENT'
const SET_FILTER = 'Consign/SET_FILTER'

const initialState = {
    listFilter: () => true,
    list: [{
    key: '1',
    id: '151220134',
    time: '20180527',
    status: 0,
    }, {
    key: '2',
    id: '151220078',
    time: '20180716',
    status: 1,
    }, {
    key: '3',
    id: '151220004',
    time: '20181017',
    status: 2,
    }],
    curContent: {},
    toContent: false
};

// **************
// **************

export const ConsignReducer = (state = initialState, action) => {
      switch (action.type) {
          case GET_LIST:
              return state;
          case GET_CONTENT:
              return state;
          case SET_CONTENT:
              return {
                  ...state,
                  toContent: false
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

export const getConsignList = () =>  {
    return { type: GET_LIST };
};

export const getConsignContent = (id) => {
    return {
        type: GET_CONTENT,
        payload: id,
    }
};

export const toContent = () => {
    return {
        type: SET_CONTENT,
    }
};

export const setFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter
    }
};
