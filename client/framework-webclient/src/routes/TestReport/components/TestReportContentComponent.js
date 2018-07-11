//export default Form.create()(TestReportContentComponent);
import React, {Component, PropTypes} from 'react';
import {Row, Col, Card, Tabs, Select, Button, Layout, Form, Input,Radio,Checkbox,Icon,DatePicker,Collapse,message,Table,Popconfirm} from 'antd';
const TabPane = Tabs.TabPane;
const Option=Select.Option;
const OptGroup=Select.OptGroup;
const FormItem=Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

function handleChange(value) {
    console.log(`selected ${value}`);
}
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
class SoftwareEnvironmentTable extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
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
                    onChange={this.onCellChange(record.key, 'softwarename')}
                />
            ),
        }, {
            title: '软件类别',
            dataIndex: 'softwarekind',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'softwarekind')}
                />
            ),
        }, {
            title: '软件版本',
            dataIndex: 'softwareversion',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'softwareversion')}
                />
            ),
        }, {
            title: '删除操作',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record) => {
                return (
                    this.state.dataSource.length > 1 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a href="javascript:;">Delete</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
            dataSource: [{
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
            count: 2,
        };
    }
    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
            }
        };
    }
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count+1,
            softwarenumber: `${count+1}`,
            description: ``,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    添加软件环境
                </Button>
                <Table bordered dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

class FunctionEditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'number',
            width: '10%',
        }, {
            title: '功能模块',
            dataIndex: 'function',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'function')}
                />
            ),
        }, {
            title: '功能要求',
            dataIndex: 'command',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'command')}
                />
            ),
        }, {
            title: '测试结果',
            dataIndex: 'result',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'result')}
                />
            ),
        }, {
            title: '删除操作',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record) => {
                return (
                    this.state.dataSource.length > 1 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a href="javascript:;">Delete</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
            dataSource: [{
                number: '1',
                iterm: '',
                command: '',
                result:'',

            }, {

                number: '2',
                iterm: '',
                command: '',
                result:'',

            }],
            count: 2,
        };
    }
    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
            }
        };
    }
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count+1,
            number: `${count+1}`,
            description: ``,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    添加功能性测试
                </Button>
                <Table bordered dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}
class EfficiencyEditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'number',
            width: '10%',
        }, {
            title: '测试特性',
            dataIndex: 'iterm',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'name')}
                />
            ),
        }, {
            title: '测试说明',
            dataIndex: 'command',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'description')}
                />
            ),
        }, {
            title: '测试结果',
            dataIndex: 'result',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'description')}
                />
            ),
        }, {
            title: '删除操作',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record) => {
                return (
                    this.state.dataSource.length > 1 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a href="javascript:;">Delete</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
            dataSource: [{

                number: '1',
                iterm: '',
                command: '',
                result:'',

            }, {

                number: '2',
                iterm: '',
                command: '',
                result:'',

            }],
            count: 2,
        };
    }
    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
            }
        };
    }
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            number: `${count}`,
            description: ``,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    添加功能性测试
                </Button>
                <Table bordered dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

