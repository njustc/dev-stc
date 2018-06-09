import React, {Component, PropTypes} from 'react';
import {Form,Button,Input,DatePicker,InputNumber,Collapse,Table} from 'antd'

const FormItem=Form.Item;
const InputGroup = Input.Group;
const Panel=Collapse.Panel;
class TestPlanContentComponent extends Component {
    constructor(props) {
        super(props);
    };

    static defaultProps = {
        values: {
            documentID:'NST-04-JS006-2011-软件测试方案-',
            testLevel:'系统级'
        },
        disable:false,
        buttons: [],
    };

    static propTypes = {
        testPlanData: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
    };
    componentWillMount() {
        //     this.curID = this.props.curKey;
        //     // console.log(this.curID);
        this.props.getValues(this.props.testPlanData.id);
        //     // console.log(this.values);
    };
    onClick = (buttonIndex) => () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.buttons[buttonIndex].onClick(this.props.consignData, JSON.stringify(values));
        //     }
        // });
        const {buttons, form} = this.props;
        buttons[buttonIndex].onClick(this.props.testPlanData,JSON.stringify(form.getFieldsValue()));          //此处附近接口？？
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
                <FormItem>
                    <h1 style={{textAlign:'center'}}>软件测试方案</h1>
                </FormItem>

