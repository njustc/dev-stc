import React, {Component} from 'react';
import ConsignContentComponent from "ROUTES/Consign/components/ConsignContentComponent";
import {connect} from "react-redux";
import {getConsign} from "../../../services/ConsignService";


const mapStateToProps = (state) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const competence = authData.functions.find(obj => obj.object === "Consign").function;
    return {
        consignData: {},/*fetch data with pro id*/
        disable: competence==="confirmer",
        curKey: state.Layout.activeKey /*TODO: 将当前页面id保存为组件静态变量，通过此id获取页面内容*/
    }
};

const buttons = (dispatch,competence) => [{
    content: '保存',
    onClick: (consignation) =>{
        console.log(consignation);
    },
    enable: competence==="creator"
},{
    content: '提交',
    onClick: (consignation) =>{

    },
    enable: competence==="creator"
},{
    content: '通过',
    onClick: (consignation) =>{

    },
    enable: competence==="confirmer"
},{
    content: '否决',
    onClick: (consignation) =>{

    },
    enable: competence==="confirmer"
}];

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const competence = authData.functions.find(obj => obj.object === "Consign").function;
    return {
        buttons: buttons(dispatch,competence).filter(button => button.enable===true),
        getValues: (id) => getConsign(dispatch,id).consignation /*TODO:用什么方式显示consign内容*/
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);
