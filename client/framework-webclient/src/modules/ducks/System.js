const SET_AUTHDATA = "System/SET_AUTHDATA";
const SET_SYS_USER = 'System/SET_SYS_USER';
const SET_SIDER = 'System/SET_SIDER';

const initialState = {
    sysUser: {},
    authData: [],
    siderData: {}
};

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

export const setSysUser = (sysUser) => {
    sessionStorage.setItem('sysUser',JSON.stringify(sysUser));
    return {
        type: SET_SYS_USER,
        payload: sysUser
    };
};


export const setAuthData = (authData) => {
    sessionStorage.setItem('authData',JSON.stringify(authData));
    return {
        type: SET_AUTHDATA,
        payload: authData
    };
};

export const setSiderData = (list) => {
    return {
        type: SET_SIDER,
        payload: list,
    }
};