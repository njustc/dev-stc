import React, {Component} from 'react';
import {connect} from "react-redux";
import ContractContentComponent from "../components/ContractContentComponent";
import {putContract} from "SERVICES/ContractService";

const mapStateToProps = (state) => {
//    const {list, index} = state.Consign;
    return {
        values: {},/*fetch contract with pro id*/
        contractData: {},/*fetch data with pro id*/
        disable: false,
    }
};

const buttons = (dispatch) => [{
    content: "保存",
    onClick: (contractData,values) => {
        let data = {
            id: contractData.id,
            contraction: values,
        };
        putContract(dispatch, data, (status) => {});
    },
},{
    content: "提交",
    onClick: (contractData,values) => {
        let data1 = {
            id: contractData.id,
            contraction: values,
        };
        putContract(dispatch, data1);

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

export default connect(mapStateToProps, mapDispatchToProps)(ContractContentComponent);
