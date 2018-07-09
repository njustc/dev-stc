import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {setSatisfactionList,setTestWorkCheckList/*, addConsign, removeConsign, setConsignContent,  setConsignState*/} from "../modules/ducks/Archive";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {getProjectList} from "SERVICES/ProjectService";

const satisfactionBase = baseServiceAddress + '/v1/satisfactionSurvey';

export const getSatisfactionList = (dispatch, callback) => {
    /*    httpGet(projectBase, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setProjectList(data));
            }
            callback && callback(status);
        });*/

    // dispatch(setSatisfactionList([
    //     {
    //         pid : "110",
    //         id : "110",
    //         name : "快乐星球小杨杰",
    //         customerId : "151220140",
    //         status: STATE.TO_SUBMIT
    //     },{
    //         pid :"120",
    //         id : "120",
    //         name : "不快乐星球小杨杰",
    //         customerId : "151220140",
    //         status: STATE.TO_CHECK
    //     },{
    //         pid : "119",
    //         id : "119",
    //         name : "不快乐星球老杨杰",
    //         customerId : "151220140",
    //         status: STATE.CANCELED
    //     }
    // ]));/*TODO 可以在这里加一些数据用于测试*/
    // const status = STATUS.SUCCESS;
    // callback && callback(status);
};

export const getTestWorkCheckList = (dispatch, callback) => {
    /*    httpGet(projectBase, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setProjectList(data));
            }
            callback && callback(status);
        });*/
    /*TEMP*/
    dispatch(setTestWorkCheckList([
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

export const newSatisfaction = (dispatch, id, callback) => {
    let urlParams = 'projectID=' + id;
    httpPost(satisfactionBase, {body:null}, (result) => {
        const {data, status} = result;
        getProjectList(dispatch);
        callback && callback(status);
    }, urlParams)
};

