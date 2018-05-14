import React, {Component} from 'react';
import {connect} from "react-redux";
import ConsignContentComponent from "../components/ConsignContentComponent";

const buttons = [{
    content: "保存",
    onClick: (consignData) => {},
},{
    content: "提交",
    onClick: (consignData) => {},
},
];

const mapStateToProps = (state) => {
    return {
        values: state.Consign.curContent,
        disable: false,
        buttons: buttons,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);