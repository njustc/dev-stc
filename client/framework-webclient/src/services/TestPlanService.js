import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestPlan, setTestPlanContent, setTestPlanList, setTestPlanState} from "../modules/ducks/TestPlan";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setContractContent} from "../modules/ducks/Contract";

const testPlanBase = baseServiceAddress + '/v1/testPlan';
const testPlanActivitiBase = baseServiceAddress + '/processInstance';

/**
 * @module services/testPlanService
 */

/**
 * 获取测试方案列表
 * @param dispatch dispatch
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getTestPlanList = (dispatch, callback) => {
    httpGet(testPlanBase,(result) => {
        const {status, data} = result;
        console.log(data);
        if (status === STATUS.SUCCESS) {
            dispatch(setTestPlanList(data));
        }
        callback && callback(status);
    });
};

/**
 * 获取测试方案详情
 * @param dispatch dispatch
 * @param id 测试方案ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getTestPlan = (dispatch, id, callback) => {
    console.log(id);
    httpGet(testPlanBase + '/' + id, (result) => {
       console.log(result);
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestPlanContent(data));
            // getTestPlanState(dispatch,'2f67e8db-e7aa-417b-85db-d5ccd4bff059');
        }
        callback && callback(status);
    });
};

/**
 * 删除测试方案
 * @param dispatch dispatch
 * @param id 测试方案ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const deleteTestPlan = (dispatch, id, callback) => {
    httpDelete(testPlanBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestPlan(id));
        callback && callback(status);
    });
};

/**
 * 新建测试方案
 * @param dispatch dispatch
 * @param id 测试方案ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const newTestPlan = (dispatch, id,callback) => {
    let urlParams = 'projectID=' + id;
    httpPost(testPlanBase, {body:null}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestPlanContent(data));
        }
        callback && callback(status);
    },urlParams);
};

/**
 * 更新测试方案内容
 * @param dispatch dispatch
 * @param data 测试方案内容
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const updateTestPlan = (dispatch, data, callback) => {
    httpPut(testPlanBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestPlanContent(data));
        }
        callback && callback(status);
    });
};

const getTestPlanState = (dispatch, ProjectID, callback) => {
    const PID = 'projectID=' + ProjectID;
    httpGet(testPlanBase, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            // console.log(data);
            const {state} = data;
            console.log(state);
            callback && callback(state);
        }
    },PID)
};

/**
 * 修改测试方案状态
 * @param dispatch dispatch
 * @param processInstanceID 测试方案流程ID
 * @param data 含有状态修改内容的数据
 * @param id 项目ID
 * @param callback　callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const putTestPlanState = (dispatch, processInstanceID, data, id, callback) => {
    console.log("processInstanceID = " + processInstanceID);
    console.log("ID = " + id);
    httpPut(testPlanActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestPlanContent(newData));
        }
        callback && callback(status);
    });
};

export {getTestPlanList,getTestPlan,deleteTestPlan,newTestPlan,updateTestPlan,getTestPlanState,putTestPlanState}