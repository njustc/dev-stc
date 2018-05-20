import {setProjectList} from "MODULES/ducks/Project";
import {STATUS} from "SERVICES/common";

export const getProjectList = (dispatch, callback) => {
    const data = [{
        id: 'id1',
        name: 'project1',
    },{
        id: 'id2',
        name: 'project2',
    }
    ];
    dispatch(setProjectList(data));
    callback(STATUS.SUCCESS);
};

export const getProjectContent = (dispatch, id, callback) => {

};

export const deleteProject = (dispatch, id, callback) => {

};

export const newProject = (dispatch, projectData, callback) => {

};

export const updateProject = (dispatch, projectData, callback) => {

};