import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeTestProblem, setTestProblemContent, setTestProblemList/*, setTestProblemState*/} from "../modules/ducks/TestProblem";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";
import {setProjectList} from "../modules/ducks/Project";

const testCaseBase = baseServiceAddress + '/testCase';
const testCaseActivitiBase = baseServiceAddress + '/processInstance';

export const getTestProblemList = (dispatch, callback) => {
};

var mockTestProblemData=[{
    //id: 1,
    classification: 'yj',
    process: 'unhappy->happy',
    expectedResult: 'happy',
    designer: 'yj',
    time: '2018-06-03',
    action: 'delete',
    designNotes: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    statute: 'sssssss',
    accordance: 'tttttt'
}];

export const getTestProblem = (dispatch, id, callback) => {
    //dispatch(setTestProblemContent({id:id,}));
    dispatch(setTestProblemContent(/*data*/
        mockTestProblemData
    ));
    // httpGet(testCaseBase + '/' + id, (result) => {
    //     const {status, data} = result;
    //     if (status === STATUS.SUCCESS) {
    //         dispatch(setTestProblemContent(data));
    //     }
    //     callback && callback(status);
    // });
};

export const deleteTestProblem = (dispatch, id, callback) => {
    httpDelete(testCaseBase, {id:id}, (result) => {
        // console.log("before remove");
        // dispatch(removeTestProblem(id));
        const {status} = result;
        if(status === STATUS.SUCCESS)
            dispatch(removeTestProblem(id));
        callback && callback(status);
    });
};

/*export const newTestProblem = (dispatch, callback) => {
    httpPost(testCaseBase, {testcase:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestProblemContent(data));
        }
        callback && callback(status);
    });
};*/

export const addTestProblem = (dispatch, data/*, callback*/) => {
    /*httpPost(testCaseBase, {testcase:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestProblemContent(data));
        }
        callback && callback(status);
    });*/
    mockTestProblemData.push(data);
    console.log(mockTestProblemData);//
};

export const updateTestProblem = (dispatch, data, callback) => {
    //console.log(data);
    httpPut(testCaseBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setTestProblemContent(data));
        }
        callback && callback(status);
    });
};

export const getTestProblemState = (dispatch, processInstanceID, id, callback) => {
    httpGet(testCaseActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestProblemContent(newData));
        }
        callback && callback(status);
    })
};

export const putTestProblemState = (dispatch, processInstanceID, data, id, callback) => {
    // console.log("ID = " + processInstanceID);
    httpPut(testCaseActivitiBase + '/' + processInstanceID, data, (result) => {
        const {status,data} = result;
        if (status === STATUS.SUCCESS) {
            const newData = {
                ...data,
                id: id,
            };
            dispatch(setTestProblemContent(newData));
        }
        callback && callback(status);
    });
};