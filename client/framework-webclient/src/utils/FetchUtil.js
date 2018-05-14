import {getStore} from 'store/globalStore';

export const httpGet = (url, callback) => {
    return sysFetch('GET', url, null, callback);
};

export const httpPost = (url, params, callback) => {
    return sysFetch('POST', url, params, callback);
};

export const httpPut = (url, params, callback) => {
    return sysFetch('PUT', url, params, callback);
};

export const httpDelete = (url, params, callback) => {
    return sysFetch('DELETE', url, params, callback);
};

const sysFetch = (Method, url, params, callback) => {

    let result = { 
        status: "FAILURE"
    };
    let username = "undefined";
    let clientDigest = "undefined";

    const curUserString = sessionStorage.getItem('sysUser');
    const curUser = JSON.parse(curUserString);
    debugger;
    if (curUserString !== 'null') {
        username = curUser.username;
        clientDigest = curUser.clientDigest;
    }

    let fullUrl = url + '?username=' + username + '&clientDigest=' + clientDigest;
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
            result.status = "SUCCESS"
            result.data = json.data;
            result.message = json.message;
        }
        callback(result);
    })
    .catch(err => {
        callback(result);
    })
}

// export const sysFetch = (service, request, callback, files) =>
// {
//     let username = '';
//     let clientDigest = '';

//     const systemStore = getStore().getState().system;
//     if(systemStore)
//     {
//         var sysUser = systemStore.sysUser;
//         if(sysUser)
//         {
//             username = sysUser.username;
//             clientDigest = sysUser.clientDigest;
//         }
//     }
    
//     const serviceWithAuth = service + '?username=' + username + '&clientDigest=' + clientDigest;

//     let data = new FormData();
//     data.append('params', request && request != '' ? JSON.stringify(request) : null);

//     if(files)
//     {
//         for(var i = 0; i < files.length; i++)
//         {
//             data.append('file' + i, files[i]);
//         }

//         data.append('totalFiles', files.length);
//     }

//     fetch(serviceWithAuth, 
//     {
//         method: "POST",
//         body: data
//     })
//     .then((res) => 
//     {
//         if(res.ok)
//         {
//             return res.json();
//         }
//         else
//         {
//             return Promise.reject();
//         }
//     })
//     .then((res) =>
//     {
//         callback(res);
//     });
// }