import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestReportCheck, setTestReportCheckContent, setTestReportCheckList, setTestReportCheckState} from "../modules/ducks/TestReportCheck";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setTestRecordContent, setTestRecordList} from "../modules/ducks/TestRecord";

const TestReportCheckBase = baseServiceAddress + '/v1/testReportCheck';
const TestReportCheckActivitiBase = baseServiceAddress + '/processInstance';

export const getTestReportCheckList = (dispatch, callback) => {
    dispatch(setTestReportCheckList(/*data*/
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
    // httpGet(TestReportCheckBase,(result) => {
    //     const {status, data} = result;
    //     if (status === STATUS.SUCCESS) {
    //         dispatch(setTestReportCheckList(data));
    //     }
    //     callback && callback(status);
    // });
    // const status = STATUS.SUCCESS;
    // callback && callback(status);
};

export const getTestReportCheck = (dispatch, id, callback) => {
    dispatch(setTestReportCheckContent({id:id,}));
    // httpGet(TestReportCheckBase + '/' + id, (result) => {
    //     const {status, data} = result;
    //     if (status === STATUS.SUCCESS) {
    //         dispatch(setTestReportCheckContent(data));
    //     }
    //     callback && callback(status);
    // });
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

export const newTestReportCheck = (dispatch,id, callback) => {
    const urlParams = 'projectID=' + id;
    httpPost(TestReportCheckBase, {body:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportCheckContent(data));
        }
        callback && callback(status);
    },urlParams);
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

export const getTestReportCheckState = (dispatch, processInstanceID, id, callback) => {
    httpGet(TestReportCheckActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestReportCheckContent(newData));
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