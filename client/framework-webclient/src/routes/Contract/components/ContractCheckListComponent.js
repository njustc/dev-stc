import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
class ContractCheckListComponent extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <h3>合同评审列表</h3>
        )
    }
}
export default Form.create()(ContractCheckListComponent);
