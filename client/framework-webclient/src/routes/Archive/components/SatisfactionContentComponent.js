import React, {Component, PropTypes} from 'react';
import {Row, Col, Card, Tabs, Select, Button, Layout, Rate, Form, Input,Radio,Table, Checkbox,Icon,DatePicker,Collapse, InputNumber} from 'antd';

const FormItem=Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

function handleChange(value) {
    console.log(`selected ${value}`);
}

class SatisfactionContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        values: {},
        disable:false,
        buttons: [],
    };

    static propTypes = {
        satisfactionData: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
    };

    componentWillMount() {
    //     this.curID = this.props.curKey;
    //     // console.log(this.curID);
         this.props.getValues(this.props.satisfactionData.id);
    //     // console.log(this.values);
    };

    onClick = (buttonIndex) => () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.buttons[buttonIndex].onClick(this.props.consignData, JSON.stringify(values));
        //     }
        // });
        const {buttons, form} = this.props;
        buttons[buttonIndex].onClick(this.props.satisfactionData, JSON.stringify(form.getFieldsValue()));
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
            marginBottom: 0,
        };

        const rowStyle = {
            marginBottom: '10pt',
        };

        const tipStyle = {
            color: 'red',
        };

        return(
            <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
                <h1 style={{textAlign:'center'}}>客户满意度调查表</h1>

                <FormItem {...formItemLayout} label={"单位名称"}>
                    {getFieldDecorator('consignUnit', {
                        rules: [{ required: true, message: '请输入单位名称！' }],
                        initialValue: this.props.values.developUnit,
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="被测软件名称">
                    {getFieldDecorator('softwareName', {
                        rules: [{ required: true, message: '请输入被测软件名称！' }],
                        initialValue: this.props.values.softwareName,
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout}>
                    <h3 style={tipStyle}>以下内容由客户方填写</h3>
                </FormItem>

                <FormItem>
                    <Row style = {rowStyle} type="flex" justify="center" gutter={32}>
                        <Col span={10}>
                            <FormItem{...formItemLayout} label={"联系人"}>
                                {getFieldDecorator('contact', {
                                    rules: [{ required: true, message: '请正确输入联系人！' ,pattern:"^[\u4E00-\u9FA5A-Za-z]+$"}],
                                    initialValue: this.props.values.contact,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={10}>
                            <FormItem {...formItemLayout} label={"联系电话"}>
                                {getFieldDecorator('contactNumber', {
                                    rules: [{ required: true, message: '请正确输入联系电话！' ,pattern:"^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$"}],
                                    initialValue: this.props.values.contactNumber,
                                })(
                                    <Input disabled={this.props.disable} placeholder={"025-89685110"}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>

                <FormItem>
                    <Row style = {rowStyle} type="flex" justify="center" gutter={32}>
                        <Col span={10}>
                            <FormItem{...formItemLayout} label={"Email"}>
                                {getFieldDecorator('Email', {
                                    rules: [{ required: true, message: '请正确输入Email！' ,pattern:"^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"}],
                                    initialValue: this.props.values.Email,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={10}>
                            <FormItem {...formItemLayout} label={"手机"}>
                                {getFieldDecorator('mobilePhone', {
                                    rules: [{ required: true, message: '请正确输入手机号！' ,pattern:"^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\\d{8}$"}],
                                    initialValue: this.props.values.mobilePhone,
                                })(
                                    <Input disabled={this.props.disable} placeholder={"15195908360"}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>

                <Form>
                    <FormItem {...formItemLayout} label={"测试服务响应时间"}>
                        {getFieldDecorator('reflectTime', {
                            initialValue: this.props.values.reflectTime?this.props.values.reflectTime:3.5,
                        })(
                            <Rate  allowHalf/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={"测试服务收费合理性"}>
                        {getFieldDecorator('charge', {
                            initialValue: this.props.values.charge?this.props.values.charge:3.5,
                        })(
                            <Rate  allowHalf/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={"测试服务规范性"}>
                        {getFieldDecorator('standard', {
                            initialValue: this.props.values.standard?this.props.values.standard:3.5,
                        })(
                            <Rate  allowHalf/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={"测试服务技术能力"}>
                        {getFieldDecorator('capability', {
                            initialValue: this.props.values.capability?this.props.values.capability:3.5,
                        })(
                            <Rate  allowHalf/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={"客户需求的了解"}>
                        {getFieldDecorator('understanding', {
                            initialValue: this.props.values.understanding?this.props.values.understanding:3.5,
                        })(
                            <Rate  allowHalf/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={"服务时的沟通能力"}>
                        {getFieldDecorator('communication', {
                            initialValue: this.props.values.communication?this.props.values.communication:3.5,
                        })(
                            <Rate  allowHalf/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={"其他意见和建议"}>
                        {getFieldDecorator('advice', {
                            rules: [{
                                required: false
                            }],
                            initialValue: this.props.values.advice,
                        })(
                            <TextArea rows={4} />
                        )}
                    </FormItem>
                </Form>

                <FormItem/>

                <FormItem {...formItemLayout}>
                    <h3 style={tipStyle}>以下内容由测试中心填写</h3>
                </FormItem>

                {/* TODO 如何直接显示数据库中存放的数据并进行计算 */}

                <FormItem {...formItemLayout} label={"满意度计算总值"}>
                    {getFieldDecorator('satisfactionDegree', {
                        rules: [{ required: true, message: '请正确输入满意度！'}],
                        initialValue: this.props.values.satisfactionDegree,
                    })(
                        <InputNumber min={0} max={100} step={0.1}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"客户满意情况"}>
                    {getFieldDecorator('satisfactionLevel', {
                        rules: [{ required: true, message: '请选择客户满意情况！'}],
                        initialValue: this.props.values.satisfactionLevel
                    })(
                        <RadioGroup disabled={this.props.disable}>
                            <Radio value={1}>很满意</Radio>
                            <Radio value={2}>较满意</Radio>
                            <Radio value={3}>一般</Radio>
                            <Radio value={4}>不满意</Radio>
                            <Radio value={4}>很不满意</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem>
                    <h3>满意度调查说明</h3>
                    <p>1. 顾客满意度调查表须有客户签名才算有效；</p>
                    <p>2. 分值表示满意程度：90-100很满意，80-89满意，70-79较满意，50-69不满意，49以下很不满意，≥80分计入满意范畴；</p>
                    <p>3. 满意度的统计：满意度 = 获得满意的调查表总数 / 有效的调查表总数 × 100%</p>
                </FormItem>

                <FormItem/>
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
export default Form.create()(SatisfactionContentComponent);
