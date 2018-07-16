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

/**
 * 获取测试报告列表
 * @param dispatch dispatch
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getTestReportList = (dispatch, callback) => {
    httpGet(testReportBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportList(data));
        }
        callback && callback(status);
    });
};

/**
 * 获取测试报告详情
 * @param dispatch dispatch
 * @param id 测试报告ID
 * @param callback　callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getTestReport = (dispatch, id, callback) => {
    httpGet(testReportBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            console.log(data);
            dispatch(setTestReportContent(data));
        }
        callback && callback(status);
    });
};

/**
 * 删除测试报告
 * @param dispatch dispatch
 * @param id 测试报告ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const deleteTestReport = (dispatch, id, callback) => {
    httpDelete(testReportBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestReport(id));
        callback && callback(status);
    });
};

/**
 * 新建测试报告
 * @param dispatch dispatch
 * @param id 测试报告ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const newTestReport = (dispatch,id, callback) => {
    const urlParams = 'projectID=' + id;
    httpPost(testReportBase, {body:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportContent(data));
        }
        callback && callback(status);
    },urlParams);
};

/**
 * 更新测试报告内容
 * @param dispatch dispatch
 * @param data 测试报告内容
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const updateTestReport = (dispatch, data, callback) => {
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

const getTestReportState = (dispatch, ProjectID, callback) => {
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

/**
 * 更改测试报告状态
 * @param dispatch dispatch
 * @param processInstanceID 测试报告流程ID
 * @param data 含有测试报告状态改变的数据
 * @param id 项目ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const putTestReportState = (dispatch, processInstanceID, data, id, callback) => {
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

export {getTestReportList,getTestReport,deleteTestReport,newTestReport,updateTestReport,getTestReportState,putTestReportState}