import React, {Component} from 'react';
import TestWorkCheckContentComponent from "../components/TestWorkCheckContentComponent";
import {connect} from "react-redux";
import {setTestWorkCheckContent} from "../../../modules/ducks/Archive";

const mapStateToProps = (state,ownProps) => {
    return {
        testWorkCheckData: state.TestWorkCheck.listMap[ownProps.id],
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
        getValues: (id) => dispatch(setTestWorkCheckContent({id:id}))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestWorkCheckContentComponent);
