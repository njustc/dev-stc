import {baseServiceAddress} from "SERVICES/baseAddress";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {setConsignContent, setConsignList, setConsignStatus} from "../modules/ducks/Consign";

const consignBase = baseServiceAddress + '/consign';
const consignActivitiBase = baseServiceAddress + '/consignActiviti';

export const getConsignStatus = (dispatch, i, processInstanceID) => {
    httpGet(consignActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === 'SUCCESS') {
            dispatch(setConsignStatus(i, data.state));
        }
    })
};

export const getConsignList = (dispatch) => {
    httpGet(consignBase, (result) => {
        const {status, data} = result;
        if (status === 'SUCCESS') {
            dispatch(setConsignList(data));
            for (let i = 0; i < data.length; i ++) {
                // httpGet(consignActivitiBase + '/' + data[i].processInstanceID, (result) => {
                //     const {status, data} = result;
                //     if (status === 'SUCCESS') {
                //         dispatch(setConsignStatus(i, data.state));
                //     }
                // })
                getConsignStatus(dispatch, i, data[i].processInstanceID);
            }
        }
    });
};

export const deleteConsign = (dispatch) => {
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