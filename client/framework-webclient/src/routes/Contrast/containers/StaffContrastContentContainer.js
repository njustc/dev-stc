import React, {Component} from 'react';
import ContrastContentComponent from "ROUTES/Contrast/component/ContrastContentComponent";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    const {list, index} = state.Contrast;
    return {
        values: list[index].Contrastation!==undefined?JSON.parse(list[index].Contrastation):{},
        ContrastData: list[index],
        disable: true,
        buttons: buttons,
    }
};

const buttons = (dispatch) => [{
    content: "通过",
    onClick: (ContrastData) => {
    },
},{
    content: "否决",
    onClick: (ContrastData) => {
    },
},
];

const mapDispatchToProps = (dispatch) => {
    return {
        buttons: buttons(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContrastContentComponent);
