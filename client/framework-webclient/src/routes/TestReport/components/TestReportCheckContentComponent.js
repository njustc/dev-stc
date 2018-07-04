import React, {Component, PropTypes} from 'react';
import {Row, Col, Card, Tabs, Select, Button, Layout, Divider, Switch, Form, Input,Radio,Checkbox,Icon,DatePicker,Collapse} from 'antd';

const FormItem=Form.Item;

function handleChange(value) {
    console.log(`selected ${value}`);
}

class TestReportCheckContentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values:this.props.value,
            //editable:false,
        };
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.buttons[buttonIndex].onClick(this.props.testReportCheckData, JSON.stringify(values));
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const switchStyle = {
            marginTop: 0,
            marginBottom: 0,
            lineHeight: '39px'
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
                        initialValue: this.props.values.consignUnit
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"检查人"}>
                    {getFieldDecorator('checker', {
                        rules: [{ required: true, message: '请正确输入检查人！' ,pattern:"^[\u4E00-\u9FA5A-Za-z]+$"}],
                        initialValue: this.props.values.consignUnit
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"日期"}>
                    {getFieldDecorator('date', {
                        rules: [{ required: false, message: '请正确输入时间！'}],
                        initialValue: this.props.values.date
                    })(
                        <DatePicker showTime format="YYYY-MM-DD"/>
                    )}
                </FormItem>

                <div>
                    <Divider orientation="left">检查事项</Divider>
                    <Row gutter={16}>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>1. 报告编号：</b>检查报告编号的正确性（是否符合编码规则）与前后的一致性（报告首页与每页页眉）。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item1', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item1
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>2. 页码：</b>检查页码与总页数是否正确（报告首页与每页页眉）。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item2', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item2
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>3. 软件名称：</b>是否和确认单一致，是否前后一致（共三处，包括首页、报告页、附件三）。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item3', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item3
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>4. 版本号：</b>是否和确认单一致，是否前后一致（共二处，包括首页、报告页）。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item4', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item4
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>5. 委托单位：</b>是否和确认单一致，是否前后一致（共二处，包括首页、报告页）。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item5', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item5
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>6. 完成日期：</b>是否前后一致（共二处，包括首页、报告页页末）。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item6', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item6
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>7. 委托单位地址：</b>是否和确认单一致（共一处，报告页）。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item7', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item7
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>8. 序号：</b>附件二、附件三中的序号是否正确、连续。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item8', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item8
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>9. 测试样品：</b>样品名称是否正确，数量是否正确。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item9', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item9
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>10. 软、硬件列表：</b>列表是否完整（如打印机），用途描述是否合理正确。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item10', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item10
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <b>11. 文字、内容、格式</b>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}>错别字：报告中是否还有错别字。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item111', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item111
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}>语句：报告的语句是否通顺合理；每个功能描述结束后是否都有句号。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item112', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item112
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}>格式：报告的格式是否美观，字体是否一致，表格大小是否一致（如无特殊情况尽量不要将报告页中的表格分为2页）。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item113', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item113
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <div style={{lineHeight:'39px'}}><b>12.用户文档测试报告：</b>语句是否通顺，是否准确描述用户的文档。</div>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item12', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item12
                                })(
                                    <Switch
                                        checkedChildren={'是'}
                                        unCheckedChildren={'否'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>

			 {/* footer buttons */}
                <FormItem {...formItemLayout}>
                    {this.props.buttons.map((button, index) => {
                        let buttonCanShow = true;
                        this.props.buttonsEnable.forEach(function(element){
                            if(element.content === button.content && element.enable){
                                buttonCanShow = true;
                            }});
                        if(buttonCanShow){
                            return <Button
                                //disabled={this.props.buttonDisabled}
                                onClick={this.onClick(index)}
                                key={button.content}>
                                {button.content}
                            </Button>
                        }
                    })}
                </FormItem>


			</Form>



        );
    }
}
export default Form.create()(TestReportCheckContentComponent);
