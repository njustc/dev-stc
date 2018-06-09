import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestReportCheck, setTestReportCheckContent, setTestReportCheckList, setTestReportCheckState} from "../modules/ducks/TestReportCheck";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

const TestReportCheckBase = baseServiceAddress + '/TestReportCheck';
const TestReportCheckActivitiBase = baseServiceAddress + '/processInstance';

export const getTestReportCheckList = (dispatch, callback) => {
    httpGet(TestReportCheckBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckList(data));
        }
        callback && callback(status);
    });
    // const status = STATUS.SUCCESS;
    // callback && callback(status);
};

export const getTestReportCheck = (dispatch, id, callback) => {
    httpGet(TestReportCheckBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckContent(data));
        }
        callback && callback(status);
    });
};

export const deleteTestReportCheck = (dispatch, id, callback) => {
    httpDelete(TestReportCheckBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeTestReportCheck(id));
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestReportCheck(id));
        callback && callback(status);
    });
};

export const newTestReportCheck = (dispatch, callback) => {
    httpPost(TestReportCheckBase, {consignation:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckContent(data));
        }
        callback && callback(status);
    });
};

export const updateTestReportCheck = (dispatch, data, callback) => {
    //console.log(data);
    httpPut(TestReportCheckBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckContent(data));
        }
        callback && callback(status);
    });
};

export const getTestReportCheckState = (dispatch, processInstanceID, callback) => {
    httpGet(TestReportCheckActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckContent(data));
        }
        callback && callback(status);
    })
};

export const putTestReportCheckState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
    httpPut(TestReportCheckActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
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