/*测试记录*/
import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
class TestProblemContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    /*
    static defaultProps = {
        values: {
            consignPlace:"南京",
        },
        disable:false,
        buttons: [],
    };

    static propTypes = {
        values: PropTypes.object.isRequired,
        contractData: PropTypes.object.isRequired,
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
        const {buttons, contractData, form} = this.props;
        buttons[buttonIndex].onClick(contractData, JSON.stringify(form.getFieldsValue()));
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        return(
            <Form onSubmit={this.handleSubmit}  hideRequiredMark={true}>
            <FormItem {...formItemLayout}>
    <h1>软件委托测试合同</h1>
        </FormItem>

        <FormItem {...formItemLayout} label="项目名称">
            {getFieldDecorator('ProjectName', {
            rules: [{ required: true, message: '请输入项目名称！' }],
                initialValue: this.props.values.ProjectName,
        })(
        <Input size="larger" disabled={this.props.disable} placeholder={"（软件测试）"}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label="委托方（甲方）">
            {getFieldDecorator('consignA', {
            rules: [{ required: true, message: '请输入委托方（甲方）！',pattern:"^[a-zA-Z\u0020\u4E00-\u9FA5]+$" }],
                initialValue: this.props.values.consignA,
        })(
        <Input size="larger" disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label="受托方（乙方）">
            {getFieldDecorator('consignB', {
            rules: [{ required: true, message: '请输入受托方（乙方）！',pattern:"^[a-zA-Z\u0020\u4E00-\u9FA5]+$" }],
                initialValue: this.props.values.consignB,
        })(
        <Input size="larger" disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label="签订地点">
            {getFieldDecorator('consignPlace', {
            rules: [{ required: true, message: '请输入签订地点！' }],
                initialValue: this.props.values.consignPlace,
        })(
        <Input size="larger" disabled={this.props.disable} placeholder={"南京"}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label="签订日期">
            {getFieldDecorator('consignDate', {
            rules: [{ required: true, type: 'object',message: '请选择签订日期！' }],
                initialValue: this.props.values.consignDate,
        })(
        <DatePicker showTime format="YYYY-MM-DD"/>
    )}
    </FormItem>

        <FormItem {...formItemLayout}>
    <h3>十二、签章</h3>
        </FormItem>
        <FormItem {...formItemLayout} label={"委托方"}>
            <FormItem {...formItemLayout} label={"单位全称"}>
            {getFieldDecorator('ConsignA.unitName', {
            rules: [{ required: true, message: '请输入单位全称！' }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"授权代表"}>
            {getFieldDecorator('ConsignA.authRepresent', {
            rules: [{ required: true, message: '请输入授权代表！' }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"签章日期"}>
            {getFieldDecorator('ConsignA.signData', {
            rules: [{ required: true, message: '请输入签章日期！' }],
        })(
        <DatePicker showTime format="YYYY-MM-DD"/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"联系人"}>
            {getFieldDecorator('ConsignA.contact', {
            rules: [{ required: true, message: '请输入联系人！' ,pattern:"^[a-zA-Z\u0020\u4E00-\u9FA5]+$"}],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"通讯地址"}>
            {getFieldDecorator('ConsignA.poAddress', {
            rules: [{ required: true, message: '请输入通讯地址！' }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"电话"}>
            {getFieldDecorator('ConsignA.phone', {
            rules: [{ required: true, message: '请输入电话！',pattern:"^[0-9/-]+$"}],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"传真"}>
            {getFieldDecorator('ConsignA.fax', {
            rules: [{ required: true, message: '请输入传真！',pattern:"^[0-9/-]+$" }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"开户银行"}>
            {getFieldDecorator('ConsignA.accountBank', {
            rules: [{ required: true, message: '请输入开户银行！',pattern:"^[a-zA-Z\u4E00-\u9FA5]+$" }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"账号"}>
            {getFieldDecorator('ConsignA.accountNum', {
            rules: [{ required: true, message: '请输入账号！',pattern:"^[a-zA-Z0-9]+$" }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"邮编"}>
            {getFieldDecorator('ConsignA.postCode', {
            rules: [{ required: true, message: '请输入邮编！',pattern:"^[0-9/-]+$",max:6 }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>
        </FormItem>

        <FormItem {...formItemLayout}label={"受托方"}>
            <FormItem {...formItemLayout} label={"单位全称"}>
            {getFieldDecorator('ConsignB.unitName', {
            rules: [{ required: true, message: '请输入单位全称！' }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"授权代表"}>
            {getFieldDecorator('ConsignB.authRepresent', {
            rules: [{ required: true, message: '请输入授权代表！' }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"签章日期"}>
            {getFieldDecorator('ConsignB.signData', {
            rules: [{ required: true, message: '请输入签章日期！' }],
        })(
        <DatePicker showTime format="YYYY-MM-DD"/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"联系人"}>
            {getFieldDecorator('ConsignB.contact', {
            rules: [{ required: true, message: '请输入联系人！' ,pattern:"^[a-zA-Z\u0020\u4E00-\u9FA5]+$"}],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"通讯地址"}>
            {getFieldDecorator('ConsignB.poAddress', {
            rules: [{ required: true, message: '请输入通讯地址！' }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"电话"}>
            {getFieldDecorator('ConsignB.phone', {
            rules: [{ required: true, message: '请输入电话！',pattern:"^[0-9/-]+$"}],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"传真"}>
            {getFieldDecorator('ConsignB.fax', {
            rules: [{ required: true, message: '请输入传真！',pattern:"^[0-9/-]+$" }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"开户银行"}>
            {getFieldDecorator('ConsignB.accountBank', {
            rules: [{ required: true, message: '请输入开户银行！',pattern:"^[a-zA-Z\u4E00-\u9FA5]+$" }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"账号"}>
            {getFieldDecorator('ConsignB.accountNum', {
            rules: [{ required: true, message: '请输入账号！',pattern:"^[a-zA-Z0-9]+$" }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

        <FormItem {...formItemLayout} label={"邮编"}>
            {getFieldDecorator('ConsignB.postCode', {
            rules: [{ required: true, message: '请输入邮编！',pattern:"^[0-9/-]+$",max:6 }],
        })(
        <Input disabled={this.props.disable}/>
    )}
    </FormItem>

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
        }*/
    render(){
        return(
            <h3>测试记录表</h3>
        )
    }
}
export default Form.create()(TestProblemContentComponent);
