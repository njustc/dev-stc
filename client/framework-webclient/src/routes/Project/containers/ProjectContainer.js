import ProjectComponent from '../components/ProjectComponent';
import {connect} from "react-redux";
import React, {Component,PropTypes} from 'react';

const mapStateToProps = (state) => {
    return {
        dataSource: Object.values(state.Project.listMap),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);