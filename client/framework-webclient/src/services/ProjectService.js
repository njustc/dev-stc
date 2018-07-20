import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {getConsign} from "./ConsignService";
import {
    removeProject,
    setProjectContent,
    setProjectList,
    showListMap/*, setProjectState*/
} from "../modules/ducks/Project";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setTestRecordContent} from "../modules/ducks/TestRecord";
import {getConsignState} from "./ConsignService";
import {getContractState} from "./ContractService";
import {getTestPlanState} from "./TestPlanService";
import {getTestReportState} from "./TestReportService";

/**
 * @module services/projectService
 */

const projectBase = baseServiceAddress + '/v1/project';
const projectActivitiBase = baseServiceAddress + '/processInstance';

/**
 * 获取项目列表
 * @param dispatch dispatch
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getProjectList = (dispatch, callback) => {
    httpGet(projectBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectList(data));
        }
        callback && callback(status);
    });
};

/**
 * 获取项目内容
 * @param dispatch dispatch
 * @param id 项目ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getProject = (dispatch, id, callback) => {
    httpGet(projectBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
        }
        callback && callback(status);
    });
    getConsign(dispatch,id);
};

/**
 * 删除项目
 * @param dispatch dispatch
 * @param id 项目ID
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const deleteProject = (dispatch, id, callback) => {
    console.log(id);
    httpDelete(projectBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeProject(id));
        callback && callback(status);
    });
};

/**
 * 新建项目
 * @param dispatch dispatch
 * @param id 项目ID
 * @param projectNo 项目流程编号
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const newProject = (dispatch, id, projectNo, callback) => {
    let urlParams = 'consignID=' + id;
    httpPost(projectBase, {code:projectNo}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(showListMap());
        }
        callback && callback(result);
    },urlParams);
};

/**
 * 更新项目内容
 * @param dispatch dispatch
 * @param data 项目内容
 * @param callback callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const updateProject = (dispatch, data, callback) => {
    httpPut(projectBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
        }
        callback && callback(status);
    });
};

/**
 * 获取项目当前进行阶段以及相应阶段流程
 * @param dispatch dispatch
 * @param processInstanceID 项目ID
 * @param callback　callback 回调内容为向后台发送请求传输结果的状态，可能为SUCCESS或FAILURE
 */
const getProjectState = (dispatch, processInstanceID,callback) => {
    getContractState(dispatch,processInstanceID,(contractState) => {
        let projectState = {
            Process: null,
            State: null
        };
        if(contractState&&contractState!==STATE.FINISHED){
            projectState = {
                Process: 'Contract',
                State: contractState
            };
            callback&&callback(projectState);
        }
        else if(contractState===STATE.FINISHED){

            getTestPlanState(dispatch,processInstanceID,(testPlanState) => {
                if(testPlanState&&testPlanState!==STATE.TO_IMPLEMENT){
                    projectState = {
                        Process: 'TestPlan',
                        State: testPlanState
                    };
                    callback&&callback(projectState);
                }
                else if(testPlanState===STATE.TO_IMPLEMENT){

                    getTestReportState(dispatch,processInstanceID,(testReportState) => {
                        if(testReportState&&testReportState!==STATE.SATISFACTION){
                            projectState = {
                                Process: 'TestReport',
                                State: testReportState
                            };
                            callback&&callback(projectState);
                        }
                        else if(testReportState===STATE.SATISFACTION){
                            projectState = {
                                Process: 'TestReport',
                                State: testReportState
                            };
                            callback&&callback(projectState);
                        }
                    })
                }
            })
        }
    })
};

const putProjectState = (dispatch, processInstanceID, data, id, callback) => {
    httpPut(projectActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setProjectContent(newData));
        }
        callback && callback(status);
    });
};

export {getProjectList,getProject,deleteProject,newProject,updateProject,getProjectState,putProjectState}