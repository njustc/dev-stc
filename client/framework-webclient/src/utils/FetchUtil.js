import {STATUS} from "SERVICES/common";
/**@module utils/fetchUtil
 *
 */

/**
 * 实现向后台发送GET请求
 * @param url username、clientDigest之前的url部分
 * @param callback 回调内容为GET请求传输结果的状态，可能为SUCCESS或FAILURE
 * @param urlParams uesename、clientDigest之后的url部分（不一定都有）
 * @return 已传入参数的sysFetch方法
 */
const httpGet = (url, callback, urlParams) => {
    return sysFetch('GET', url, null, callback, urlParams);
};

/**
 * 实现向后台发送POST请求
 * @param {*} url username、clientDigest之前的url部分
 * @param {*} params 需要向后台传输的数据，格式为JSON
 * @param {*} callback 回调内容为POST请求传输结果的状态，可能为SUCCESS或FAILURE
 * @param {*} urlParams uesename、clientDigest之后的url部分（不一定都有）
 */
const httpPost = (url, params, callback, urlParams) => {
    return sysFetch('POST', url, params, callback, urlParams);
};

/**
 * 实现向后台发送PUT请求
 * @param {*} url username、clientDigest之前的url部分
 * @param {*} params 需要向后台传输的数据，格式为JSON
 * @param {*} callback 回调内容为POST请求传输结果的状态，可能为SUCCESS或FAILURE
 * @param {*} urlParams uesename、clientDigest之后的url部分（不一定都有）
 */
const httpPut = (url, params, callback, urlParams) => {
    return sysFetch('PUT', url, params, callback, urlParams);
};

/**
 * 实现向后台发送DELETE请求
 * @param {*} url username、clientDigest之前的url部分
 * @param {*} params 需要向后台传输的数据，格式为JSON
 * @param {*} callback 回调内容为POST请求传输结果的状态，可能为SUCCESS或FAILURE
 * @param {*} urlParams uesename、clientDigest之后的url部分（不一定都有）
 */
const httpDelete = (url, params, callback, urlParams) => {
    return sysFetch('DELETE', url, params, callback, urlParams);
};

/**
 * 各http请求方法通过调用此方法实现向后台发送fetch请求
 * @param {*} Method 用来标识http方法的种类，可能为POST、PUT、GET、DELETE
 * @param {*} url username、clientDigest之前的url部分
 * @param {*} params 需要向后台传输的数据，格式为JSON
 * @param {*} callback 回调内容为与后台数据传输结果的状态，可能为SUCCESS或FAILURE
 * @param {*} urlParams uesename、clientDigest之后的url部分（不一定都有）
 */
const sysFetch = (Method, url, params, callback, urlParams) => {

    let result = { 
        status: STATUS.FAILURE,
    };
    let username = "undefined";
    let clientDigest = "undefined";

    const curUserString = sessionStorage.getItem('sysUser');
    const curUser = JSON.parse(curUserString);
    if (curUserString && curUserString !== 'null') {
        username = curUser.username;
        clientDigest = curUser.clientDigest;
    }

    let fullUrl = url + '?username=' + username + '&clientDigest=' + clientDigest;
    if(urlParams){
        fullUrl = fullUrl + '&' + urlParams;
        console.log(fullUrl);
    }


    let formData = new FormData();
    formData.append('params', params ? JSON.stringify(params): '');

    let request = { method: Method };
    if (Method != 'GET') {
        request.body = formData;
    }

    return fetch(fullUrl, request)
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
};

export {httpGet,httpDelete,httpPost,httpPut}