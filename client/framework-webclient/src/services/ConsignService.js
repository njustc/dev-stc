import {baseServiceAddress} from "SERVICES/baseAddress";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {addConsign, removeConsign, setConsignContent, setConsignList, setConsignState} from "../modules/ducks/Consign";

const consignBase = baseServiceAddress + '/consign';
const consignActivitiBase = baseServiceAddress + '/consignActiviti';

export const getConsignState = (dispatch, i, processInstanceID, callback) => {
    httpGet(consignActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === 'SUCCESS') {
            dispatch(setConsignState(i, data.state));
        }
        callback && callback(status);
    })
};

export const getConsignList = (dispatch, callback) => {
    httpGet(consignBase, (result) => {
        const {status, data} = result;
        if (status === 'SUCCESS') {
            dispatch(setConsignList(data));
        }
        callback && callback(status);
    });
};

export const deleteConsign = (dispatch, id, callback) => {
    httpDelete(consignBase, {id:id}, (result) => {
        const {status} = result;
        if (status === 'SUCCESS') {
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
        if (status === 'SUCCESS') {
            dispatch(addConsign(data));
        }
        callback && callback(status);
    });
};

export const putConsign = (dispatch, data, callback) => {
    httpPut(consignBase, data, (result) => {
        if (result.status === 'SUCCESS') {
            dispatch(setConsignContent(-1, values));
        }
        callback && callback(status);
    });
};