                <Collapse bordered={false}>
                    <Panel header="[V1.0]" key={"v1-0"} style={customPanelStyle}>
                        <FormItem {...formItemLayout} label={"编制人"}>
                            {getFieldDecorator('establisher', {
                                rules: [{ required: true, message: '请输入编制人！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$"  }],
                                initialValue: this.props.values.establisher,
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"审核人"}>
                            {getFieldDecorator('reviewer', {
                                rules: [{ required: true, message: '请输入审核人！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$"  }],
                                initialValue: this.props.values.reviewer,
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"批准人"}>
                            {getFieldDecorator('approver', {
                                rules: [{ required: true, message: '请输入批准人！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$"  }],
                                initialValue: this.props.values.approver,
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>
                    </Panel>

                    <Panel header="文档修改记录" key={"documentation"} style={customPanelStyle}>
                        <FormItem {...formItemLayout} label={"文档修改记录"}>
                            {getFieldDecorator('doRecord', {
                                rules: [{ required: true, message: '请输入！'}],
                                initialValue: this.props.values.approver,
                            })(
                                <Table disabled={this.props.disable}/>
                            )}
                        </FormItem>
                    </Panel>

                    <Panel header="目录" key={"catalog"} style={customPanelStyle}>
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            <Panel header="1.   引言" key={"1"} style={customPanelStyle2}>
                                <Collapse bordered={false} defaultActiveKey={['1.1'] ['1.2']['1.3'] ['1.4'] }>
                                    <Panel header="1.1 标识" key={"1.1"} style={customPanelStyle}>
                                        <FormItem {...formItemLayout} label="文档标识">
                                            {getFieldDecorator('documentID', {
                                                rules: [{ required: true,message: '请输入文档标识！' }],
                                                initialValue: this.props.values.documentID,
                                            })(
                                                <Input  disabled={this.props.disable} placeholder={"NST-04-JS006-2011-软件测试方案-"}/>
                                            )}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="软件名称">
                                            {getFieldDecorator('softwareName', {
                                                rules: [{ required: true,message: '请输入软件名称！' }],
                                                initialValue: this.props.values.softwareName,
                                            })(
                                                <Input  disabled={this.props.disable}/>
                                            )}
                                        </FormItem>
                                    </Panel>

                                    <Panel header="1.2 系统概述" key={"1.2"} style={customPanelStyle}>

                                    </Panel>

                                    <Panel header="1.3 文档概述" key={"1.3"} style={customPanelStyle}>
                                        <InputGroup compact>
                                            本文档作为“
                                            {getFieldDecorator('projectName', {
                                                rules: [{ required: true, message: '请输入！' }],
                                                initialValue: this.props.values.projectName,
                                            })(
                                                <Input style={InputStyle} disabled={this.props.disable}/>
                                            )}”
                                            测试的基本依据，供本实验室测试相关人员阅读。提供该文档有助于实现以下目标：<br/>
                                            1. 确定现有项目的信息、应测试的软件构件及测试环境；<br/>
                                            2. 确定了基本的测试方法；<br/>
                                            3. 确定所需资源，并对测试的工作量进行估计；<br/>
                                            4. 确定测试工作最终应达到的目的；<br/>
                                            本文档按GB/T 8567-2006规范的要求编写，删减了不涉及的内容。
                                           </InputGroup>
                                    </Panel>

                                    <Panel header="1.4 基线" key={"1.4"} style={customPanelStyle2}>
                                        <FormItem {...formItemLayout} label="本文档的基线为">
                                        {getFieldDecorator('baseline', {
                                            rules: [{ required: true,message: '请输入！' }],
                                            initialValue: this.props.values.baseline,
                                        })(
                                            <Input  disabled={this.props.disable}/>
                                        )}
                                    </FormItem>
                                    </Panel>
                                </Collapse>

                            </Panel>

                            <Panel header="2.   引用文件" key={"2"} style={customPanelStyle2}>

                            </Panel>

                            <Panel header="3.   软件测试环境" key={"3"} style={customPanelStyle2}>
                                <Collapse bordered={false} defaultActiveKey={['3.1'] ['3.2']['3.3'] ['3.4'] }>
                                    <Panel header="3.1 硬件" key={"3.1"} style={customPanelStyle}>
                                        /*TODO 表格*/
                                    </Panel>
                                    <Panel header="3.2 软件环境" key={"3.2"} style={customPanelStyle}>
                                        本次测试中使用到的软件环境如下：/*TODO 表格*/
                                    </Panel>
                                    <Panel header="3.3 参与组织" key={"3.3"} style={customPanelStyle}>

                                    </Panel>
                                    <Panel header="3.4 人员" key={"3.4"} style={customPanelStyle}>
                                        初步定为1名测试人员，1名项目督导，1名项目负责人。各类人员具体职责如下：
                                        /*TODO 表格*/
                                    </Panel>
                                </Collapse>
                            </Panel>

                            <Panel header="4.   计划" key={"4"} style={customPanelStyle2}>
                                本章描述了计划测试的总范围并且描述了本测试计划适用的每个测试，包括对相关文档的审查。
                                <Collapse bordered={false}defaultActiveKey={['4.1'] ['4.2']['4.3'] }>
                                    <Panel header="4.1 总体设计" key={"4.1"} style={customPanelStyle}>
                                        <FormItem {...formItemLayout} label="测试方法">
                                            {getFieldDecorator('testMethods', {
                                                rules: [{ required: true,message: '请输入测试方法！' }],
                                                initialValue: this.props.values.testMethods,
                                            })(
                                                <Input  disabled={this.props.disable}/>
                                            )}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="测试类型">
                                            {getFieldDecorator('testType', {
                                                rules: [{ required: true,message: '请输入测试类型！' }],
                                                initialValue: this.props.values.testType,
                                            })(
                                                <Input  disabled={this.props.disable}/>
                                            )}
                                        </FormItem>
                                        <Collapse bordered={false} defaultActiveKey={['4.1.1'] ['4.1.2']['4.1.3']}>
                                            <Panel header="4.1.1 测试级别" key={"4.1.1"} style={customPanelStyle2}>
                                                <FormItem {...formItemLayout} label="本测试的测试级别为">
                                                    {getFieldDecorator('testLevel', {
                                                        rules: [{ required: true,message: '请输入测试级别！' }],
                                                        initialValue: this.props.values.testLevel,
                                                    })(
                                                        <Input  disabled={this.props.disable}placeholder={"系统级"}/>
                                                    )}
                                                </FormItem>
                                            </Panel>
                                            <Panel header="4.1.2 测试类别" key={"4.1.2"} style={customPanelStyle2}>
                                                <FormItem {...formItemLayout} label="本测试的测试类别包含">
                                                    {getFieldDecorator('testCategory', {
                                                        rules: [{ required: true,message: '请输入测试类别！' }],
                                                        initialValue: this.props.values.testCategory,
                                                    })(
                                                        <Input  disabled={this.props.disable}/>
                                                    )}
                                                </FormItem>
                                            </Panel>
                                            <Panel header="4.1.3 一般测试条件" key={"4.1.3"} style={customPanelStyle2}>
                                                测试应满足时序逻辑，测试使用的数据要符合实际情况，测试应当完全覆盖所有需求。
                                            </Panel>
                                        </Collapse>
                                    </Panel>
                                    <Panel header="4.2 计划执行的测试" key={"4.2"} style={customPanelStyle}>
                                        <FormItem {...formItemLayout} label={"a.测试对象"}>
                                            {getFieldDecorator('testObject', {
                                                rules: [{ required: true, message: '请输入测试对象！' }],
                                                initialValue: this.props.values.testObject,
                                            })(
                                                <Input disabled={this.props.disable}/>
                                            )}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label={" b.测试级别"}>
                                            {getFieldDecorator('testLevel', {
                                                rules: [{ required: true, message: '请输入测试级别！' }],
                                                initialValue: this.props.values.testLevel,
                                            })(
                                                <Input disabled={this.props.disable}placeholder={"系统级"}/>
                                            )}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label={"c.测试类型"}>
                                            {getFieldDecorator('testType', {
                                                rules: [{ required: true, message: '请输入测试类型！' }],
                                                initialValue: this.props.values.testType,
                                            })(
                                                <Input disabled={this.props.disable}/>
                                            )}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label={"测试方法"}>
                                            {getFieldDecorator('testMethods', {
                                                rules: [{ required: true, message: '请输入测试方法！'}],
                                                initialValue: this.props.values.testMethods,
                                            })(
                                                <Input disabled={this.props.disable} placeholder={"人工设计测试用例，人工执行测试，人工分析测试结果"}/>
                                            )}
                                        </FormItem>
                                    </Panel>
                                    <Panel header="4.3 测试用例" key={"4.3"} style={customPanelStyle}>
                                        <FormItem {...formItemLayout}>
                                            <InputGroup compact>
                                                本次测试共设计了
                                                {getFieldDecorator('caseNum', {
                                                    rules: [{ required: true, message: '请输入测试用例数目！' }],
                                                    initialValue: this.props.values.caseNum,
                                                })(
                                                    <Input style={InputStyle} disabled={this.props.disable} pattern="^[0-9]+$"/>
                                                )}个测试用例，覆盖了测试类别中指明的各个方面。具体用例见《测试用例》。
                                            </InputGroup>
                                        </FormItem>
                                    </Panel>
                                </Collapse>
                            </Panel>

                            <Panel header="5.   测试进度表" key={"5"} style={customPanelStyle2}>
                                <FormItem {...formItemLayout}>
                                    <InputGroup compact>
                                        此项目主要分为：业务测试和文档审查两部分的工作。两部分的工作可以并行完成。测试方为完成本方案所述的测试所需时间大约为
                                        {getFieldDecorator('costDay', {
                                            rules: [{ required: true, message: '请输入所需时间！' }],
                                            initialValue: this.props.values.costDay,
                                        })(
                                            <Input style={InputStyle} disabled={this.props.disable} pattern="^[0-9]+$"/>
                                        )}个工作日，如测试需求产生变更会导致测试时间的变化。<br/>
                                        下表大致估计了本次测试各个阶段所需工作量及起止时间。
                                    </InputGroup>
                                </FormItem>

                                /*TODO 表格*/
                            </Panel>

                            <Panel header="6.   需求的可追踪性" key={"6"} style={customPanelStyle2}>
                                设计的测试用例的ID中包含其对应的相关规约说明中对应条目的名称，每个测试用例都是可追踪的。
                            </Panel>
                        </Collapse>
                    </Panel>
                </Collapse>




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
export default Form.create()(TestPlanContentComponent);
