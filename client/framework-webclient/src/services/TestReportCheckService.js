import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestReportCheck, setTestReportCheckContent, setTestReportCheckList, setTestReportCheckState} from "../modules/ducks/TestReportCheck";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

const testReportCheckBase = baseServiceAddress + '/v1/testReportCheck';
const testReportCheckActivitiBase = baseServiceAddress + '/processInstance';

export const getTestReportCheckList = (dispatch, callback) => {
    httpGet(testReportCheckBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckList(data));
        }
        callback && callback(status);
    });
};

export const getTestReportCheck = (dispatch, id, callback) => {
    // dispatch(setTestReportCheckContent({id:id,}));
    httpGet(testReportCheckBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckContent(data));
        }
        callback && callback(status);
    });
};

export const deleteTestReportCheck = (dispatch, id, callback) => {
    httpDelete(testReportCheckBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestReportCheck(id));
        callback && callback(status);
    });
};

export const newTestReportCheck = (dispatch,id, callback) => {
    const urlParams = 'projectID=' + id;
    httpPost(testReportCheckBase, {body:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckContent(data));
        }
        callback && callback(status);
    },urlParams);
};

export const updateTestReportCheck = (dispatch, data, callback) => {
    console.log(data);
    httpPut(testReportCheckBase, data, (result) => {
        console.log(result);
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckContent(data));
        }
        callback && callback(status);
    });
};

export const getTestReportCheckState = (dispatch, ProjectID, callback) => {
    const PID = 'projectID=' + ProjectID;
    httpGet(testReportCheckBase, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            // console.log(data);
            const {state} = data;
            console.log(state);
            callback && callback(state);
        }
    },PID)
};

export const putTestReportCheckState = (dispatch, processInstanceID, data, id, callback) => {
    console.log("ID = " + processInstanceID);
    httpPut(testReportCheckActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        console.log(result);
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestReportCheckContent(newData));
        }
        callback && callback(status);
    });
};