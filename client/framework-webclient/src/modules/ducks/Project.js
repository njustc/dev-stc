const SET_LIST = 'Project/SET_LIST';
const RM_CONTENT = 'Project/RM_CONTENT';
const SET_CONTENT = 'Project/SET_CONTENT';
const SET_FILTER = 'Project/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ProjectData
    //ProjectData为对象，仍然包含id字段
};

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            return {
                ...state,
                listMap: list.reduce((listMap, ProjectData) => {
                    listMap[ProjectData.id] = ProjectData;
                    return listMap;
                }, {}),
            };
        case RM_CONTENT:
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
            const ProjectData = action.payload;
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: ProjectData,
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

export const setProjectList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeProject = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

export const setProjectContent = (ProjectData) => {
    return {
        type: SET_CONTENT,
        payload: ProjectData,
    }
};

export const setProjectFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};
