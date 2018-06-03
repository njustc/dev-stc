import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber,Collapse} from 'antd'
import {message} from "antd/lib/index";

const FormItem=Form.Item;
const InputGroup = Input.Group;
const Panel=Collapse.Panel;
class ContractContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        values: {
            consignPlace:"南京",
        },
        disable:false,
        buttons: [],
    };

    static propTypes ={
        contractData: PropTypes.object.isRequired,
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
        buttons[buttonIndex].onClick(this.props.contractData,JSON.stringify(form.getFieldsValue()));          //此处附近接口？？
        switch (buttons[buttonIndex].content) {
            case '保存': message.success('保存成功');break;
            case '提交': message.success('提交成功');break;
            case '通过': message.success('委托已通过');break;
            //case 3: message.success('提交成功');break;
            default:break;
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 },
        };
        const InputStyle={
            width:'200',
            borderRadius:'6',
        }
        const customPanelStyle = {
            background: '#f9f9f9',
            borderRadius: 6,
            marginTop: 5,
            marginBottom: 5,
            border: 0,
            overflow: 'hidden',
        };
        const customPanelStyle2 = {
            background: '#ffffff',
            borderRadius: 6,
            marginTop: 5,
            marginBottom: 5,
            border: 0,
            overflow: 'hidden',
        };
        return(
            <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
                <FormItem {...formItemLayout}>
                    <h1 style={{textAlign:'center'}}>软件委托测试合同</h1>
                </FormItem>

                <Collapse bordered={false} defaultActiveKey={['basis']}>
                    <Panel header={"合同基本信息"} key={"basis"} style={customPanelStyle}>
                        <FormItem {...formItemLayout} label="项目名称">
                            {getFieldDecorator('projectName', {
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

                        <FormItem {...formItemLayout} label="签订地点" >
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

                    </Panel>

                    <Panel header={"合同内容"} key={"content"} style={customPanelStyle2}>
                        <FormItem {...formItemLayout}>
                            <InputGroup compact>
                                本合同由作为委托方的
                                {getFieldDecorator('ConsignA', {
                                    rules: [{ required: true, message: '请输入单位全称！' }],
                                    initialValue: this.props.values.ConsignA,
                                })(
                                    <Input style={InputStyle} disabled={this.props.disable}/>
                                )}（以下简称“甲方”）与作为受托方的
                                {getFieldDecorator('ConsignB', {
                                    rules: [{ required: true, message: '请输入单位全称！' }],
                                    initialValue: this.props.values.ConsignB,
                                })(
                                    <Input style={InputStyle} disabled={this.props.disable}/>
                                )}（以下简称“乙方”）在平等自愿的基础上，依据《中华人民共和国合同法》有关规定就项目的执行，经友好协商后订立。
                            </InputGroup>
                        </FormItem>
                        <Collapse bordered={false}>
                            <Panel header="一、 任务表述" key={"one"} style={customPanelStyle}>
                                <FormItem>
                                    <InputGroup compact>
                                        乙方按照国家软件质量测试标准和测试规范，完成甲方委托的软件
                                        {getFieldDecorator('ProjectName', {
                                            rules: [{ required: true, message: '请输入项目名称！' }],
                                            initialValue: this.props.values.ProjectName,
                                        })(
                                            <Input  style={InputStyle} disabled={this.props.disable} placeholder={"（软件测试）"}/>
                                        )}(下称受测软件)的质量特性
                                        {getFieldDecorator('qualityChar', {
                                            rules: [{ required: true, message: '请输入项目名称！' }],
                                            initialValue: this.props.values.qualityChar,
                                        })(
                                            <Input style={InputStyle}disabled={this.props.disable} />
                                        )}，进行测试，并出具相应的测试报告
                                    </InputGroup>
                                </FormItem>
                            </Panel>

                            <Panel header="二、双方的主要义务" key={"two"} style={customPanelStyle2}>
                                1. 甲方的主要义务：<br/>
                                （1）	按照合同约定支付所有费用。<br/>
                                （2）	按照乙方要求以书面形式出具测试需求，包括测试子特性、测试软硬件环境等。<br/>
                                （3）	提供符合交付要求的受测软件产品及相关文档，包括软件功能列表、需求分析、设计文档、用户文档至乙方。<br/>
                                （4）	指派专人配合乙方测试工作，并提供必要的技术培训和技术协助。<br/>
                                2. 乙方的主要义务：<br/>
                                （1）	设计测试用例，制定和实施产品测试方案。<br/>
                                （2）	在测试过程中，定期知会甲方受测软件在测试过程中出现的问题。<br/>
                                （3）	按期完成甲方委托的软件测试工作。<br/>
                                （4）	出具正式的测试报告。
                            </Panel>

                            <Panel header="三、履约地点" key={"three"} style={customPanelStyle}>
                                由甲方将受测软件产品送到乙方实施测试。如果由于被测软件本身特点或其它乙方认可的原因，需要在甲方所在地进行测试时，甲方应负担乙方现场测试人员的差旅和食宿费用。
                            </Panel>

                            <Panel header="四、合同价款" key={"four"} style={customPanelStyle2}>
                                <FormItem>
                                    本合同软件测试费用为人民币
                                    {getFieldDecorator('testFee', {
                                        rules: [{ required: true, message: '请输入价格！'}],
                                        initialValue: this.props.values.testFee,
                                    })(
                                        <InputNumber disabled={this.props.disable}/>
                                    )}（￥   元）。
                                </FormItem>
                            </Panel>

                            <Panel header="五、测试费用支付方式 " key={"five"} style={customPanelStyle}>
                                本合同签定后，十个工作日内甲方合同价款至乙方帐户。
                            </Panel>

                            <Panel header="六、履行的期限" key={"six"} style={customPanelStyle2}>
                                1.	本次测试的履行期限为合同生效之日起 30 个自然日内完成。<br/>
                                2.	经甲乙双方同意，可对测试进度作适当修改，并以修改后的测试进度作为本合同执行的期限。<br/>
                                3.	如因甲方原因，导致测试进度延迟、应由甲方负责,乙方不承担责任，若涉及赔偿责任，甲方所负担的赔偿总额不超过本合同总金额。<br/>
                                4.	如因乙方原因，导致测试进度延迟，双方经协商一致后另行签订书面协议，作为本合同的补充。
                            </Panel>

                            <Panel header="七、资料的保密" key={"seven"} style={customPanelStyle}>
                                对于一方向另一方提供使用的秘密信息，另一方负有保密的责任，不得向任何第三方透露。
                            </Panel>

                            <Panel header="八、 风险责任的承担" key={"eight"} style={customPanelStyle2}>
                                乙方人员在本协议有效期间（包括可能的到甲方出差）发生人身意外或罹患疾病时由乙方负责处理。甲方人员在本协议有效期间（包括可能的到乙方出差）发生人身意外或罹患疾病时由甲方负责处理。
                            </Panel>

                            <Panel header="九、验收方法" key={"nine"} style={customPanelStyle}>
                                由乙方向甲方提交软件产品鉴定测试报告正本一份，甲方签收鉴定测试报告后，完成验收。本合同签订之前双方所有的知识产权归属保持不变。
                            </Panel>

                            <Panel header="十、 争议解决" key={"ten"} style={customPanelStyle2}>
                                双方因履行本合同所发生的一切争议，应通过友好协商解决；如协商解决不 成，就提交北京仲裁委员会进行仲裁。裁决对双方当事人具有同等约束力。
                            </Panel>

                            <Panel header="十一、 其他" key={"eleven"} style={customPanelStyle}>
                                本合同自双方授权代表签字盖章之日起生效，自受托方的主要义务履行完毕之日起终止。
                                本合同未尽事宜由双方协商解决。
                                本合同的正本一式肆份，双方各执两份，具有同等法律效力。
                            </Panel>

                            <Panel header="十二、签章" key={"twelve"} style={customPanelStyle2}>
                                <Collapse bordered={false}>

                                    <Panel header="委托方" key={"clientele"} style={customPanelStyle}>
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
                                    </Panel>

                                    <Panel header="受托方" key={"trustee"} style={customPanelStyle2}>
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
                                    </Panel>
                                </Collapse>
                            </Panel>
                        </Collapse>
                    </Panel>
                </Collapse>

                {/* footer buttons */}
                <FormItem style={{textAlign:'center'}}>
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
export default Form.create()(ContractContentComponent);
