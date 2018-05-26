import React, {Component} from 'react';
import ConsignContentComponent from "ROUTES/Consign/components/ConsignContentComponent";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
//    const {list, index} = state.Consign;
    return {
        values: {},/*fetch consign with pro id*/
        consignData: {},/*fetch data with pro id*/
        disable: true,
        // buttons: buttons,
    }
};

const buttons = (dispatch) => [{
    content: "通过",
    onClick: (consignData) => {
        // 后端接口调整ing
        // let url = "http://127.0.0.1:8000/services/consignActiviti/" + consignData.processInstanceID;
        // let data = {
        //     operation: "pass"
        // };
        // httpPut(url, data, (result) => {
        //     if (result.status == 'SUCCESS') {
        //         // consignData.status = "Finished";
        //         dispatch(setConsignState(-1, "Finished"));
        //     }
        //     else {
        //         console.log("点击“通过”错误");
        //     }
        // });
    },
},{
    content: "否决",
    onClick: (consignData) => {
        // 后端接口调整ing
        // let url = "http://127.0.0.1:8000/services/consignActiviti/" + consignData.processInstanceID;
        // let data = {
        //     operation: "reject"
        // };
        // httpPut(url, data, (result) => {
        //     if (result.status == 'SUCCESS') {
        //         // consignData.status = "TobeSubmit";
        //         dispatch(setConsignState(-1, "TobeSubmit"));
        //     }
        //     else {
        //         console.log("点击“否决”错误");
        //     }
        // });
    },
},
];

const mapDispatchToProps = (dispatch) => {
    return {
        buttons: buttons(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);
