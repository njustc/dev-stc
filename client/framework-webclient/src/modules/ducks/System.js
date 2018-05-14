const SET_MODULES = "System/SET_MODULES";
const SET_SYS_USER = 'System/SET_SYS_USER';

const initialState = {
    sysUser: {},
    modules: [{}]
};

export const SystemReducer = (state = initialState, action) =>
{
    switch(action.type) {
        case SET_SYS_USER:
            return {
                ...state,
                sysUser: action.payload,
            };
        case SET_MODULES:
            return {
                ...state,
                modules: action.payload
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


export const setModules = (modules) => {
    sessionStorage.setItem('sysModules',JSON.stringify(modules));
    return {
        type: SET_MODULES,
        payload: modules
    };
};
