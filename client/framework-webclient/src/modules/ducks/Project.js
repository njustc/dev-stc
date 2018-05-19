const SET_LIST = 'Project/SET_LIST';
const REMOVE = 'Project/REMOVE';
const ADD = 'Project/ADD';
const SET_INDEX = 'Project/SET_INDEX';
const SET_STATE = 'Project/SET_STATE';
const SET_CONTENT = 'Project/SET_CONTENT';
const SET_FILTER = 'Project/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    list: [],//项目列表，每个列表项是一个对象
    index: -1,
};

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                list: action.payload,
            };
        case REMOVE:
            return {
                ...state,
                list: state.list.filter(
                    ProjectData => ProjectData.id !== action.payload),
            };
        case ADD:
            return {
                ...state,
                list: state.list.concat([action.payload]),
            };
        case SET_STATE: {
            let {index, state} = action.payload;
            index === -1 ? index = state.index :null;
            return {
                ...state,
                list: state.list.map(
                    (ProjectData, idx) => idx === index ?
                        { ...ProjectData, state: state} : ProjectData
                ),
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
            return {
                ...state,
                list: state.list.map(
                    (item, idx) => idx === index ?
                        { ...item, content: values } : item
                ),
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

export const setProjectList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeProject = (id) => {
    return {
        type: REMOVE,
        payload: id,
    }
};

export const addProject = (ProjectData) => {
    return {
        type: ADD,
        payload: ProjectData,
    }
};

export const setProjectState = (index, state) => {
    return {
        type: SET_STATE,
        payload: {
            index: index,
            state: state,
        },
    }
};

export const setProjectContent = (index, values) => {
    return {
        type: SET_CONTENT,
        payload: {
            index: index,
            values: values,
        }
    }
};

export const setProjectIndex = (index) => {
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
