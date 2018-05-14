import React, {Component} from 'react';
import {connect} from "react-redux";
import ConsignContentComponent from "../components/ConsignContentComponent";
import {} from 'UTILS/FetchUtil';
import {httpPut} from "UTILS/FetchUtil";

const buttons = [{
    content: "保存",
    onClick: (consignData) => {
        //
        debugger
        let url = "http://127.0.0.1:8000/services/consign";
        let data = {
            id: consignData.id,
            consignation: consignData.consignation,
        };
        httpPut(url, data, (result) => {
            debugger
            if (result.status == 'SUCCESS') {

            }
            else {
                // message.error('保存失败，请重试');
            }
        });
        //
    },
},{
    content: "提交",
    onClick: (consignData) => {
        //
        let url1 = "http://127.0.0.1:8000/services/consign";
        let data1 = {
            id: consignData.id,
            consignation: consignData.consignation,
        };
        httpPut(url1, data1, (result) => {
            if (result.status == 'SUCCESS') {
                        
            }
            else {
                // message.error('保存失败，请重试');
            }
        });

        let url2 = "http://127.0.0.1:8000/services/consignActiviti/" + consignData.processInstanceID;
        let data2 = {
            operation: "submit"
        };
        httpPut(url2, data2, (result) => {
            if (result.status == 'SUCCESS') {
                
            }
            else {
                // message.error('提交失败，请重试');
            }
        });
        //
    },
},
];

const mapStateToProps = (state) => {
    const {list, index} = state.Consign;
    return {
        values: list[index].consignation,
        consignData: list[index],
        disable: false,
        buttons: buttons,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);