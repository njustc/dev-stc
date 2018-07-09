import React, {Component} from 'react';
import ConsignContentComponent from "../components/ConsignContentComponent";
import {message} from 'antd';
import {connect} from "react-redux";
import {getConsign, getConsignState, putConsignState, updateConsign} from "../../../services/ConsignService";
import {newProject} from "../../../services/ProjectService";
import {newContract} from "../../../services/ContractService";
import {newTestPlan} from "../../../services/TestPlanService";
import {newTestReport} from "../../../services/TestReportService";
import {newTestReportCheck} from "../../../services/TestReportCheckService";
import {newTestWorkCheck} from "../../../services/TestWorkCheckService";
import {globalOperation, STATUS} from "../../../services/common";
import {newTestRecord} from "../../../services/TestRecordService";
import {newTestCase} from "../../../services/TestCaseService";
import {newSatisfaction} from "SERVICES/ArchiveService";
// import "./common"
/*TODO:表单内容和按钮的可视及禁用情况*/
const mapStateToProps = (state, ownProps) => {
    // debugger;
    const content = state.Consign.listMap[ownProps.id];
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const consignation = content?state.Consign.listMap[ownProps.id].consignation:undefined;
    const ToBeSubmit = content?state.Consign.listMap[ownProps.id].state!=="TobeSubmit":false;
    const isEditVisible = authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    const isSubmitVisible = content&&content.operation&&content.operation.findIndex(element => element === 'Submit')!==-1;
    // console.log(isSubmitVisible);
    const isReviewVisible = content&&content.operation&&content.operation.findIndex(element => element === 'ReviewPass')!==-1;
    // console.log(isReviewVisible);
    return {
        consignData: content?state.Consign.listMap[ownProps.id]:ownProps,
        values: consignation ? JSON.parse(consignation) : {},
        disable: ToBeSubmit||(!isEditVisible),
        buttonsEnable: buttonsEnable(isEditVisible,isSubmitVisible,isReviewVisible),
    }
};

const buttonsEnable = (isEditVisible,isSubmitVisible,isReviewVisible) => [{
    content: '保存',
    enable: isEditVisible&&isSubmitVisible,
},{
    content: '提交',
    enable: isSubmitVisible,
},{
    content: '通过',
    enable: isReviewVisible,
},{
    content: '否决',
    enable: isReviewVisible,
}];

const buttons = (dispatch) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (consignData,consignation) =>{
        const valueData = {
            id: consignData.id,
            consignation: consignation
        };
        updateConsign(dispatch,valueData,(status)=>{
            console.log(status);
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
                    console.log(status);
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
            //console.log(status);
            if(status===STATUS.SUCCESS) message.success('通过成功');
            else message.error('通过失败');
        });
        newProject(dispatch,id,processNo,(result)=>{
            // console.log(result);
            const {status,data} = result;
            if(status===STATUS.SUCCESS){
                message.success('流程新建成功');
                // console.log(data);
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

                                                                // newTestCase(dispatch,id,(status)=>{
                                                                //     if(status===STATUS.SUCCESS){
                                                                //         message.success('测试用例表新建成功');
                                                                //     }
                                                                //     else
                                                                //         message.error('测试用例表新建失败');
                                                                // })
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

                // newTestCase(dispatch,id,(status)=>{
                //     if(status===STATUS.SUCCESS) message.success('测试用例新建成功');
                //     else message.error('测试用例新建失败');
                // });
                // newTestReportCheck(dispatch,id,(status)=>{
                //     if(status===STATUS.SUCCESS) message.success('测试报告检查表新建成功');
                //     else message.error('测试报告检查表新建失败');
                // });
                // newTestWorkCheck(dispatch,id,(status)=>{
                //     if(status===STATUS.SUCCESS) message.success('测试报告检查表新建成功');
                //     else message.error('测试报告检查表新建失败');
                // });
            }
            else message.error('流程新建失败');
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

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id,processInstanceID) => {
            getConsign(dispatch,id);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);
