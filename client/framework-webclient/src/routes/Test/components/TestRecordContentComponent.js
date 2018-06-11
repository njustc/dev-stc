/*测试记录清单*/
import React, {Component, PropTypes} from 'react';
import {Form,Table, Card, Collapse, Badge, Dropdown, Menu, Button,Input,Icon, Row, Col, Popconfirm, DatePicker,InputNumber} from 'antd'
const FormItem=Form.Item;
const Panel = Collapse.Panel;
const { TextArea } = Input;


class TestRecordContentComponent extends Component {
constructor(props) {
        super(props);
    }

    /* TODO propTypes要改成testRecordData */
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
                    <Col span={3}><b>设计说明</b></Col>
                    <Col span={21}><p style={{ margin: 0 }}>{record.designNotes}</p></Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>有关的规约说明</b></Col>
                    <Col span={21}><p style={{ margin: 0 }}>{record.statute}</p></Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>依据</b></Col>
                    <Col span={21}><p style={{ margin: 0 }}>{record.accordance}</p></Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>前提条件</b></Col>
                    <Col span={21}><p style={{ margin: 0 }}>{record.prerequisites}</p></Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={3}><b>测试执行过程</b></Col>
                    <Col span={21}><p style={{ margin: 0 }}>{record.process}</p></Col>
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
        title:"预期结果",
        dataIndex:"expectedResult",
    }, {
        title:"实际结果",
        dataIndex:"result",
    }, {
        title:"是否与预期结果一致",
        dataIndex:"consistency",
    }, {
        title:"相关bug编号",
        dataIndex:"bugID",
    }, {
        title:"执行者",
        dataIndex:"executor",
    }, {
        title:"执行测试时间",
        dataIndex:"time",
    }, {
        title:"确认人",
        dataIndex:"confirmor",
    }, {
        title:"操作",
        dataIndex:"action",
        render: (text, record) => {
        return (
            <Popconfirm title="确认删除此测试记录吗？" onConfirm={() => this.onDelete(record.key)}>
              <a href="javascript:;">删除</a>
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
        classification: 'SE',
        designNotes: '小猪佩奇社会人',
        statute: 'JS009',
        accordance: 'JS010',
        description: '小猪佩奇测试记录',
        process: '第一步……，第二步……，然后……，最后……。',
        expectedResult: '在期末考试周结束前完工',
        result: '大概是完工不了的TAT',
        consistency: false,
        bugID: 250,
        time: '2018-06-09',
        prerequisites: '选择软件工程方向',
        executor: 'yj',
        confirmor: 'cc'
    }];

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>测试记录</h3>
                <Collapse bordered={false}>
                    <Panel header="添加测试记录" key="1">
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
                                <FormItem {...formItemLayout} label={"设计说明"}>
                                    {getFieldDecorator('designNotes', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                                <FormItem{...formItemLayout}label={"有关的规约说明"}>
                                    {getFieldDecorator('statute', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"前提条件"}>
                                    {getFieldDecorator('prerequisites', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <TextArea rows={2} />
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
                                <FormItem {...formItemLayout} label={"实际结果"}>
                                    {getFieldDecorator('result', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"是否与预期结果一致"}>
                                    {getFieldDecorator('consistency', {
                                        // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"测试依据"}>
                                    {getFieldDecorator('accordance', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"相关bug编号"}>
                                    {getFieldDecorator('bugID', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"执行测试时间"}>
                                    {getFieldDecorator('time', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <DatePicker/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"执行者"}>
                                    {getFieldDecorator('executor', {
                                        // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"确认人"}>
                                    {getFieldDecorator('confirmor', {
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
                                        <Button type='primary'><Icon type="plus-circle-o" />添加测试记录</Button>
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
export default Form.create()(TestRecordContentComponent);
