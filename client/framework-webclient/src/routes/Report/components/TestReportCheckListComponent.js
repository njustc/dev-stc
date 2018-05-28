import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
class TestReportCheckListComponent extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <h3>测试报告检查列表</h3>
        )
    }
}
export default Form.create()(TestReportCheckListComponent);
