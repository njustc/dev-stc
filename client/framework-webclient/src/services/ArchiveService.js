import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {setSatisfactionList,setTestWorkCheckList/*, addConsign, removeConsign, setConsignContent,  setConsignState*/} from "../modules/ducks/Archive";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {getProjectList} from "SERVICES/ProjectService";
import {setTestWorkCheckContent} from "../modules/ducks/TestWorkCheck";

const satisfactionBase = baseServiceAddress + '/v1/satisfactionSurvey';
const satisfactionActivitiBase = baseServiceAddress + '/processInstance';

/**
 * @module services/ArchiveService
 */

export const getSatisfactionList = (dispatch, callback) => {
};

/**
 * 向后台更新满意度调查表内容
 * @param dispatch dispatch
 * @param data 满意度调查表内容
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const updateSatisfaction = (dispatch, data, callback) => {
    httpPut(satisfactionBase, data, (result) => {
        const {status} = result;
        if (status === STATUS.SUCCESS) {
            getProjectList(dispatch);
        }
        callback && callback(status);
    });
};

const newSatisfaction = (dispatch, id, callback) => {
    let urlParams = 'projectID=' + id;
    httpPost(satisfactionBase, {body:null}, (result) => {
        const {status} = result;
        getProjectList(dispatch);
        callback && callback(status);
    }, urlParams)
};

const putSatisfactionState = (dispatch, processInstanceID, data, id, callback) => {
    httpPut(satisfactionActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            getProjectList(dispatch);
        }
        callback && callback(status);
    });
};

export {updateSatisfaction,putSatisfactionState,newSatisfaction}
