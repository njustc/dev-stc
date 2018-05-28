import {baseAddress, STATUS} from "SERVICES/common";
import {httpPost} from "UTILS/FetchUtil";
import {setAuthData, setSiderData, setSysUser} from "../modules/ducks/System";
import {marketingData, customerData, mockSiderData} from "./mockData";


const loginUrl = baseAddress + '/login';

export const setLogin = (dispatch, params, callback) => {
    httpPost(loginUrl, params, (result) => {
        const {status, data} = result;
        console.log(result);
        if (status === STATUS.SUCCESS) {
            const {username, clientDigest} = data;
            const sysUser = {
                username: username,
                clientDigest: clientDigest,
            };
            dispatch(setSysUser(sysUser));
            if(sysUser.username==="customer1"||sysUser.username==="customer2")
                dispatch(setAuthData(customerData));
            else if(sysUser.username==="marketing")
                dispatch(setAuthData(marketingData));
            else
                dispatch(setAuthData(marketingData));
            dispatch(setSiderData(mockSiderData));
        }
        callback && callback(status);
    })
};