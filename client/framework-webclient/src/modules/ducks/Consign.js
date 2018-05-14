const SET_LIST = 'Consign/SET_LIST';
const SET_STATUS = 'Consign/SET_STATUS';
const SET_FILTER = 'Consign/SET_FILTER';

const initialState = {
    listFilter: () => true,
    list: [
        // {
        //     "processInstanceID": "17505",
        //     "status": 'TobeSubmit',
        //     "createdUserId": "1",
        //     "createdTime": "2018-05-15 01:10:55",
        //     "id": "f7a38ffa-22d2-4214-9c70-578c1211ed8b",
        //     "consignation": ""
        // },
        // {
        //     "processInstanceID": "17513",
        //     "status": 'TobeSubmit',
        //     "createdUserId": "1",
        //     "createdTime": "2018-05-15 01:13:38",
        //     "id": "2d9ce647-f95b-426e-8ebb-17340199c7db",
        //     "consignation": ""
        // }
    ],
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

export const setFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter
    }
};
