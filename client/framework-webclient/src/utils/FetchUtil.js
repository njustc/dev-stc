import {getStore} from 'store/globalStore';

export const httpGet = (url, callback) => {
    return sysFetch('GET', url, null, callback);
}

export const httpPost = (url, data, callback) => {
    return sysFetch('POST', url, data, callback);
}

export const httpPut = (url, data, callback) => {
    return sysFetch('PUT', url, data, callback);
}

export const httpDelete = (url, data, callback) => {
    return sysFetch('DELETE', url, data, callback);
}

export const sysFetch = (Method,url,formData, callback) => {

    let result = { 
        status: "FAILURE"
    };

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
        debugger;
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