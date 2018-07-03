import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestWorkCheck, setTestWorkCheckContent, setTestWorkCheckList, setTestWorkCheckState} from "../modules/ducks/TestWorkCheck";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

const testWorkCheckBase = baseServiceAddress + '/v1/testWorkCheck';
const testWorkCheckActivitiBase = baseServiceAddress + '/processInstance';

export const getTestWorkCheckList = (dispatch, callback) => {
    httpGet(testWorkCheckBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestWorkCheckList(data));
        }
        callback && callback(status);
    });
};

export const getTestWorkCheck = (dispatch, id, callback) => {
    // dispatch(setTestWorkCheckContent({id:id,}));
    httpGet(testWorkCheckBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestWorkCheckContent(data));
        }
        callback && callback(status);
    });
};

export const deleteTestWorkCheck = (dispatch, id, callback) => {
    httpDelete(testWorkCheckBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestWorkCheck(id));
        callback && callback(status);
    });
};

export const newTestWorkCheck = (dispatch,id, callback) => {
    const urlParams = 'projectID=' + id;
    httpPost(testWorkCheckBase, {body:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestWorkCheckContent(data));
        }
        callback && callback(status);
    },urlParams);
};

export const updateTestWorkCheck = (dispatch, data, callback) => {
    console.log(data);
    httpPut(testWorkCheckBase, data, (result) => {
        console.log(result);
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestWorkCheckContent(data));
        }
        callback && callback(status);
    });
};

export const getTestWorkCheckState = (dispatch, ProjectID, callback) => {
    const PID = 'projectID=' + ProjectID;
    httpGet(testWorkCheckBase, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            // console.log(data);
            const {state} = data;
            console.log(state);
            callback && callback(state);
        }
    },PID)
};

export const putTestWorkCheckState = (dispatch, processInstanceID, data, id, callback) => {
    console.log("ID = " + processInstanceID);
    httpPut(testWorkCheckActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        console.log(result);
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestWorkCheckContent(newData));
        }
        callback && callback(status);
    });
};