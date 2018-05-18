import {baseServiceAddress} from "SERVICES/baseAddress";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {setConsignContent, setConsignList, setConsignStatus} from "../modules/ducks/Consign";

const consignBase = baseServiceAddress + '/consign';
const consignActivitiBase = baseServiceAddress + '/consignActiviti';

export const getConsignStatus = (dispatch, i, processInstanceID, callback) => {
    httpGet(consignActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === 'SUCCESS') {
            dispatch(setConsignStatus(i, data.state));
        }
        callback && callback(status);
    })
};

export const getConsignList = (dispatch, callback) => {
    httpGet(consignBase, (result) => {
        const {status, data} = result;
        if (status === 'SUCCESS') {
            dispatch(setConsignList(data));
            for (let i = 0; i < data.length; i ++) {
                getConsignStatus(dispatch, i, data[i].processInstanceID);
            }
        }
        callback && callback(status);
    });
};

export const deleteConsign = (dispatch, callback) => {
    httpDelete(consignBase, {id:id}, (result) => {
        const {status} = result;
        if (status === 'SUCCESS') {
            httpGet(consignBase, (result) => {
                const {status, data} = result;
                if (status === 'SUCCESS') {
                    dispatch(setConsignList(data));
                    for (let i = 0; i < data.length; i ++) {
                        httpGet(consignActivitiBase + '/' + data[i].processInstanceID, (result) => {
                            const {status, data} = result;
                            if (status === 'SUCCESS') {
                                dispatch(setConsignStatus(i, data.state));
                            }
                        })
                    }
                }
            });
        }
        callback && callback(status);
    });
};

export const newConsign = (dispatch, id) => {
    httpPost(consignBase, {consignation:null,}, (result) => {
        const {status} = result;
        if (status === 'SUCCESS') {
            httpGet(consignBase, (result) => {
                const {status, data} = result;
                if (status === 'SUCCESS') {
                    dispatch(setConsignList(data));
                    for (let i = 0; i < data.length; i ++) {
                        httpGet(consignActivitiBase + '/' + data[i].processInstanceID, (result) => {
                            const {status, data} = result;
                            if (status === 'SUCCESS') {
                                dispatch(setConsignStatus(i, data.state));
                            }
                        })
                    }
                }
            });
        }
    });
};

export const putConsign = (dispatch, data) => {
    httpPut(consignBase, data, (result) => {
        if (result.status === 'SUCCESS') {
            dispatch(setConsignContent(-1, values));
        }
        else {
            console.log("点击“保存”错误");
        }
    });
};