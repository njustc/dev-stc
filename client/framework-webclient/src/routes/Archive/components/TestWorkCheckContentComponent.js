import React, {Component, PropTypes} from 'react';
import {Row, Col, Card, Tabs, Select, Button, Layout, Form, Input,Radio,Table, Checkbox,Icon,DatePicker, Switch, Collapse} from 'antd';

const Panel = Collapse.Panel;
const FormItem=Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

function handleChange(value) {
    console.log(`selected ${value}`);
}

class TestWorkCheckContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        values: {},
        disable:false,
        buttons: [],
    };

    static propTypes = {
        testWorkCheckData: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
    };

    componentWillMount() {
    //     this.curID = this.props.curKey;
    //     // console.log(this.curID);
         this.props.getValues(this.props.testWorkCheckData.id);
    //     // console.log(this.values);
    };

    onClick = (buttonIndex) => () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.buttons[buttonIndex].onClick(this.props.consignData, JSON.stringify(values));
        //     }
        // });
        const {buttons, form} = this.props;
        buttons[buttonIndex].onClick(this.props.testWorkCheckData, JSON.stringify(form.getFieldsValue()));
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const rowStyle = {
            marginBottom:'10pt'
        };

        const tipStyle = {
            color: 'red',
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

                <FormItem {...formItemLayout}>
                    <h1>软件项目委托测试工作检查表</h1>
                </FormItem>

                <FormItem {...formItemLayout} label="软件名称">
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

                <FormItem {...formItemLayout} label={"委托单位"}>
                    {getFieldDecorator('consignUnit', {
                        rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"主测人"}>
                    {getFieldDecorator('masterTestPerson', {
                        rules: [{ required: true, message: '请正确输入主测人！' ,pattern:"^[\u4E00-\u9FA5A-Za-z]+$"}],
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"起始时间"}>
                    {getFieldDecorator('startingDate', {
                        rules: [{ required: true, message: '请正确输入时间！',
                        }],
                    })(
                        <DatePicker showTime format="YYYY-MM-DD"/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"预计完成时间"}>
                    {getFieldDecorator('estimatedFinishTime', {
                        rules: [{ required: true, message: '请正确输入时间！',
                        }],
                    })(
                        <DatePicker showTime format="YYYY-MM-DD"/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"实际完成时间"}>
                    {getFieldDecorator('actualFinishTime', {
                        rules: [{ required: true, message: '请正确输入时间！',
                        }],
                    })(
                        <DatePicker showTime format="YYYY-MM-DD"/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout}>
                    <h3>可预见问题及注意事项</h3>
                    <p style ={tipStyle}>注：请在已确认的条目前打勾。</p>
                </FormItem>

                <Collapse bordered={false} defaultActiveKey={['process1']}>
                    <Panel header="一、前期指导工作" key="process1" style={customPanelStyle}>
                        <Collapse bordered={false} defaultActiveKey={['process11', 'process12', 'process13']}>
                            <Panel  header="2. test" key="process11" style={customPanelStyle}>
                                <Row style={rowStyle} gutter={32}>
                                    <Col span={16}>
                                        1.2 建议委托单位阅读《软件项目委托测试流程图和工作介绍》，了解申报流程。
                                    </Col>
                                    <Col span={8}>
                                        <RadioGroup>
                                            <Radio value={1}>是</Radio><Radio value={2}>否</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                                <Row style={rowStyle} gutter={32}>
                                    <Col span={16}>
                                        1.3 根据《软件项目委托测试提交材料》，指导委托单位提交申报资料。
                                    </Col>
                                    <Col span={8}>
                                        <RadioGroup>
                                            <Radio value={1}>是</Radio><Radio value={2}>否</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                                <Row style={rowStyle} gutter={32}>
                                    <Col span={16}>
                                        实验室在收到委托单位的有关资料后，即成立测试项目小组，该项目小组的任务是消化用户提供的有关资料，对委托软件的可测状态进行评估，
                                        若委托软件未达到可测状态，则向委托方提出改进建议，直到委托软件达到可测状态为止。
                                        项目小组的任务包括负责编制测试方案，搭建测试环境，执行测试过程，记录测试结果，编制测试报告，提交测试报告，将有关资料归档等。
                                    </Col>
                                    <Col span={8}>
                                        <RadioGroup>
                                            <Radio value={1}>是</Radio><Radio value={2}>否</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                            </Panel>

                            {/*
                            <Panel  header="1. 接受委托单位委托测试申请" key="process11" style={customPanelStyle}>
                                <FormItem{...formItemLayout}>
                                    {getFieldDecorator('problem11', {
                                        rules: [{ required: false }],
                                    })(
                                        <Checkbox.Group>
                                            <Row style ={rowStyle}><Checkbox value={1}>
                                                为委托单位提供详尽的有关软件项目委托测试的相关法律法规、优惠政策、业务办理流程等事项。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={2}>
                                                建议委托单位阅读《软件项目委托测试流程图和工作介绍》，了解申报流程。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={3}>
                                                根据《软件项目委托测试提交材料》，指导委托单位提交申报资料。
                                            </Checkbox></Row>
                                        </Checkbox.Group>
                                    )}
                                </FormItem>
                            </Panel>
                            */}

                            <Panel  header="2. 填写《软件项目委托测试申请表》、《委托测试软件功能列表》，按《软件项目委托测试提交材料》提交材料" key="process12" style={customPanelStyle2}>
                                <FormItem{...formItemLayout}>
                                    {getFieldDecorator('problem12', {
                                        rules: [{ required: false }],
                                    })(
                                        <Checkbox.Group>
                                            <Row style ={rowStyle}><Checkbox value={1}>
                                                确保委托方应填内容正确、完备；纸质材料已盖公章。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={2}>
                                                明确委托方按《软件项目委托测试提交材料》提交材料。
                                            </Checkbox></Row>
                                        </Checkbox.Group>
                                    )}
                                </FormItem>
                            </Panel>

                            <Panel  header="3. 签订《软件项目委托测试合同》、《软件项目委托测试保密协议》" key="process13" style={customPanelStyle}>
                                <FormItem{...formItemLayout}>
                                    {getFieldDecorator('problem13', {
                                        rules: [{ required: false }],
                                    })(
                                        <Checkbox.Group>
                                            <Row style ={rowStyle}><Checkbox value={1}>
                                                合同及保密协议内容、数量符合要求。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={2}>
                                                合同编号方式符合要求。
                                            </Checkbox></Row>
                                        </Checkbox.Group>
                                    )}
                                </FormItem>
                            </Panel>

                        </Collapse>
                    </Panel>

                    <Panel header="二、对委托测试软件的可测状态进行评估" key="process2" style={customPanelStyle2}>
                        <Collapse bordered={false} defaultActiveKey={['process24']}>
                            <Panel  header="4. 接受委托单位委托测试申请" key="process24" style={customPanelStyle2}>
                                <FormItem{...formItemLayout}>
                                    {getFieldDecorator('problem24', {
                                        rules: [{ required: false }],
                                    })(
                                        <Row style ={rowStyle}><Checkbox value={1}>
                                            实验室在收到委托单位的有关资料后，即成立测试项目小组，该项目小组的任务是消化用户提供的有关资料，对委托软件的可测状态进行评估，
                                            若委托软件未达到可测状态，则向委托方提出改进建议，直到委托软件达到可测状态为止。
                                            项目小组的任务包括负责编制测试方案，搭建测试环境，执行测试过程，记录测试结果，编制测试报告，提交测试报告，将有关资料归档等。
                                        </Checkbox></Row>
                                    )}
                                </FormItem>
                            </Panel>
                        </Collapse>
                    </Panel>

                    <Panel header="三、实施测试" key="process3" style={customPanelStyle}>
                        <Collapse bordered={false} defaultActiveKey={['process35', 'process36', 'process37', 'process38', 'process39']}>
                            <Panel  header="5. 编制测试方案" key="process35" style={customPanelStyle}>
                                <FormItem{...formItemLayout}>
                                    {getFieldDecorator('problem35', {
                                        rules: [{ required: false }],
                                    })(
                                        <Checkbox.Group>
                                            <Row style ={rowStyle}><Checkbox value={1}>
                                                测试方案必须经实验室质量负责人审核，技术负责人批准方能生效。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={2}>
                                                委托测试软件介绍：简要介绍委托测试软件的功能特点、应用行业及技术特性等。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={3}>
                                                软件功能：以委托单位提供的功能列表为依据，以表格形式列出所有功能项目，并对功能列表的各功能项目按照层次关系进行编号，以便于标识。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={4}>
                                                资源需求：资源需求要列出人员需求和软硬件设备需求。人员需求要列出人员名单、职称及所承担的角色（项目组长或成员）；
                                                软硬件设备需求要根据委托测试软件要求的运行环境及实验室的设备情况，列出硬件设备的名称、型号、配置、机身编号、用途，软件的名称、版本号、用途等。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={5}>
                                                参考文档：列出编制本方案所参考的标准、规范及用户文档等的名称、作者、类型、版本/标识号。
                                            </Checkbox></Row>
                                        </Checkbox.Group>
                                    )}
                                </FormItem>
                            </Panel>

                            <Panel  header="6. 搭建测试环境" key="process36" style={customPanelStyle2}>
                                <FormItem{...formItemLayout}>
                                    {getFieldDecorator('problem36', {
                                        rules: [{ required: false }],
                                    })(
                                        <Row style ={rowStyle}><Checkbox value={1}>
                                            实验室按照委托方提供的委托测试软件运行环境搭建测试环境。
                                        </Checkbox></Row>
                                    )}
                                </FormItem>
                            </Panel>

                            <Panel  header="7. 实施测试" key="process37" style={customPanelStyle}>
                                <FormItem{...formItemLayout}>
                                    {getFieldDecorator('problem37', {
                                        rules: [{ required: false }],
                                    })(
                                        <Checkbox.Group>
                                            <Row style ={rowStyle}><Checkbox value={1}>
                                                测试过程主要以测试方案为依据，按照用户手册所述的操作方法运行软件，考察软件是否具有用户手册所描述的操作界面，
                                                对功能列表的主要功能逐项进行符合性测试并作记录，对未测的次要功能或细节部分，应作出说明。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={2}>
                                                对文档的测试：要从完整性、正确性、一致性、易理解性、易浏览性和外观质量六个方面，对用户文档进行评审。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={3}>
                                                对测试过程观察到的结果进行如实记录，对发现的问题整理成问题清单。
                                            </Checkbox></Row>
                                        </Checkbox.Group>
                                    )}
                                </FormItem>
                            </Panel>

                            <Panel  header="8. 编制测试报告" key="process38" style={customPanelStyle2}>
                                <FormItem{...formItemLayout}>
                                    {getFieldDecorator('problem38', {
                                        rules: [{ required: false }],
                                    })(
                                        <Checkbox.Group>
                                            <Row style ={rowStyle}><Checkbox value={1}>
                                                根据《软件项目委托测试报告编制作业指导书》和测试结果编制测试报告。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={2}>
                                                检查测试报告，并填写《测试报告检查表》。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={3}>
                                                测试报告的编码请参阅《程序文件》。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={4}>
                                                报告审查：在分发报告前，应按实验室质量管理程序对报告进行严格审查。
                                            </Checkbox></Row>
                                        </Checkbox.Group>
                                    )}
                                </FormItem>
                            </Panel>

                            <Panel  header="9. 评测资料归档" key="process39" style={customPanelStyle}>
                                <FormItem{...formItemLayout}>
                                    {getFieldDecorator('problem39', {
                                        rules: [{ required: false }],
                                    })(
                                        <Checkbox.Group>
                                            <Row style ={rowStyle}><Checkbox value={1}>
                                                委托测试的软件产品及测试相关文件、原始记录等能够随时复现测试过程所需的材料，也同测试报告一并交由实验室资料室的材料管理员归档，
                                                以作为日后对测试结果产生异议时进行复核或仲裁的依据。上述材料由实验室保存三年后，实验室根据委托申请时要求进行处理。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={2}>
                                                该检查表与本次委托测试归档资料一同归档。
                                            </Checkbox></Row>
                                            <Row style ={rowStyle}><Checkbox value={3}>
                                                确保归档资料方便查找取阅。
                                            </Checkbox></Row>
                                        </Checkbox.Group>
                                    )}
                                </FormItem>
                            </Panel>

                        </Collapse>
                    </Panel>
                </Collapse>

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

export default Form.create()(TestWorkCheckContentComponent);
