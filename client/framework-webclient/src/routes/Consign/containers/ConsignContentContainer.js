import React, {Component} from 'react';
import ConsignContentComponent from "../components/ConsignContentComponent";
import {message} from 'antd';
import {connect} from "react-redux";
import {getConsign, getConsignState, putConsignState, updateConsign} from "../../../services/ConsignService";
import {getProjectList, newProject} from "../../../services/ProjectService";
import {newContract} from "../../../services/ContractService";
import {newTestPlan} from "../../../services/TestPlanService";
import {newTestReport} from "../../../services/TestReportService";
import {newTestReportCheck} from "../../../services/TestReportCheckService";
import {newTestWorkCheck} from "../../../services/TestWorkCheckService";
import {globalOperation, STATUS} from "../../../services/common";
import {newTestRecord} from "../../../services/TestRecordService";
import {newTestCase} from "../../../services/TestCaseService";
import {newSatisfaction} from "../../../services/ArchiveService";
/**
 * @module Consign/ConsignContentContainer
 */
/**
 * 把store里面的委托数据映射到委托组件，根据store数据计算页面编辑权限，计算并传入buttonsEnable数组
 * @param state {object} store数据
 * @param ownProps {object} 创建组件时传入的数据
 * @returns {{consignData: *, values: {}, disable: boolean, buttonsEnable: *}}
 */
const mapStateToProps = (state, ownProps) => {
    // debugger;
    const content = state.Consign.listMap[ownProps.id];
    const sysUser = JSON.parse(sessionStorage.getItem('sysUser'));
    const consignation = content?state.Consign.listMap[ownProps.id].consignation:undefined;
    const consignState = content?content.state:"error";
    const isCustomer = (sysUser.username==="customer1"||sysUser.username==="customer2");
    const isMarketing = (sysUser.username==="marketing");
    const isSubmitVisible = content&&content.operation&&content.operation.findIndex(element => element === 'Submit')!==-1;
    const isReviewVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ReviewPass')!==-1;
    return {
        consignData: content?state.Consign.listMap[ownProps.id]:ownProps,
        values: consignation ? JSON.parse(consignation) : {},
        disable: consignState!=="TobeSubmit",
        buttonsEnable: buttonsEnable(isCustomer,isMarketing,isSubmitVisible,isReviewVisible),
    }
};
/**
 * 按钮显示控制，根据当前用户和状态判断按钮是否可用
 * @param isCustomer {boolean} 是否是客户
 * @param isMarketing {boolean} 是否是市场部成员
 * @param isSubmitVisible {boolean} 是否可以提交
 * @param isReviewVisible {boolean} 是否可以评审
 * @returns {Array}
 */
const buttonsEnable = (isCustomer,isMarketing,isSubmitVisible,isReviewVisible) => [{
    content: '保存',
    enable: isCustomer&&isSubmitVisible,
},{
    content: '提交',
    enable: isCustomer&&isSubmitVisible,
},{
    content: '通过',
    enable: isMarketing&&isReviewVisible,
},{
    content: '否决',
    enable: isMarketing&&isReviewVisible,
}];
/**
 * 委托相关的数据操作和对应的按钮
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {Array}
 */
const buttons = (dispatch) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (consignData,consignation) =>{
        const valueData = {
            id: consignData.id,
            consignation: consignation
        };
        updateConsign(dispatch,valueData,(status)=>{
            if(status===STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    },
},{
    content: '提交',
    onClick: (consignData,consignation) =>{
        const valueData = {
            id: consignData.id,
            consignation: consignation
        };
        updateConsign(dispatch,valueData,(status)=> {
            if (status === STATUS.SUCCESS) {
                const putData = {
                    "object": "consign",
                    "operation": "Submit"
                };
                const {id, processInstanceID} = consignData;
                putConsignState(dispatch, processInstanceID, putData, id, (status) => {
                    if (status === STATUS.SUCCESS) message.success('提交成功');
                    else message.error('提交失败');
                });
            }
            else message.error('提交失败');
        });
    },
    // enable: isEditVisible
},{
    content: '通过',
    onClick: (consignData,processNo) =>{
        const putData = {
            "object": "consign",
            "operation": "ReviewPass",
        };
        const {id,processInstanceID} = consignData;
        putConsignState(dispatch,processInstanceID,putData,id,(status)=>{
            if(status===STATUS.SUCCESS) message.success('通过成功');
            else message.error('通过失败');
        });
        newProject(dispatch,id,processNo,(result)=>{
            const {status,data} = result;
            if(status===STATUS.SUCCESS){
                message.success('流程新建成功');
                const {id} = data;

                newContract(dispatch,id,(status)=>{
                    if(status===STATUS.SUCCESS){
                        message.success('合同新建成功');

                        newTestPlan(dispatch,id,(status)=>{
                            if(status===STATUS.SUCCESS){
                                message.success('测试方案新建成功');

                                newTestReport(dispatch,id,(status)=>{
                                    if(status===STATUS.SUCCESS) {
                                        message.success('测试报告书新建成功');

                                        newTestReportCheck(dispatch,id,(status)=>{
                                            if(status===STATUS.SUCCESS) {
                                                message.success('测试报告检查表新建成功');

                                                newTestWorkCheck(dispatch,id,(status)=>{
                                                    if(status===STATUS.SUCCESS) {
                                                        message.success('测试工作检查表新建成功');

                                                        newSatisfaction(dispatch, id, (status) => {
                                                            if (status === STATUS.SUCCESS) {
                                                                message.success('满意度调查表新建成功');
                                                            }
                                                            else
                                                                message.error('满意度调查表新建失败');
                                                        })
                                                    }
                                                    else
                                                        message.error('测试工作检查表新建失败')
                                                });
                                            }
                                            else message.error('测试报告检查表新建失败');
                                        });
                                    }
                                    else message.error('测试报告书新建失败');
                                });
                            }
                            else message.error('测试方案新建失败');
                        });
                    }
                    else message.error('合同新建失败');
                });
            }
            else message.error('流程新建失败');
            getProjectList(dispatch);
        });
    },
    // enable: isReviewVisible
},{
    content: '否决',
    onClick: (consignData,consignation) =>{
        const putData = {
            "object": "consign",
            "operation": "ReviewReject"
        };
        const {id,processInstanceID} = consignData;
        putConsignState(dispatch,processInstanceID,putData,id,(status)=>{
            if(status === STATUS.SUCCESS) message.success('已否决');
            else message.error('否决失败');
        });
    },
    // enable: isReviewVisible
}];
/**
 * 向委托组件分发buttons数组和获取委托的方法
 * @param dispatch {function} 分发action并触发state变化的方法
 * @returns {{buttons: {Array}, getValues: getValues}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id,processInstanceID) => {
            getConsign(dispatch,id);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);
