import React, {Component, PropTypes} from 'react';
import {Icon, Row, Col, Form, Button, Input, InputNumber, Table, Tabs, Popconfirm} from 'antd'
const TabPane = Tabs.TabPane;
const FormItem=Form.Item;
const InputGroup = Input.Group;

/**
 * EditableCell类，实现了测试方案书中可编辑表格的部分。
 */
class EditableCell extends Component {
    /**
     * state表示组件的状态：value是prop的值，editable表示此单元格是否可以编辑
     */
    state = {
        value: this.props.value,
        editable: false,
    }

    /**
     * 在元素发生变化时调用handleChange函数
     * @func
     * @params e - e为原生的事件绑定对象
     */
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }

    /**
     * check将可编辑单元格的editable属性设置为不可编辑，并在prop属性改变时保存修改的值
     * @func
     */
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    /**
     * edit将单元格的editable属性设置为可编辑
     * @func
     */
    edit = () => {
        this.setState({ editable: true });
    }

    /**
     * 可编辑单元格的渲染函数，返回editableCell的html代码
     */
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


/**
 * TestPlanContentComponent类，实现了测试方案书的具体表单内容。
 */
class TestPlanContentComponent extends Component {
    /**
     * 构造器
     * @param props
     * volumes1-4设置了四张表格的列，state设置了这个类的一些状态。
     * state中，datasource1-4设置了四张表格的初始数据。
     */
    constructor(props) {
        super(props);

        this.columns1 = [{
            title: '序号',
            dataIndex: 'number',
            key: 'number',
            width: '10%',
        }, {
            title: '硬件名称',
            dataIndex: 'name',
            key: 'name',
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
            key: 'kind',
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
            key: 'amount',
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
            key: 'description',
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

        this.columns3 = [{
            title: '里程碑任务',
            dataIndex: 'project',
            width: '10%',
        }, {
            title: '工作量',
            dataIndex: 'workload',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange3(record.key, 'workload')}
                />
            ),
        }, {
            title: '开始时间',
            dataIndex: 'startingTime',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange3(record.key, 'startingTime')}
                />
            ),
        }, {
            title: '结束时间',
            dataIndex: 'endTime',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange3(record.key, 'endTime')}
                />
            ),
        }];

        this.columns4 = [{
            title: '岗位',
            dataIndex: 'post',
            key: 'post',
            width: '10%',
        }, {
            title: '人数',
            dataIndex: 'num',
            key: 'num',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange4(record.key, 'num')}
                />
            ),
        }, {
            title: '职责',
            dataIndex: 'duty',
            key: 'duty',
            width: '50%',
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

            dataSource3: [{
                key: '1',
                project: '制定测试计划',
                workload: '',
                staringTime: '',
                endTime: '',
            }, {
                key: '2',
                project: '设计测试',
                workload: '',
                staringTime: '',
                endTime: '',
            }, {
                key: '3',
                project: '执行测试',
                workload: '',
                staringTime: '',
                endTime: '',
            }, {
                key: '4',
                project: '评估测试',
                workload: '',
                staringTime: '',
                endTime: '',
            }],
            count3: 4,

            dataSource4: [{
                key: '1',
                post: '项目负责人',
                num: '',
                duty: '负责项目整体组织、工作分配、测试人员管理、项目具体协调等工作。项目经理同时承担测试执行的部分分工作。',
            }, {
                key: '2',
                post: '测试工程师',
                num: '',
                duty: '实施测试工作，同时担任配置管理员。',
            }, {
                key: '3',
                post: '项目督导',
                num: '',
                duty: '监督指导测试小组工作，对项目进展中遇到的问题提供支持。',
            }],
            count4: 3,
        };
    };

    /**
     * onCellChange1表示硬件环境表中可编辑单元格修改后的回调函数。
     * @func
     * @param {Number} key - key用来表示修改的单元格对应的数据行的key值
     * @param {string} dataIndex - dataIndex用来表示修改的单元格对应的列的名称
     */
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

    /**
     * onDelete1表示硬件环境表中删除一条数据的回调函数
     * @func
     * @param {Number} key - key用来表示修改的单元格对应的数据行的key值
     */
    onDelete1 = (key) => {
        const dataSource1 = [...this.state.dataSource1];
        this.setState({ dataSource1: dataSource1.filter(item => item.key !== key) });
    }

    /**
     * handleAdd1表示硬件环境表中添加一条数据的回调函数
     * @func
     */
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

    /**
     * onCellChange2表示软件环境表中可编辑单元格修改后的回调函数。
     * @func
     * @param {Number} key - key用来表示修改的单元格对应的数据行的key值
     * @param {string} dataIndex - dataIndex用来表示修改的单元格对应的列的名称
     */
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
    /**
     * onDelete2表示软件环境表中删除一条数据的回调函数
     * @func
     * @param {Number} key - key用来表示修改的单元格对应的数据行的key值
     */
    onDelete2 = (key) => {
        const dataSource2 = [...this.state.dataSource2];
        this.setState({ dataSource2: dataSource2.filter(item => item.key !== key) });
    }

    /**
     * handleAdd2表示软件环境表中添加一条数据的回调函数
     * @func
     */
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

    /**
     * onCellChange3表示测试进度表中可编辑单元格修改后的回调函数。
     * @func
     * @param {Number} key - key用来表示修改的单元格对应的数据行的key值
     * @param {string} dataIndex - dataIndex用来表示修改的单元格对应的列的名称
     */
    onCellChange3 = (key, dataIndex) => {
        return (value) => {
            const dataSource3 = [...this.state.dataSource3];
            const target = dataSource3.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource3 });
            }
        };
    }

    /**
     * onCellChange4表示人员表中可编辑单元格（人数）修改后的回调函数。
     * @func
     * @param {Number} key - key用来表示修改的单元格对应的数据行的key值
     * @param {string} dataIndex - dataIndex用来表示修改的单元格对应的列的名称
     */
    onCellChange4 = (key, dataIndex) => {
        return (value) => {
            const dataSource4 = [...this.state.dataSource4];
            const target = dataSource4.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource4 });
            }
        };
    }

    /**
     * 若上个界面没有传值，则使用这个默认props
     * @type {{values: {documentID: string, testLevel:string}, disable: boolean, buttons: Array}}
     */
    static defaultProps = {
        values: {
            documentID:'NST-04-JS006-2011-软件测试方案-',
            testLevel:'系统级'
        },
        disable:false,
        buttons: [],
    };

    /**
     * 对props里面的属性进行类型判断，isRequired指定必填项
     * @type {{testPlanData: *, values: * , disable: *, buttons: *, form: *}}
     */
    static propTypes = {
        testPlanData: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
    };

    /**
     * 在页面组件render之前调用componentWillMount。
     * 对于可编辑表格（硬件环境表、软件环境表、测试进度表、人员表）在读值之前需要从props.values中找到打包好的对应数据，
     * 若暂时还未有数据（undefined），需要进行初始化。
     * @func
     */
    componentWillMount() {
        //     this.curID = this.props.curKey;
        //     // console.log(this.curID);
        this.props.getValues(this.props.testPlanData.id);
        let state = this.state;
        state.dataSource1 = this.props.values["hardware"];
        if (state.dataSource1 === undefined)
            state.dataSource1 = [];
        state.count1 = state.dataSource1.length;

        state.dataSource2 = this.props.values["software"];
        if (state.dataSource2 === undefined)
            state.dataSource2 = [];
        state.count2 = state.dataSource2.length;

        state.dataSource3 = this.props.values["testProgress"];
        if (state.dataSource3 === undefined)
            state.dataSource3 = [{
                key: '1',
                project: '制定测试计划',
                workload: '',
                staringTime: '',
                endTime: '',
            }, {
                key: '2',
                project: '设计测试',
                workload: '',
                staringTime: '',
                endTime: '',
            }, {
                key: '3',
                project: '执行测试',
                workload: '',
                staringTime: '',
                endTime: '',
            }, {
                key: '4',
                project: '评估测试',
                workload: '',
                staringTime: '',
                endTime: '',
            }];
        state.count3 = state.dataSource3.length;

        state.dataSource4 = this.props.values["people"];
        if (state.dataSource4 === undefined)
            state.dataSource4 = [{
                key: '1',
                post: '项目负责人',
                num: '',
                duty: '负责项目整体组织、工作分配、测试人员管理、项目具体协调等工作。项目经理同时承担测试执行的部分分工作。',
            }, {
                key: '2',
                post: '测试工程师',
                num: '',
                duty: '实施测试工作，同时担任配置管理员。',
            }, {
                key: '3',
                post: '项目督导',
                num: '',
                duty: '监督指导测试小组工作，对项目进展中遇到的问题提供支持。',
            }];
        state.count4 = state.dataSource4.length;
        this.setState(state);
        //     // console.log(this.values);
    };

    /**
     * 点击button的回调函数
     * @func
     * @param {Number} buttonIndex - 所点击的button的编号
     * @returns {Function} 保存表单各部分的值，对于可编辑表格应注意在保存前进行打包操作。
     */
    onClick = (buttonIndex) => () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.buttons[buttonIndex].onClick(this.props.consignData, JSON.stringify(values));
        //     }
        // });
        const {buttons, form} = this.props;//此处附近接口？？
        let fieldsValue = form.getFieldsValue();
        fieldsValue["hardware"] = this.state.dataSource1;
        fieldsValue["software"] = this.state.dataSource2;
        fieldsValue["testProgress"] = this.state.dataSource3;
        fieldsValue["people"] = this.state.dataSource4;
        buttons[buttonIndex].onClick(this.props.testPlanData,JSON.stringify(fieldsValue));
    };


    /**
     * 测试方案书的render函数。
     * 其中formItemLayout、formLayout2、InputStyle以CSS语言定义了各种组件的样式；
     * 返回"测试方案书"表单详情的html代码，包括测试软件的基本信息、软件测试环境、测试计划及测试进度表。
     */
    render() {
        // const { current } = this.state;
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

                                <Table bordered dataSource={this.state.dataSource4} columns={this.columns4} />

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
                        <div>
                            <Table bordered dataSource={this.state.dataSource3} columns={this.columns3} />
                        </div>
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
