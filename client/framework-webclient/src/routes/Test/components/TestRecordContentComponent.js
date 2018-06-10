/*测试记录清单*/
import React, {Component, PropTypes} from 'react';
import {Form,Table, Card, Badge, Dropdown, Menu, Button,Input,Icon, Row, Col, Popconfirm, DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
class TestRecordContentComponent extends Component {
constructor(props) {
        super(props);
    }

    static defaultProps = {
        values: {},
        disable:false,
        buttons: [],
    };

    static propTypes = {
        //setListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        //deleteConsign: PropTypes.func,
        //getConsignList: PropTypes.func,
        //newConsign: PropTypes.func,
        //enableNew: PropTypes.bool,
    };

    expandedRowRender = (record) => {
        const rowStyle = {
            marginBottom:'10pt',
        };

        return (
            <div>
                <Row style={rowStyle}>
                    <Col span={3}><b>设计说明</b></Col>
                    <Col span={21}><p style={{ margin: 0 }}>{record.designNotes}</p></Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>有关的规约说明</b></Col>
                    <Col span={21}><p style={{ margin: 0 }}>{record.statute}</p></Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={5}><b>前提条件</b></Col>
                    <Col span={19}><p style={{ margin: 0 }}>{record.prerequisites}</p></Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={5}><b>测试执行过程</b></Col>
                    <Col span={19}><p style={{ margin: 0 }}>{record.process}</p></Col>
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
        title:"测试分类",
        dataIndex:"classification",
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
            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
        );
      },
    },/*{
        title:"依据",
        dataIndex:"accordance",
    }*/
    ];

    /* TODO 删除测试记录 */
    onDelete = (key) => {
        // this.props.deleteTestCase(key);
    }

    data = [{
        id: 1,
        description: 'a bug in 小猪佩奇',
        process: 'unhappy->happy',
        prerequisites: 'idk',
        requirementIndex: 25,
        initialConditions: '佩奇是一只猪',
        operationPath: '佩奇->乔治',
        relatedTestCase: 'yj',
        discoveryTime: '2018-06-06',
        executor: 'yj',
        confirmor: 'qqyx',
        advice: '一心一意易烊千玺。——from送考老母亲QX'
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
                <div style={{ background: '#ECECEC', padding: '30px', marginBottom:'10pt' }}>
                    <Card title="添加测试问题" bordered={false} style={{ width: '100%' }}>
                        <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
                            <FormItem {...formItemLayout} label={"问题（缺陷）简要描述"}>
                                {getFieldDecorator('description', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label={"发现缺陷的初始条件"}>
                                {getFieldDecorator('initialConditions', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label={"发现缺陷用例及具体操作路径"}>
                                {getFieldDecorator('operationPath', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                })(
                                    <Input/>
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
                                    <Input/>
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
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout}>
                                {this.props.buttons.map((button, index) =>
                                    <Button onClick={this.onClick(index)}
                                            key={button.content}>
                                        {button.content}
                                    </Button>)}
                            </FormItem>
                        </Form>
                    </Card>
                </div>
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
export default Form.create()(TestRecordContentComponent);
