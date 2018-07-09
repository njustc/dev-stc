/*测试用例*/
import React, {Component, PropTypes} from 'react';
import {Form,Table, Card, Collapse, Badge, Dropdown, Menu, Button,Input,Icon, Row, Col, Popconfirm, DatePicker,InputNumber} from 'antd'
import {EditableCell} from "COMPONENTS/EditableCell";
import {getProjectList} from "SERVICES/ProjectService";

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
        addTestCase: PropTypes.func.isRequired,
        values: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
    };

    componentWillMount() {
        //     this.curID = this.props.curKey;
        //     // console.log(this.curID);
        // this.props.getValues(this.props.projectData.id);
        //     // console.log(this.values);
        getProjectList();
        this.state.dataSource = this.props.projectData.testCase.map(item => {return {...item, ...item.body}});
        this.state.count = this.props.projectData.testCase.length;
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
                    <Col span={3}><b>依据</b></Col>
                    <Col span={21}><p style={{ margin: 0 }}>{record.accordance}</p></Col>
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
        title:"序号",
        dataIndex:"id",
    }, {
        title:"测试分类",
        dataIndex:"classification",
        render: (text, record) => (
            <EditableCell
                value={text}
                onChange={this.onCellChange(record.key, 'classification')}
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
    },*/
        {
        title:"执行过程",
        dataIndex:"process",
    }, {
        title:"预期结果",
        dataIndex:"expectedResult",
    }, {
        title:"设计者",
        dataIndex:"designer",
    }, {
        title:"时间",
        dataIndex:"time",
    }, {
        title:"操作",
        dataIndex:"action",
        render: (text, record) => {
        return (
            <Popconfirm title="确认删除此测试用例吗？" onConfirm={() => this.onDelete(record.id)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
        );
      },
    },/*{
        title:"依据",
        dataIndex:"accordance",
    }*/
    ];

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
    onDelete = (id) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            id: count + 1,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
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
                                <FormItem {...formItemLayout} label={"时间"}>
                                    {getFieldDecorator('time', {
                                    // rules: [{ required: true, message: '请正确输入委托单位！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                                    })(
                                        <DatePicker/>
                                    )}
                                </FormItem>
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

                <Table
                    className="components-table-demo-nested"
                    columns={this.columns}
                    expandedRowRender={this.expandedRowRender}
                    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={/*this.props.dataSource*/this.state.dataSource}
                    rowKey={'id'}
                />
            </div>
        );
    }
}

export default Form.create()(TestCaseContentComponent);
