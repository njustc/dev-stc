import React, {Component,PropTypes} from 'react';
import ConsignListComponent from "../components/ConsignListComponent";
import {connect} from "react-redux";
import {addTabAction} from "../../../modules/ducks/Layout";
import {
    addConsign,
    removeConsign,
    setConsignIndex,
    setConsignList,
    setConsignStatus,
    setFilter
} from "../../../modules/ducks/Consign"
import {UserConsignContentView} from "ROUTES/Consign";
import {httpDelete, httpGet, httpPost} from "UTILS/FetchUtil";

// todo: 利用第二个参数ownProps来过滤，实现搜索，ownProps是被显示传入的属性值，不包括map进去的
const mapStateToProps = (state, ownProps) => {
    return {
        dataSource: state.Consign.list.filter(state.Consign.listFilter),
        enableNew: true,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showContent: (index) => {
            dispatch(addTabAction('details', '委托详情', UserConsignContentView));
            dispatch(setConsignIndex(index));
        },
        newConsign: (id) => {
            httpPost('http://127.0.0.1:8000/services/consign', {consignation:null,}, (result) => {
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
                    // dispatch(addConsign(...))
                }
            });
        },
        getConsignList: () => {
            httpGet('http://127.0.0.1:8000/services/consign', (result) => {
                const {status, data} = result;
                if (status === 'SUCCESS') {
                    debugger;
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
                    // httpGet('http://127.0.0.1:8000/services/consign', (result) => {
                    //     const {status, data} = result;
                    //     if (status === 'SUCCESS') {
                    //         dispatch(setConsignList(data));
                    //         for (let i = 0; i < data.length; i ++) {
                    //             httpGet('http://localhost:8000/services/consignActiviti/' + data[i].processInstanceID, (result) => {
                    //                 const {status, data} = result;
                    //                 if (status === 'SUCCESS') {
                    //                     dispatch(setConsignStatus(i, data.state));
                    //                 }
                    //             })
                    //         }
                    //     }
                    // });
                    dispatch(removeConsign(id));
                }
            });
        },
        setListFilter: (newlistFilter) => dispatch(setFilter(newlistFilter)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ConsignListComponent);
