import React, {Component} from 'react';
import {connect} from "react-redux";
import ContrastContentComponent from "../component/ContrastContentComponent";
//import {putContrast} from "SERVICES/ContrastService";

const mapStateToProps = (state) => {
    const {list, index} = state.Contrast;
    return {
        values: list[index].Contrastation!==undefined?JSON.parse(list[index].Contrastation):{},
        ContrastData: list[index],
        disable: false,
    }
};

const buttons = (dispatch) => [{
    content: "保存",
    onClick: (ContrastData,values) => {
    },
},{
    content: "提交",
    onClick: (ContrastData,values) => {
    },
},
];

const mapDispatchToProps = (dispatch) => {
    return {
        buttons: buttons(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContrastContentComponent);
