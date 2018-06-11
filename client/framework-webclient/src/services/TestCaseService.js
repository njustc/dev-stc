import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestCase, setTestCaseContent, setTestCaseList/*, setTestCaseState*/} from "../modules/ducks/TestCase";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setProjectList} from "../modules/ducks/Project";

const testCaseBase = baseServiceAddress + '/testCase';
const testCaseActivitiBase = baseServiceAddress + '/processInstance';

export const getTestCaseList = (dispatch, callback) => {
    dispatch(setTestCaseList(/*data*/
        [
            {
                pid : "110",
                id : "110",
                name : "快乐星球小杨杰",
                customerId : "151220140",
                status: STATE.TO_SUBMIT
            },{
            pid :"120",
            id : "120",
            name : "不快乐星球小杨杰",
            customerId : "151220140",
            status: STATE.TO_CHECK
        },{
            pid : "119",
            id : "119",
            name : "不快乐星球老杨杰",
            customerId : "151220140",
            status: STATE.CANCELED
        }
        ]
    ));
    // httpGet(testCaseBase,(result) => {
    //     const {status, data} = result;
    //     if (status === STATUS.SUCCESS) {
    //         dispatch(setTestCaseList(data));
    //     }
    //     callback && callback(status);
    // });
};

export const getTestCase = (dispatch, id, callback) => {
    dispatch(setTestCaseContent({id:id,}));
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