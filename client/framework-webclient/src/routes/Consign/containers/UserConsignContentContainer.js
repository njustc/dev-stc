import React, {Component} from 'react';
import {connect} from "react-redux";
import ConsignContentComponent from "../components/ConsignContentComponent";
import {putConsign} from "SERVICES/ConsignService";

const mapStateToProps = (state) => {
//    const {list, index} = state.Consign;
    return {
        values: {},/*fetch consign with pro id*/
        consignData: {},/*fetch data with pro id*/
        disable: false,
    }
};

const buttons = (dispatch) => [{
    content: "保存",
    onClick: (consignData,values) => {
        let data = {
            id: consignData.id,
            consignation: values,
        };
        putConsign(dispatch, data, (status) => {});
    },
},{
    content: "提交",
    onClick: (consignData,values) => {
        let data1 = {
            id: consignData.id,
            consignation: values,
        };
        putConsign(dispatch, data1);

        // 后端接口调整ing:
        // let url2 = "http://127.0.0.1:8000/services/consignActiviti/" + consignData.processInstanceID;
        // let data2 = {
        //     operation: "submit"
        // };
        // httpPut(url2, data2, (result) => {
        //     if (result.status == 'SUCCESS') {
        //         dispatch(setConsignState(-1, "TobeCheck"));
        //     }
        //     else {
        //         console.log("点击“提交”错误");
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