class TestReportContentComponent extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
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
                    onChange={this.onCellChange(record.key, 'name')}
                />
            ),
        },  {
            title: '硬件类别',
            dataIndex: 'kind',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'kind')}
                />
            ),
        },  {
            title: '数量',
            dataIndex: 'amount',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'amount')}
                />
            ),
        }, {
            title: '配置',
            dataIndex: 'description',
            width: '10%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'description')}
                />
            ),
        }, {
            title: '删除操作',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record) => {
                return (
                    this.state.dataSource.length > 0 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a href="javascript:;">Delete</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];

        this.state = {
            dataSource: [{
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
            count: 2,
        };

    };
    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
            }
        };
    }
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count+1,
            number: `${count+1}`,
            description: ``,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }
    static defaultProps = {
	curID : '',
        values : {},
        disable:false,
        buttons: [],
    };

    static propTypes = {
        getValues: PropTypes.func.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
    };

    componentWillMount() {
        this.props.getValues(this.props.testReportData.id);
        let state = this.state;
        state.dataSource = this.props.values["functionList"];
        if (state.dataSource === undefined)
            state.dataSource = [];
        state.count = state.dataSource.length;
        this.setState(state);
    };

    onClick = (buttonIndex) => () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.buttons[buttonIndex].onClick(this.props.testReportData, JSON.stringify(values));
            }
        });
        const {buttons, form} = this.props;
        let fieldsValue = form.getFieldsValue();
        fieldsValue["functionList"] = this.state.dataSource;
        // buttons[buttonIndex].onClick(JSON.stringify(form.getFieldsValue()));
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { dataSource } = this.state;
        const columns = this.columns;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 },
        };


        return(
            <Form onSubmit={this.handleSubmit} >

                <FormItem>
                    <h1 style={{textAlign:'center'}}>测试报告</h1>
                </FormItem>

                <div>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition="left"

                    >
                        <TabPane tab="基本信息" key="1">
		 <FormItem {...formItemLayout} label={"委托单位"}>
                            {getFieldDecorator('consignUnitC', {
                                rules: [{ required: false, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                initialValue: this.props.values.consignUnitC
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

		 <FormItem {...formItemLayout} label={"项目编号"}>
                            {getFieldDecorator('sampleNumber', {
                                rules: [{ required: false, message: '请正确输入项目编号！' ,pattern:"^[A-Za-z]+$"}],
                                initialValue: this.props.values.sampleNumber
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

						 <FormItem {...formItemLayout} label={"样品名称"}>
                            {getFieldDecorator('sampleName', {
                                rules: [{ required: false, message: '请正确输入样品名称！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                initialValue: this.props.values.sampleName
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"版本/型号"}>
                            {getFieldDecorator('versionModel', {
                                rules: [{ required: false, message: '请正确输入版本/型号！',pattern:"^[a-zA-Z0-9/.]+$" }],
                                initialValue: this.props.values.versionModel
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

						 <FormItem {...formItemLayout} label={"来样日期"}>
                            {getFieldDecorator('receiveTime', {
                                rules: [{ required: false, message: '请正确输入来样日期！',pattern:"^[a-zA-Z0-9/.]+$" }],
                                initialValue: this.props.values.receiveTime
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

						 <FormItem {...formItemLayout} label={"测试类型"}>
                            {getFieldDecorator('testKind', {
                                rules: [{ required: false, message: '请正确输入测试类型！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                                initialValue: this.props.values.testKind
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

						 <FormItem {...formItemLayout} label={"测试时间"}>
                            {getFieldDecorator('testTime', {
                                rules: [{ required: false, message: '请正确输入测试时间！',pattern:"^[a-zA-Z0-9/.]+$" }],
                                initialValue: this.props.values.testTime
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

						 <FormItem {...formItemLayout} label={"测试依据"}>
                            {getFieldDecorator('testBasis', {
                                rules: [{ required: false, message: '请正确输入测试依据！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                                initialValue: this.props.values.testBasis
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>


						<FormItem
                            label="样品清单"
                            {...formItemLayout}
                        >
                            <span className="ant-form-text"></span>
                        </FormItem>

						 <FormItem {...formItemLayout} label={"软件样本"}>
                            {getFieldDecorator('softwareSample', {
                                rules: [{ required: false, message: '请正确输入软件样本！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                                initialValue: this.props.values.softwareSample
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>


						 <FormItem {...formItemLayout} label={"软件文档"}>
                            {getFieldDecorator('softwareDoc', {
                                rules: [{ required: false, message: '请正确输入软件文档！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                                initialValue: this.props.values.softwareDoc
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>


						 <FormItem {...formItemLayout} label={"测试结论"}>
                            {getFieldDecorator('testConclusion', {
                                rules: [{ required: false, message: '请正确输入测试结论！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                                initialValue: this.props.values.testConclusion
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

						 <FormItem {...formItemLayout} label={"主测人"}>
                            {getFieldDecorator('masterMeasuringMan', {
                                rules: [{ required: false, message: '请正确输入主测人！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                                initialValue: this.props.values.masterMeasuringMan
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

						 <FormItem {...formItemLayout} label={"审核人"}>
                            {getFieldDecorator('Auditor', {
                                rules: [{ required: false, message: '请正确输入审核人！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                                initialValue: this.props.values.Auditor
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

						 <FormItem {...formItemLayout} label={"批准人"}>
                            {getFieldDecorator('Approver', {
                                rules: [{ required: false, message: '请正确输入批准人"！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                                initialValue: this.props.values.Approver
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>




                        <FormItem {...formItemLayout} label={"测试单位联系方式"}>
                            {getFieldDecorator('testUnitContactMode', {
                                rules: [{ required: false, message: '请输入！' }],
                                initialValue: this.props.values.testUnitContactMode
                            })(
                                <TextArea disabled={this.props.disable}
                                          rows={"4"}  placeholder="请输入软件用户对象描述"/>
                            )}
                        </FormItem>


                        <FormItem
                            label="电话"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnittelephone', {
                                rules: [{ required: false, message: '请输入委托单位信息！',pattern:"^[a-zA-Z0-9/.]+$" }],
                                initialValue: this.props.values.consignUnittelephone
                            })(
                                <Input placeholder="请输入电话号码" />
                            )}
                        </FormItem>

                        <FormItem
                            label="传真"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitFax', {
                                rules: [{ required: false, message: '请输入传真号！',pattern:"^[a-zA-Z0-9/.]+$" }],
                                initialValue: this.props.values.consignUnitFax
                            })(
                                <Input placeholder="请输入传真号" />
                            )}

                        </FormItem>

                        <FormItem
                            label="地址"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitaddress', {
                                rules: [{ required: false, message: '请输入地址！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$"}],
                                initialValue: this.props.values.consignUnitaddress
                            })(
                                <Input placeholder="请输入地址" />
                            )}
                        </FormItem>

                        <FormItem
                            label="邮编"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitEmailnumber', {
                                rules: [{ required: false, message: '请输入邮编！',pattern:"^[a-zA-Z0-9/.]+$" }],
                                initialValue: this.props.values.consignUnitEmailnumber
                            })(
                                <Input placeholder="请输入邮编" />
                            )}
                        </FormItem>

                        <FormItem
                            label="联系人"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitpeople', {
                                rules: [{ required: false, message: '请输入联系人！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$"}],
                                initialValue: this.props.values.consignUnitpeople
                            })(
                                <Input placeholder="请输入联系人" />
                            )}
                        </FormItem>



                        <FormItem
                            label="E-mail"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('consignUnitEmail', {
                                rules: [{ required: false, message: '请输入E-mail！',pattern:"^[a-zA-Z0-9/.]+$" }],
                                initialValue: this.props.values.consignUnitEmail
                            })(
                                <Input placeholder="请输入邮箱地址" />
                            )}
                        </FormItem>

                        </TabPane>
                        <TabPane tab="测试环境" key="2">

                            <FormItem
                                label="硬件环境"
                                {...formItemLayout}
                            >
                                <span className="ant-form-text"></span>
                            </FormItem>

                            <div>
                                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                                    添加硬件环境
                                </Button>
                                <Table bordered dataSource={dataSource} columns={columns} />
                            </div>

                            <FormItem
                                label="软件环境"
                                {...formItemLayout}
                            >
                                <span className="ant-form-text"></span>
                            </FormItem>

                              <SoftwareEnvironmentTable
                              />

                        </TabPane>


                       <TabPane tab="测试依据和参考资料" key="3">
                           <FormItem {...formItemLayout} label={"测试依据"}>
                               {getFieldDecorator('testBasic', {
                                   rules: [{ required: false, message: '请正确输入测试依据！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                   initialValue: this.props.values.testBasic
                               })(
                                   <Input disabled={this.props.disable}/>
                               )}
                           </FormItem>

                           <FormItem {...formItemLayout} label={"参考资料"}>
                               {getFieldDecorator('referenceContent', {
                                   rules: [{ required: false, message: '请正确输入参考资料！' ,pattern:"^[A-Za-z]+$"}],
                                   initialValue: this.props.values.referenceContent
                               })(
                                   <Input disabled={this.props.disable}/>
                               )}
                           </FormItem>

                       </TabPane>
                        <TabPane tab="测试内容" key="4">

                            <FormItem
                                label="功能性测试"
                                {...formItemLayout}
                            >
                                <span className="ant-form-text"></span>
                            </FormItem>
                            <FunctionEditableTable
                            />

                            <FormItem
                                label="效率测试"
                                {...formItemLayout}
                            >
                                <span className="ant-form-text"></span>
                            </FormItem>
                            <EfficiencyEditableTable
                            />

                            <FormItem
                                label="可移植性测试"
                                {...formItemLayout}
                            >
                                <span className="ant-form-text"></span>
                            </FormItem>
                            <EfficiencyEditableTable
                            />

                            <FormItem
                                label="易用性测试"
                                {...formItemLayout}
                            >
                                <span className="ant-form-text"></span>
                            </FormItem>
                            <EfficiencyEditableTable
                            />

                            <FormItem
                                label="可靠性测试"
                                {...formItemLayout}
                            >
                                <span className="ant-form-text"></span>
                            </FormItem>
                            <EfficiencyEditableTable
                            />

                            <FormItem
                                label="可维护测试"
                                {...formItemLayout}
                            >
                                <span className="ant-form-text"></span>
                            </FormItem>
                            <EfficiencyEditableTable
                            />
                        </TabPane>
                    </Tabs>
                </div>
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
export default Form.create()(TestReportContentComponent);
