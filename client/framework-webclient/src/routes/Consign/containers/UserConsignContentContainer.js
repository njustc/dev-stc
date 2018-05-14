import React, {Component} from 'react';
import {connect} from "react-redux";
import ConsignContentComponent from "../components/ConsignContentComponent";
import {} from 'UTILS/FetchUtil';
import {httpPut} from "UTILS/FetchUtil";

const buttons = [{
    content: "保存",
    onClick: (consignData,values) => {
        //
        let url = "http://127.0.0.1:8000/services/consign";
        let data = {
            id: consignData.id,
            consignation: values,
        };
        httpPut(url, data, (result) => {
            if (result.status == 'SUCCESS') {
                consignData.consignation = values; 
            }
            else {
                console.log("点击“保存”错误");
            }
        });
        //
    },
},{
    content: "提交",
    onClick: (consignData,values) => {
        //
        let url1 = "http://127.0.0.1:8000/services/consign";
        let data1 = {
            id: consignData.id,
            consignation: values,
        };
        httpPut(url1, data1, (result) => {
            if (result.status == 'SUCCESS') {
                consignData.consignation = values;  
            }
            else {
                console.log("点击“提交”错误");
            }
        });

        let url2 = "http://127.0.0.1:8000/services/consignActiviti/" + consignData.processInstanceID;
        let data2 = {
            operation: "submit"
        };
        httpPut(url2, data2, (result) => {
            if (result.status == 'SUCCESS') {
                consignData.status = "submit";
            }
            else {
                console.log("点击“提交”错误");
            }
        });
        //
    },
},
];

const mapStateToProps = (state) => {
    return {
        values: state.Consign.curContent,
        disable: false,
        buttons: buttons,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);