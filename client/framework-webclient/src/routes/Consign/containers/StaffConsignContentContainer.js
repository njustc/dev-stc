import React, {Component} from 'react';
import ConsignContentComponent from "ROUTES/Consign/components/ConsignContentComponent";
import {connect} from "react-redux";

const buttons = [{
    content: "通过",
    onClick: (consignData) => {},
},{
    content: "否决",
    onClick: (consignData) => {},
},
];

const mapStateToProps = (state) => {
    return {
        values: state.Consign.curContent,
        disable: true,
        buttons: buttons,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);