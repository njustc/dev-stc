import React, {Component} from 'react';
import SatisfactionContentComponent from "../components/SatisfactionContentComponent";
import {connect} from "react-redux";
import {setSatisfactionContent} from "../../../modules/ducks/Archive";

const mapStateToProps = (state,ownProps) => {
    return {
        satisfactionData: state.Satisfaction.listMap[ownProps.id],
        values: {},/*fetch consign with pro id*/
        contractData: {},/*fetch data with pro id*/
        disable: true,
        // buttons: buttons,
    }
};

const buttons = (dispatch) => [{
    content: '保存',
    onClick: () =>{

    }
},{
    content: '提交',
    onClick: () =>{

    }
},{
    content: '通过',
    onClick: () =>{

    }
},{
    content: '否决',
    onClick: () =>{

    }
}];

const mapDispatchToProps = (dispatch) => {
    return {
        buttons: buttons(dispatch),
        getValues: (id) => dispatch(setSatisfactionContent({id:id})),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SatisfactionContentComponent);
