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

const projectBase = baseServiceAddress + '/v1/project';
const projectActivitiBase = baseServiceAddress + '/processInstance';

export const getProjectList = (dispatch, callback) => {
    httpGet(projectBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectList(data));
        }
        callback && callback(status);
    });
};

export const getProject = (dispatch, id, callback) => {
    // dispatch(setProjectContent({id:id,}));
    httpGet(projectBase + '/' + id, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
            // getProjectState(dispatch,id,(state) => {
            //     console.log(state);
            // });
        }
        callback && callback(status);
    });
    getConsign(dispatch,id);
};

export const deleteProject = (dispatch, id, callback) => {
    console.log(id);
    httpDelete(projectBase, {id:id}, (result) => {
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeProject(id));
        callback && callback(status);
    });
};

export const newProject = (dispatch, id, projectNo, callback) => {
    let urlParams = 'consignID=' + id;
    httpPost(projectBase, {code:projectNo}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            // dispatch(setProjectContent(data));j
            dispatch(showListMap());
        }
        callback && callback(result);
    },urlParams);
};

export const updateProject = (dispatch, data, callback) => {
    //console.log(data);
    httpPut(projectBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setProjectContent(data));
        }
        callback && callback(status);
    });
};

export const getProjectState = (dispatch, processInstanceID,callback) => {
    // getConsignState(dispatch,processInstanceID,id);
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

export const putProjectState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
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