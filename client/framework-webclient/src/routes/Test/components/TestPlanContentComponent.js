import React, {Component, PropTypes} from 'react';
import {Icon, Row,Col,Steps,Form,Button,Input,DatePicker,InputNumber,Collapse,Table,Tabs,Popconfirm} from 'antd'
//import {Tabs} from "antd/lib/index";
const TabPane = Tabs.TabPane;
const { Column, ColumnGroup } = Table;
const Step = Steps.Step;
const FormItem=Form.Item;
const InputGroup = Input.Group;
const Panel=Collapse.Panel;
const staffData = [{
  key: '1',
  station: '项目负责人',
  num: '1人',
  duty: '负责项目整体组织、工作分配、测试人员管理、项目具体协调等工作。项目经理同时承担测试执行的部分分工作。',
}, {
  key: '2',
  station: '测试工程师',
  num: '1人',
  duty: '实施测试工作，同时担任配置管理员。',
}, {
  key: '3',
  station: '项目督导',
  num: '1人',
  duty: '监督指导测试小组工作，对项目进行中遇到的问题提供支持。',
}];


class EditableCell extends Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ? (
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                            disabled={this.props.disable}
                            suffix={
                                <Icon
                                    type="check"
                                    className="editable-cell-icon-check"
                                    onClick={this.check}
                                />
                            }
                        />
                    ) : (
                        <div style={{ paddingRight: 24 }}>
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

class TestPlanContentComponent extends Component {
    constructor(props) {
        super(props);

        this.columns1 = [{
            title: '序号',
            dataIndex: 'number',
            width: '10%',
        }, {
            title: '硬件名称',
            dataIndex: 'name',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange1(record.key, 'name')}
                />
            ),
        },  {
            title: '硬件类别',
            dataIndex: 'kind',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange1(record.key, 'kind')}
                />
            ),
        },  {
            title: '数量',
            dataIndex: 'amount',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange1(record.key, 'amount')}
                />
            ),
        }, {
            title: '配置',
            dataIndex: 'description',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange1(record.key, 'description')}
                />
            ),
        }, {
            title: '删除操作',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record) => {
                return (
                    this.state.dataSource1.length > 0 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete1(record.key)}>
                                <a href="javascript:;">Delete</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.columns2 = [{
            title: '序号',
            dataIndex: 'softwarenumber',
            width: '10%',
        }, {
            title: '软件名称',
            dataIndex: 'softwarename',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange2(record.key, 'softwarename')}
                />
            ),
        }, {
            title: '软件类别',
            dataIndex: 'softwarekind',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange2(record.key, 'softwarekind')}
                />
            ),
        }, {
            title: '软件版本',
            dataIndex: 'softwareversion',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange2(record.key, 'softwareversion')}
                />
            ),
        }, {
            title: '删除操作',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record) => {
                return (
                    this.state.dataSource2.length > 0 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete2(record.key)}>
                                <a href="javascript:;">Delete</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
            values:this.props.value,
            editable:false,
            dataSource1: [{
                key: '1',
                number: '1',
                name: '',
                kind: '',
                amount: '',
                description: '',
            }, {
                key: '2',
                number: '2',
                name: '',
                kind: '',
                amount: '',
                description: '',
            }],
            count1: 2,

            dataSource2: [{
                key: '1',
                softwarenumber: '1',
                softwarename: '',
                softwareversion: '',
                softwarekind:'',
                description: '',
            }, {
                key: '2',
                softwarenumber: '2',
                softwarename: '',
                softwareversion: '',
                softwarekind:'',
                description: '',
            }],
            count2: 2,
        };
    };

    onCellChange1 = (key, dataIndex) => {
        return (value) => {
            const dataSource1 = [...this.state.dataSource1];
            const target = dataSource1.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource1 });
            }
        };
    }
    onDelete1 = (key) => {
        const dataSource1 = [...this.state.dataSource1];
        this.setState({ dataSource1: dataSource1.filter(item => item.key !== key) });
    }
    handleAdd1 = () => {
        const { count1, dataSource1 } = this.state;
        const newData = {
            key: count1+1,
            number: `${count1+1}`,
            description: ``,
        };
        this.setState({
            dataSource1: [...dataSource1, newData],
            count1: count1 + 1,
        });
    }

    onCellChange2 = (key, dataIndex) => {
        return (value) => {
            const dataSource2 = [...this.state.dataSource2];
            const target = dataSource2.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource2 });
            }
        };
    }
    onDelete2 = (key) => {
        const dataSource2 = [...this.state.dataSource2];
        this.setState({ dataSource2: dataSource2.filter(item => item.key !== key) });
    }
    handleAdd2 = () => {
        const { count2, dataSource2 } = this.state;
        const newData = {
            key: count2+1,
            softwarenumber: `${count2+1}`,
            description: ``,
        };
        this.setState({
            dataSource2: [...dataSource2, newData],
            count2: count2 + 1,
        });
    }

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
        let state = this.state;
        state.dataSource1 = this.props.values["hardware"];
        if (state.dataSource1 === undefined)
            state.dataSource1 = [];
        state.count1 = state.dataSource1.length;
        this.setState(state);
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
        let fieldsValue = form.getFieldsValue();
        fieldsValue["hardware"] = this.state.dataSource1;
    };

    render() {
        const { current } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 17 },
        };
        const formItemLayout2 =  {
            labelCol: { span: 3 },
            wrapperCol: { span: 18 },
        };
        const InputStyle={
            width:'200',
            borderRadius:'6',
        };

        return(
            <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
                <FormItem>
                    <h1 style={{textAlign:'center'}}>软件测试方案</h1>
                </FormItem>

                <Tabs
                    defaultActiveKey="1"
                    tabPosition="left"
                >
                    <TabPane tab="基本信息" key="1">
                        <FormItem {...formItemLayout} label={"软件名称"}>
                            {getFieldDecorator('softwareName', {
                                rules: [{ required: true, message: '请输入软件名称！' }],
                                initialValue: this.props.values.softwareName,
                            })(
                                <Input  disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"项目名称"}>
                            {getFieldDecorator('projectName', {
                                rules: [{ required: true, message: '请输入项目名称！' }],
                                initialValue: this.props.values.projectName,
                            })(
                                <Input  disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"测试方案版本号"}>
                            {getFieldDecorator('testPlanVer', {
                                rules: [{ required: true, message: '请输入测试方案版本号！' }],
                                initialValue: this.props.values.testPlanVer,
                            })(
                                <Input  disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="文档标识">
                            {getFieldDecorator('documentID', {
                                rules: [{ required: true,message: '请输入文档标识！' }],
                                initialValue: this.props.values.documentID,
                            })(
                                <Input  disabled={this.props.disable} placeholder={"NST-04-JS006-2011-软件测试方案-"}/>
                            )}
                        </FormItem>

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
                                <Input  disabled={this.props.disable}/>
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

                        {/*
                            <FormItem {...formItemLayout} label={"文档修改记录"}>
                                {getFieldDecorator('doRecord', {
                                    rules: [{required: true, message: '请输入！'}],
                                    initialValue: this.props.values.doRecord,
                                })(
                                    <Table disabled={this.props.disable}/>
                                )}
                            </FormItem>
                        */}
                    </TabPane>

                    {/*
                    <TabPane tab="1.引言" key="2">
                        <Row>
                            <Col offset={1} span={21}>
                                <h3>1.1 标识</h3>
                            </Col>
                        </Row>
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

                        <FormItem/>
                        <Row>
                            <Col offset={1} span={21}>
                                <h3>1.2 系统概述</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={2} span={20}>

                            </Col>
                        </Row>
                        <FormItem/>

                        <Row>
                            <Col offset={1} span={21}>
                                <h3>1.3 文档概述</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={2} span={20}>
                                <InputGroup compact>
                                    本文档作为“
                                    {getFieldDecorator('projectName', {
                                        rules: [{ required: true, message: '请输入！' }],
                                        //     initialValue: this.props.values.projectName,
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
                            </Col>
                        </Row>
                        <FormItem/>


                        <Row>
                            <Col offset={1} span={21}>
                                <h3>1.4 基线</h3>
                            </Col>
                        </Row>
                        <FormItem {...formItemLayout} label="本文档的基线为">
                            {getFieldDecorator('baseline', {
                                rules: [{ required: true,message: '请输入！' }],
                                //initialValue: this.props.values.baseline,
                            })(
                                <Input  disabled={this.props.disable}/>
                            )}
                        </FormItem>

                    </TabPane>
                        <TabPane tab="2.引用文件" key="3">

                        </TabPane>
                    */}

                    <TabPane tab="软件测试环境" key="2">
                        <Row>
                            <Col offset={1} span={21}>
                                <h3>3.1 硬件</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={2} span={20}>
                                <div>
                                    <Button onClick={this.handleAdd1} type="primary" style={{ marginBottom: 16 }}>
                                        添加硬件环境
                                    </Button>
                                    <Table bordered dataSource={this.state.dataSource1} columns={this.columns1} />
                                </div>
                            </Col>
                        </Row>

                        <FormItem/>

                        <Row>
                            <Col offset={1} span={21}>
                                <h3>3.2 软件环境</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={2} span={20}>
                                <div>
                                    <Button onClick={this.handleAdd2} type="primary" style={{ marginBottom: 16 }}>
                                        添加软件环境
                                    </Button>
                                    <Table bordered dataSource={this.state.dataSource2} columns={this.columns2} />
                                </div>
                            </Col>
                        </Row>
                        /*TODO 表格*/


                        <FormItem/>
                        {/*
                        <Row>
                            <Col offset={1} span={21}>
                                <h3>3.3 参与组织</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={2} span={20}>

                            </Col>
                        </Row>
                        */}
                        <FormItem/>

                        <Row>
                            <Col offset={1} span={21}>
                                <h3>3.4 人员</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={2} span={20}>
                                初步定为1名测试人员，1名项目督导，1名项目负责人。各类人员具体职责如下：

                                <Table dataSource={staffData} pagination={{ hideOnSinglePage:true }}>
                                    <Column title="岗位" dataIndex="station" key="station"/>
                                    <Column title="人数" dataIndex="num" key="num"/>
                                    <Column title="职责" dataIndex="duty" key="duty"/>
                                </Table>
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tab="测试计划" key="3">
                        <Row>
                            <Col offset={1} span={21}>
                                本章描述了计划测试的总范围并且描述了本测试计划适用的每个测试，包括对相关文档的审查。
                                <h3><br/>4.1 总体设计</h3>
                            </Col>
                            <Col offset={2} span={20}>
                                <FormItem {...formItemLayout2} label="测试方法">
                                    {getFieldDecorator('testMethods', {
                                        rules: [{ required: true,message: '请输入测试方法！' }],
                                        initialValue: this.props.values.testMethods,
                                    })(
                                        <Input  disabled={this.props.disable}/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout2} label="测试类型">
                                    {getFieldDecorator('testType', {
                                        rules: [{ required: true,message: '请输入测试类型！' }],
                                        initialValue: this.props.values.testType,
                                    })(
                                        <Input  disabled={this.props.disable}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col offset={1} span={23}>
                                <h4>4.1.1 测试级别</h4>
                            </Col>
                            <Col offset={2} span={20}>
                                <FormItem>
                                    <InputGroup compact>
                                        本测试的测试级别为
                                        {getFieldDecorator('testLevel', {
                                            rules: [{ required: true, message: '请输入测试级别！' }],
                                            initialValue: this.props.values.testLevel,
                                        })(
                                            <Input style={InputStyle} disabled={this.props.disable} placeholder={"系统级"}/>
                                        )}
                                    </InputGroup>
                                </FormItem>
                            </Col>
                            <Col offset={1} span={23}>
                                <h4>4.1.2 测试类别</h4>
                            </Col>
                            <Col offset={2} span={20}>
                                <FormItem>
                                    <InputGroup compact>
                                        本测试的测试类别为
                                        {getFieldDecorator('testCategory', {
                                            rules: [{ required: true, message: '请输入测试类别！' }],
                                            initialValue: this.props.values.testCategory,
                                        })(
                                            <Input style={InputStyle} disabled={this.props.disable} />
                                        )}
                                    </InputGroup>
                                </FormItem>
                            </Col>
                            <Col offset={1} span={23}>
                                <h4>4.1.3 一般测试条件</h4>
                            </Col>
                            <Col offset={2} span={20}>
                                测试应满足时序逻辑，测试使用的数据要符合实际情况，测试应当完全覆盖所有需求。
                            </Col>
                        </Row>
                        <FormItem/>

                        <Row>
                            <Col offset={1} span={21}>
                                <h3>4.2 计划执行的测试</h3>
                            </Col>
                            <Col offset={2} span={20}>
                                <FormItem {...formItemLayout2} label={"测试对象"}>
                                    {getFieldDecorator('testObject', {
                                        rules: [{ required: true, message: '请输入测试对象！' }],
                                        initialValue: this.props.values.testObject,
                                    })(
                                        <Input disabled={this.props.disable}/>
                                    )}
                                    </FormItem>
                                <FormItem {...formItemLayout2} label={" 测试级别"}>
                                    {getFieldDecorator('testLevel', {
                                        rules: [{ required: true, message: '请输入测试级别！' }],
                                        initialValue: this.props.values.testLevel,
                                    })(
                                        <Input disabled={this.props.disable}placeholder={"系统级"}/>
                                    )}
                                    </FormItem>
                                <FormItem {...formItemLayout2} label={"测试类型"}>
                                    {getFieldDecorator('testType', {
                                        rules: [{ required: true, message: '请输入测试类型！' }],
                                        initialValue: this.props.values.testType,
                                    })(
                                        <Input disabled={this.props.disable}/>
                                    )}
                                    </FormItem>
                                <FormItem {...formItemLayout2} label={"测试方法"}>
                                    {getFieldDecorator('testMethods', {
                                        rules: [{ required: true, message: '请输入测试方法！'}],
                                        initialValue: this.props.values.testMethods,
                                    })(
                                        <Input disabled={this.props.disable} placeholder={"人工设计测试用例，人工执行测试，人工分析测试结果"}/>
                                    )}
                                    </FormItem>
                            </Col>
                        </Row>
                        <FormItem/>
                        {/*
                            <Row>
                                <Col offset={1} span={21}>
                                    <h3>4.3 测试用例</h3>
                                </Col>
                                <Col offset={2} span={20}>
                                    <FormItem {...formItemLayout}>
                                        <InputGroup compact>
                                            本次测试共设计了
                                            {getFieldDecorator('caseNum', {
                                                rules: [{required: true, message: '请输入测试用例数目！'}],
                                                //initialValue: this.props.values.caseNum,
                                            })(
                                                <Input style={InputStyle} disabled={this.props.disable}
                                                       pattern="^[0-9]+$"/>
                                            )}个测试用例，覆盖了测试类别中指明的各个方面。具体用例见《测试用例》。
                                        </InputGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                        */}
                        <FormItem/>
                    </TabPane>

                    <TabPane tab="测试进度表 " key="4">
                        <Row>
                            <Col offset={1} span={22}>
                                <FormItem>
                                    {/*<InputGroup compact>*/}
                                    此项目主要分为：业务测试和文档审查两部分的工作。两部分的工作可以并行完成。<br/>
                                    测试方为完成本方案所述的测试所需时间大约为
                                    {getFieldDecorator('costDay', {
                                        rules: [{ required: true, message: '请输入所需时间！' }],
                                        initialValue: this.props.values.costDay,
                                    })(
                                        //<Input style={InputStyle} disabled={this.props.disable} pattern="^[0-9]+$"/>
                                        <InputNumber style={InputStyle} disabled={this.props.disable} />
                                    )}个工作日，如测试需求产生变更会导致测试时间的变化。<br/>
                                    下表大致估计了本次测试各个阶段所需工作量及起止时间。
                                    {/*</InputGroup>*/}
                                </FormItem>
                            </Col>
                        </Row>

                        /*TODO 表格*/
                    </TabPane>

                    {/*
                        <TabPane tab="6.需求的可追踪性 " key="7">
                            <Row>
                                <Col offset={1} span={22}>
                                    设计的测试用例的ID中包含其对应的相关规约说明中对应条目的名称，每个测试用例都是可追踪的。
                                </Col>
                            </Row>
                        </TabPane>
                    */}
                </Tabs>


                {/* footer buttons */}
                <FormItem style={{textAlign:'center'}}>
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
export default Form.create()(TestPlanContentComponent);
