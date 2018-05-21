import React, {Component} from 'react';
import ConsignContentComponent from "ROUTES/Consign/components/ConsignContentComponent";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        values: {},/*fetch consign with pro id*/
        consignData: {},/*fetch data with pro id*/
    }
};

const buttons = (dispatch,competence) => [{
    content: '保存',
    onClick: () =>{

    },
    enable: competence==="creator"
},{
    content: '提交',
    onClick: () =>{

    },
    enable: competence==="creator"
},{
    content: '通过',
    onClick: () =>{

    },
    enable: competence==="confirmer"
},{
    content: '否决',
    onClick: () =>{

    },
    enable: competence==="confirmer"
}];

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const competence = authData.functions.find(obj => obj.object === "Consign").function;
    return {
        buttons: buttons(dispatch,competence).filter(button => button.enable===true)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);
