import React, {Component,PropTypes} from 'react';
import UserConsignListComponent from "../components/UserConsignListComponent";
import {Divider, message, Button, Icon} from "antd";
import {connect} from "react-redux";
import {setState} from "../../../modules/ducks/Layout";
import UserConsignContentView from "../components/UserConsignContentView";
function containsPane(key, panes)
{
    for(let i=0; i<panes.length; i++) {
        if(key === panes[i].key) {
            return true;
        }
    }
    return false;
};

const mapStateToProps = (state) => {
    return {
        dataSource: state.Consign.list,
        panes: state.Layout.panes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTab: (Panes, key, name, component) => {
            const panes = Panes;
            const activeKey = key;
            if(!containsPane(key, Panes)){
                panes.push({ title: name, content: React.createElement(component), key: activeKey });
            }
            dispatch(setState({ panes,activeKey }))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserConsignListComponent);
