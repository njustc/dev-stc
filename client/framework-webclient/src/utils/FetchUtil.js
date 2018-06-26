import {STATUS} from "SERVICES/common";

export const httpGet = (url, callback, urlParams) => {
    return sysFetch('GET', url, null, callback, urlParams);
};

export const httpPost = (url, params, callback, urlParams) => {
    return sysFetch('POST', url, params, callback, urlParams);
};

export const httpPut = (url, params, callback, urlParams) => {
    return sysFetch('PUT', url, params, callback, urlParams);
};

export const httpDelete = (url, params, callback, urlParams) => {
    return sysFetch('DELETE', url, params, callback, urlParams);
};

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
}