import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeContract, setContractContent, setContractList, setContractState} from "../modules/ducks/Contract";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setTestRecordList} from "../modules/ducks/TestRecord";
import {showListMap} from "../modules/ducks/Project";

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
};

export const getContract = (dispatch, id, callback) => {
    httpGet(contractBase + '/' + id, (result) => {
       console.log(result);
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractContent(data));
        }
        callback && callback(status);
    });
};

export const deleteContract = (dispatch, id, callback) => {
    httpDelete(contractBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeContract(id));
        callback && callback(status);
    });
};

export const newContract = (dispatch, id,callback) => {
    let urlParams = 'projectID=' + id;
    httpPost(contractBase, {contractBody:null}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractContent(data));
        }
        callback && callback(status);
    },urlParams);
};

export const updateContract = (dispatch, data, callback) => {
    httpPut(contractBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractContent(data));
        }
        callback && callback(status);
    });
};

// export const getContractState = (dispatch, processInstanceID, id, callback) => {
//     httpGet(contractActivitiBase + '/' + processInstanceID, (result) => {
//         const {status, data} = result;
//         if (status === STATUS.SUCCESS) {
//             const newData = {
//                 ...data,
//                 id: id,
//             };
//             dispatch(setContractContent(newData));
//         }
//         callback && callback(status);
//     })
// };

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