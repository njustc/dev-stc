//export default Form.create()(TestReportContentComponent);
import React, {Component, PropTypes} from 'react';
import {Row, Col, Card, Tabs, Select, Button, Layout, Form, Input,Radio,Checkbox,Icon,DatePicker,Collapse} from 'antd';

const Option=Select.Option;
const OptGroup=Select.OptGroup;
const FormItem=Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

function handleChange(value) {
    console.log(`selected ${value}`);
}

class TestReportContentComponent extends Component {
    constructor(props) {
        super(props);
      
    };

    static defaultProps = { 
	curID : '',
        values : {},
        disable:false,
        buttons: [],
    };

    static propTypes = {
        getValues: PropTypes.func.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
        curKey: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.curID = this.props.curKey;
        this.values = this.props.getValues(this.curID);
    }

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
            wrapperCol: { span: 19 },
        };

     
        return(
            <Form onSubmit={this.handleSubmit} >

                <FormItem {...formItemLayout}>
                    <h1>测试报告</h1>
                </FormItem>

		 <FormItem {...formItemLayout} label={"委托单位"}>
                            {getFieldDecorator('consignUnitC', {
                                rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

		 <FormItem {...formItemLayout} label={"项目编号"}>
                            {getFieldDecorator('sampleName', {
                                rules: [{ required: true, message: '请正确输入项目编号！' ,pattern:"^[A-Za-z]+$"}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
						 <FormItem {...formItemLayout} label={"样品名称"}>
                            {getFieldDecorator('sampleName', {
                                rules: [{ required: true, message: '请正确输入样品名称！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"版本/型号"}>
                            {getFieldDecorator('versionModel', {
                                rules: [{ required: true, message: '请正确输入版本/型号！',pattern:"^[a-zA-Z0-9/.]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

						 <FormItem {...formItemLayout} label={"来样日期"}>
                            {getFieldDecorator('receiveTime', {
                                rules: [{ required: true, message: '请正确输入来样日期！',pattern:"^[a-zA-Z0-9/.]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
						 <FormItem {...formItemLayout} label={"测试类型"}>
                            {getFieldDecorator('testKind', {
                                rules: [{ required: true, message: '请正确输入测试类型！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
						 <FormItem {...formItemLayout} label={"测试时间"}>
                            {getFieldDecorator('testTime', {
                                rules: [{ required: true, message: '请正确输入测试时间！',pattern:"^[a-zA-Z0-9/.]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
						 <FormItem {...formItemLayout} label={"测试依据"}>
                            {getFieldDecorator('testBasis', {
                                rules: [{ required: true, message: '请正确输入测试依据！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
						
						<FormItem
                            label="样品清单"
                            {...formItemLayout}
                        >
                            <span className="ant-form-text"></span>
                        </FormItem>
						
						 <FormItem {...formItemLayout} label={"软件样本"}>
                            {getFieldDecorator('softwareSample', {
                                rules: [{ required: true, message: '请正确输入软件样本！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
						
						 <FormItem {...formItemLayout} label={"软件文档"}>
                            {getFieldDecorator('softwareDoc', {
                                rules: [{ required: true, message: '请正确输入软件文档！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
						
						 <FormItem {...formItemLayout} label={"测试结论"}>
                            {getFieldDecorator('testConclusion', {
                                rules: [{ required: true, message: '请正确输入测试结论！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
						 <FormItem {...formItemLayout} label={"主测人"}>
                            {getFieldDecorator('masterMeasuringMan', {
                                rules: [{ required: true, message: '请正确输入主测人！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
						 <FormItem {...formItemLayout} label={"审核人"}>
                            {getFieldDecorator('Auditor', {
                                rules: [{ required: true, message: '请正确输入审核人！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
						 <FormItem {...formItemLayout} label={"批准人"}>
                            {getFieldDecorator('Approver', {
                                rules: [{ required: true, message: '请正确输入批准人"！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
						
					


                        <FormItem {...formItemLayout} label={"测试单位联系方式"}>
                            {getFieldDecorator('testUnitContactMode', {
                                rules: [{ required: true, message: '请输入！' }],
                            })(
                                <TextArea disabled={this.props.disable}
                                          rows={"4"}  placeholder="请输入软件用户对象描述"/>
                            )}
                        </FormItem>

						
                        <FormItem
                            label="电话"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnittelephone', {
                                rules: [{ required: true, message: '请输入委托单位信息！',pattern:"^[a-zA-Z0-9/.]+$" }],
                            })(
                                <Input placeholder="请输入电话号码" />
                            )}
                        </FormItem>

                        <FormItem
                            label="传真"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitFax', {
                                rules: [{ required: true, message: '请输入传真号！',pattern:"^[a-zA-Z0-9/.]+$" }],
                            })(
                                <Input placeholder="请输入传真号" />
                            )}

                        </FormItem>

                        <FormItem
                            label="地址"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitaddress', {
                                rules: [{ required: true, message: '请输入地址！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$"}],
                            })(
                                <Input placeholder="请输入地址" />
                            )}
                        </FormItem>

                        <FormItem
                            label="邮编"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitEmailnumber', {
                                rules: [{ required: true, message: '请输入邮编！',pattern:"^[a-zA-Z0-9/.]+$" }],
                            })(
                                <Input placeholder="请输入邮编" />
                            )}
                        </FormItem>

                        <FormItem
                            label="联系人"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitpeople', {
                                rules: [{ required: true, message: '请输入联系人！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$"}],
                            })(
                                <Input placeholder="请输入联系人" />
                            )}
                        </FormItem>



                        <FormItem
                            label="E-mail"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitEmail', {
                                rules: [{ required: true, message: '请输入E-mail！',pattern:"^[a-zA-Z0-9/.]+$" }],
                            })(
                                <Input placeholder="请输入邮箱地址" />
                            )}
                        </FormItem>

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
export default Form.create()(TestReportContentComponent);
