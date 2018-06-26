import React, {Component, PropTypes} from 'react';
import {Row, Col, Card, Tabs, Select, Button, Layout, Divider, Switch, Form, Input,Radio,Checkbox,Icon,DatePicker,Collapse} from 'antd';

const Panel = Collapse.Panel;
const Option=Select.Option;
const OptGroup=Select.OptGroup;
const FormItem=Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

function handleChange(value) {
    console.log(`selected ${value}`);
}

class TestReportCheckContentComponent extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        curID: '',
        values: {},
        disable:false,
        buttons: [],
    };

    static propTypes = {
        getValues: PropTypes.func.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
    };

    componentWillMount() {
        this.props.getValues(this.props.testReportCheckData.id);
    };

    onClick = (buttonIndex) => () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.buttons[buttonIndex].onClick(this.props.consignData, JSON.stringify(values));
        //     }
        // });
        const {buttons, form} = this.props;
        buttons[buttonIndex].onClick(JSON.stringify(form.getFieldsValue()));
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        return(
            <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>

                <FormItem>
                    <h1 style={{textAlign:'center'}}>测试报告检查表</h1>
                </FormItem>

                <FormItem {...formItemLayout} label="软件名称">
                    {getFieldDecorator('softwareName', {
                        rules: [{ required: true, message: '请输入软件名称！' }],
                        initialValue: this.props.values.softwareName,
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"委托单位"}>
                    {getFieldDecorator('consignUnit', {
                        rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                      //  initialValue: this.props.values.consignUnit
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"检查人"}>
                    {getFieldDecorator('checker', {
                        rules: [{ required: true, message: '请正确输入检查人！' ,pattern:"^[\u4E00-\u9FA5A-Za-z]+$"}],
                        //initialValue: this.props.values.consignUnit
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"日期"}>
                    {getFieldDecorator('date', {
                        rules: [{ required: true, message: '请正确输入时间！',
                            //initialValue: this.props.values.date
                        }],
                    })(
                        <DatePicker showTime format="YYYY-MM-DD"/>
                    )}
                </FormItem>

                <Form>
                    <Divider orientation="left">检查事项</Divider>
                    <FormItem>
                        {getFieldDecorator('item1', {
                            rules: [{ required: false }],
                            //To do: initialValue
                            //initialValue: this.props.values.consignUnit
                        })(
                            <Row gutter={16}>
                                <Col span={18}>
                                    <b>1. 报告编号：</b>检查报告编号的正确性（是否符合编码规则）与前后的一致性（报告首页与每页页眉）。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <b>2. 页码：</b>检查页码与总页数是否正确（报告首页与每页页眉）。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <b>3. 软件名称：</b>是否和确认单一致，是否前后一致（共三处，包括首页、报告页、附件三）。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <b>4. 版本号：</b>是否和确认单一致，是否前后一致（共二处，包括首页、报告页）。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <b>5. 委托单位：</b>是否和确认单一致，是否前后一致（共二处，包括首页、报告页）。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <b>6. 完成日期：</b>是否前后一致（共二处，包括首页、报告页页末）。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <b>7. 委托单位地址：</b>是否和确认单一致（共一处，报告页）。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <b>8. 序号：</b>附件二、附件三中的序号是否正确、连续。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <b>9. 测试样品：</b>样品名称是否正确，数量是否正确。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <b>10. 软、硬件列表：</b>列表是否完整（如打印机），用途描述是否合理正确。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={24}>
                                    <b>11. 文字、内容、格式</b>
                                </Col>
                                <Col span={18}>
                                    错别字：报告中是否还有错别字。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    语句：报告的语句是否通顺合理；每个功能描述结束后是否都有句号。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    格式：报告的格式是否美观，字体是否一致，表格大小是否一致（如无特殊情况尽量不要将报告页中的表格分为2页）。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <b>12 用户文档测试报告：</b>语句是否通顺，是否准确描述用户的文档。
                                </Col>
                                <Col span={6}>
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                </Form>

			 {/* footer buttons */}
                <FormItem {...formItemLayout}>
                    {this.props.buttons.map((button, index) =>
                        <Button onClick={this.onClick(index)}
                                key={button.content}>
                            {button.content}
                        </Button>)}
                </FormItem>


			</Form>



        );
    }
}
export default Form.create()(TestReportCheckContentComponent);
