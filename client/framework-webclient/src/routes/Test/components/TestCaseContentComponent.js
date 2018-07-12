/*测试用例*/
import React, {Component, PropTypes} from 'react';
import {Form, message, Table, Card, Collapse, Badge, Divider, Modal, Button,Input,Icon, Row, Col, Popconfirm, DatePicker,InputNumber} from 'antd'
import {EditableCell} from "COMPONENTS/EditableCell";
import {getProjectList} from "SERVICES/ProjectService";
import {newTestCase} from "SERVICES/TestCaseService";
import {STATUS} from "SERVICES/common";

const FormItem=Form.Item;
const Panel = Collapse.Panel;
const { TextArea } = Input;

class TestCaseContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    state={
        dataSource : [{
            id: 1,
            classification: 'yj',
            process: 'unhappy->happy',
            expectedResult: 'happy',
            designer: 'yj',
            time: '2018-06-03',
            action: 'delete',
            designNotes: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            statute: 'sssssss',
            accordance: 'tttttt'
        }],
        count: 1,
    }

    static propTypes = {
        projectData: PropTypes.object.isRequired,
        values: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
    };

    componentWillMount() {
        //     this.curID = this.props.curKey;
        //     // console.log(this.curID);
        // this.props.getValues(this.props.projectData.id);
        //     // console.log(this.values);
        this.props.getProjectList();
        const {projectData} = this.props;
        const dataSource = projectData.testCase.map(item => {
            const data = item.body?JSON.parse(item.body) : {};
            return {...item, ...data}
        });
        const count = projectData.testCase.length;
        this.setState({dataSource, count});
    };

    expandedRowRender = (record) => {
        const rowStyle = {
            marginBottom:'10pt',
        };

        const customPanelStyle = {
            background: '#fafafa',
            borderRadius: 4,
            marginBottom: 0,
            border: 0,
            overflow: 'hidden',
        };

        return (
            <div>
                <Row style={rowStyle}>
                    <Col span={3}><b>设计说明</b></Col>
                    <Col span={21}>
                        <EditableCell
                            value={record.designNotes}
                            onChange={this.onCellChange(record.id, 'designNotes')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>有关的规约说明</b></Col>
                    <Col span={21}>
                        <EditableCell
                            value={record.statute}
                            onChange={this.onCellChange(record.id, 'statute')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>依据</b></Col>
                    <Col span={21}>
                        <EditableCell
                            value={record.accordance}
                            onChange={this.onCellChange(record.id, 'accordance')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>前提条件</b></Col>
                    <Col span={21}>
                        <EditableCell
                            value={record.prerequisites}
                            onChange={this.onCellChange(record.id, 'prerequisites')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>执行过程</b></Col>
                    <Col span={21}>
                        <EditableCell
                            value={record.process}
                            onChange={this.onCellChange(record.id, 'process')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>预期结果</b></Col>
                    <Col span={21}>
                        <EditableCell
                            value={record.expectedResult}
                            onChange={this.onCellChange(record.id, 'expectedResult')}
                        />
                    </Col>
                </Row>
                <Divider orientation="left">测试记录</Divider>
                <Row style={rowStyle}>
                    <Col span={3}><b>实际结果</b></Col>
                    <Col span={21}>
                        <EditableCell
                            value={record.result}
                            onChange={this.onCellChange(record.id, 'result')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>执行者</b></Col>
                    <Col span={21}>
                        <EditableCell
                            value={record.executor}
                            onChange={this.onCellChange(record.id, 'executor')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>确认人</b></Col>
                    <Col span={21}>
                        <EditableCell
                            value={record.confirmor}
                            onChange={this.onCellChange(record.id, 'confirmor')}
                        />
                    </Col>
                </Row>

                <Collapse bordered={false}>
                    <Panel
                        header={<p>添加/修改测试记录<Icon type="edit" /></p>}
                        key="1"
                        //showArrow={false}
                        style={customPanelStyle}
                    >
                        <Row style={rowStyle}>
                            <Col span={3}><b>实际结果</b></Col>
                            <Col span={21}>
                                <EditableCell
                                    value={record.result}
                                    onChange={this.onCellChange(record.id, 'result')}
                                />
                            </Col>
                        </Row>
                        <Row style={rowStyle}>
                            <Col span={3}><b>执行者</b></Col>
                            <Col span={21}>
                                <EditableCell
                                    value={record.executor}
                                    onChange={this.onCellChange(record.id, 'executor')}
                                />
                            </Col>
                        </Row>
                        <Row style={rowStyle}>
                            <Col span={3}><b>确认人</b></Col>
                            <Col span={21}>
                                <EditableCell
                                    value={record.confirmor}
                                    onChange={this.onCellChange(record.id, 'confirmor')}
                                />
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="添加/修改测试问题" key="2" showArrow={false} style={customPanelStyle}>
                        <Row style={rowStyle}>
                            <Col span={5}><b>问题/缺陷简要描述</b></Col>
                            <Col span={19}>
                                <EditableCell
                                    value={record.description}
                                    onChange={this.onCellChange(record.id, 'description')}
                                />
                            </Col>
                        </Row>
                        <Row style={rowStyle}>
                            <Col span={5}><b>对应需求条目</b></Col>
                            <Col span={19}>
                                <EditableCell
                                    value={record.requirementIndex}
                                    onChange={this.onCellChange(record.id, 'requirementIndex')}
                                />
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>

                <Divider orientation="left">测试问题</Divider>
                <Row style={rowStyle}>
                    <Col span={5}><b>问题/缺陷简要描述</b></Col>
                    <Col span={19}>
                        <EditableCell
                            value={record.description}
                            onChange={this.onCellChange(record.id, 'description')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={5}><b>对应需求条目</b></Col>
                    <Col span={19}>
                        <EditableCell
                            value={record.requirementIndex}
                            onChange={this.onCellChange(record.id, 'requirementIndex')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={5}><b>发现缺陷的初始条件</b></Col>
                    <Col span={19}>
                        <EditableCell
                            value={record.initialConditions}
                            onChange={this.onCellChange(record.id, 'initialConditions')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={5}><b>发现缺陷的具体操作路径</b></Col>
                    <Col span={19}>
                        <EditableCell
                            value={record.operationPath}
                            onChange={this.onCellChange(record.id, 'operationPath')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={5}><b>发现时间</b></Col>
                    <Col span={19}>
                        <EditableCell
                            value={record.discoveryTime}
                            onChange={this.onCellChange(record.id, 'discoveryTime')}
                        />
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={5}><b>修改建议</b></Col>
                    <Col span={19}>
                        <EditableCell
                            value={record.advice}
                            onChange={this.onCellChange(record.id, 'advice')}
                        />
                    </Col>
                </Row>

            </div>
        );
    };

    onClick = () => () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.buttons[buttonIndex].onClick(this.props.consignData, JSON.stringify(values));
        //     }
        // });
        //const {buttons, form} = this.props;
        //buttons[buttonIndex].
        //onClick(JSON.stringify(form.getFieldsValue()));
        const {form} = this.props;
        //const fieldsValue = JSON.parse/*stringify*/((form.getFieldsValue()));
        const fieldsValue = (form.getFieldsValue());
        /*TODO*/
        //this.state.data.push(fieldsValue);
        //console.log(this.state.data);
        //this.props.addTestCase(this.props.projectData,fieldsValue);
    };

    /*table列设置*/
    columns = [{
        title: "序号",
        dataIndex: "id",
        render: (_, __, index) => index,
    }, {
        title:"测试分类",
        dataIndex:"classification",
        render: (text, record) => (
            <EditableCell
                value={text}
                onChange={this.onCellChange(record.id, 'classification')}
            />
        ),
    },
        /*{
        title:"测试用例设计说明",
        dataIndex:"designNotes",
    },
     {
        title:"与本测试用例有关的规约说明",
        dataIndex:"statute",
    },
        {
        title:"执行过程",
        dataIndex:"process",
        render: (text, record) => (
            <EditableCell
                value={text}
                onChange={this.onCellChange(record.id, 'process')}
            />
        ),
    }, {
        title:"预期结果",
        dataIndex:"expectedResult",
        render: (text, record) => (
            <EditableCell
                value={text}
                onChange={this.onCellChange(record.id, 'expectedResult')}
            />
        ),
    }, */
        {
        title:"设计者",
        dataIndex:"designer",
        render: (text, record) => (
            <EditableCell
                value={text}
                onChange={this.onCellChange(record.id, 'designer')}
            />
        ),
    }, {
        title:"时间",
        dataIndex:"createdTime",
    }, {
        title:"操作",
        dataIndex:"action",
        render: (text, record) => {
        return (
            <div>
                <Popconfirm title="确认删除此测试用例吗？" onConfirm={() => this.onDelete(record.id)}>
                    <a href="javascript:;">删除</a>
                </Popconfirm>
                <Divider type="vertical"/>
                <a href="javascript:void(0);" onClick={this.addTestRecord(record.id)}>测试记录</a>
                <Divider type="vertical"/>
                <a href="javascript:void(0);" onClick={this.addTestProblem(record.id)}>测试问题</a>
            </div>

        );
      },
    },/*{
        title:"依据",
        dataIndex:"accordance",
    }*/
    ];

    addTestRecord = (id) => {

    }

    addTestProblem = (id) => {

    }

    onCellChange = (id, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.id === id);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
            }
            target.body = {...target};
            this.props.updateTestCase(target, (status) => {
                if (status === STATUS.SUCCESS)
                    message.success('修改测试用例成功');
                else
                    message.error('修改测试用例失败');
            })
        };
    }
    onDelete = (id) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
        this.props.deleteTestCase(id, (status) => {
            if (status === STATUS.SUCCESS)
                message.success('删除测试用例成功');
        });
    }
    handleAdd = () => {
        let { count, dataSource } = this.state;
        const {newTestCase, updateTestCase, projectData, form} = this.props;
        const newData = {
            // id: count + 1,
            ...form.getFieldsValue(),
        };
        newTestCase(projectData.id, (data) => {
            data.body = newData;
            newData.createdTime = data.createdTime;
            updateTestCase(data, (status) => {
                if (status === STATUS.SUCCESS) {
                    this.setState({
                        dataSource: [...dataSource, newData],
                    });
                    message.success('新添测试用例成功')
                }
            });
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>测试用例</h3>
                <Collapse bordered={false}>
                    <Panel
                        showArrow={false}
                        header={<Button>添加测试用例</Button>}
                        key="1"
                    >
                        <div style={{ background: '#ECECEC', padding: '15px', marginBottom:'10pt' }}>
                        <Card bordered={false} style={{ width: '100%' }}>
                            <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
                                <FormItem {...formItemLayout} label={"测试分类"}>
                                    {getFieldDecorator('classification', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"设计者"}>
                                    {getFieldDecorator('designer', {
                                        // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"设计说明"}>
                                    {getFieldDecorator('designNotes', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"执行过程"}>
                                    {getFieldDecorator('process', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"预期结果"}>
                                    {getFieldDecorator('expectedResult', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                                {/*<FormItem {...formItemLayout} label={"时间"}>*/}
                                    {/*{getFieldDecorator('time', {*/}
                                    {/*// rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],*/}
                                    {/*})(*/}
                                        {/*<DatePicker/>*/}
                                    {/*)}*/}
                                {/*</FormItem>*/}
                                <FormItem{...formItemLayout}label={"有关的规约说明"}>
                                    {getFieldDecorator('statute', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"依据"}>
                                    {getFieldDecorator('accordance', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {/*this.props.buttons.map((button, index) =>
                                    <Button onClick={this.onClick(index)}
                                            key={button.content}>
                                        {button.content}
                                    </Button>)*/}
                                        <Button type='primary' onClick={this.handleAdd}>
                                            <Icon type="plus-circle-o" />添加测试用例
                                        </Button>
                                </FormItem>
                            </Form>
                        </Card>
                        </div>
                    </Panel>
                </Collapse>

                <Row gutter={16}>
                    <Col span={18}>
                        <Table
                            className="components-table-demo-nested"
                            columns={this.columns}
                            expandedRowRender={this.expandedRowRender}
                            // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                            dataSource={/*this.props.dataSource*/this.state.dataSource}
                            rowKey={'id'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col offset={18} span={6}>
                        <Card title="Card title" extra={<a href="#">More</a>} style={{ width: "100%" }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(TestCaseContentComponent);
