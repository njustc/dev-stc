import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestPlan, setTestPlanContent, setTestPlanList, setTestPlanState} from "../modules/ducks/TestPlan";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setContractContent} from "../modules/ducks/Contract";

const testPlanBase = baseServiceAddress + '/v1/testPlan';
const testPlanActivitiBase = baseServiceAddress + '/processInstance';

export const getTestPlanList = (dispatch, callback) => {
    httpGet(testPlanBase,(result) => {
        const {status, data} = result;
        console.log(data);
        if (status === STATUS.SUCCESS) {
            dispatch(setTestPlanList(data));
        }
        callback && callback(status);
    });
};

export const getTestPlan = (dispatch, id, callback) => {
    console.log(id);
    httpGet(testPlanBase + '/' + id, (result) => {
       console.log(result);
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestPlanContent(data));
            // getTestPlanState(dispatch,'2f67e8db-e7aa-417b-85db-d5ccd4bff059');
        }
        callback && callback(status);
    });
};

export const deleteTestPlan = (dispatch, id, callback) => {
    httpDelete(testPlanBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestPlan(id));
        callback && callback(status);
    });
};

export const newTestPlan = (dispatch, id,callback) => {
    let urlParams = 'projectID=' + id;
    httpPost(testPlanBase, {body:null}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestPlanContent(data));
        }
        callback && callback(status);
    },urlParams);
};

export const updateTestPlan = (dispatch, data, callback) => {
    //console.log(data);
    httpPut(testPlanBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestPlanContent(data));
        }
        callback && callback(status);
    });
};

export const getTestPlanState = (dispatch, ProjectID, callback) => {
    const PID = 'projectID=' + ProjectID;
    httpGet(testPlanBase, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            // console.log(data);
            const {state} = data;
            console.log(state);
            callback && callback(state);
        }
    },PID)
};

export const putTestPlanState = (dispatch, processInstanceID, data, id, callback) => {
    console.log("processInstanceID = " + processInstanceID);
    console.log("ID = " + id);
    httpPut(testPlanActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestPlanContent(newData));
        }
        callback && callback(status);
    });
};