import React, {Component,PropTypes} from 'react';
import ConsignListComponent from "../components/ConsignListComponent";
import {connect} from "react-redux";
import {addTabAction, setState} from "../../../modules/ducks/Layout";
import {setConsignIndex, setConsignList, setConsignStatus, setFilter} from "../../../modules/ducks/Consign"
import {StaffConsignContentView} from "ROUTES/Consign";
import {httpDelete, httpGet} from "UTILS/FetchUtil";

// todo: 利用第二个参数ownProps来过滤，实现搜索，ownProps是被显示传入的属性值，不包括map进去的
const mapStateToProps = (state, ownProps) => {
    return {
        dataSource: state.Consign.list.filter(state.Consign.listFilter),
        enableNew: false,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showContent: (index) => {
            dispatch(addTabAction('委托详情', StaffConsignContentView));
            dispatch(setConsignIndex(index));
        },
        setListFilter: (newlistFilter) => dispatch(setFilter(newlistFilter)),
        getConsignList: () => {
            httpGet('http://127.0.0.1:8000/services/consign', (result) => {
                const {status, data} = result;
                if (status === 'SUCCESS') {
                    dispatch(setConsignList(data));
                    for (let i = 0; i < data.length; i ++) {
                        httpGet('http://localhost:8000/services/consignActiviti/' + data[i].processInstanceID, (result) => {
                            const {status, data} = result;
                            if (status === 'SUCCESS') {
                                dispatch(setConsignStatus(i, data.state));
                            }
                        })
                    }
                }
            });
        },
        deleteConsign: (id) => {
            httpDelete('http://127.0.0.1:8000/services/consign', {id:id}, (result) => {
                const {status} = result;
                if (status === 'SUCCESS') {
                    httpGet('http://127.0.0.1:8000/services/consign', (result) => {
                        const {status, data} = result;
                        if (status === 'SUCCESS') {
                            dispatch(setConsignList(data));
                            for (let i = 0; i < data.length; i ++) {
                                httpGet('http://localhost:8000/services/consignActiviti/' + data[i].processInstanceID, (result) => {
                                    const {status, data} = result;
                                    if (status === 'SUCCESS') {
                                        dispatch(setConsignStatus(i, data.state));
                                    }
                                })
                            }
                        }
                    });
                }
            });
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignListComponent);
