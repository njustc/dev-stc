const GET_LIST = 'Consign/GET_LIST';
const GET_CONTENT = 'Consign/GET_CONTENT';
const NEW = 'Consign/NEW';
const SET_CONTENT = 'Consign/SET_CONTENT'
const SET_FILTER = 'Consign/SET_FILTER'

const initialState = {
    listFilter: () => true,
    list: [
        {
            "processInstanceID": "17505",
            "status": 'TobeSubmit',
            "createdUserId": "1",
            "createdTime": "2018-05-15 01:10:55",
            "id": "f7a38ffa-22d2-4214-9c70-578c1211ed8b",
            "consignation": ""
        },
        {
            "processInstanceID": "17513",
            "status": 'TobeSubmit',
            "createdUserId": "1",
            "createdTime": "2018-05-15 01:13:38",
            "id": "2d9ce647-f95b-426e-8ebb-17340199c7db",
            "consignation": ""
        }
    ],
    curContent: {},
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
