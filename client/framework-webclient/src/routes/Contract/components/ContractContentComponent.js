import React, {Component, PropTypes} from 'react';
import {Row,Col,Steps, Form,Button,Input,DatePicker,InputNumber,Collapse,message} from 'antd'
//import TextArea from "../../../../../framework-androidclient/src/screens/form/textArea";
//import {message} from "antd/lib/index";
const Step = Steps.Step;

const FormItem=Form.Item;
const InputGroup = Input.Group;
const Panel=Collapse.Panel;
const { TextArea } = Input;
const steps = [{
  title: '合同基本信息',
}, {
  title: '合同内容（一）',
}, {
  title: '合同内容（二）',
},{
  title: '合同内容（三）',
}, ];

class ContractContentComponent extends Component {
    constructor(props) {
        super(props);
         this.state = {
            current: 0,
         };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });/*TODO 添加保存values功能*/
    }
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });/*TODO 添加保存values功能*/
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

    componentWillMount() {
        //     this.curID = this.props.curKey;
        //     // console.log(this.curID);
        this.props.getValues(this.props.contractData.id);
        //     // console.log(this.values);
    };

    onClick = (buttonIndex) => () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.buttons[buttonIndex].onClick(this.props.consignData, JSON.stringify(values));
        //     }
        // });
        const {buttons, form} = this.props;
        buttons[buttonIndex].onClick(this.props.contractData,JSON.stringify(form.getFieldsValue()));          //此处附近接口？？
    };
    render() {
        const { current } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 17 },
        };
        const formItemLayout2 =  {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const spanLayout =  {
            labelCol: { offset:2},
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
                <FormItem>
                    <h1 style={{textAlign:'center'}}>软件委托测试合同</h1>
                </FormItem>

                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>

                <div className="steps-content">
                    <FormItem/>
                    {
                        this.state.current == 0
                        &&
                        <div>
                            <FormItem {...formItemLayout} label="项目名称">
                                {getFieldDecorator('projectName', {
                                    rules: [{ required: true, message: '请输入项目名称！' }],
                                    initialValue: this.props.values.projectName,
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

                        </div>

                    }
                    {
                        this.state.current == 1
                        &&
                        <div offset="2">

                            <Row>
                                <Col offset={1} span={21}>
                                    <FormItem {...spanLayout}>
                                <InputGroup compact>
                                    本合同由作为委托方的
                                    {getFieldDecorator('ConsignA.unitName', {
                                        rules: [{ required: true, message: '请输入单位全称！' }],
                                        //initialValue: this.props.values.ConsignA.unitName,
                                    })(
                                        <Input style={InputStyle} disabled={this.props.disable}/>
                                    )}（以下简称“甲方”）与作为受托方的
                                    {getFieldDecorator('ConsignB.unitName', {
                                        rules: [{ required: true, message: '请输入单位全称！' }],
                                        //initialValue: this.props.values.ConsignB.unitName,
                                    })(
                                        <Input style={InputStyle} disabled={this.props.disable}/>
                                    )}（以下简称“乙方”）在平等自愿的基础上，依据《中华人民共和国合同法》有关规定就项目的执行，经友好协商后订立。
                                </InputGroup>
                            </FormItem>
                                </Col>
                            </Row>
                            <FormItem/>

                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>一、 任务表述</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
                                    <FormItem {...spanLayout}>
                                    <InputGroup offset={1} compact>
                                        乙方按照国家软件质量测试标准和测试规范，完成甲方委托的软件
                                        {getFieldDecorator('ProjectName', {
                                            rules: [{ required: true, message: '请输入项目名称！' }],
                                            //initialValue: this.props.values.ProjectName,
                                        })(
                                            <Input  style={InputStyle} disabled={this.props.disable} placeholder={"（软件测试）"}/>
                                        )}(下称受测软件)的质量特性
                                        {getFieldDecorator('qualityChar', {
                                            rules: [{ required: true, message: '请输入项目名称！' }],
                                            //initialValue: this.props.values.qualityChar,
                                        })(
                                            <Input style={InputStyle}disabled={this.props.disable} />
                                        )}，进行测试，并出具相应的测试报告
                                    </InputGroup>
                            </FormItem>
                                </Col>
                            </Row>
                            <FormItem/>

                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>二、双方的主要义务</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
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
                                </Col>
                            </Row>
                            <FormItem/>

                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>三、履约地点</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
                                    由甲方将受测软件产品送到乙方实施测试。如果由于被测软件本身特点或其它乙方认可的原因，需要在甲方所在地进行测试时，甲方应负担乙方现场测试人员的差旅和食宿费用。
                                </Col>
                            </Row>
                            <FormItem/>

                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>四、合同价款</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
                                    <FormItem>
                                        本合同软件测试费用为人民币
                                        {getFieldDecorator('testFee', {
                                            rules: [{ required: true, message: '请输入价格！'}],
                                            //initialValue: this.props.values.testFee,
                                        })(
                                            <InputNumber disabled={this.props.disable}/>
                                        )}（￥   元）。
                                    </FormItem>
                                </Col>
                            </Row>

                        </div>
                    }
                    {
                        this.state.current == 2
                        &&
                        <div>
                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>五、测试费用支付方式</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
                                    本合同签定后，十个工作日内甲方合同价款至乙方帐户。
                                </Col>
                            </Row>
                            <FormItem/>

                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>六、履行的期限</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
                                    1.	本次测试的履行期限为合同生效之日起 30 个自然日内完成。<br/>
                                    2.	经甲乙双方同意，可对测试进度作适当修改，并以修改后的测试进度作为本合同执行的期限。<br/>
                                    3.	如因甲方原因，导致测试进度延迟、应由甲方负责,乙方不承担责任，若涉及赔偿责任，甲方所负担的赔偿总额不超过本合同总金额。<br/>
                                    4.	如因乙方原因，导致测试进度延迟，双方经协商一致后另行签订书面协议，作为本合同的补充。
                                </Col>
                            </Row>
                            <FormItem/>

                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>七、资料的保密</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
                                    对于一方向另一方提供使用的秘密信息，另一方负有保密的责任，不得向任何第三方透露。
                                </Col>
                            </Row>
                            <FormItem/>

                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>八、 风险责任的承担</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
                                    乙方人员在本协议有效期间（包括可能的到甲方出差）发生人身意外或罹患疾病时由乙方负责处理。
                                    甲方人员在本协议有效期间（包括可能的到乙方出差）发生人身意外或罹患疾病时由甲方负责处理。
                                </Col>
                            </Row>
                            <FormItem/>

                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>九、验收方法</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
                                    由乙方向甲方提交软件产品鉴定测试报告正本一份，甲方签收鉴定测试报告后，完成验收。本合同签订之前双方所有的知识产权归属保持不变。
                                </Col>
                            </Row>
                            <FormItem/>

                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>十、 争议解决</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
                                    双方因履行本合同所发生的一切争议，应通过友好协商解决；如协商解决不 成，就提交北京仲裁委员会进行仲裁。裁决对双方当事人具有同等约束力。
                                </Col>
                            </Row>
                            <FormItem/>

                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>十一、 其他</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} span={20}>
                                    本合同自双方授权代表签字盖章之日起生效，自受托方的主要义务履行完毕之日起终止。
                                    本合同未尽事宜由双方协商解决。
                                    本合同的正本一式肆份，双方各执两份，具有同等法律效力。
                                </Col>
                            </Row>
                        </div>
                    }
                    {
                        this.state.current == 3
                        &&
                        <div>
                            <Row>
                                <Col offset={1} span={21}>
                                    <h4>十二、签章</h4>
                                </Col>
                            </Row>

                            <FormItem style={{textAlign:'center'}} colon={false} label={"委托方"}/>
                            <FormItem {...formItemLayout2} label={"单位全称"}>
                                {getFieldDecorator('ConsignA.unitName', {
                                    rules: [{ required: true, message: '请输入单位全称！' }],
                                    // initialValue: this.props.values.ConsignA.unitName,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"授权代表"}>
                                {getFieldDecorator('ConsignA.authRepresent', {
                                    rules: [{ required: true, message: '请输入授权代表！' }],
                                    //  initialValue: this.props.values.ConsignA.authRepresent,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"签章日期"}>
                                {getFieldDecorator('ConsignA.signData', {
                                    rules: [{ required: true, message: '请输入签章日期！' }],
                                    //initialValue: this.props.values.ConsignA.signData,
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD"/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"联系人"}>
                                {getFieldDecorator('ConsignA.contact', {
                                    rules: [{ required: true, message: '请输入联系人！' ,pattern:"^[a-zA-Z\u0020\u4E00-\u9FA5]+$"}],
                                    // initialValue: this.props.values.ConsignA.contact,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                                </FormItem>

                            <FormItem {...formItemLayout2} label={"通讯地址"}>
                                {getFieldDecorator('ConsignA.poAddress', {
                                    rules: [{ required: true, message: '请输入通讯地址！' }],
                                    //  initialValue: this.props.values.ConsignA.poAddress,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"电话"}>
                                {getFieldDecorator('ConsignA.phone', {
                                    rules: [{ required: true, message: '请输入电话！',pattern:"^[0-9/-]+$"}],
                                    //initialValue: this.props.values.ConsignA.phone,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"传真"}>
                                {getFieldDecorator('ConsignA.fax', {
                                    rules: [{ required: true, message: '请输入传真！',pattern:"^[0-9/-]+$" }],
                                    //  initialValue: this.props.values.ConsignA.fax,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"开户银行"}>
                                {getFieldDecorator('ConsignA.accountBank', {
                                    rules: [{ required: true, message: '请输入开户银行！',pattern:"^[a-zA-Z\u4E00-\u9FA5]+$" }],
                                    //  initialValue: this.props.values.ConsignA.accountBank,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"账号"}>
                                {getFieldDecorator('ConsignA.accountNum', {
                                    rules: [{ required: true, message: '请输入账号！',pattern:"^[a-zA-Z0-9]+$" }],
                                    //  initialValue: this.props.values.ConsignA.accountNum,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"邮编"}>
                                {getFieldDecorator('ConsignA.postCode', {
                                    rules: [{ required: true, message: '请输入邮编！',pattern:"^[0-9/-]+$",max:6 }],
                                    //   initialValue: this.props.values.ConsignA.postCode,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem />

                            <FormItem style={{textAlign:'center'}} colon={false} label={"受托方"}/>
                            <FormItem {...formItemLayout2} label={"单位全称"}>
                                {getFieldDecorator('ConsignB.unitName', {
                                    rules: [{ required: true, message: '请输入单位全称！' }],
                                    // initialValue: this.props.values.ConsignB.unitName,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"授权代表"}>
                                {getFieldDecorator('ConsignB.authRepresent', {
                                    rules: [{ required: true, message: '请输入授权代表！' }],
                                    //  initialValue: this.props.values.ConsignB.authRepresent,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"签章日期"}>
                                {getFieldDecorator('ConsignB.signData', {
                                    rules: [{ required: true, message: '请输入签章日期！' }],
                                    //initialValue: this.props.values.ConsignB.signData,
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD"/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"联系人"}>
                                {getFieldDecorator('ConsignB.contact', {
                                    rules: [{ required: true, message: '请输入联系人！' ,pattern:"^[a-zA-Z\u0020\u4E00-\u9FA5]+$"}],
                                    // initialValue: this.props.values.ConsignB.contact,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                                </FormItem>

                            <FormItem {...formItemLayout2} label={"通讯地址"}>
                                {getFieldDecorator('ConsignB.poAddress', {
                                    rules: [{ required: true, message: '请输入通讯地址！' }],
                                    //  initialValue: this.props.values.ConsignB.poAddress,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"电话"}>
                                {getFieldDecorator('ConsignB.phone', {
                                    rules: [{ required: true, message: '请输入电话！',pattern:"^[0-9/-]+$"}],
                                    //initialValue: this.props.values.ConsignB.phone,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"传真"}>
                                {getFieldDecorator('ConsignB.fax', {
                                    rules: [{ required: true, message: '请输入传真！',pattern:"^[0-9/-]+$" }],
                                    //  initialValue: this.props.values.ConsignB.fax,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"开户银行"}>
                                {getFieldDecorator('ConsignB.accountBank', {
                                    rules: [{ required: true, message: '请输入开户银行！',pattern:"^[a-zA-Z\u4E00-\u9FA5]+$" }],
                                    //  initialValue: this.props.values.ConsignB.accountBank,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"账号"}>
                                {getFieldDecorator('ConsignB.accountNum', {
                                    rules: [{ required: true, message: '请输入账号！',pattern:"^[a-zA-Z0-9]+$" }],
                                    //  initialValue: this.props.values.ConsignB.accountNum,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout2} label={"邮编"}>
                                {getFieldDecorator('ConsignB.postCode', {
                                    rules: [{ required: true, message: '请输入邮编！',pattern:"^[0-9/-]+$",max:6 }],
                                    //   initialValue: this.props.values.ConsignB.postCode,
                                })(
                                    <Input disabled={this.props.disable}/>
                                )}
                            </FormItem>
                        </div>
                    }
                </div>

                <FormItem/>
                <div className="steps-action">{
                    this.state.current < steps.length - 1
                    &&
                    <Button type="primary" onClick={() => this.next()}>下一页</Button>
                }{
                    this.state.current > 0
                    &&
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                      上一页</Button>
                }
            </div>
                {/* footer buttons */}
                <FormItem style={{textAlign:'center'}}>
                    {this.props.buttons.map((button, index) =>
                        <Button onClick={this.onClick(index)}
                                key={button.content}>
                            {button.content}
                        </Button>)}
                </FormItem>
                {true?<FormItem label='评审内容'><TextArea row={4}/></FormItem>:<div></div>}
                {/*<FormItem label='评审结论'><TextArea row={4}/></FormItem>*/}
            </Form>

        );
    }
}
export default Form.create()(ContractContentComponent);
