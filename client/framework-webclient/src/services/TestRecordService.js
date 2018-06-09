import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestRecord, setTestRecordContent, setTestRecordList/*, setTestRecordState*/} from "../modules/ducks/TestRecord";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

const testRecordBase = baseServiceAddress + '/testRecord';
const testRecordActivitiBase = baseServiceAddress + '/processInstance';

export const getTestRecordList = (dispatch, callback) => {
    httpGet(testRecordBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestRecordList(data));
        }
        callback && callback(status);
    });
};

export const getTestRecord = (dispatch, id, callback) => {
    httpGet(testRecordBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestRecordContent(data));
        }
        callback && callback(status);
    });
};

export const deleteTestRecord = (dispatch, id, callback) => {
    httpDelete(testRecordBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeTestRecord(id));
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestRecord(id));
        callback && callback(status);
    });
};

export const newTestRecord = (dispatch, callback) => {
    httpPost(testRecordBase, {record:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestRecordContent(data));
        }
        callback && callback(status);
    });
};

export const updateTestRecord = (dispatch, data, callback) => {
    //console.log(data);
    httpPut(testRecordBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestRecordContent(data));
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

export const putTestRecordState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
    httpPut(testRecordActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        if (status === STATUS.SUCCESS) {
             const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestRecordContent(newData));
        }
        callback && callback(status);
    });
};