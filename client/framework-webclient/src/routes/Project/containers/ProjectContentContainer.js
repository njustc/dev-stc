import React, {Component} from 'react';
import ProjectContentComponent from "../components/ProjectContentComponent";
import {message} from 'antd';
import {connect} from "react-redux";
import {getProject, putProjectState, updateProject} from "../../../services/ProjectService";
import {STATUS} from "../../../services/common";
/*TODO:表单内容和按钮的可视及禁用情况*/
const mapStateToProps = (state, ownProps) => {
    // debugger;
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const consignation = state.Project.listMap[ownProps.id].consignation;
    return {
        // consignData: {},/*fetch data with pro id*/
        consignData: state.Project.listMap[ownProps.id],
        values: consignation ? JSON.parse(consignation) : {},
        disable: authData.functionGroup["Project"]===undefined||authData.functionGroup["Project"].findIndex(element => element === "EDIT")===-1||state.Project.listMap[ownProps.id].state!=="TobeSubmit",
        curKey: state.Layout.activeKey, /*TODO: 将当前页面id保存为组件静态变量，通过此id获取页面内容*/

    }
};

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    return {
        getValues: (id) => getProject(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContentComponent);
