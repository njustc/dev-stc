import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeProject, setProjectContent, setProjectList/*, setProjectState*/} from "../modules/ducks/Project";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setTestRecordContent} from "../modules/ducks/TestRecord";

const consignBase = baseServiceAddress + '/consign';
const consignActivitiBase = baseServiceAddress + '/processInstance';

export const getProjectList = (dispatch, callback) => {
    httpGet(consignBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            // dispatch(setProjectList(/*data*/
            //     [
            //         {
            //             id : "110",
            //             name : "快乐星球小杨杰",
            //             createdUserId : "151220140",
            //             state: 'TobeSubmit'
            //         },{
            //             id : "120",
            //             name : "不快乐星球小杨杰",
            //             createdUserId : "151220140",
            //             state: 'TobeSubmit'
            //         },{
            //             id : "119",
            //             name : "不快乐星球老杨杰",
            //             createdUserId : "151220140",
            //             state: 'TobeSubmit'
            //         }
            //     ]
            dispatch(setProjectContent(data));
        }
        callback && callback(status);
    });
};

export const getProject = (dispatch, id, callback) => {
    dispatch(setProjectContent({id:id,}));
    // httpGet(consignBase + '/' + id, (result) => {
    //     const {status, data} = result;
    //     if (status === STATUS.SUCCESS) {
    //         dispatch(setProjectContent(data));
    //     }
    //     callback && callback(status);
    // });
};

export const deleteProject = (dispatch, id, callback) => {
    httpDelete(consignBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeProject(id));
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeProject(id));
        callback && callback(status);
    });
};

/*export const newConsign = (dispatch, callback) => {
    httpPost(consignBase, {consignation:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignContent(data));
        }
        callback && callback(status);
    });
};*/

export const updateProject = (dispatch, data, callback) => {
    //console.log(data);
    httpPut(consignBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
        }
        callback && callback(status);
    });
};

// export const getConsignState = (dispatch, processInstanceID, callback) => {
//     httpGet(consignActivitiBase + '/' + processInstanceID, (result) => {
//         const {status, data} = result;
//         if (status === STATUS.SUCCESS) {
//             dispatch(setConsignContent(data));
//         }
//         callback && callback(status);
//     })
// };

export const putProjectState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
    httpPut(consignActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setProjectContent(newData));
        }
        callback && callback(status);
    });
};