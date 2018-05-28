import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {setTestProgramList,setTestCaseList,setTestRecordList,setTestProblemList/*, addConsign, removeConsign, setConsignContent,  setConsignState*/} from "../modules/ducks/Test";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

/*const consignBase = baseServiceAddress + '/consign';
const consignActivitiBase = baseServiceAddress + '/consignActiviti';*/

export const getTestProgramList = (dispatch, callback) => {
    /*    httpGet(projectBase, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setProjectList(data));
            }
            callback && callback(status);
        });*/
    /*TEMP*/
    dispatch(setTestProgramList([
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

export const getTestCaseList = (dispatch, callback) => {
    /*    httpGet(projectBase, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setProjectList(data));
            }
            callback && callback(status);
        });*/
    /*TEMP*/
    dispatch(setTestCaseList([
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

export const getTestRecordList = (dispatch, callback) => {
    /*    httpGet(projectBase, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setProjectList(data));
            }
            callback && callback(status);
        });*/
    /*TEMP*/
    dispatch(setTestRecordList([
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

export const getTestProblemList = (dispatch, callback) => {
    /*    httpGet(projectBase, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setProjectList(data));
            }
            callback && callback(status);
        });*/
    /*TEMP*/
    dispatch(setTestProblemList([
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

export const getTestRecord = (dispatch, id, callback) => {
    /*    httpGet(consignBase + '/' + id, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setConsignContent(index, data.consignation));
            }*/
    console.log(id);
    const status = STATUS.SUCCESS;
//        dispatch(setTestRecordContent(valueData));
    callback && callback(status);
    //});
    return valueData;
};
