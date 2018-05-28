import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
class SatisfactionListComponent extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <h3>满意度调查列表</h3>
        )
    }
}
export default Form.create()(SatisfactionListComponent);
