import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeContract, setContractContent, setContractList, setContractState} from "../modules/ducks/Contract";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setTestRecordList} from "../modules/ducks/TestRecord";
import {showListMap} from "../modules/ducks/Project";
import {getProjectList} from "SERVICES/ProjectService";

const contractBase = baseServiceAddress + '/contract';
const contractActivitiBase = baseServiceAddress + '/processInstance';

/**
 * @module services/contractService
 */

/**
 * 实现利用GET请求从后台获取合同列表
 * @param {*} dispatch dispatch
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getContractList = (dispatch, callback) => {
    httpGet(contractBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractList(data));
        }
        callback && callback(status);
    });
};

/**
 * 实现利用GET请求获取合同详情
 * @param {*} dispatch dispatch
 * @param {*} id 合同ID
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getContract = (dispatch, id, callback) => {
    httpGet(contractBase + '/' + id, (result) => {
       console.log(result);
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            console.log(data);
            dispatch(setContractContent(data));
        }
        callback && callback(status);
    });
};

/**
 * 实现利用DELETE请求删除合同
 * @param {*} dispatch dispatch
 * @param {*} id 合同ID
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const deleteContract = (dispatch, id, callback) => {
    httpDelete(contractBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeContract(id));
        callback && callback(status);
    });
};

/**
 * 实现利用POST请求新建合同
 * @param {*} dispatch dispatch
 * @param {*} id 合同ID
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const newContract = (dispatch, id,callback) => {
    const urlParams = 'projectID=' + id;
    httpPost(contractBase, {contractBody:null}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            getProjectList(dispatch);
        }
        callback && callback(status);
    },urlParams);
};

/**
 * 实现利用PUT请求更新合同内容
 * @param {*} dispatch dispatch
 * @param {*} data 合同内容
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const updateContract = (dispatch, data, callback) => {
    httpPut(contractBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractContent(data));
        }
        callback && callback(status);
    });
};

/**
 * 实现利用GET请求获取合同状态
 * @param {*} dispatch dispatch
 * @param {*} ProjectID 合同ID
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getContractState = (dispatch, ProjectID, callback) => {
    const PID = 'projectID=' + ProjectID;
    httpGet(contractBase, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            const {state} = data;
            callback && callback(state);
        }
    },PID)
};

/**
 * 改变合同状态
 * @param dispatch dispatch
 * @param processInstanceID 合同的流程ID
 * @param data 含有状态改变的数据
 * @param id 合同ID
 * @param callback　callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const putContractState = (dispatch, processInstanceID, data, id, callback) => {
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

export {getContractList,getContract,deleteContract,newContract,updateContract,getContractState,putContractState}