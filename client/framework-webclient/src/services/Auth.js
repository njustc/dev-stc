import {baseAddress, STATUS} from "SERVICES/common";
import {httpPost} from "UTILS/FetchUtil";
import {setAuthData, setSiderData, setSysUser} from "../modules/ducks/System";
import {marketingData, customerData, mockSiderData} from "./mockData";


const loginUrl = baseAddress + '/login';

export const setLogin = (dispatch, params, callback) => {
    httpPost(loginUrl, params, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            const {username,roles, clientDigest} = data;
            const sysUser = {
                username: username,
                clientDigest: clientDigest,
            };
            dispatch(setSysUser(sysUser));
            dispatch(setAuthData(roles[0]));
            const siderData = getSiderData(roles[0]);
            dispatch(setSiderData(siderData));
        }
        callback && callback(status);
    })
};

function getSiderData(functionGroup) {
    return mockSiderData;
}