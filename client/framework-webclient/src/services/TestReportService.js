import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestReport, setTestReportContent, setTestReportList, setTestReportState} from "../modules/ducks/TestReport";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setTestReportCheckContent, setTestReportCheckList} from "../modules/ducks/TestReportCheck";

const testReportBase = baseServiceAddress + '/v1/testReport';
const testReportActivitiBase = baseServiceAddress + '/processInstance';

/**
 * @module services/testReportService
 */

export const getTestReportList = (dispatch, callback) => {
    httpGet(testReportBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            // console.log(data);
            dispatch(setTestReportList(data));
        }
        callback && callback(status);
    });
};

export const getTestReport = (dispatch, id, callback) => {
    // dispatch(setTestReportContent({id:id,}));
    httpGet(testReportBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            console.log(data);
            dispatch(setTestReportContent(data));
        }
        callback && callback(status);
    });
};

export const deleteTestReport = (dispatch, id, callback) => {
    httpDelete(testReportBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestReport(id));
        callback && callback(status);
    });
};

export const newTestReport = (dispatch,id, callback) => {
    const urlParams = 'projectID=' + id;
    httpPost(testReportBase, {body:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportContent(data));
        }
        callback && callback(status);
    },urlParams);
};

export const updateTestReport = (dispatch, data, callback) => {
    console.log(data);
    httpPut(testReportBase, data, (result) => {
        console.log(result);
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportContent(data));
        }
        callback && callback(status);
    });
};

export const getTestReportState = (dispatch, ProjectID, callback) => {
    const PID = 'projectID=' + ProjectID;
    httpGet(testReportBase, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            // console.log(data);
            const {state} = data;
            console.log(state);
            callback && callback(state);
        }
    },PID)
};

export const putTestReportState = (dispatch, processInstanceID, data, id, callback) => {
    console.log("ID = " + processInstanceID);
    httpPut(testReportActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        console.log(result);
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestReportContent(newData));
        }
        callback && callback(status);
    });
};