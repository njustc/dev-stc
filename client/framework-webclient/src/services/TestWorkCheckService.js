import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestWorkCheck, setTestWorkCheckContent, setTestWorkCheckList/*, setTestWorkCheckState*/} from "../modules/ducks/TestWorkCheck";
import {mockProjectData, valueData} from "./mockData";
import {globalOperation, STATE} from "./common";
import {setContractContent} from "../modules/ducks/Contract";
// import "./common";

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
    httpGet(testWorkCheckBase + '/' + id, (result) => {
        console.log(result);
        const {status, data} = result;
        const consignStatus = status;
        const consignData = data;
        if (status === STATUS.SUCCESS) {
            const {processInstanceID} = consignData;
            httpGet(testWorkCheckActivitiBase + '/' + processInstanceID, (result) => {
                const {status, data} = result;
                const {operation} = data;
                const operationData = {
                    "operation": operation,
                    "processsInstanceID": processInstanceID,
                    "id": id
                }
                sessionStorage.setItem('operation',JSON.stringify(operationData));
                if (status === STATUS.SUCCESS && consignStatus === STATUS.SUCCESS) {
                    const newData = {
                        ...consignData,
                        ...data,
                    };
                    dispatch(setTestWorkCheckContent(newData));
                }
            })


            // dispatch(setTestWorkCheckContent(data));
        }
        callback && callback(status);
    });
};

export const deleteTestWorkCheck = (dispatch, id, callback) => {
    console.log(id);
    httpDelete(testWorkCheckBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeTestWorkCheck(id));
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
    //console.log(data);
    httpPut(testWorkCheckBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestWorkCheckContent(data));
        }
        callback && callback(status);
    });
};

export const getTestWorkCheckState = (dispatch, processInstanceID, id, callback) => {
    console.log('qwerttttt');
    httpGet(testWorkCheckActivitiBase + '/' + processInstanceID, (result) => {
        console.log(testWorkCheckActivitiBase + '/' + processInstanceID);
        const {status, data} = result;
        console.log(data);
        const {operation} = data;
        console.log(operation[0]);
        const operationData = {
            "operation": operation,
            "processsInstanceID": processInstanceID,
            "id": id
        }
        sessionStorage.setItem('operation',JSON.stringify(operationData));
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            console.log(newData);
            dispatch(setTestWorkCheckContent(newData));
        }

        callback && callback(status);
    })
};

export const putTestWorkCheckState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
    console.log(testWorkCheckActivitiBase + '/' + processInstanceID);
    httpPut(testWorkCheckActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
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