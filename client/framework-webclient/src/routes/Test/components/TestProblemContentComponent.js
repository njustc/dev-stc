/*测试记录*/
import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
class TestProblemContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <h3>测试问题清单</h3>
        )
    }
}
export default Form.create()(TestProblemContentComponent);
