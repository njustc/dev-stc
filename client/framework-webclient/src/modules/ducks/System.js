const SET_AUTHDATA = "System/SET_AUTHDATA";
const SET_SYS_USER = 'System/SET_SYS_USER';
const SET_SIDER = 'System/SET_SIDER';
const SET_MENU = 'System/SET_MENU';
/**
 * @module System
 */
/**
 * 系统用户初始化变量，包括系统用户，权限数组，侧边栏显示项
 * @type {{sysUser: {}, authData: {}, siderData: {}}}
 */
const initialState = {
    sysUser: {},
    authData: {},
    siderData: {},
    menuData: {},
};
/**
 * 系统用户reducer
 * @param state
 * @param action
 * @returns {{sysUser: {}, authData: {}, siderData: {}}}
 * @constructor
 */
export const SystemReducer = (state = initialState, action) =>
{
    switch(action.type) {
        case SET_SIDER:
            const list = action.payload;
            return {
                ...state,
                siderData: list.reduce((listMap, ProjectData) => {
                    listMap[ProjectData.key] = ProjectData;
                    return listMap;
                }, {}),
            };
        case SET_SYS_USER:
            return {
                ...state,
                sysUser: action.payload,
            };
        case SET_AUTHDATA:
            return {
                ...state,
                authData: action.payload
            };
        default:
            return state;
    }
};
/**
 * 设置系统用户，保存用户名
 * @param sysUser
 * @returns {{type: string, payload: *}}
 */
export const setSysUser = (sysUser) => {
    sessionStorage.setItem('sysUser',JSON.stringify(sysUser));
    return {
        type: SET_SYS_USER,
        payload: sysUser
    };
};

/**
 * 设置系统用户权限
 * @param authData
 * @returns {{type: string, payload: *}}
 */
export const setAuthData = (authData) => {
    sessionStorage.setItem('authData',JSON.stringify(authData));
    return {
        type: SET_AUTHDATA,
        payload: authData
    };
};
/**
 * 设置侧边栏数据
 * @param list
 * @returns {{type: string, payload: *}}
 */
export const setSiderData = (list) => {
    sessionStorage.setItem('sider',JSON.stringify(list));
    return {
        type: SET_SIDER,
        payload: list,
    }
};
/**
 * 设置侧边栏菜单
 * @param list
 * @returns {{type: string, payload: *}}
 */
export const setMenuData = (list) => {
    sessionStorage.setItem('menu',JSON.stringify(list));
    return {
        type: SET_MENU,
        payload: list,
    }
};