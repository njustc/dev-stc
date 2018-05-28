import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
class TestProgramContentComponent extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <h3>测试方案书列表</h3>
        )
    }
}
export default Form.create()(TestProgramContentComponent);
