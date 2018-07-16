import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestCase, setTestCaseContent, setTestCaseList/*, setTestCaseState*/} from "../modules/ducks/TestCase";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setProjectList} from "../modules/ducks/Project";

const testCaseBase = baseServiceAddress + '/v1/testCase';
const testCaseActivitiBase = baseServiceAddress + '/processInstance';

/**
 * @module services/testCaseService
 */

/**
 * 获取测试样例列表
 * @param dispatch dispatch
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getTestCaseList = (dispatch, callback) => {
    httpGet(testCaseBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestCaseList(data));
        }
        callback && callback(status);
    });
};

var mockTestCaseData=[{
    //id: 1,
    classification: 'yj',
    process: 'unhappy->happy',
    expectedResult: 'happy',
    designer: 'yj',
    time: '2018-06-03',
    action: 'delete',
    designNotes: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    statute: 'sssssss',
    accordance: 'tttttt'
}];

export const getTestCase = (dispatch, id, callback) => {
    dispatch(setTestCaseContent(/*data*/
        mockTestCaseData
    ));
};

/**
 * 删除测试样例
 * @param dispatch dispatch
 * @param id 测试样例ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const deleteTestCase = (dispatch, id, callback) => {
    httpDelete(testCaseBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestCase(id));
        callback && callback(status);
    });
};

/**
 * 新建测试样例
 * @param dispatch dispatch
 * @param id 测试样例ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const newTestCase = (dispatch,id, callback) => {
    const urlParams = 'projectID=' + id;
    httpPost(testCaseBase, {body:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            console.log(status);
        }
        callback && callback(data);
    },urlParams);
};

export const addTestCase = (dispatch, data/*, callback*/) => {
    mockTestCaseData.push(data);
    console.log(mockTestCaseData);//
};

/**
 * 更新测试样例内容
 * @param dispatch dispatch
 * @param data 测试样例内容
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const updateTestCase = (dispatch, data, callback) => {
    httpPut(testCaseBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestCaseContent(data));
        }
        callback && callback(status);
    });
};

export const getTestCaseState = (dispatch, processInstanceID, id, callback) => {
    httpGet(testCaseActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestCaseContent(newData));
        }
        callback && callback(status);
    })
};

export const putTestCaseState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
    httpPut(testCaseActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        if (status === STATUS.SUCCESS) {
             const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestCaseContent(newData));
        }
        callback && callback(status);
    });
};

export {getTestCaseList,deleteTestCase,newTestCase,updateTestCase,getTestCase,putTestCaseState}