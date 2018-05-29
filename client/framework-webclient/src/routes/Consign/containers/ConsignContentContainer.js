import React, {Component} from 'react';
import ConsignContentComponent from "../components/ConsignContentComponent";
import {connect} from "react-redux";
import {getConsign, updateConsign} from "../../../services/ConsignService";


const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    console.log(authData);
    return {
        consignData: {},/*fetch data with pro id*/
        disable: authData.functionGroup["Consign"]===undefined||authData.functionGroup["Consign"].findIndex(element => element === "EDIT")===-1,
        curKey: state.Layout.activeKey /*TODO: 将当前页面id保存为组件静态变量，通过此id获取页面内容*/
    }
};

const buttons = (dispatch,isEditor) => [{
    content: '保存',
    onClick: (id,consignation) =>{
        const valueData = {
            id: id,
            consignation: consignation
        };
        updateConsign(dispatch,valueData);
    },
    enable: isEditor
},{
    content: '提交',
    onClick: (id,consignation) =>{

    },
    enable: isEditor
},{
    content: '通过',
    onClick: (id,consignation) =>{

    },
    enable: !isEditor
},{
    content: '否决',
    onClick: (id,consignation) =>{

    },
    enable: !isEditor
}];

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const isEditor = authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    return {
        buttons: buttons(dispatch,isEditor).filter(button => button.enable===true),
        getValues: (id) => {
            const res = getConsign(dispatch,id);
            console.log(res);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);
