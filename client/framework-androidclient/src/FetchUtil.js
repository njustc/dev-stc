import {STATUS} from "./common";
/**
 * 向后台发送GET请求
 * @constant
 */
export const httpGet = (url, callback) => {
    return sysFetch('GET', url, null, callback);
};
/**
 * 向后台发送POST请求
 * @constant
 */
export const httpPost = (url, params, callback) => {
    return sysFetch('POST', url, params, callback);
};
/**
 * 向后台发送PUT请求
 * @constant
 */
export const httpPut = (url, params, callback) => {
    return sysFetch('PUT', url, params, callback);
};
/**
 * 向后台发送DELETE请求
 * @constant
 */
export const httpDelete = (url, params, callback) => {
    return sysFetch('DELETE', url, params, callback);
};
/**
 * http方法调用，向后台发送fetch请求
 * @constant
 */
const sysFetch = (Method, url, params, callback) => {

    let result = {
        status: STATUS.FAILURE,
    };
    let username = "undefined";
    let clientDigest = "undefined";

    // const curUserString = sessionStorage.getItem('sysUser');
    // const curUser = JSON.parse(curUserString);
    // if (curUserString && curUserString !== 'null') {
    //     username = curUser.username;
    //     clientDigest = curUser.clientDigest;
    // }

    // let fullUrl = url + '?username=' + username + '&clientDigest=' + clientDigest;
    let formData = new FormData();
    formData.append('params', params ? JSON.stringify(params): '');

    let request = { method: Method };
    if (Method != 'GET') {
        request.body = formData;
    }

    return fetch(url, request)
        .then((res) =>
        {
            if(res.ok)
            {
                return res.json();
            }
            else
            {
                return Promise.reject();
            }
        })
        .then(json => {
            if(json.status == "SUCCESS"){
                result.status = STATUS.SUCCESS;
                result.data = json.data;
                result.message = json.message;
            }
            callback(result);
        })
        .catch(err => {
            callback(result);
        })
}
