import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeConsign, setConsignContent, setConsignList/*, setConsignState*/} from "../modules/ducks/Consign";
import {mockProjectData, valueData} from "./mockData";
import {globalOperation, STATE} from "./common";
import {setContractContent} from "../modules/ducks/Contract";
// import "./common";

const consignBase = baseServiceAddress + '/consign';
const consignActivitiBase = baseServiceAddress + '/processInstance';

export const getConsignList = (dispatch, callback) => {
    httpGet(consignBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignList(data));
        }
        callback && callback(status);
    });
};

export const getConsign = (dispatch, id, callback) => {
    httpGet(consignBase + '/' + id, (result) => {
       //console.log(result);
        const {status, data} = result;
        const consignStatus = status;
        const consignData = data;
        if (status === STATUS.SUCCESS) {
            const {processInstanceID} = consignData;
            httpGet(consignActivitiBase + '/' + processInstanceID, (result) => {
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
                    dispatch(setConsignContent(newData));
                }
            })


            // dispatch(setConsignContent(data));
        }
        callback && callback(status);
    });
};

export const deleteConsign = (dispatch, id, callback) => {
    //console.log(id);
    httpDelete(consignBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeConsign(id));
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeConsign(id));
        callback && callback(status);
    });
};

export const newConsign = (dispatch, callback) => {
    httpPost(consignBase, {consignation:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignContent(data));
        }
        callback && callback(status);
    });
};

export const updateConsign = (dispatch, data, callback) => {
    //console.log(data);
    httpPut(consignBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignContent(data));
        }
        callback && callback(status);
    });
};

export const getConsignState = (dispatch, processInstanceID, id, callback) => {
    //console.log('qwerttttt');
    httpGet(consignActivitiBase + '/' + processInstanceID, (result) => {
        //console.log(consignActivitiBase + '/' + processInstanceID);
        const {status, data} = result;
        //console.log(data);
        const {operation} = data;
        //console.log(operation[0]);
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
            dispatch(setConsignContent(newData));
        }

        callback && callback(status);
    })
};

export const putConsignState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
    //console.log(consignActivitiBase + '/' + processInstanceID);
    httpPut(consignActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        if (status === STATUS.SUCCESS) {
             const newData = {
                ...data,
                id: id,
            };
            dispatch(setConsignContent(newData));
        }
        callback && callback(status);
    });
};