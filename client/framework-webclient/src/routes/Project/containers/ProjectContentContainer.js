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
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const projectContent = state.Project.listMap[ownProps.id];
    const consignContent = state.Consign.listMap[ownProps.id];
    return {
        projectData: projectContent?state.Project.listMap[ownProps.id]:ownProps,
        disable: authData.functionGroup["Project"]===undefined||authData.functionGroup["Project"].findIndex(element => element === "EDIT")===-1||state.Project.listMap[ownProps.id].state!=="TobeSubmit",
        consignState: consignContent?consignContent.operation[0]:'Undefined',
    }
};

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    return {
        showContent: (item,id) => {
            /*TODO:文档的ID是流程的ID+文档名不同*/
            switch (item.index){
                case 1:dispatch(addTabAction(item.consign.id, '委托详情', ConsignContentView, {id: item.consign.id}));break;
                case 2:dispatch(addTabAction(item.contract.id, '合同详情', ContractContentView, {id: item.id}));break;
                case 3:dispatch(addTabAction(item.testPlan.id, '测试方案详情', TestPlanContentView, {id: item.testPlan.id}));break;
                case 4:dispatch(addTabAction("测试用例"+id, '测试用例详情', TestCaseContentView, {id: id}));break;
                case 7:dispatch(addTabAction(item.testReport.id, '测试报告详情', TestReportContentView, {id: item.testReport.id}));break;
                case 8:dispatch(addTabAction(item.testReportCheck.id, '报告检查详情', TestReportCheckContentView, {id: item.testReportCheck.id}));break;
                case 9:dispatch(addTabAction(item.testWorkCheck.id, '测试工作检查详情', TestWorkCheckContentView, {id: item.testWorkCheck.id}));break;
                case 10:dispatch(addTabAction(item.satisfaction.id, '满意度调查表详情', SatisfactionContentView, {id: item.satisfaction.id}));break;
                default:break;
            }
            //dispatch(addTabAction(id, '流程详情', ProjectContentView, {id: id}));
        },
        getValues: (id) => getProject(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContentComponent);
