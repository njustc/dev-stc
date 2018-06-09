import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestCase, setTestCaseContent, setTestCaseList/*, setTestCaseState*/} from "../modules/ducks/TestCase";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

const testCaseBase = baseServiceAddress + '/testCase';
const testCaseActivitiBase = baseServiceAddress + '/processInstance';

export const getTestCaseList = (dispatch, callback) => {
    httpGet(testCaseBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestCaseList(data));
        }
        callback && callback(status);
    });
};

export const getTestCase = (dispatch, id, callback) => {
    httpGet(testCaseBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestCaseContent(data));
        }
        callback && callback(status);
    });
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

export const newTestCase = (dispatch, callback) => {
    httpPost(testCaseBase, {testcase:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestCaseContent(data));
        }
        callback && callback(status);
    });
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

// export const getConsignState = (dispatch, processInstanceID, callback) => {
//     httpGet(consignActivitiBase + '/' + processInstanceID, (result) => {
//         const {status, data} = result;
//         if (status === STATUS.SUCCESS) {
//             dispatch(setConsignContent(data));
//         }
//         callback && callback(status);
//     })
// };

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