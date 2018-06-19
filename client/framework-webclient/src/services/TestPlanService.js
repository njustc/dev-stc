import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestPlan, setTestPlanContent, setTestPlanList, setTestPlanState} from "../modules/ducks/TestPlan";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

const testPlanBase = baseServiceAddress + '/testPlan';
const testPlanActivitiBase = baseServiceAddress + '/processInstance';

export const getTestPlanList = (dispatch, callback) => {
    dispatch(setTestPlanList(/*data*/
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
    // httpGet(testPlanBase,(result) => {
    //     const {status, data} = result;
    //     if (status === STATUS.SUCCESS) {
    //         dispatch(setTestPlanList(data));
    //     }
    //     callback && callback(status);
    // });
    // const status = STATUS.SUCCESS;
    // callback && callback(status);
};

export const getTestPlan = (dispatch, id, callback) => {
    dispatch(setTestPlanContent({id:id,}));
    // httpGet(testPlanBase + '/' + id, (result) => {
    //     const {status, data} = result;
    //     if (status === STATUS.SUCCESS) {
    //         dispatch(setTestPlanContent(data));
    //     }
    //     callback && callback(status);
    // });
};

export const deleteTestPlan = (dispatch, id, callback) => {
    httpDelete(testPlantBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeTestPlan(id));
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestPlan(id));
        callback && callback(status);
    });
};

export const newTestPlan = (dispatch, callback) => {
    httpPost(testPlanBase, {consignation:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestPlanContent(data));
        }
        callback && callback(status);
    });
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

export const getTestPlanState = (dispatch, processInstanceID, id, callback) => {
    httpGet(testPlanActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestPlanContent(newData));
        }
        callback && callback(status);
    })
};

export const putTestPlanState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
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