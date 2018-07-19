import {baseAddress, STATUS} from "SERVICES/common";
import {httpPost} from "UTILS/FetchUtil";
import {setAuthData, setMenuData, setSiderData, setSysUser} from "../modules/ducks/System";
import {marketingData, customerData, mockSiderData, mockMenuData} from "./mockData";

/**
 * @module services/Auth
 */

const loginUrl = baseAddress + '/login';

/**
 * 向后台发送登录信息
 * @param dispatch dispatch
 * @param params 登录信息
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const setLogin = (dispatch, params, callback) => {
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
            const isCustomer = (username==="customer1"||username==="customer2")
            const isMarketing = (username==="marketing");
            const isTesting = (username==="testing");
            const isQuality = (username==="quality");
            const siderData = mockSiderData(isCustomer,isMarketing,isTesting,isQuality);
            const menuData = mockMenuData(isCustomer);
            dispatch(setSiderData(siderData));
            dispatch(setMenuData(menuData));
        }
        callback && callback(status);
    })
};

export {setLogin}