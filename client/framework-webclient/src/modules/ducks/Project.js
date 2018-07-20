const SET_LIST = 'Project/SET_LIST';
const RM_CONTENT = 'Project/RM_CONTENT';
const SET_CONTENT = 'Project/SET_CONTENT';
const SET_FILTER = 'Project/SET_FILTER';
const SHOW_LISTMAP = 'Project/SHOW_LISTMAP';
/**
 * @module Project/ProjectState
 */
/**
 * 项目初始化state
 * @type {{listFilter: (function(): boolean), listMap: {}}}
 */
const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ProjectData
};
/**
 * 项目reducer
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
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
            const newListMap = state.listMap;
            delete newListMap[id];
            return {
                ...state,
                listMap: newListMap
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
        case SHOW_LISTMAP:
            console.log(state.listMap);
            return state;
        default:
            return state;
    }
};
/**
 * 设置项目列表
 * @param list
 * @returns {{type: string, payload: *}}
 */
export const setProjectList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};
/**
 * 删除项目
 * @param id
 * @returns {{type: string, payload: *}}
 */
export const removeProject = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};
/**
 * 新增或修改一个项目
 * @param ProjectData
 * @returns {{type: string, payload: *}}
 */
export const setProjectContent = (ProjectData) => {
    return {
        type: SET_CONTENT,
        payload: ProjectData,
    }
};
/**
 * 设置项目过滤器
 * @param listFilter
 * @returns {{type: string, payload: *}}
 */
export const setProjectFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};

export const showListMap = () => {
    return {
        type: SHOW_LISTMAP,
    }
}
