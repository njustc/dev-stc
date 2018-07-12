import React, {Component} from 'react';
import TestWorkCheckContentComponent from "../components/TestWorkCheckContentComponent";
import {connect} from "react-redux";
import {getTestWorkCheck, putTestWorkCheckState, updateTestWorkCheck} from "../../../services/TestWorkCheckService";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";

const mapStateToProps = (state, ownProps) => {
    // debugger;
    const sysUser = JSON.parse(sessionStorage.getItem('sysUser'));
    const content = state.Project.listMap[ownProps.id].testWorkCheck;
    const body = content?content.body:undefined;
    const isQuality = (sysUser.username==="quality");

    return {
        testWorkCheckData: content?content:ownProps,
        values:  body ? JSON.parse(body) : {},
        disable: false,
        buttonsEnable: buttonsEnable(isQuality),
    }
};

const buttonsEnable = (isQuality) => [{
    content: '保存',
    enable: isQuality,
}];

const buttons = (dispatch) => [{
    /*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (testWorkCheckData, testWorkCheck) => {
        console.log(testWorkCheck);
        const valueData = {
            id: testWorkCheckData.id,
            body: testWorkCheck
        };
        updateTestWorkCheck(dispatch, valueData, (status) => {
            console.log(status);
            if (status === STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    }
}
// },{
//     content: '提交',
//     onClick: (testWorkCheckData,testWorkCheck) =>{
//         console.log(testWorkCheckData);
//         console.log(testWorkCheck);
//         const valueData = {
//             id: testWorkCheckData.id,
//             body: testWorkCheck
//         };
//         updateTestWorkCheck(dispatch,valueData,(status)=>{
//             console.log(status);
//             if(status===STATUS.SUCCESS){
//                 const putData = {
//                     "object": "testWorkCheck",
//                     "operation": "Submit"
//                 };
//                 const {processInstanceID,id} = testWorkCheckData;
//                 console.log(putData);
//                 putTestWorkCheckState(dispatch,processInstanceID,putData,id,(status)=>{
//                     console.log(status);
//                     if(status===STATUS.SUCCESS) message.success('提交成功');
//                     else message.error('提交失败');
//                 });
//             }
//             else message.error('更新失败');
//         });
//     }
// },{
//     content: '批准',
//     onClick: (testWorkCheckData,testWorkCheck) =>{
//         const putData = {
//             "object": "testWorkCheck",
//             "operation": "ReviewPass"
//         };
//         const {processInstanceID,id} = testWorkCheckData;
//         putTestWorkCheckState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);
//
//             console.log(status===STATUS.SUCCESS);
//             if(status===STATUS.SUCCESS) message.success('批准成功');
//             else message.error('批准失败');
//         });
//     }
// },{
//     content: '否决',
//     onClick: (testWorkCheckData,testWorkCheck) =>{
//         const putData = {
//             "object": "testWorkCheck",
//             "operation": "ReviewReject"
//         };
//         const {processInstanceID,id} = testWorkCheckData;
//         putTestWorkCheckState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);
//
//             if(status===STATUS.SUCCESS) message.success('已否决');
//             else message.error('否决失败');
//         });
//     }
// },{
//     content: '发放',
//     onClick: (testWorkCheckData,testWorkCheck) =>{
//         const putData = {
//             "object": "testWorkCheck",
//             "operation": "Send"
//         };
//         const {processInstanceID,id} = testWorkCheckData;
//         putTestWorkCheckState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);
//
//             if(status===STATUS.SUCCESS) message.success('已发放');
//             else message.error('发放失败');
//         });
//     }
// },{
//     content: '确认',
//     onClick: (testWorkCheckData,testWorkCheck) =>{
//         const putData = {
//             "object": "testWorkCheck",
//             "operation": "ApprovePass"
//         };
//         const {processInstanceID,id} = testWorkCheckData;
//         putTestWorkCheckState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);
//
//             if(status===STATUS.SUCCESS) message.success('确认成功');
//             else message.error('确认失败');
//         });
//     }
// },{
//     content: '拒绝',
//     onClick: (testWorkCheckData,testWorkCheck) =>{
//         const putData = {
//             "object": "testWorkCheck",
//             "operation": "ApproveReject"
//         };
//         const {processInstanceID,id} = testWorkCheckData;
//         putTestWorkCheckState(dispatch,processInstanceID,putData,id,(status)=>{console.log(status);
//
//             if(status===STATUS.SUCCESS) message.success('已拒绝');
//             else message.error('拒绝失败');
//         });
//     }}
];

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id) => getTestWorkCheck(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestWorkCheckContentComponent);
