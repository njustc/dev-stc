import React, {Component, PropTypes} from 'react';
import {Row, Col, Divider, Button, Form, Input, Icon,DatePicker, Switch} from 'antd';
import moment from "moment";

const FormItem=Form.Item;

/**
 * TestWorkCheckContentComponent类，实现了测试工作检查表的具体表单内容。
 */
class TestWorkCheckContentComponent extends Component {
    /**
     * 构造器
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            values:this.props.value,
            //editable:false,
        };
    }

    /**
     * 若上个界面没有传值，则使用这个默认props
     * @type {{values: {}, disable: boolean, buttons: Array}}
     */
    static defaultProps = {
        values: {},
        disable:false,
        buttons: [],
    };

    /**
     * 对props里面的属性进行类型判断，isRequired指定必填项
     * @type {{values: * , disable: *, buttons: *, form: *}}
     */
    static propTypes = {
        //testWorkCheckData: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
    };

    /**
     * 在页面组件render之前调用componentWillMount
     */
    componentWillMount() {
    //     this.curID = this.props.curKey;
    //     // console.log(this.curID);
         this.props.getValues(this.props.testWorkCheckData.id);
    //     // console.log(this.values);
    };


    /**
     * 点击button的回调函数
     * @func
     * @param {Number} buttonIndex - 所点击的button的编号
     * @returns {Function} 保存表单各部分的值，对于时间应注意在保存前进行format操作。
     */
    onClick = (buttonIndex) => () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.startingDate = values.startingDate.format("YYYY-MM-DD");
                values.estimatedFinishTime = values.estimatedFinishTime.format("YYYY-MM-DD");
                values.actualFinishTime = values.actualFinishTime.format("YYYY-MM-DD");
                this.props.buttons[buttonIndex].onClick(this.props.testWorkCheckData, JSON.stringify(values));
            }
        });
    };


    /**
     * 测试工作检查表表单组件的render函数。
     * 其中formItemLayout、rowStyle、tipStyle、switchStyle以CSS语言定义了各种组件的样式；
     * 返回"测试工作检查表"表单详情的html代码，包括测试软件的基本信息、测试信息及测试时可预见的问题和注意事项。
     */
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const rowStyle = {
            marginBottom:'8pt'
        };

        const tipStyle = {
            color: 'red',
            marginBottom:'10pt'
        };

        const switchStyle = {
            marginTop: 0,
            marginBottom: 0,
            lineHeight: '39px'
        };

        return(
            <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>

                <FormItem>
                    <h1 style={{textAlign:'center'}}>软件项目委托测试工作检查表</h1>
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
                        initialValue: this.props.values.consignUnit,
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"主测人"}>
                    {getFieldDecorator('masterTestPerson', {
                        rules: [{ required: true, message: '请正确输入主测人！' ,pattern:"^[\u4E00-\u9FA5A-Za-z]+$"}],
                        initialValue: this.props.values.masterTestPerson,
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"检查人"}>
                    {getFieldDecorator('checker', {
                        rules: [{ required: true, message: '请正确输入检查人！' ,pattern:"^[\u4E00-\u9FA5A-Za-z]+$"}],
                        initialValue: this.props.values.checker,
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"起始时间"}>
                    {getFieldDecorator('startingDate', {
                        rules: [{ required: true, message: '请正确输入时间！',
                        type: 'object',
                    }],
                        initialValue: this.props.values.startingDate?moment(this.props.values.startingDate):undefined,
                    })(
                        <DatePicker showTime format="YYYY-MM-DD"/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"预计完成时间"}>
                    {getFieldDecorator('estimatedFinishTime', {
                        rules: [{ required: true, message: '请正确输入时间！',
                            type: 'object',
                        }],
                        initialValue: this.props.values.estimatedFinishTime?moment(this.props.values.estimatedFinishTime):undefined,
                    })(
                        <DatePicker showTime format="YYYY-MM-DD"/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={"实际完成时间"}>
                    {getFieldDecorator('actualFinishTime', {
                        rules: [{ required: true, message: '请正确输入时间！',
                            type: 'object',
                        }],
                        initialValue: this.props.values.actualFinishTime?moment(this.props.values.actualFinishTime):undefined,
                    })(
                        <DatePicker showTime format="YYYY-MM-DD"/>
                    )}
                </FormItem>

                <div>
                    <h2>可预见问题及注意事项</h2>
                    <p style ={tipStyle}>注：请在已确认的条目后打勾。</p>
                    <Divider orientation="left">一、前期指导工作</Divider>
                    <Row style={rowStyle}><h5>1. 接受委托单位委托测试申请</h5></Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>为委托单位提供详尽的有关软件项目委托测试的相关法律法规、优惠政策、业务办理流程等事项。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item1', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item1
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>建议委托单位阅读《软件项目委托测试流程图和工作介绍》，了解申报流程。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item2', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item2
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>根据《软件项目委托测试提交材料》，指导委托单位提交申报资料。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item3', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item3
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider dashed/>
                    <Row style={rowStyle}><h5>2. 填写《软件项目委托测试申请表》、《委托测试软件功能列表》，按《软件项目委托测试提交材料》提交材料</h5></Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>确保委托方应填内容正确、完备；纸质材料已盖公章。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item4', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item4
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>明确委托方按《软件项目委托测试提交材料》提交材料。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item5', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item5
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider dashed/>
                    <Row style={rowStyle}><h5>3. 签订《软件项目委托测试合同》、《软件项目委托测试保密协议》</h5></Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>合同及保密协议内容、数量符合要求。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item6', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item6
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>合同编号方式符合要求。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item7', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item7
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider orientation="left">二、对委托测试软件的可测状态进行评估</Divider>
                    <Row style={rowStyle}><h5>4. 接受委托单位委托测试申请</h5></Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>实验室在收到委托单位的有关资料后，即成立测试项目小组，该项目小组的任务是消化用户提供的有关资料，对委托软件的可测状态进行评估，
                                若委托软件未达到可测状态，则向委托方提出改进建议，直到委托软件达到可测状态为止。
                                项目小组的任务包括负责编制测试方案，搭建测试环境，执行测试过程，记录测试结果，编制测试报告，提交测试报告，将有关资料归档等。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item8', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item8
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider orientation="left">三、实施测试</Divider>
                    <h5 style={{marginBottom:'10pt'}}>5. 编制测试方案</h5>
                    <Row gutter={16}>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>测试方案必须经实验室质量负责人审核，技术负责人批准方能生效。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item9', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item9
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>委托测试软件介绍：简要介绍委托测试软件的功能特点、应用行业及技术特性等。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item10', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item10
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>软件功能：以委托单位提供的功能列表为依据，以表格形式列出所有功能项目，并对功能列表的各功能项目按照层次关系进行编号，以便于标识。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item11', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item11
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>资源需求：资源需求要列出人员需求和软硬件设备需求。人员需求要列出人员名单、职称及所承担的角色（项目组长或成员）；
                                软硬件设备需求要根据委托测试软件要求的运行环境及实验室的设备情况，列出硬件设备的名称、型号、配置、机身编号、用途，软件的名称、版本号、用途等。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item12', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item12
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>参考文档：列出编制本方案所参考的标准、规范及用户文档等的名称、作者、类型、版本/标识号。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item13', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item13
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider dashed/>
                    <Row style={rowStyle}><h5>6. 搭建测试环境</h5></Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>实验室按照委托方提供的委托测试软件运行环境搭建测试环境。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item14', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item14
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider dashed/>
                    <Row style={rowStyle}><h5>7. 实施测试</h5></Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>测试过程主要以测试方案为依据，按照用户手册所述的操作方法运行软件，考察软件是否具有用户手册所描述的操作界面，
                                对功能列表的主要功能逐项进行符合性测试并作记录，对未测的次要功能或细节部分，应作出说明。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item15', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item15
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>对文档的测试：要从完整性、正确性、一致性、易理解性、易浏览性和外观质量六个方面，对用户文档进行评审。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item16', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item16
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>对测试过程观察到的结果进行如实记录，对发现的问题整理成问题清单。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item17', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item17
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider dashed/>
                    <Row style={rowStyle}><h5>8. 编制测试报告</h5></Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>根据《软件项目委托测试报告编制作业指导书》和测试结果编制测试报告。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item18', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item18
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>检查测试报告，并填写《测试报告检查表》。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item19', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item19
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>测试报告的编码请参阅《程序文件》。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item20', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item20
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>报告审查：在分发报告前，应按实验室质量管理程序对报告进行严格审查。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item21', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item21
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider dashed/>
                    <Row style={rowStyle}><h5>9. 评测资料归档</h5></Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>委托测试的软件产品及测试相关文件、原始记录等能够随时复现测试过程所需的材料，也同测试报告一并交由实验室资料室的材料管理员归档，
                                以作为日后对测试结果产生异议时进行复核或仲裁的依据。上述材料由实验室保存三年后，实验室根据委托申请时要求进行处理。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item22', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item22
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>该检查表与本次委托测试归档资料一同归档。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item23', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item23
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18}>
                            <p style={{lineHeight:'39px'}}>确保归档资料方便查找取阅。</p>
                        </Col>
                        <Col span={6}>
                            <FormItem style={switchStyle}>
                                {getFieldDecorator('item24', {
                                    //rules: [{ required: false }],
                                    valuePropName: 'checked',
                                    initialValue: this.props.values.item24
                                })(
                                    <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="cross" />}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>

                <FormItem/>
                {/* footer buttons */}
                <FormItem {...formItemLayout}>
                    {this.props.buttons.map((button, index) => {
                        let buttonCanShow = false;
                        this.props.buttonsEnable.forEach(function(element){
                            if(element.content === button.content && element.enable){
                                buttonCanShow = true;
                            }});
                        if(buttonCanShow){
                            return <Button
                                //disabled={this.props.buttonDisabled}
                                onClick={this.onClick(index)}
                                key={button.content}>
                                {button.content}
                            </Button>
                        }
                    })}
                </FormItem>
            </Form>
        );

    }
}

export default Form.create()(TestWorkCheckContentComponent);
