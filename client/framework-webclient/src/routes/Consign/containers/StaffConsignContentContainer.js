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
                
            }
            else {
                
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
                
            }
            else {
                
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