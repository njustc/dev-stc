/*测试用例*/
import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,Icon, Row, Col, DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;

let uuid = 0;
class TestCaseContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const formItemLayoutWithOutLabel = {
            wrapperCol: { span: 24, offset: 0 },
        };

        const rowStyle = {
            height: '40px',
            lineHeight: '40px',
            marginTop: 0,
            marginBottom: 5,
        };

        const gridHeadStyle = {
            background: '#cccccc',
            height: '100%',
            textAlign: 'center',
        };

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...formItemLayoutWithOutLabel}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`names[${k}]`, {
                        // validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        }],
                    })(
                        <Row>
                            <Col span={5}>
                                <Input placeholder="passenger name" style={{marginRight: 8 }} />
                            </Col>
                            <Col span={5}>
                                <Input placeholder="user name" style={{marginRight: 8 }} />
                            </Col>
                            <Col span={1}>
                                <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle-o"
                                    disabled={keys.length === 1}
                                    onClick={() => this.remove(k)}
                                />
                            </Col>
                        </Row>
                    )}
                    </FormItem>
            );
        });
        return(
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem>
                    <Row style = {rowStyle} type="flex" justify="center" gutter={2}>
                        <Col span={2}><h3 style={gridHeadStyle}>测试分类</h3></Col>
                        <Col span={1}><h3 style={gridHeadStyle}>序号</h3></Col>
                        <Col span={2}><h3 style={gridHeadStyle}>测试用例设计说明</h3></Col>
                        <Col span={4}><h3 style={gridHeadStyle}>与本测试用例有关的规约说明</h3></Col>
                        <Col span={4}><h3 style={gridHeadStyle}>测试用例执行过程</h3></Col>
                        <Col span={3}><h3 style={gridHeadStyle}>预期的结果</h3></Col>
                        <Col span={2}><h3 style={gridHeadStyle}>测试用例设计者</h3></Col>
                        <Col span={2}><h3 style={gridHeadStyle}>时间</h3></Col>
                        <Col span={4}><h3 style={gridHeadStyle}>依据</h3></Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                        <Icon type="plus" /> 添加测试用例
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(TestCaseContentComponent);
