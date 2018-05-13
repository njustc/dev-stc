const SET_MODULES = "System/SET_MODULES";
const SET_SYS_USER = 'System/SET_SYS_USER';

const initialState = {
    sysUser: {},
    modules: [{
        code: "U-C",
        id: "1",
        menuIcon: "idcard",
        menuPath: "/user_list",
        name: "委托管理"
    }]
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
    return {
        type: SET_SYS_USER,
        payload: sysUser
    };
};


export const setModules = (modules) => {
    sessionStorage.setItem('sysUser','admin');
    return {
        type: SET_MODULES,
        payload: modules
    };
};
