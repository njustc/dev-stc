import React, {Component,PropTypes} from 'react';
import UserConsignListComponent from "../components/UserConsignListComponent";
import {connect} from "react-redux";
import {addTabAction, setState} from "../../../modules/ducks/Layout";
import {setFilter} from "../../../modules/ducks/Consign"
import UserConsignContentView from "ROUTES/Consign/components/ConsignContentComponent";
import StaffConsignContentContainer from "ROUTES/Consign/containers/StaffConsignContentContainer";

const  containsPane = (key, panes) => {
    for(let i=0; i<panes.length; i++) {
        if(key === panes[i].key) {
            return true;
        }
    }
    return false;
};

const addTab = (Panes, key, name, component, dispatch) => {
    const panes = Panes;
    const activeKey = key;
    if(!containsPane(key, Panes)){
        panes.push({ title: name, content: React.createElement(component), key: activeKey });
    }
    dispatch(setState({ panes,activeKey }))
};

// todo: 利用第二个参数ownProps来过滤，实现搜索，ownProps是被显示传入的属性值，不包括map进去的
const mapStateToProps = (state, ownProps) => {
    return {
        dataSource: state.Consign.list.filter(state.Consign.listFilter),
        panes: state.Layout.panes,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addTab: (Panes, key, name, component) => {
            const panes = Panes;
            const activeKey = key;
            if(!containsPane(key, Panes)){
                panes.push({ title: name, content: React.createElement(component), key: activeKey });
            }
            dispatch(setState({ panes,activeKey }))
        },
        showContent: () => dispatch(addTabAction('details', '委托详情', UserConsignContentView)),
        // showContent: (panes) => addTab(panes,'details','委托详情',StaffConsignContentContainer, dispatch),
        // showContent: (panes) => addTab(panes,'details','委托详情',UserConsignContentView, dispatch),
        newConsign: () => {
            //message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
        },
        setListFilter: (newlistFilter) => dispatch(setFilter(newlistFilter))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserConsignListComponent);
