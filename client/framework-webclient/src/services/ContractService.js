import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeContract, setContractContent, setContractList, setContractState} from "../modules/ducks/Contract";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

const contractBase = baseServiceAddress + '/contract';
const contractActivitiBase = baseServiceAddress + '/processInstance';

export const getContractList = (dispatch, callback) => {
    httpGet(contractBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractList(data));
        }
        callback && callback(status);
    });
    // const status = STATUS.SUCCESS;
    // callback && callback(status);
};

export const getContract = (dispatch, id, callback) => {
    httpGet(contractBase + '/' + id, (result) => {
//        console.log(result);
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractContent(data));
        }
        callback && callback(status);
    });
};

export const deleteContract = (dispatch, id, callback) => {
    httpDelete(contractBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeContract(id));
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeContract(id));
        callback && callback(status);
    });
};

export const newContract = (dispatch, callback) => {
    httpPost(contractBase, {contract:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractContent(data));
        }
        callback && callback(status);
    });
};

export const updateContract = (dispatch, data, callback) => {
    console.log(data);
    httpPut(contractBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractContent(data));
        }
        callback && callback(status);
    });
};

export const getContractState = (dispatch, processInstanceID, callback) => {
    httpGet(contractActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractContent(data));
        }
        callback && callback(status);
    })
};

export const putContractState = (dispatch, processInstanceID, data, id, callback) => {
    httpPut(contractActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setContractContent(newData));
        }
        callback && callback(status);
    });
};