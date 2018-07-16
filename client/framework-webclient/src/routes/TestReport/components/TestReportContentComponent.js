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

/**
 * test主函数
 * @func
 */
class TestReportContentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

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


    /**
     *  formItemLayout：定义form的大小；dataSource1：从后台得到硬件环境表格的数据；columns1：定义硬件环境表格的格式
     *  dataSource2：从后台得到软件环境表格的数据；columns2：定义软件环境表格的格式
     *  dataSource3：从后台得到功能性测试表格的数据；columns3：定义功能性测试表格的格式
     *  dataSource4：从后台得到非功能性测试表格的数据；columns4：定义非功能性测试表格的格式
     *  return是前端显示页面的html
     *  @func
     */
    render() {
        const { getFieldDecorator } = this.props.form;
        //const { dataSource } = this.state;
        //const columns = this.columns;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 },
        };

        const dataSource1 = JSON.parse(this.props.projectData.testPlan.body).hardware;
        const columns1 = [{
            title: '序号',
            dataIndex: 'number',
            key: 'number',
        }, {
            title: '硬件名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '硬件类别',
            dataIndex: 'kind',
            key: 'kind',
        }, {
            title: '配置',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '数量',
            dataIndex: 'amount',
            key: 'amount',
        }];

        const dataSource2 = JSON.parse(this.props.projectData.testPlan.body).software;
        const columns2 = [{
            title: '序号',
            dataIndex: 'softwarenumber',
            key: 'softwarenumber',
        }, {
            title: '软件名称',
            dataIndex: 'softwarename',
            key: 'softwarename',
        }, {
            title: '软件类别',
            dataIndex: 'softwarekind',
            key: 'softwarekind',
        }, {
            title: '软件版本',
            dataIndex: 'softwareversion',
            key: 'softwareversion',
        },];

        const dataSource3 = [];
        const columns3 = [{
            title: '序号',
            dataIndex: 'functionalnumber',
            key: 'functionalnumber',
        }, {
            title: '功能模块',
            dataIndex: 'functionalmodule',
            key: 'softwarename',
        }, {
            title: '功能要求',
            dataIndex: 'functionalrequirements',
            key: 'functionalrequirements',
        }, {
            title: '测试结果',
            dataIndex: 'testresult',
            key: 'testresult',
        },];

        const dataSource4 = [];
        const columns4 = [{
            title: '类别',
            dataIndex: 'notfunctionalkind',
            key: 'notfunctionalkind',
        },{
            title: '序号',
            dataIndex: 'notfunctionalnumber',
            key: 'notfunctionalnumber',
        }, {
            title: '测试特性',
            dataIndex: 'testcharacteristics',
            key: 'testcharacteristics',
        }, {
            title: '测试说明',
            dataIndex: 'testinstructions',
            key: 'testinstructions',
        }, {
            title: '测试结果',
            dataIndex: 'notfunctionaltestresult',
            key: 'notfunctionaltestresult',
        },];

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

                            <Table dataSource={dataSource1} columns={columns1} />

                            <FormItem
                                label="软件环境"
                                {...formItemLayout}
                            >
                                <span className="ant-form-text"></span>
                            </FormItem>

                            <Table dataSource={dataSource2} columns={columns2} />


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
                        {/*<TabPane tab="测试内容" key="4">*/}

                            {/*<FormItem*/}
                                {/*label="功能性测试"*/}
                                {/*{...formItemLayout}*/}
                            {/*>*/}
                                {/*<span className="ant-form-text"></span>*/}
                            {/*</FormItem>*/}

                            {/*<Table dataSource={dataSource3} columns={columns3} />*/}

                            {/*<FormItem*/}
                                {/*label="非功能性测试"*/}
                                {/*{...formItemLayout}*/}
                            {/*>*/}
                                {/*<span className="ant-form-text"></span>*/}
                            {/*</FormItem>*/}

                            {/*<Table dataSource={dataSource4} columns={columns4} />*/}


                        {/*</TabPane>*/}
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
