/*测试用例*/
import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
class TestCaseContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <h3>测试用例表</h3>
        )
    }
}
export default Form.create()(TestCaseContentComponent);
