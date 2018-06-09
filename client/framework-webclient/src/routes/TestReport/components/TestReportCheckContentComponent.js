import React, {Component, PropTypes} from 'react';
import {Row, Col, Card, Tabs, Select, Button, Layout, Form, Input,Radio,Checkbox,Icon,DatePicker,Collapse} from 'antd';

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
            labelCol: { span: 30 },
            wrapperCol: { span: 19 },
        };

        return(
            <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>

                <FormItem {...formItemLayout}>
                    <h1>报告检查表</h1>
                </FormItem>
                                        
			<FormItem
                            {...formItemLayout}
                            label="1.报告编号:检查报告编号的正确性（是否符合编码规则）与前后的一致性（报告首页与每页页眉）"
                        >
                            {getFieldDecorator('reportName', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"报告编号"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>
      			
			<FormItem
                            {...formItemLayout}
                            label="2.页码:检查页码与总页数是否正确（报告首页与每页页眉）"
                        >
                            {getFieldDecorator('pageNumber', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"报告编号"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>

			<FormItem
                            {...formItemLayout}
                            label="3.软件名称:是否和确认单一致，是否前后一致（共三处，包括首页、报告页、附件三）"
                        >
                            {getFieldDecorator('softwareName', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"软件名称"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>
			

			<FormItem
                            {...formItemLayout}
                            label="4.版本号:是否和确认单一致，是否前后一致（共二处，包括首页、报告页）"
                        >
                            {getFieldDecorator('versionNumber', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"版本号"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>
			


			<FormItem
                            {...formItemLayout}
                            label="5.委托单位:是否和确认单一致，是否前后一致（共二处，包括首页、报告页）"
                        >
                            {getFieldDecorator('consignUnit', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"委托单位"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>


			<FormItem
                            {...formItemLayout}
                            label="6.完成日期:是否前后一致（共二处，包括首页、报告页页末）。"
                        >
                            {getFieldDecorator('finishedTime', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"完成日期"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>


			<FormItem
                            {...formItemLayout}
                            label="7.委托单位地址:是否和确认单一致（共一处，报告页）"
                        >
                            {getFieldDecorator('consignUnitAdress', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"委托单位地址"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>
			

			<FormItem
                            {...formItemLayout}
                            label="8.序号:附件二、附件三中的序号是否正确、连续"
                        >
                            {getFieldDecorator('Number', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"序号"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>


			<FormItem
                            {...formItemLayout}
                            label="9.测试样品:样品名称是否正确，数量是否正确"
                        >
                            {getFieldDecorator('testSample', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"测试样品"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>


			<FormItem
                            {...formItemLayout}
                            label="10.软、硬件列表:列表是否完整（如打印机），用途描述是否合理正确"
                        >
                            {getFieldDecorator('softwareList', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"软、硬件列表"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>


			<FormItem
                            {...formItemLayout}
                            label="11.1 错别字:报告中是否还有错别字"
                        >
                            {getFieldDecorator('wrongWord', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"错别字"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>


			<FormItem
                            {...formItemLayout}
                            label="11.2语句:报告的语句是否通顺合理；每个功能描述结束后是否都有句号"
                        >
                            {getFieldDecorator('sentences', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"语句"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>
		

			<FormItem
                            {...formItemLayout}
                            label="11.3格式:报告的格式是否美观，字体是否一致，表格大小是否一致。（如无特殊情况请尽量不要将报告页中的表格分为2页。）"
                        >
                            {getFieldDecorator('format', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"格式"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>


			<FormItem
                            {...formItemLayout}
                            label="12用户文档测试报告:语句是否通顺，是否准确描述用户的文档"
                        >
                            {getFieldDecorator('userDocTestReport', {
                                rules: [{ required: true, message: '请选择！'}],
                            })(
                                <RadioGroup name={"用户文档测试报告"} disabled={this.props.disable}>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>

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
