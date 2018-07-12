import React, {Component} from 'react';
import TestReportCheckContentComponent from "../components/TestReportCheckContentComponent";
import {connect} from "react-redux";
import {getTestReportCheck, putTestReportCheckState, updateTestReportCheck} from "../../../services/TestReportCheckService";
import {STATUS} from "../../../services/common";
import {message} from "antd/lib/index";

const mapStateToProps = (state, ownProps) => {
    const sysUser = JSON.parse(sessionStorage.getItem('sysUser'));
    const content = state.Project.listMap[ownProps.id].testReportCheck;
    const body = content?content.body:undefined;
    const isQuality = (sysUser.username==="quality");
    return {
        testReportCheckData: content?content:ownProps,
        values:  body ? JSON.parse(body) : {},
        disable: !isQuality,
        buttonsEnable: buttonsEnable(isQuality),
    }
};

const buttonsEnable = (isQuality) => [{
    content: '保存',
    enable: isQuality,
}];

const buttons = (dispatch) => [{/*TODO:buttons的显示和禁用还存在问题*/
    content: '保存',
    onClick: (testReportCheckData,testReportCheck) =>{
        console.log(testReportCheck);
        console.log(testReportCheckData);
        const valueData = {
            id: testReportCheckData.id,
            body: testReportCheck
        };
        updateTestReportCheck(dispatch,valueData,(status)=>{
            console.log(status);
            if(status===STATUS.SUCCESS) message.success('保存成功');
            else message.error('保存失败');
        });
    }
}];

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id) => getTestReportCheck(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestReportCheckContentComponent);
