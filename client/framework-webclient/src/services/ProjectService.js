import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {getConsign} from "./ConsignService";
import {
    removeProject,
    setProjectContent,
    setProjectList,
    showListMap/*, setProjectState*/
} from "../modules/ducks/Project";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setTestRecordContent} from "../modules/ducks/TestRecord";
import {getConsignState} from "./ConsignService";

const projectBase = baseServiceAddress + '/v1/project';
const projectActivitiBase = baseServiceAddress + '/processInstance';

export const getProjectList = (dispatch, callback) => {/*TODO 后台接口实现有误*/
    httpGet(projectBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
    //         dispatch(setProjectList(/*data*/
    //             [
    //                 {
    //                     id : "110",
    //                     name : "快乐星球小杨杰",
    //                     createdUserId : "151220140",
    //                     state: 'TobeSubmit'
    //                 },{
    //                     id : "120",
    //                     name : "不快乐星球小杨杰",
    //                     createdUserId : "151220140",
    //                     state: 'TobeSubmit'
    //                 },{
    //                     id : "119",
    //                     name : "不快乐星球老杨杰",
    //                     createdUserId : "151220140",
    //                     state: 'TobeSubmit'
    //                 }
    //             ]
    //         ));
            dispatch(setProjectList(data));
        }
        callback && callback(status);
    });
};

export const getProject = (dispatch, id, callback) => {
    // dispatch(setProjectContent({id:id,}));
    httpGet(projectBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
        }
        callback && callback(status);
    });
    getConsign(dispatch,id);
};

export const deleteProject = (dispatch, id, callback) => {
    httpDelete(projectBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeProject(id));
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeProject(id));
        callback && callback(status);
    });
};

export const newProject = (dispatch,id,callback) => {
    httpPost(projectBase, {id:id,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
            dispatch(showListMap());
        }
        callback && callback(status);
    });
};

export const updateProject = (dispatch, data, callback) => {
    //console.log(data);
    httpPut(projectBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
        }
        callback && callback(status);
    });
};

export const getProjectState = (dispatch, processInstanceID, id, callback) => {
    getConsignState(dispatch,processInstanceID,id);
    debugger
};

export const putProjectState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
    httpPut(projectActivitiBase + '/' + processInstanceID, data, (result) => {
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