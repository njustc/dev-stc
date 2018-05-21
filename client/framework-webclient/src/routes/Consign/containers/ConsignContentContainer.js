import React, {Component} from 'react';
import ConsignContentComponent from "ROUTES/Consign/components/ConsignContentComponent";
import {connect} from "react-redux";
import {getConsign} from "../../../services/ConsignService";

const authData = JSON.parse(sessionStorage.getItem('authData'));
const competence = authData.functions.find(obj => obj.object === "Consign").function;

const mapStateToProps = (state) => {
    return {
        consignData: {},/*fetch data with pro id*/
        disable: competence==="confirmer"
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
    return {
        buttons: buttons(dispatch,competence).filter(button => button.enable===true),
        values: getConsign(dispatch,'ppp').consignation,/*TODO:用什么方式显示consign内容*/
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);
