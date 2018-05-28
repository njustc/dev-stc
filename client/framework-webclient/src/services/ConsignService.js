import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {addConsign, removeConsign, setConsignContent, setConsignList, setConsignState} from "../modules/ducks/Consign";
import {mockProjectData, valueData} from "./mockData";

const consignBase = baseServiceAddress + '/consign';
const consignActivitiBase = baseServiceAddress + '/consignActiviti';

export const getConsignList = (dispatch, callback) => {
    /*    httpGet(projectBase, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setProjectList(data));
            }
            callback && callback(status);
        });*/
    /*TEMP*/
    dispatch(setConsignList([]));/*TODO*//*可以在这里加一些数据用于测试*/
    const status = STATUS.SUCCESS;
    callback && callback(status);
};

export const getConsign = (dispatch, id, callback) => {
/*    httpGet(consignBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignContent(index, data.consignation));
        }*/
        console.log(id);
        const status = STATUS.SUCCESS;
//        dispatch(setConsignContent(valueData));
        callback && callback(status);
    //});
    return valueData;
};

export const deleteConsign = (dispatch, id, callback) => {
    httpDelete(consignBase, {id:id}, (result) => {
        const {status} = result;
        if (status === STATUS.SUCCESS) {
            httpGet(consignBase, (result) => {
                dispatch(removeConsign(id));
            });
        }
        callback && callback(status);
    });
};

export const newConsign = (dispatch, callback) => {
    httpPost(consignBase, {consignation:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(addConsign(data));
        }
        callback && callback(status);
    });
};

export const updateConsign = (dispatch, data, callback) => {
    httpPut(consignBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignContent(-1, data.consignation));
        }
        callback && callback(status);
    });
};

export const getConsignState = (dispatch, i, processInstanceID, callback) => {
    httpGet(consignActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignState(i, data.state));
        }
        callback && callback(status);
    })
};

export const putConsignState = (dispatch, pi, data, callback) => {
    httpPut(consignActivitiBase + '/' + pi, data, (result) => {
        const {status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignState(-1, /*TODO*/));
        }
        callback && callback(status);
    });
};