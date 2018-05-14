import React, {Component} from 'react';
import ConsignContentComponent from "ROUTES/Consign/components/ConsignContentComponent";
import {connect} from "react-redux";

const buttons = [{
    content: "通过",
    onClick: (consignData) => {
        let url = "http://127.0.0.1:8000/services/consignActiviti/" + consignData.processInstanceID;
        let data = {
            operation: "pass"
        };
        httpPut(url, data, (result) => {
            if (result.status == 'SUCCESS') {
                consignData.status = "pass";
            }
            else {
                console.log("点击“通过”错误");
            }
        });
    },
},{
    content: "否决",
    onClick: (consignData) => {
        let url = "http://127.0.0.1:8000/services/consignActiviti/" + consignData.processInstanceID;
        let data = {
            operation: "reject"
        };
        httpPut(url, data, (result) => {
            if (result.status == 'SUCCESS') {
                consignData.status = "reject";
            }
            else {
                console.log("点击“否决”错误");
            }
        });
    },
},
];

const mapStateToProps = (state) => {
    return {
        values: state.Consign.curContent,
        disable: true,
        buttons: buttons,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);