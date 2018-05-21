import {baseAddress, STATUS} from "SERVICES/common";
import {httpPost} from "UTILS/FetchUtil";
import {setModules, setSysUser} from "MODULES/ducks/System";

const loginUrl = baseAddress + '/login';

export const setLogin = (dispatch, params, callback) => {
    httpPost(loginUrl, params, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            const {username, clientDigest} = data;
            const sysUser = {
                username: username,
                clientDigest: clientDigest,
            };
            dispatch(setSysUser(sysUser));
            if(username === 'marketing'){
                dispatch(setModules([{
                    "code": "U-C",
                    "id": "1",
                    "menuIcon": "idcard",
                    "menuPath": "/StaffConsignList",
                    "name": "委托管理"
                },{
                    "code": "U-C",
                    "id": "2",
                    "menuIcon": "idcard",
                    "menuPath": "/StaffContrastList",
                    "name": "合同管理"
                }]));
            }
            else if(username === 'customer1' || username === 'customer2'){
                dispatch(setModules([{
                    "code": "U-C",
                    "id": "1",
                    "menuIcon": "idcard",
                    "menuPath": "/UserConsignList",
                    "name": "委托管理"
                },{
                    "code": "U-C",
                    "id": "2",
                    "menuIcon": "idcard",
                    "menuPath": "/UserContrastList",
                    "name": "合同管理"
                }]));
            }
        }
        callback && callback(status);
    })
};