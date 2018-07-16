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

export const getTestCaseList = (dispatch, callback) => {
    // dispatch(setTestCaseList(/*data*/
    //     [
    //         {
    //             pid : "110",
    //             id : "110",
    //             name : "快乐星球小杨杰",
    //             customerId : "151220140",
    //             status: STATE.TO_SUBMIT
    //         },{
    //         pid :"120",
    //         id : "120",
    //         name : "不快乐星球小杨杰",
    //         customerId : "151220140",
    //         status: STATE.TO_CHECK
    //     },{
    //         pid : "119",
    //         id : "119",
    //         name : "不快乐星球老杨杰",
    //         customerId : "151220140",
    //         status: STATE.CANCELED
    //     }
    //     ]
    // ));
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
    //dispatch(setTestCaseContent({id:id,}));
    dispatch(setTestCaseContent(/*data*/
        mockTestCaseData
    ));
    // httpGet(testCaseBase + '/' + id, (result) => {
    //     const {status, data} = result;
    //     if (status === STATUS.SUCCESS) {
    //         dispatch(setTestCaseContent(data));
    //     }
    //     callback && callback(status);
    // });
};

export const deleteTestCase = (dispatch, id, callback) => {
    httpDelete(testCaseBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeTestCase(id));
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestCase(id));
        callback && callback(status);
    });
};

export const newTestCase = (dispatch,id, callback) => {
    const urlParams = 'projectID=' + id;
    httpPost(testCaseBase, {body:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            // dispatch(setTestCaseContent(data));
            console.log(status);
        }
        // callback && callback(status);
        callback && callback(data);
    },urlParams);
};

export const addTestCase = (dispatch, data/*, callback*/) => {
    /*httpPost(testCaseBase, {testcase:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestCaseContent(data));
        }
        callback && callback(status);
    });*/
    mockTestCaseData.push(data);
    console.log(mockTestCaseData);//
};

export const updateTestCase = (dispatch, data, callback) => {
    //console.log(data);
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