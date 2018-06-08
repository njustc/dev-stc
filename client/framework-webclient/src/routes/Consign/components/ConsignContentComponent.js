import React, {Component, PropTypes} from 'react';
import {Modal, Row, Col, Card, Tabs, Select, Button, Layout, Form, Input,Radio,Checkbox,Icon,DatePicker,Collapse,message} from 'antd';

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

class ConsignContentComponent extends Component {
    constructor(props) {
        super(props);
    };

    state = { visible: false, };

    static defaultProps = {
        values: {},
        disable:false,
        buttons: [],
        //buttonDisabled:false,
    };

    static propTypes = {
        consignData: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        //buttonDisabled: PropTypes.bool.isRequired,
        form: PropTypes.object.isRequired,
    };

    componentWillMount() {
        //     this.curID = this.props.curKey;
        //     // console.log(this.curID);
        this.props.getValues(this.props.consignData.id);
        //     // console.log(this.values);
    };

    // componentDidMount() {
    //     this.values = this.props.getValues(this.curID);
    // };

    onClick = (buttonIndex) => () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.buttons[buttonIndex].onClick(this.props.consignData, JSON.stringify(values));
        //     }
        // });
        const {buttons, form} = this.props;
        console.log(buttonIndex);
        if( buttonIndex === 2 ) {
            this.setState({
                visible: true,
            });
        }
        else {
            buttons[buttonIndex].onClick(this.props.consignData, JSON.stringify(form.getFieldsValue()));
        }
        /*switch (buttons[buttonIndex].content) {
            case '保存': message.success('保存成功');break;
            case '提交': message.success('提交成功');break;
            case '通过': message.success('委托已通过');break;
            //case 3: message.success('提交成功');break;
            default:break;
        }*/
    };

    onReviewPass = (value) =>   {

    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 },
        };

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

                <FormItem >
                    <h1 style={{textAlign:'center'}}>软件项目委托测试申请书</h1>
                </FormItem>


                <FormItem>请用✓选择：○——单选； ◻——多选。</FormItem>

                <Collapse bordered={false} defaultActiveKey={['page1']}>
                    <Panel header="This is page 1" key={"page1"} style={customPanelStyle}>
                        <FormItem {...formItemLayout} label="测试类型">
                            {getFieldDecorator('testType', {
                                rules: [{ required: true, message: '请选择至少一项测试类型!'}],
                                initialValue: this.props.values.testType,
                            })(
                                <Select mode="multiple" style={{ width: '100%' }} disabled={this.props.disable}
                                        placeholder="请选择" onChange={handleChange}>
                                    <Option value={"软件确认测试"}>软件确认测试</Option>
                                    <Option value={"成果/技术鉴定测试"}>成果/技术鉴定测试</Option>
                                    <Option value={"专项资金验收测试"}>专项资金验收测试</Option>
                                    <Option value={"其他"}>其他</Option>
                                </Select>
                            )}
                        </FormItem>


                        <FormItem {...formItemLayout} label="请输入软件名称">
                            {getFieldDecorator('softwareName', {
                                rules: [{ required: true, message: '请输入软件名称！' }],
                                initialValue: this.props.values.softwareName,
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>


                        <FormItem {...formItemLayout} label={"版本号"}>
                            {getFieldDecorator('version', {
                                rules: [{ required: true, message: '请正确输入版本号！',pattern:"^[a-zA-Z0-9/.]+$"}],
                                initialValue: this.props.values.version,
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        {/*todo功能表*/}
                        <FormItem {...formItemLayout} label={"委托单位(中文)"}>
                            {getFieldDecorator('consignUnitC', {
                                rules: [{ required: true, message: '请正确输入委托单位(中文)！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                //initialValue: this.props.values.consignUnitC,
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>


                        <FormItem {...formItemLayout} label={"委托单位(英文)"}>
                            {getFieldDecorator('consignUnitE', {
                                rules: [{ required: true, message: '请正确输入委托单位(英文)！' ,pattern:"^[A-Za-z]+$"}],
                                //initialValue: this.props.values.consignUnitE,
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>


                        <FormItem {...formItemLayout} label={"开发单位"}>
                            {getFieldDecorator('developUnit', {
                                rules: [{ required: true, message: '请正确输入开发单位！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                                initialValue: this.props.values.developUnit,
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>


                        <FormItem {...formItemLayout} label={"单位性质"}>
                            {getFieldDecorator('unitProp', {
                                rules: [{ required: true, message: '请选择！'}],
                                initialValue: this.props.values.unitProp,
                            })(
                                <Select  style={{ width: 200 }} placeholder="请选择"
                                         onChange={handleChange} disabled={this.props.disable}>
                                    <Option value={"内资企业"}>内资企业</Option>
                                    <Option value={"外(合)资企业"}>外(合)资企业</Option>
                                    <Option value={"港澳台(合)资企业"}>港澳台(合)资企业</Option>
                                    <Option value={"科研院校"}>科研院校</Option>
                                    <Option value={"政府事业团体"}>政府事业团体</Option>
                                    <Option value={"其它"}>其它</Option>
                                </Select>
                            )}
                        </FormItem>


                        <FormItem {...formItemLayout} label={"软件用户对象描述"}>
                            {getFieldDecorator('objDesc', {
                                rules: [{ required: true, message: '请输入！' }],
                                initialValue: this.props.values.objDesc,
                            })(
                                <TextArea disabled={this.props.disable}
                                          rows={"4"}  placeholder="请输入软件用户对象描述"/>
                            )}
                        </FormItem>


                        <FormItem {...formItemLayout} label={"主要功能及用途简介"}>
                            {getFieldDecorator('funcDesc', {
                                rules: [{ required: true, message: '请输入主要功能及用途简介（限200字）！' ,max:200 }],
                                //initialValue: this.props.values.funcDesc,
                            })(
                                <TextArea disabled={this.props.disable}
                                          rows={"4"} placeholder="限200字"/>
                            )}
                        </FormItem>


                        <FormItem {...formItemLayout} label={"测试依据"}>
                            {getFieldDecorator('testBasis', {
                                rules: [{ required: true, message: '请选择至少一项测试依据！' }],
                                //initialValue: this.props.values.testBasis,
                            })(
                                <Select mode="multiple" style={{ width: '100%' }} disabled={this.props.disable}
                                        placeholder="请选择" onChange={handleChange}>
                                    <Option value={"GB/T 25000.51-2016"}>GB/T 25000.51-2016</Option>
                                    <Option value={"GB/T 25000.10-2016"}>GB/T 25000.10-2016</Option>
                                    <Option value={"GB/T 28452-2012"}>GB/T 28452-2012</Option>
                                    <Option value={"GB/T 30961-2014"}>GB/T 30961-2014</Option>
                                    <Option value={"NST-03-WI12-2011"}>NST-03-WI12-2011</Option>
                                    <Option value={"ST-03-WI13-2011"}>ST-03-WI13-2011</Option>
                                    <Option value={"NST-03-WI22-2014"}>NST-03-WI22-2014</Option>
                                    <Option value={"其他"}>其他</Option>
                                </Select>
                            )}
                        </FormItem>


                        <FormItem {...formItemLayout} label={"需要测试的技术指标"}>
                            {getFieldDecorator('testIndicator', {
                                rules: [{ required: true, message: '请选择至少一项技术指标！' }],
                                //initialValue: this.props.values.testIndicator,
                            })(
                                <Select mode="multiple" style={{ width: '100%' }} disabled={this.props.disable}
                                        placeholder="请选择" onChange={handleChange}>
                                    <Option value={"功能性"}>功能性</Option>
                                    <Option value={"可靠性"}>可靠性</Option>
                                    <Option value={"易用性"}>易用性</Option>
                                    <Option value={"效率"}>效率</Option>
                                    <Option value={"可维护性"}>可维护性</Option>
                                    <Option value={"可移植性"}>可移植性</Option>
                                    <Option value={"代码覆盖度"}>代码覆盖度</Option>
                                    <Option value={"缺陷检测率"}>缺陷检测率</Option>
                                    <Option value={"代码风格符合度"}>代码风格符合度</Option>
                                    <Option value={"代码不符合项检测率"}>代码不符合项检测率</Option>
                                    <Option value={"产品说明要求"}>产品说明要求</Option>
                                    <Option value={"用户文档集要求"}>用户文档集要求</Option>
                                    <Option value={"其他"}>其他</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Panel>

                    <Panel header="This is page2" key="page2" style={customPanelStyle2}>
                        {/*以上第一部分*//*如何设定至少一种*/}
                        <FormItem{...formItemLayout} label={"软件规模(至少一种)"}>
                            <FormItem offset={1}>
                                {getFieldDecorator('softwareScale.funcNum',
                                    {rules: [{ required: false, message: '请输入功能数！',pattern:"^[0-9]+$"}],
                                        //initialValue: this.props.values.softwareScale.funcNum,
                                    })(
                                    <Input disabled={this.props.disable}
                                           addonBefore={"功能数"}  placeholder={"到最后一级菜单"}/>
                                )}
                            </FormItem>

                            <FormItem offset={1}>
                                {getFieldDecorator('softwareScale.funcPoint',
                                    {rules: [{ required: false, message: '请输入功能点数!',pattern:"^[0-9]+$"}],
                                        //initialValue: this.props.values.softwareScale.funcPoint,
                                    })(
                                    <Input disabled={this.props.disable}
                                           addonBefore={"功能点数"} />
                                )}
                            </FormItem>

                            <FormItem offset={1}>
                                {getFieldDecorator('softwareScale.codeLine',
                                    {rules: [{ required: false, message: '请输入代码行数！',pattern:"^[0-9]+$"}],
                                        //initialValue: this.props.values.softwareScale.codeLine,
                                    })(
                                    <Input disabled={this.props.disable}
                                           addonBefore={"代码行数"}  placeholder={"不包括注释行和空行"}/>
                                )}
                            </FormItem>
                        </FormItem>




                        <FormItem {...formItemLayout} label="软件类型">
                            {getFieldDecorator('softwareType', {
                                rules: [{ required: true, message: '请选择！' }],
                                //initialValue: this.props.values.softwareType,
                            })(
                                <Select style={{ width: 200 }}
                                        onChange={handleChange} disabled={this.props.disable}>
                                    <OptGroup label={"系统软件"}>
                                        <Option value={"操作系统"}>操作系统</Option>
                                        <Option value={"中文处理系统"}>中文处理系统</Option>
                                        <Option value={"嵌入式操作系统"}>嵌入式操作系统</Option>
                                        <Option value={"系统软件-其它"}>其它</Option>
                                    </OptGroup>

                                    <OptGroup label={"支持软件"}>
                                        <Option value={"程序设计语言"}>程序设计语言</Option>
                                        <Option value={"数据库系统设计"}>数据库系统设计</Option>
                                        <Option value={"工具软件"}>工具软件</Option>
                                        <Option value={"网络通信软件"}>网络通信软件</Option>
                                        <Option value={"中间件"}>中间件</Option>
                                        <Option value={"支持软件-其他"}>其他</Option>
                                    </OptGroup>

                                    <OptGroup label={"应用软件"}>
                                        <Option value={"行业管理软件"}>行业管理软件</Option>
                                        <Option value={"模式识别软件"}>模式识别软件</Option>
                                        <Option value={"图形图像软件"}>图形图像软件</Option>
                                        <Option value={"控制软件"}>控制软件</Option>
                                        <Option value={"网络应用软件"}>网络应用软件</Option>
                                        <Option value={"信息管理软件"}>信息管理软件</Option>
                                        <Option value={"数据库管理应用软件"}>数据库管理应用软件</Option>
                                        <Option value={"安全与保密软件"}>安全与保密软件</Option>
                                        <Option value={"嵌入式应用软件"}>嵌入式应用软件</Option>
                                        <Option value={"教育软件"}>教育软件</Option>
                                        <Option value={"游戏软件"}>游戏软件</Option>
                                        <Option value={"应用软件-其他"}>其他</Option>
                                    </OptGroup>

                                    <OptGroup label={"其他"}>
                                        <Option value={"其他-其他"}>其他</Option>
                                    </OptGroup>
                                </Select>
                            )}
                        </FormItem>
                    </Panel>

                    <Panel header="运行环境" key="operateEnvironment" style={customPanelStyle}>
                        <Collapse bordered={false}>
                            <Panel  header="客户端" key="client" style={customPanelStyle2}>
                                <FormItem{...formItemLayout} label={"操作系统"}>
                                    {getFieldDecorator('operateEnvironment.client.os', {
                                        rules: [{ required: true, message: '请填写操作系统及其版本！' }],
                                       // initialValue: this.props.values.operateEnvironment.client.os,
                                    })(
                                        <Checkbox.Group disabled={this.props.disable}>
                                            <Checkbox value={"Windows"}/>Windows
                                            {/*Todo 此处如何加入版本框*/}
                                            <Checkbox  value={"Linux"}/>Linux
                                            <Checkbox value={"其它"}/>其它
                                        </Checkbox.Group>
                                    )}
                                </FormItem>


                                <FormItem {...formItemLayout} label={"内存要求"}>
                                    {getFieldDecorator('operateEnvironment.client.memoryReq',
                                        {rules: [{ required: true, message: '请输入内存要求！',pattern:"^[0-9/.]+$"}],
                                            //initialValue: this.props.values.operateEnvironment.client.memoryReq,
                                        })(
                                        <Input disabled={this.props.disable} addonAfter={"MB"} />
                                    )}
                                </FormItem>

                                <FormItem {...formItemLayout} label={"硬盘要求"}>
                                    {getFieldDecorator('operateEnvironment.client.hardDiskReq',
                                        {rules: [{ required: true, message: '请输入硬盘要求！',pattern:"^[0-9/.]+$"}],
                                            //initialValue: this.props.values.operateEnvironment.client.hardDiskReq,
                                        })(
                                        <Input disabled={this.props.disable} addonAfter={"MB"} />
                                    )}
                                </FormItem>
                            </Panel>

                            <Panel header="服务器端" key={"service"} style={customPanelStyle}>
                                <Collapse bordered={false}>
                                    <Panel  header="硬件" key="hardware"style={customPanelStyle2}>
                                        <FormItem{...formItemLayout} label={"构架"}>
                                            {getFieldDecorator('operateEnvironment.service.hardware.arch', {
                                                rules: [{ required: true, message: '请选择！' }],
                                             //   initialValue: this.props.values.operateEnvironment.service.hardware.arch,
                                            })(
                                                <Select mode="multiple" style={{ width: '100%' }} disabled={this.props.disable}
                                                        placeholder="请选择" onChange={handleChange}>
                                                    <Option value={"PC服务器"}>PC服务器</Option>
                                                    <Option value={"UNIX／Linux服务器"}>UNIX／Linux服务器</Option>
                                                    <Option value={"其他"}>其他</Option>
                                                </Select>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label={"内存要求"}>
                                            {getFieldDecorator('operateEnvironment.service.hardware.memoryReq',
                                                {rules: [{ required: true, message: '请输入内存要求！',pattern:"^[0-9/.]+$"}],
                                                    //initialValue: this.props.values.operateEnvironment.service.hardware.memoryReq,
                                                })(
                                                <Input disabled={this.props.disable} addonAfter={"MB"} />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label={"硬盘要求"}>
                                            {getFieldDecorator('operateEnvironment.service.hardware.hardDiskReq',
                                                {rules: [{ required: true, message: '请输入硬盘要求！', pattern:"^[0-9/.]+$"}],
                                                    //initialValue: this.props.values.operateEnvironment.service.hardware.hardDiskReq,
                                                })(
                                                <Input disabled={this.props.disable} addonAfter={"MB"}/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label={"其他要求"}>
                                            {getFieldDecorator('operateEnvironment.service.hardware.otherReq',
                                                {rules: [{ required: true, message: '请输入其他要求！'}],
                                                    //initialValue: this.props.values.operateEnvironment.service.hardware.otherReq,
                                                })(
                                                <Input disabled={this.props.disable}/>
                                            )}
                                        </FormItem>
                                    </Panel>

                                    <Panel  header="软件" key="software" style={customPanelStyle}>
                                        <FormItem {...formItemLayout} label={"操作系统"}>
                                            {getFieldDecorator('operateEnvironment.service.software.os',
                                                {rules: [{ required: true, message: '请输入操作系统！'}],
                                                 //   initialValue: this.props.values.operateEnvironment.service.software.os,
                                                })(
                                                <Input disabled={this.props.disable}/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label={"版本"}>
                                            {getFieldDecorator('operateEnvironment.service.soft.version', {
                                                rules: [{ required: true, message: '请输入版本！',pattern:"^[a-zA-Z0-9/.]+$"}],
                                                //initialValue: this.props.values.operateEnvironment.service.soft.version,
                                            })(
                                                <Input disabled={this.props.disable}/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label={"编程语言"}>
                                            {getFieldDecorator('operateEnvironment.service.soft.language', {
                                                rules: [{ required: true, message: '请输入编程语言！'}],
                                                //initialValue: this.props.values.operateEnvironment.service.soft.language,
                                            })(
                                                <Input disabled={this.props.disable}/>
                                            )}
                                        </FormItem>

                                        <FormItem{...formItemLayout} label={"构架"}>
                                            {getFieldDecorator('operateEnvironment.service.soft.arch', {
                                                rules: [{ required: true, message: '请选择构架！' }],
                                                //initialValue: this.props.values.operateEnvironment.service.soft.arch,
                                            })(
                                                <Select mode="multiple" style={{ width: '100%' }} disabled={this.props.disable}
                                                        placeholder="请选择" onChange={handleChange}>
                                                    <Option value={"C/S"}>C/S</Option>
                                                    <Option value={"B/S"}>B/S</Option>
                                                    <Option value={"其他"}>其他</Option>
                                                </Select>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label={"数据库"}>
                                            {getFieldDecorator('operateEnvironment.service.soft.dateBase', {
                                                rules: [{ required: true, message: '请输入数据库！'}],
                                                //initialValue: this.props.values.operateEnvironment.service.soft.dateBase,
                                            })(
                                                <Input disabled={this.props.disable}/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label={"中间件"}>
                                            {getFieldDecorator('operateEnvironment.service.soft.midWare', {
                                                rules: [{ required: true, message: '请输入中间件！'}],
                                                //initialValue: this.props.values.operateEnvironment.service.soft.midWare,
                                            })(
                                                <Input disabled={this.props.disable}/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label={"其他支撑软件"}>
                                            {getFieldDecorator('operateEnvironment.service.soft.otherSupp', {
                                                rules: [{ required: true, message: '请输入其他支撑软件！'}],
                                                //initialValue: this.props.values.operateEnvironment.service.soft.otherSupp,
                                            })(
                                                <Input disabled={this.props.disable}/>
                                            )}
                                        </FormItem>
                                    </Panel>
                                </Collapse>
                            </Panel>

                            <Panel header={"网络环境"} key={"netEnvironment"} style={customPanelStyle2}>
                                <FormItem {...formItemLayout} label={"网络环境"}>
                                    {getFieldDecorator('operateEnvironment.netEnvironment', {
                                        rules: [{ required: true, message: '请输入网络环境！'}],
                                        //initialValue: this.props.values.operateEnvironment.netEnvironment,
                                    })(
                                        <Input disabled={this.props.disable}/>
                                    )}
                                </FormItem>
                            </Panel>


                        </Collapse>


                    </Panel>


                    <Panel header="样品和数量" key="sampleQuantity" style={customPanelStyle2}>
                        <FormItem {...formItemLayout} label={"软件介质"}>
                            <FormItem>
                                {getFieldDecorator('sampleQuantity.softwareMedia.cd', {
                                    rules: [{pattern:"^[0-9/]+$", message: '请输入光盘数！'}],
                                    //initialValue: this.props.values.sampleQuantity.softwareMedia.cd,
                                })(
                                    <Input addonBefore={"光盘数量"} disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('sampleQuantity.softwareMedia.U', {
                                    rules: [{pattern:"^[0-9/]+$", message: '请输入U盘数！'}],
                                    //initialValue: this.props.values.sampleQuantity.softwareMedia.U,
                                })(
                                    <Input addonBefore={"U盘数量"} disabled={this.props.disable}/>
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('sampleQuantity.softwareMedia.other', {
                                    rules: [{pattern:"^[0-9/]+$", message: '请输入其他数量！'}],
                                    //initialValue: this.props.values.sampleQuantity.softwareMedia.other,
                                })(
                                    <Input addonBefore={"其他数量"} disabled={this.props.disable}/>
                                )}
                            </FormItem>

                        </FormItem>

                        <FormItem {...formItemLayout} label={"文档资料"}>
                            {getFieldDecorator('sampleQuantity.Documentation', {
                                rules: [{ required: true, message: '请输入文档资料！'}],
                                //initialValue: this.props.values.sampleQuantity.Documentation,
                            })(
                                <Input disabled={this.props.disable}/>
                            )}

                        </FormItem>

                        <FormItem {...formItemLayout} label={"注"}>
                            <br/>1、需求文档（例如：项目计划任务书、需求分析报告、合同等）（验收、鉴定测试必须）
                            <br/>2、用户文档（例如：用户手册、用户指南等）（必须）
                            <br/>3、操作文档（例如：操作员手册、安装手册、诊断手册、支持手册等）（验收项目必须）
                        </FormItem>

                        <FormItem {...formItemLayout}   colon={false} label={"提交的样品（硬拷贝资料、"}>

                        </FormItem>
                        <FormItem {...formItemLayout} label={"硬件）五年保存期满"}>
                            {getFieldDecorator('sampleQuantity.toHandle', {
                                rules: [{ required: true, message: '请选择！'}],
                                //initialValue: this.props.values.sampleQuantity.toHandle,
                            })(
                                <Select style={{ width: 200 }} disabled={this.props.disable}
                                        placeholder="请选择" onChange={handleChange}>
                                    <Option value={"由本实验室销毁"}>由本实验室销毁</Option>
                                    <Option value={"退还给我们"}>退还给我们</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Panel>

                    <Panel header="希望测试完成的时间" key="wishComTime" style={customPanelStyle}>
                        <FormItem {...formItemLayout} label={"希望测试完成的时间"}>
                            {getFieldDecorator('sampleQuantity.comTimeWish', {
                                rules: [{ required: true, message: '请正确输入时间！',
                                    //initialValue: this.props.values.sampleQuantity.comTimeWish,
                                }],
                            })(
                                <DatePicker showTime format="YYYY-MM-DD"/>
                            )}
                        </FormItem>
                    </Panel>

                    <Panel header="this is page 3" key="page3" style={customPanelStyle2}>
                        {/*以下第三部分*/}
                        <FormItem
                            label="委托单位信息"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitMessage', {
                                rules: [{ required: true, message: '请输入委托单位信息！'}],
                                //initialValue: this.props.values.consignUnitMessage,
                            })(
                                <span className="ant-form-text"></span>
                            )}

                        </FormItem>

                        <FormItem
                            label="电话"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitTelephone', {
                                rules: [{ required: true, message: '请输入委托单位信息！'}],
                                //initialValue: this.props.values.consignUnitTelephone,
                            })(
                                <Input placeholder="请输入电话号码" />
                            )}
                        </FormItem>

                        <FormItem
                            label="传真"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitFax', {
                                rules: [{ required: true, message: '请输入传真号！'}],
                                //initialValue: this.props.values.consignUnitFax,
                            })(
                                <Input placeholder="请输入传真号" />
                            )}

                        </FormItem>

                        <FormItem
                            label="地址"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitAddress', {
                                rules: [{ required: true, message: '请输入地址！'}],
                                //initialValue: this.props.values.consignUnitAddress,
                            })(
                                <Input placeholder="请输入地址" />
                            )}
                        </FormItem>

                        <FormItem
                            label="邮编"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitEmailNumber', {
                                rules: [{ required: true, message: '请输入邮编！'}],
                                //initialValue: this.props.values.consignUnitEmailNumber,
                            })(
                                <Input placeholder="请输入邮编" />
                            )}
                        </FormItem>

                        <FormItem
                            label="联系人"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitPeople', {
                                rules: [{ required: true, message: '请输入联系人！'}],
                                //initialValue: this.props.values.consignUnitPeople,
                            })(
                                <Input placeholder="请输入联系人" />
                            )}
                        </FormItem>

                        <FormItem
                            label="手机"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitCellPhoneNumber', {
                                rules: [{ required: true, message: '请输入手机号码！'}],
                                //initialValue: this.props.values.cconsignUnitCellPhoneNumber,
                            })(
                                <Input placeholder="请输入手机号" />
                            )}
                        </FormItem>

                        <FormItem
                            label="E-mail"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitEmail', {
                                rules: [{ required: true, message: '请输入E-mail！'}],
                                //initialValue: this.props.values.consignUnitEmail,
                            })(
                                <Input placeholder="请输入邮箱地址" />
                            )}
                        </FormItem>

                        <FormItem
                            label="网址"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitUrl', {
                                rules: [{ required: true, message: '请输入网址！'}],
                                //initialValue: this.props.values.consignUnitUrl,
                            })(
                                <Input placeholder="请输入网址" />
                            )}
                        </FormItem>

                        <FormItem
                            label="国家重点实验室联系方式"
                            {...formItemLayout}
                        >
                            <span className="ant-form-text"></span>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="单位地址"
                        >
                            <span className="ant-form-text">南京市栖霞区仙林大道163号</span>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="邮政编码"
                        >
                            <span className="ant-form-text">210046</span>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="电话"
                        >
                            <span className="ant-form-text">86-25-89683467, 86-25-89683670</span>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="传真"
                        >
                            <span className="ant-form-text">86-25-89686596</span>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="网址"
                        >
                      <span className="ant-form-text">http://keysoftlab.nju.edu.cn
                      </span>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Email"
                        >
                      <span className="ant-form-text">keysoftlab@nju.edu.cn
                      </span>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="密级"
                        >
                            {getFieldDecorator('securityLevel', {
                                rules: [{ required: true, message: '请选择！'}],
                                //initialValue: this.props.values.securityLevel,
                            })(
                                <RadioGroup name={"密级:"} disabled={this.props.disable}>
                                    <Radio value="a">无密级</Radio>
                                    <Radio value="b">秘密</Radio>
                                    <Radio value="c">机密</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="查杀病毒"
                        >
                            {getFieldDecorator('killingVirus', {
                                rules: [{ required: true, message: '请选择！'}],
                                //initialValue: this.props.values.killingVirus,
                            })(
                                <RadioGroup name={"查杀病毒:"} disabled={this.props.disable}>
                                    <Radio value="a">已完成</Radio>
                                    <Radio value="b">无法完成</Radio>
                                    <Input placeholder="所用查杀工具" />
                                </RadioGroup>

                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="材料检查："
                        >
                      <span className="ant-form-text">
                      </span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="需求文档："
                        >
                            {getFieldDecorator('requirementsDocument', {
                                rules: [{ required: true, message: '请选择至少一项需求文档！'}],
                               // initialValue: this.props.values.requirementsDocument,
                            })(
                                <Checkbox.Group disabled={this.props.disable}>
                                    <Checkbox value={"项目计划任务书"}/>项目计划任务书
                                    <Checkbox value={"需求分析报告"}/>需求分析报告
                                    <Checkbox value={"合同"}/>合同
                                </Checkbox.Group>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="用户文档："
                        >
                            {getFieldDecorator('userDocument', {
                                rules: [{ required: true, message: '请选择至少一项用户文档！'}],
                               // initialValue: this.props.values.userDocument,
                            })(
                                <Checkbox.Group disabled={this.props.disable}>
                                    <Checkbox value={"用户手册"}/>用户手册
                                    <Checkbox value={"用户指南"}/>用户指南
                                </Checkbox.Group>
                            )}
                        </FormItem>

                        <FormItem

                            {...formItemLayout}
                            label="操作文档："
                        >
                            {getFieldDecorator('oprationDocument', {
                                rules: [{ required: true, message: '请选择至少一项操作文档！'}],
                               // initialValue: this.props.values.oprationDocument,
                            })(
                                <Checkbox.Group disabled={this.props.disable}>
                                    <Checkbox value={"操作员手册"}/>操作员手册
                                    <Checkbox value={"安装手册"}/>安装手册
                                    <Checkbox value={"诊断手册"}/>诊断手册
                                    <Checkbox value={"支持手册"}/>支持手册
                                </Checkbox.Group>
                            )}
                        </FormItem>

                        <FormItem
                            label="其他"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('elseA', {
                                rules: [{ required: true, message: '请输入！'}],
                               // initialValue: this.props.values.elseA,
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="确认意见："
                        >
                            {getFieldDecorator('confirmationE', {
                                rules: [{ required: true, message: '请选择确认意见！'}],
                                //initialValue: this.props.values.confirmationE,
                            })(
                                <RadioGroup name={"确认意见:"} disabled={this.props.disable}>
                                    <Radio value="a">测试所需材料不全，未达到受理条件。</Radio>
                                    <Radio value="b">属依据国家标准或自编非标规范进行的常规检测，有资质、能力和资源满足委托方要求。</Radio>
                                    <Radio value="c">无国家标准和规范依据，或实验室缺乏检测设备和工具，无法完成检测。</Radio>
                                    <Radio value="d">超出实验室能力和资质范围，无法完成检测。</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="受理意见："
                        >
                            {getFieldDecorator('admissiBility', {
                                rules: [{ required: true, message: '请选择受理意见！'}],
                               // initialValue: this.props.values.admissiBility,
                            })(
                                <RadioGroup name={"受理意见:"} disabled={this.props.disable}>
                                    <Radio value="a">受理-进入项目立项和合同评审流程。</Radio>
                                    <Radio value="b">不受理</Radio>
                                    <Radio value="c">进一步联系</Radio>
                                </RadioGroup>

                            )}
                        </FormItem>
                        <FormItem label="测试项目编号"
                                  {...formItemLayout}
                        >
                            {getFieldDecorator('testingNumber', {
                                rules: [{ required: true, message: '请输入测试项目编号！'}],
                                //initialValue: this.props.values.testingNumber,
                            })(
                                <Input placeholder="请输入测试项目编号" />
                            )}
                        </FormItem>
                        <FormItem
                            label="备注"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('remarksE', {
                                rules: [{ required: true, message: '请输入备注！'}],
                             //   initialValue: this.props.values.remarksE,
                            })(
                                <TextArea rows={4} />
                            )}
                        </FormItem>

                        <FormItem
                            label="受理人（签字）"
                            {...formItemLayout}
                        >

                            <span className="ant-form-text"></span>
                        </FormItem>

                        <FormItem
                            label="日期"
                            {...formItemLayout}
                        >
                            <span className="ant-form-text"></span>
                        </FormItem>

                        <FormItem
                            label="委托人填写"
                            {...formItemLayout}
                        >
                            <TextArea rows={4} />
                        </FormItem>

                        <FormItem
                            label="委托人（签字）"
                            {...formItemLayout}
                        >
                            <span className="ant-form-text"></span>

                        </FormItem>

                        <FormItem
                            label="日期"
                            {...formItemLayout}
                        >
                            <span className="ant-form-text"></span>
                        </FormItem>
                    </Panel>
                </Collapse>

                {/* footer buttons */}        {/*console.log(buttonsDisabled)*/}
                <FormItem style={{textAlign:'center'}}>
                    {this.props.buttons.map((button, index) =>
                        <Button
                            //disabled={this.props.buttonDisabled}
                            onClick={this.onClick(index)}
                            key={button.content}>
                            {button.content}
                        </Button>)}
                </FormItem>
                <FormItem style={{textAlign:'center'}}>
                    <Modal
                        title="Basic Modal"
                        visible={this.PageState.visible}
                        onOk={ value => this.handleOk(value) }
                        onCancel={this.handleCancel}
                    >

                    </Modal>
                </FormItem>
            </Form>


        );
    }
}
export default Form.create()(ConsignContentComponent);