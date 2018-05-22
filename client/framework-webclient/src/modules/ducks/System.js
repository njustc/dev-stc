const SET_AUTHDATA = "System/SET_AUTHDATA";
const SET_SYS_USER = 'System/SET_SYS_USER';

const initialState = {
    sysUser: {},
    authData: [],
};

export const SystemReducer = (state = initialState, action) =>
{
    switch(action.type) {
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
