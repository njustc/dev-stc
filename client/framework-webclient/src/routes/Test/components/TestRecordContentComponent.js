/*测试问题清单*/
import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
class TestRecordContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <h3>测试记录表</h3>
        )
    }
}
export default Form.create()(TestRecordContentComponent);
