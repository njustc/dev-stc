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
    const {list, index} = state.Consign;
    return {
        values: list[index].consignation,
        consignData: list[index],
        disable: true,
        buttons: buttons,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);