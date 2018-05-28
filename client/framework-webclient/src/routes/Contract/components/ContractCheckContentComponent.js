import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber} from 'antd'

const FormItem=Form.Item;
const InputGroup = Input.Group;
const { TextArea } = Input;
class ContractCheckContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        values:{},
        disable:false,
        buttons: [],
    };

    static propTypes = {
        values: PropTypes.object.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
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
            wrapperCol: { span: 19 },
        };
        return(
            <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
                <FormItem  >
                    <h1 style={{textAlign:'center'}}>合同评审表</h1>
                </FormItem>

                <FormItem {...formItemLayout} label="委托单位">
                    {getFieldDecorator('consignUnit', {
                        rules: [{ required: true, message: '请输入委托单位！' }],
                        initialValue: this.props.values.consignUnit,
                    })(
                        <Input  disabled={this.props.disable} />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="项目名称">
                    {getFieldDecorator('projectName', {
                        rules: [{ required: true, message: '请输入项目名称！' }],
                        initialValue: this.props.values.projectName,
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="合同编号">
                    {getFieldDecorator('contractNO', {
                        rules: [{ required: true, message: '请输入合同编号！',pattern:"^[a-zA-Z0-9]+$" }],
                        initialValue: this.props.values.contractNO,
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"评审内容"}>
                    {getFieldDecorator('testContent', {
                        rules: [{ required: true, message: '请输入评审内容！' }],
                        initialValue: this.props.values.testContent,
                    })(
                        <TextArea disabled={this.props.disable}
                                  rows={"4"}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"评审结论"}>
                    {getFieldDecorator('reviewResult', {
                        rules: [{ required: true, message: '请输入评审结论！' }],
                        initialValue: this.props.values.reviewResult,
                    })(
                        <TextArea disabled={this.props.disable}
                                  rows={"4"} />
                    )}
                </FormItem>

                <FormItem{...formItemLayout} label={"评审人员会签"}>

                </FormItem>

                <FormItem{...formItemLayout} label={"批准人签字"}>

                </FormItem>

                <FormItem {...formItemLayout} label={"批准日期"}>
                    {getFieldDecorator('signDate', {
                        rules: [{ required: true, type: 'object',message: '请选择日期！' }],
                        initialValue: this.props.values.signDate,
                    })(
                        <DatePicker showTime format="YYYY-MM-DD"/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"备注"}>
                    {getFieldDecorator('remarks', {
                        rules: [{ required: true, message: '请输入备注！' }],
                        initialValue: this.props.values.remarks,
                    })(
                        <TextArea disabled={this.props.disable}
                                  rows={"4"} />
                    )}
                </FormItem>

                {/* footer buttons */}
                <FormItem style={{textAlign:'center'}}>
                    {this.props.buttons.map((button, index) =>
                        <Button onClick={this.onClick(index)}
                                key={button.content}
                        >
                            {button.content}
                        </Button>)}
                </FormItem>
            </Form>



        );
    }
}
export default Form.create()(ContractCheckContentComponent);
