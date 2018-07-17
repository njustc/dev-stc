import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeConsign, setConsignContent, setConsignList/*, setConsignState*/} from "../modules/ducks/Consign";
import {mockProjectData, valueData} from "./mockData";
import {globalOperation, STATE} from "./common";
import {setContractContent} from "../modules/ducks/Contract";
// import "./common";

/**
 * @module services/consignService
 */

const consignBase = baseServiceAddress + '/consign';
const consignActivitiBase = baseServiceAddress + '/processInstance';

/**
 * 实现利用GET请求从后台获取委托列表
 * @param {*} dispatch dispatch
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getConsignList = (dispatch, callback) => {
    httpGet(consignBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignList(data));
        }
        callback && callback(status);
    });
};

/**
 * 实现利用GET请求从后台获取委托详情
 * @param {*} dispatch dispatch
 * @param {*} id 委托ID
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getConsign = (dispatch, id, callback) => {
    httpGet(consignBase + '/' + id, (result) => {
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
        }
        callback && callback(status);
    });
};

/**
 * 实现利用DELETE请求删除委托
 * @param {*} dispatch dispatch
 * @param {*} id 委托ID
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const deleteConsign = (dispatch, id, callback) => {
    httpDelete(consignBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeConsign(id));
        callback && callback(status);
    });
};

/**
 * 实现利用PUT请求新建委托
 * @param {*} dispatch dispatch
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const newConsign = (dispatch, callback) => {
    httpPost(consignBase, {consignation:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignContent(data));
        }
        callback && callback(status);
    });
};

/**
 * 实现利用PUT请求更新委托内容
 * @param {*} dispatch dispatch
 * @param {*} data 委托内容
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const updateConsign = (dispatch, data, callback) => {
    httpPut(consignBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignContent(data));
        }
        callback && callback(status);
    });
};

/**
 * 实现利用GET请求获取委托状态
 * @param {*} dispatch dispatch
 * @param {*} processInstanceID 委托的流程ID
 * @param {*} id 委托ID
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getConsignState = (dispatch, processInstanceID, id, callback) => {
    httpGet(consignActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        const {operation} = data;
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

/**
 * 实现利用PUT请求更新委托状态
 * @param {*} dispatch dispatch
 * @param {*} processInstanceID 委托的流程ID
 * @param {*} data 向后台传输的数据
 * @param {*} id 委托ID
 * @param {*} callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const putConsignState = (dispatch, processInstanceID, data, id, callback) => {
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

export {getConsignList,getConsign,deleteConsign,newConsign,updateConsign,getConsignState,putConsignState}