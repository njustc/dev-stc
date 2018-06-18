import React, {Component} from 'react';
import ProjectContentComponent from "../components/ProjectContentComponent";
import {message} from 'antd';
import {connect} from "react-redux";
import {getProject, putProjectState, updateProject} from "../../../services/ProjectService";
//import {STATUS} from "../../../services/common";
import {ProjectContentView} from "../index";
import {addTabAction} from "MODULES/ducks/Layout";

import {ConsignContentView} from "../../Consign";
import {ContractContentView} from "../../Contract";
import {TestPlanContentView} from "../../Test";
import {TestCaseContentView} from "../../Test";
import {TestRecordContentView} from "../../Test";
import {TestProblemContentView} from "../../Test";
import {TestReportContentView} from "../../TestReport";
import {TestReportCheckContentView} from "../../TestReport";
import {TestWorkCheckContentView} from "../../Archive";
import {SatisfactionContentView} from "../../Archive";

/*TODO:表单内容和按钮的可视及禁用情况*/
const mapStateToProps = (state, ownProps) => {
    // debugger;
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    //const consignation = state.Project.listMap[ownProps.id].consignation;
    const projectContent = state.Project.listMap[ownProps.id];
    const consignContent = state.Consign.listMap[ownProps.id];
    //const consignation = content?state.Consign.listMap[ownProps.id].consignation:undefined;
    //console.log(consignContent);
    //console.log(consignContent.operation[0]);//
    return {
        // consignData: {},/*fetch data with pro id*/
        projectData: projectContent?state.Project.listMap[ownProps.id]:ownProps,
        //consignData: state.Consign.listMap[ownProps.id],
        //values: consignation ? JSON.parse(consignation) : {},
        disable: authData.functionGroup["Project"]===undefined||authData.functionGroup["Project"].findIndex(element => element === "EDIT")===-1||state.Project.listMap[ownProps.id].state!=="TobeSubmit",
        //curKey: state.Layout.activeKey, /*TODO: 将当前页面id保存为组件静态变量，通过此id获取页面内容*/
        consignState: consignContent?consignContent.operation[0]:'Undefined',/*TODO 待完善*/
    }
};

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    return {
        showContent: (item,id) => {
            //console.log(id);
            console.log(item);
            const key = item.index + id;
            /*TODO:文档的ID是流程的ID+文档名不同*/
            switch (item.index){
                case 1:dispatch(addTabAction(key, '委托详情', ConsignContentView, {id: id}));break;
                case 2:dispatch(addTabAction(key, '合同详情', ContractContentView, {id: id}));break;
                case 3:dispatch(addTabAction(key, '测试方案详情', TestPlanContentView, {id: id}));break;
                case 4:dispatch(addTabAction(key, '测试用例详情', TestCaseContentView, {id: id}));break;
                case 5:dispatch(addTabAction(key, '测试用例详情', TestRecordContentView, {id: id}));break;
                case 6:dispatch(addTabAction(key, '测试用例详情', TestProblemContentView, {id: id}));break;
                case 7:dispatch(addTabAction(key, '测试用例详情', TestReportContentView, {id: id}));break;
                case 8:dispatch(addTabAction(key, '测试用例详情', TestReportCheckContentView, {id: id}));break;
                case 9:dispatch(addTabAction(key, '测试用例详情', TestWorkCheckContentView, {id: id}));break;
                case 10:dispatch(addTabAction(key, '测试用例详情', SatisfactionContentView, {id: id}));break;
                default:break;
            }
            //dispatch(addTabAction(id, '流程详情', ProjectContentView, {id: id}));
        },
        getValues: (id) => getProject(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContentComponent);
