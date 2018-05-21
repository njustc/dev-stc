import {removeProject, setProjectContent, setProjectList} from "MODULES/ducks/Project";
import {baseServiceAddress, STATUS, STATE} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {addConsign, removeConsign, setConsignContent} from "MODULES/ducks/Consign";
import {mockProjectData} from "./mockData";

/*ToDo*/
/*接口需要与后台确认*/
/*注意每一个http方法的url*/

const projectBase = baseServiceAddress + '/project';

export const getProjectList = (dispatch, callback) => {
/*    httpGet(projectBase, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectList(data));
        }
        callback && callback(status);
    });*/
    /*TEMP*/
    dispatch(setProjectList(mockProjectData));
    const status = STATUS.SUCCESS;
    callback && callback(status);
};

/*export const getProjectContent = (dispatch, id, callback) => {
    httpGet(projectBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
        }
        callback && callback(status);
    });
};*/

export const deleteProject = (dispatch, id, callback) => {
/*    httpDelete(projectBase, {id:id}, (result) => {
        const {status} = result;
        if (status === STATUS.SUCCESS) {
            httpGet(projectBase, (result) => {
                dispatch(removeProject(id));
            });
        }
        callback && callback(status);
    });*/
    /*TEMP*/
    dispatch(removeProject(id));
    const status = STATUS.SUCCESS;
    callback && callback(status);
};

export const newProject = (dispatch, callback) => {
/*    httpPost(projectBase, mockProjectData, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
        }
        callback && callback(status);
    });*/
    /*TODO:想好新建项目的步骤*/
    const projectData = {
        id: Math.random().toString(36).slice(2),
    };
    dispatch(setProjectContent(projectData));
    const status = STATUS.SUCCESS;
    callback && callback(status);
};

export const updateProject = (dispatch, projectData, callback) => {
/*    httpPut(projectBase, mockProjectData, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
        }
        callback && callback(status);
    });*/
    dispatch(setProjectContent(projectData));
    const status = STATUS.SUCCESS;
    callback && callback(status);
};