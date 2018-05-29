import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {setContractList,setContractCheckList,/*addContract, removeContract, setContractContent, setContractState*/} from "../modules/ducks/Contract";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

//const contractBase = baseServiceAddress + '/contract';
//const contractActivitiBase = baseServiceAddress + '/contractActiviti';

export const getContractList = (dispatch, callback) => {
    /*    httpGet(projectBase, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setProjectList(data));
            }
            callback && callback(status);
        });*/
    /*TEMP*/
    dispatch(setContractList([
        {
            pid : "110",
            id : "110",
            name : "快乐星球小杨杰",
            customerId : "151220140",
            status: STATE.TO_SUBMIT
        },{
            pid :"120",
            id : "120",
            name : "不快乐星球小杨杰",
            customerId : "151220140",
            status: STATE.TO_CHECK
        },{
            pid : "119",
            id : "119",
            name : "不快乐星球老杨杰",
            customerId : "151220140",
            status: STATE.CANCELED
        }
    ]));/*TODO 可以在这里加一些数据用于测试*/
    const status = STATUS.SUCCESS;
    callback && callback(status);
};


export const getContract = (dispatch, id, callback) => {
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

export const deleteContract = (dispatch, id, callback) => {
    httpDelete(contractBase, {id:id}, (result) => {
        const {status} = result;
        if (status === STATUS.SUCCESS) {
            httpGet(contractBase, (result) => {
                dispatch(removeContract(id));
            });
        }
        callback && callback(status);
    });
};

/*TODO:consignation是啥*/
export const newContract = (dispatch, callback) => {
    httpPost(contractBase, {consignation:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(addContract(data));
        }
        callback && callback(status);
    });
};

export const updateContract = (dispatch, data, callback) => {
    httpPut(contractBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractContent(-1, data.consignation));
        }
        callback && callback(status);
    });
};

export const getContractState = (dispatch, i, processInstanceID, callback) => {
    httpGet(contractActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractState(i, data.state));
        }
        callback && callback(status);
    })
};

export const putContractState = (dispatch, pi, data, callback) => {
    httpPut(contractActivitiBase + '/' + pi, data, (result) => {
        const {status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setContractState(-1, /*TODO*/));
        }
        callback && callback(status);
    });
};

export const getContractCheckList = (dispatch, callback) => {
    /*    httpGet(projectBase, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setProjectList(data));
            }
            callback && callback(status);
        });*/
    /*TEMP*/
    dispatch(setContractCheckList([
        {
            pid : "110",
            id : "110",
            name : "快乐星球小杨杰",
            customerId : "151220140",
            status: STATE.TO_SUBMIT
        },{
            pid :"120",
            id : "120",
            name : "不快乐星球小杨杰",
            customerId : "151220140",
            status: STATE.TO_CHECK
        },{
            pid : "119",
            id : "119",
            name : "不快乐星球老杨杰",
            customerId : "151220140",
            status: STATE.CANCELED
        }
    ]));/*TODO 可以在这里加一些数据用于测试*/
    const status = STATUS.SUCCESS;
    callback && callback(status);
};
