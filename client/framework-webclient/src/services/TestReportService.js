import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestReport, setTestReportContent, setTestReportList, setTestReportState} from "../modules/ducks/TestReport";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setTestReportCheckContent, setTestReportCheckList} from "../modules/ducks/TestReportCheck";

const testReportBase = baseServiceAddress + '/testReport';
const testReportActivitiBase = baseServiceAddress + '/processInstance';

export const getTestReportList = (dispatch, callback) => {
    dispatch(setTestReportList(/*data*/
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
    // httpGet(testReportBase,(result) => {
    //     const {status, data} = result;
    //     if (status === STATUS.SUCCESS) {
    //         dispatch(setTestReportList(data));
    //     }
    //     callback && callback(status);
    // });
    // const status = STATUS.SUCCESS;
    // callback && callback(status);
};

export const getTestReport = (dispatch, id, callback) => {
    dispatch(setTestReportContent({id:id,}));
    // httpGet(testReportBase + '/' + id, (result) => {
    //     const {status, data} = result;
    //     if (status === STATUS.SUCCESS) {
    //         dispatch(setTestReportContent(data));
    //     }
    //     callback && callback(status);
    // });
};

export const deleteTestReport = (dispatch, id, callback) => {
    httpDelete(testReportBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeTestReport(id));
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestReport(id));
        callback && callback(status);
    });
};

export const newTestReport = (dispatch, callback) => {
    httpPost(testReportBase, {consignation:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportContent(data));
        }
        callback && callback(status);
    });
};

export const updateTestReport = (dispatch, data, callback) => {
    //console.log(data);
    httpPut(testReportBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportContent(data));
        }
        callback && callback(status);
    });
};

export const getTestReportState = (dispatch, processInstanceID, callback) => {
    httpGet(testReportActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestReportContent(data));
        }
        callback && callback(status);
    })
};

export const putTestReportState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
    httpPut(testReportActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
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