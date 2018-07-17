import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestReportCheck, setTestReportCheckContent, setTestReportCheckList, setTestReportCheckState} from "../modules/ducks/TestReportCheck";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

const testReportCheckBase = baseServiceAddress + '/v1/testReportCheck';
const testReportCheckActivitiBase = baseServiceAddress + '/processInstance';

/**
 * @module services/testReportCheckService
 */

/**
 * 获取测试报告检查表列表
 * @param dispatch dispatch
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getTestReportCheckList = (dispatch, callback) => {
    httpGet(testReportCheckBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckList(data));
        }
        callback && callback(status);
    });
};

/**
 * 获取测试报告检查表详情
 * @param dispatch dispatch
 * @param id 测试报告检查表ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getTestReportCheck = (dispatch, id, callback) => {
    httpGet(testReportCheckBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckContent(data));
        }
        callback && callback(status);
    });
};

/**
 * 删除测试报告检查表
 * @param dispatch dispatch
 * @param id 测试报告检查表ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const deleteTestReportCheck = (dispatch, id, callback) => {
    httpDelete(testReportCheckBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestReportCheck(id));
        callback && callback(status);
    });
};

/**
 * 新建测试报告检查表
 * @param dispatch dispatch
 * @param id 测试报告检查表ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const newTestReportCheck = (dispatch,id, callback) => {
    const urlParams = 'projectID=' + id;
    httpPost(testReportCheckBase, {body:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckContent(data));
        }
        callback && callback(status);
    },urlParams);
};

/**
 * 更新测试报告检查表内容
 * @param dispatch dispatch
 * @param data 测试报告检查表内容
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const updateTestReportCheck = (dispatch, data, callback) => {
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

const getTestReportCheckState = (dispatch, ProjectID, callback) => {
    const PID = 'projectID=' + ProjectID;
    httpGet(testReportCheckBase, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            const {state} = data;
            callback && callback(state);
        }
    },PID)
};

const putTestReportCheckState = (dispatch, processInstanceID, data, id, callback) => {
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

export {getTestReportCheckList,getTestReportCheck,deleteTestReportCheck,newTestReportCheck,updateTestReportCheck,getTestReportCheckState,putTestReportCheckState}