/*测试问题*/
import React, {Component, PropTypes} from 'react';
import {Form,Table, Card, Collapse, Badge, Dropdown, Menu, Button,Input,Icon, Row, Col, Popconfirm, DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
const Panel = Collapse.Panel;
const { TextArea } = Input;

class TestProblemContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    /* TODO propTypes要改成testProblemData */
    static propTypes = {
        //setListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        //deleteConsign: PropTypes.func,
        //getConsignList: PropTypes.func,
        //newConsign: PropTypes.func,
        //enableNew: PropTypes.bool,
    };

    /*
    componentWillMount() {
        //     this.curID = this.props.curKey;
        //     // console.log(this.curID);
        this.props.getValues(this.props.testCaseData.id);
        //     // console.log(this.values);
    };
    */

    expandedRowRender = (record) => {
        const rowStyle = {
            marginBottom:'10pt',
        };

        return (
            <div>
                <Row style={rowStyle}>
                    <Col span={5}><b>问题（缺陷）简要描述</b></Col>
                    <Col span={19}><p style={{ margin: 0 }}>{record.description}</p></Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={5}><b>发现缺陷的初始条件</b></Col>
                    <Col span={19}><p style={{ margin: 0 }}>{record.initialConditions}</p></Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={5}><b>发现缺陷用例及具体操作路径</b></Col>
                    <Col span={19}><p style={{ margin: 0 }}>{record.operationPath}</p></Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={5}><b>修改建议</b></Col>
                    <Col span={19}><p style={{ margin: 0 }}>{record.advice}</p></Col>
                </Row>
            </div>
        );
    };

    onClick = (buttonIndex) => () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.buttons[buttonIndex].onClick(this.props.consignData, JSON.stringify(values));
        //     }
        // });
        const {buttons, form} = this.props;
        buttons[buttonIndex].onClick(JSON.stringify(form.getFieldsValue()));
    };

    /*table列设置*/
    columns = [{
        title:"序号",
        dataIndex:"id",
    }, {
        title:"问题（缺陷）简要描述",
        dataIndex:"description",
    }, {
        title:"对应需求条目",
        dataIndex:"requirementIndex",
    }, {
        title:"关联用例",
        dataIndex:"relatedTestCase",
    }, {
        title:"发现时间",
        dataIndex:"discoveryTime",
    }, {
        title:"测试执行人",
        dataIndex:"executor",
    }, {
        title:"确认人",
        dataIndex:"confirmor",
    }, {
        title:"操作",
        dataIndex:"action",
        render: (text, record) => {
        return (
            <Popconfirm title="确认删除此测试问题吗？" onConfirm={() => this.onDelete(record.key)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
        );
      },
    },/*{
        title:"依据",
        dataIndex:"accordance",
    }*/
    ];

    /* TODO 删除测试问题 */
    onDelete = (key) => {
        // this.props.deleteTestCase(key);
    }

    data = [{
        id: 1,
        description: 'a bug in 小猪佩奇',
        process: 'unhappy->happy',
        requirementIndex: 25,
        initialConditions: '佩奇是一只猪',
        operationPath: '佩奇->乔治',
        relatedTestCase: 'yj',
        discoveryTime: '2018-06-06',
        executor: 'yj',
        confirmor: 'qqyx',
        advice: '给曹老板打call'
    }];

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>测试问题清单</h3>

                <Collapse bordered={false}>
                    <Panel header="添加测试问题" key="1">
                        <div style={{ background: '#ECECEC', padding: '15px', marginBottom:'10pt' }}>
                            <Card bordered={false} style={{ width: '100%' }}>
                                <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
                                    <FormItem {...formItemLayout} label={"问题/缺陷简要描述"}>
                                        {getFieldDecorator('description', {
                                        // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                        })(
                                            <TextArea rows={2} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label={"对应需求条目"}>
                                        {getFieldDecorator('requirementIndex', {
                                        // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                        })(
                                            <TextArea rows={2} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label={"发现缺陷的初始条件"}>
                                        {getFieldDecorator('initialConditions', {
                                            // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                        })(
                                            <TextArea rows={2} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label={"发现缺陷用例及具体操作路径"}>
                                        {getFieldDecorator('operationPath', {
                                            // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                        })(
                                            <TextArea rows={4} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label={"关联用例"}>
                                        {getFieldDecorator('relatedTestCase', {
                                            // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label={"发现时间"}>
                                        {getFieldDecorator('discoveryTime', {
                                            // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                        })(
                                            <DatePicker/>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label={"测试执行人"}>
                                        {getFieldDecorator('executor', {
                                            // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                    <FormItem{...formItemLayout}label={"确认人"}>
                                        {getFieldDecorator('confirmor', {
                                            // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                        })(
                                            <Input/>
                                      )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label={"修改建议"}>
                                        {getFieldDecorator('advice', {
                                            // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                        })(
                                            <TextArea rows={4} />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                    {/*this.props.buttons.map((button, index) =>
                                    <Button onClick={this.onClick(index)}
                                            key={button.content}>
                                        {button.content}
                                    </Button>)*/}
                                        <Button type='primary'><Icon type="plus-circle-o" />添加测试问题</Button>
                                </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Panel>
                </Collapse>
                <Table
                    className="components-table-demo-nested"
                    columns={this.columns}
                    expandedRowRender={this.expandedRowRender}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={this.data}
                    rowKey={'id'}
                />
            </div>
        );
    }
}

export default Form.create()(TestProblemContentComponent);

