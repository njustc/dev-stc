import React, {Component} from 'react';
import {connect} from "react-redux";
import ConsignContentComponent from "../components/ConsignContentComponent";

const buttons = [{
    content: "保存",
    onClick: () => {},
},{
    content: "提交",
    onClick: () => {},
},
];

const mapStateToProps = (state) => {
    return {
        values: state.Consign.curContent,
        // disable: false,
        disable: true,
        save: console.log,
        buttons: buttons,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);