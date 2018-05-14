import React, {Component} from 'react';
import {connect} from "react-redux";
import ConsignContentComponent from "../components/ConsignContentComponent";

const mapStateToProps = (state) => {
    return {
        values: state.Consign.curContent,
        disable: false,
        save: console.log,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);