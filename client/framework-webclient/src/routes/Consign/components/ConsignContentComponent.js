import React, {Component, PropTypes} from 'react';
import {Row, Col, Card, Tabs, Select, Button, Layout, Form, Input,Radio,Checkbox,Icon,DatePicker} from 'antd';

const FormItem=Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

class ConsignContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        values: {},
        disable:false,
        buttons: [],
    };

    static propTypes = {
        values: PropTypes.object.isRequired,
        disable: PropTypes.bool.isRequired,
        buttons: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
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


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout =  {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };

        const longFILayout =  {
            labelCol: { span: 12 },
            wrapperCol: { span: 10 },
        };

        const buttonItemLayout =  {
            wrapperCol: { span: 14, offset: 4 },
        } ;


        return(
            <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>

                <FormItem {...formItemLayout}>
                    <h1>软件项目委托测试申请书</h1>
                </FormItem>


                <FormItem>请用✓选择：○——单选； ◻——多选。</FormItem>


                <FormItem {...formItemLayout} label="测试类型">
                    {getFieldDecorator('testType', {
                        rules: [{ required: true, message: '请选择至少一项测试类型!'}],
                        initialValue: this.props.values.testType,
                    })(
                        <Checkbox.Group disabled={this.props.disable}>
                            <Checkbox value={"软件确认测试"}/>软件确认测试
                            <Checkbox value={"成果/技术鉴定测试"}/>成果/技术鉴定测试
                            <Checkbox value={"专项资金验收测试"}/>专项资金验收测试
                            <Checkbox value={"其他"}/>其他：
                        </Checkbox.Group>
                    )}
                </FormItem>


                <FormItem {...formItemLayout} label="请输入软件名称">
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

                {/*todo功能表*/}
                <FormItem {...formItemLayout} label={"委托单位(中文)"}>
                    {getFieldDecorator('consignUnitC', {
                        rules: [{ required: true, message: '请正确输入委托单位(中文)！' ,pattern:"^[\u4E00-\u9FA5]+$"}],
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>


                <FormItem {...formItemLayout} label={"委托单位(英文)"}>
                    {getFieldDecorator('consignUnitE', {
                        rules: [{ required: true, message: '请正确输入委托单位(英文)！' ,pattern:"^[A-Za-z]+$"}],
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>


                <FormItem {...formItemLayout} label={"开发单位"}>
                    {getFieldDecorator('developUnit', {
                        rules: [{ required: true, message: '请正确输入开发单位！',pattern:"^[\u4E00-\u9FA5A-Za-z]+$" }],
                    })(
                        <Input disabled={this.props.disable}/>
                    )}
                </FormItem>


                <FormItem {...formItemLayout} label={"单位性质"}>
                    {getFieldDecorator('unitProp', {
                        rules: [{ required: true, message: '请选择！'}],
                    })(
                        <RadioGroup name={"单位性质:"} disabled={this.props.disable}>
                            <Radio value={"内资企业"}/>内资企业
                            <Radio value={"外(合)资企业"}/>外(合)资企业
                            <Radio value={"港澳台(合)资企业"}/>港澳台(合)资企业
                            <Radio value={"科研院校"}/>科研院校
                            <Radio value={"政府事业团体"}/>政府事业团体
                            <Radio value={"其它"}/>其它
                        </RadioGroup>
                    )}
                </FormItem>


                <FormItem {...formItemLayout} label={"软件用户对象描述"}>
                    {getFieldDecorator('objDesc', {
                        rules: [{ required: true, message: '请输入！' }],
                    })(
                        <TextArea disabled={this.props.disable}
                                  rows={"4"}  placeholder="请输入软件用户对象描述"/>
                    )}
                </FormItem>


                <FormItem {...formItemLayout} label={"主要功能及用途简介"}>
                    {getFieldDecorator('funcDesc', {
                        rules: [{ required: true, message: '请输入主要功能及用途简介（限200字）！' ,max:200 }],
                    })(
                        <TextArea disabled={this.props.disable}
                                  rows={"4"} placeholder="限200字"/>
                    )}
                </FormItem>


                <FormItem {...formItemLayout} label={"测试依据"}>
                    {getFieldDecorator('testBasis', {
                        rules: [{ required: true, message: '请选择至少一项测试依据！' }],
                    })(
                        <Checkbox.Group disabled={this.props.disable} >
                            <Checkbox value={"GB/T 25000.51-2016"}/>GB/T 25000.51-2016
                            <Checkbox value={"GB/T 25000.10-2016"}/>GB/T 25000.10-2016
                            <Checkbox value={"GB/T 28452-2012"}/>GB/T 28452-2012
                            <Checkbox value={"GB/T 30961-2014"}/>GB/T 30961-2014
                            <Checkbox value={"NST-03-WI12-2011"}/>NST-03-WI12-2011
                            <Checkbox value={"NST-03-WI13-2011"}/>NST-03-WI13-2011
                            <Checkbox value={"NST-03-WI22-2014"}/>NST-03-WI22-2014
                            <Checkbox value={"其它"}/>其它
                        </Checkbox.Group>
                    )}
                </FormItem>


                <FormItem {...formItemLayout} label={"需要测试的技术指标"}>
                    {getFieldDecorator('testIndicator', {
                        rules: [{ required: true, message: '请选择至少一项技术指标！' }],
                    })(
                        <Checkbox.Group disabled={this.props.disable}>
                            <Checkbox value={"功能性"}/>功能性>
                            <Checkbox value={"可靠性"}/>可靠性
                            <Checkbox value={"易用性"}/>易用性
                            <Checkbox value={"效率"}/>效率
                            <Checkbox value={"可维护性"}/>可维护性
                            <Checkbox value={"可移植性"}/>可移植性
                            <Checkbox value={"代码覆盖度"}/>代码覆盖度
                            <Checkbox value={"缺陷检测率"}/>缺陷检测率
                            <Checkbox value={"代码风格符合度"}/>代码风格符合度
                            <Checkbox value={"代码不符合项检测率"}/>代码不符合项检测率
                            <Checkbox value={"产品说明要求"}/>产品说明要求
                            <Checkbox value={"用户文档集要求"}/>用户文档集要求
                            <Checkbox value={"其它"}/>其它
                        </Checkbox.Group>
                    )}
                </FormItem>

                {/*以上第一部分*//*如何设定至少一种*/}
                <FormItem{...formItemLayout} label={"软件规模(至少一种)"}>
                    <FormItem{...formItemLayout} label={"功能数："}>
                        {getFieldDecorator('softwareScale.funcNum',
                            {rules: [{ required: false, message: '请输入功能数！',pattern:"^[0-9]+$"}],
                            })(
                            <Input disabled={this.props.disable}
                                   addonBefore={"功能数"}  placeholder={"到最后一级菜单"}/>
                        )}
                    </FormItem>

                    <FormItem{...formItemLayout} label={"功能点数"}>
                        {getFieldDecorator('softwareScale.funcPoint',
                            {rules: [{ required: false, message: '请输入功能点数!',pattern:"^[0-9]+$"}],
                            })(
                            <Input disabled={this.props.disable}
                                   addonBefore={"功能点数"} />
                        )}
                    </FormItem>

                    <FormItem{...formItemLayout} label={"代码行数"}>
                        {getFieldDecorator('softwareScale.codeLine',
                            {rules: [{ required: false, message: '请输入代码行数！',pattern:"^[0-9]+$"}],
                            })(
                            <Input disabled={this.props.disable}
                                   addonBefore={"代码行数"}  placeholder={"不包括注释行和空行"}/>
                        )}
                    </FormItem>
                </FormItem>




                <FormItem {...formItemLayout} label="软件类型">
                    {getFieldDecorator('softwareType', {
                        rules: [{ required: true, message: '请选择！' }],
                    })(
                        <RadioGroup disabled={this.props.disable}
                                    name={"软件类型"} Defaultvalue={"控制软件"}>
                            <FormItem {...formItemLayout}label={"系统软件:"}>
                                <Radio value={"操作系统"}/>操作系统
                                <Radio value={"中文处理系统"}/>中文处理系统
                                <Radio value={"嵌入式操作系统"}/>嵌入式操作系统
                                <Radio value={"系统软件-其它"}/>其它
                            </FormItem>

                            <FormItem {...formItemLayout} label={"支持软件"}>
                                <Radio value={"程序设计语言"}/>程序设计语言
                                <Radio value={"数据库系统设计"}/>数据库系统设计
                                <Radio value={"工具软件"}/>工具软件
                                <Radio value={"网络通信软件"}/>网络通信软件
                                <Radio value={"中间件"}/>中间件
                                <Radio value={"支持软件-其他"}/>其他
                            </FormItem>

                            <FormItem {...formItemLayout} label={"应用软件"}>
                                <Radio value={"行业管理软件"}/>行业管理软件
                                <Radio value={"模式识别软件"}/>模式识别软件
                                <Radio value={"图形图像软件"}/>图形图像软件
                                <Radio value={"控制软件"}/>控制软件
                                <Radio value={"网络应用软件"}/>网络应用软件
                                <Radio value={"信息管理软件"}/>信息管理软件
                                <Radio value={"数据库管理应用软件"}/>数据库管理应用软件
                                <Radio value={"安全与保密软件"}/>安全与保密软件
                                <Radio value={"嵌入式应用软件"}/>嵌入式应用软件
                                <Radio value={"教育软件"}/>教育软件
                                <Radio value={"游戏软件"}/>游戏软件
                                <Radio value={"应用软件-其他"}/>其他
                            </FormItem>

                            <FormItem {...formItemLayout} label={"其他"}>
                                <Radio value={"其他-其他"}/>其他
                            </FormItem>

                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem{...formItemLayout} label={"运行环境"}></FormItem>

                <FormItem{...formItemLayout} label={"客户端"}>
                    <FormItem{...formItemLayout} label={"操作系统"}>
                        {getFieldDecorator('operateEnvironment.client.os', {
                            rules: [{ required: true, message: '请填写操作系统及其版本！' }],
                        })(
                            <Checkbox.Group disabled={this.props.disable}>
                                <Checkbox value={"Windows"}/>Windows
                                {/*Todo 此处如何加入版本框*/}
                                <Checkbox  value={"Linux"}/>Linux
                                <Checkbox value={"其它"}/>其它
                            </Checkbox.Group>
                        )}
                    </FormItem>


                    <FormItem {...formItemLayout} label={"内存要求"}>
                        {getFieldDecorator('operateEnvironment.client.memoryReq',
                            {rules: [{ required: true, message: '请输入内存要求！',pattern:"^[0-9/.]+$"}],
                            })(
                            <Input disabled={this.props.disable} addonAfter={"MB"} />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label={"硬盘要求"}>
                        {getFieldDecorator('operateEnvironment.client.hardDiskReq',
                            {rules: [{ required: true, message: '请输入硬盘要求！',pattern:"^[0-9/.]+$"}],
                            })(
                            <Input disabled={this.props.disable} addonAfter={"MB"} />
                        )}
                    </FormItem>


                </FormItem>

                <FormItem {...formItemLayout} label={"服务器端"}>
                    <FormItem {...formItemLayout} label={"硬件"}>
                        <FormItem{...formItemLayout} label={"构架"}>
                            {getFieldDecorator('operateEnvironment.service.hardware.arch', {
                                rules: [{ required: true, message: '请选择！' }],
                            })(
                                <Checkbox.Group disabled={this.props.disable}>
                                    <Checkbox value={"PC服务器"}/>PC服务器
                                    <Checkbox value={"UNIX／Linux服务器"}/>UNIX／Linux服务器
                                    <Checkbox value={"其它"}/>其它
                                </Checkbox.Group>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"内存要求"}>
                            {getFieldDecorator('operateEnvironment.service.hardware.memoryReq',
                                {rules: [{ required: true, message: '请输入内存要求！',pattern:"^[0-9/.]+$"}],
                                })(
                                <Input disabled={this.props.disable} addonAfter={"MB"} />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"硬盘要求"}>
                            {getFieldDecorator('operateEnvironment.service.hardware.hardDiskReq',
                                {rules: [{ required: true, message: '请输入硬盘要求！', pattern:"^[0-9/.]+$"}],
                                })(
                                <Input disabled={this.props.disable} addonAfter={"MB"}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"其他要求"}>
                            {getFieldDecorator('operateEnvironment.service.hardware.otherReq',
                                {rules: [{ required: true, message: '请输入其他要求！'}],
                                })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                    </FormItem>

                    <FormItem {...formItemLayout} label={"软件"}>
                        <FormItem {...formItemLayout} label={"操作系统"}>
                            {getFieldDecorator('operateEnvironment.service.software.os',
                                {rules: [{ required: true, message: '请输入操作系统！'}],
                                })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"版本"}>
                            {getFieldDecorator('operateEnvironment.service.software.version', {
                                rules: [{ required: true, message: '请输入版本！',pattern:"^[a-zA-Z0-9/.]+$"}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"编程语言"}>
                            {getFieldDecorator('operateEnvironment.service.software.language', {
                                rules: [{ required: true, message: '请输入编程语言！'}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem{...formItemLayout} label={"构架"}>
                            {getFieldDecorator('operateEnvironment.service.software.arch', {
                                rules: [{ required: true, message: '请选择构架！' }],
                            })(
                                <Checkbox.Group disabled={this.props.disable}>
                                    <Checkbox value={"C/S"}/>C/S
                                    <Checkbox value={"B/S"}/>B/S
                                    <Checkbox value={"其它"}/>其它
                                </Checkbox.Group>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"数据库"}>
                            {getFieldDecorator('operateEnvironment.service.software.dateBase', {
                                rules: [{ required: true, message: '请输入数据库！'}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"中间件"}>
                            {getFieldDecorator('operateEnvironment.service.software.midWare', {
                                rules: [{ required: true, message: '请输入中间件！'}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"其他支撑软件"}>
                            {getFieldDecorator('operateEnvironment.service.software.otherSupp', {
                                rules: [{ required: true, message: '请输入其他支撑软件！'}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                    </FormItem>


                    <FormItem {...formItemLayout} label={"网络环境"}>
                        {getFieldDecorator('operateEnvironment.netEnvironment', {
                            rules: [{ required: true, message: '请输入网络环境！'}],
                        })(
                            <Input disabled={this.props.disable}/>
                        )}
                    </FormItem>

                </FormItem>

                <FormItem {...formItemLayout} label={"样品和数量"}>
                    <FormItem {...formItemLayout} label={"软件介质"}>
                        <FormItem {...formItemLayout} label={"光盘"}>
                            {getFieldDecorator('operateEnvironment.sampleQuantity.softwareMedia.cd', {
                                rules: [{pattern:"^[0-9/]+$", message: '请输入光盘数！'}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"U盘"}>
                            {getFieldDecorator('operateEnvironment.sampleQuantity.softwareMedia.U', {
                                rules: [{pattern:"^[0-9/]+$", message: '请输入U盘数！'}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label={"其他"}>
                            {getFieldDecorator('operateEnvironment.sampleQuantity.softwareMedia.other', {
                                rules: [{pattern:"^[0-9/]+$", message: '请输入其他！'}],
                            })(
                                <Input disabled={this.props.disable}/>
                            )}
                        </FormItem>

                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={"文档资料"}
                    >
                        {getFieldDecorator('operateEnvironment.sampleQuantity.Documentation', {
                            rules: [{ required: true, message: '请输入文档资料！'}],
                        })(
                            <Input disabled={this.props.disable}/>
                        )}

                    </FormItem>

                    <FormItem {...formItemLayout} label={"注"}>
                        <br/>1、需求文档（例如：项目计划任务书、需求分析报告、合同等）（验收、鉴定测试必须）
                        <br/>2、用户文档（例如：用户手册、用户指南等）（必须）
                        <br/>3、操作文档（例如：操作员手册、安装手册、诊断手册、支持手册等）（验收项目必须）
                    </FormItem>

                    <FormItem {...longFILayout} label={"提交的样品（硬拷贝资料、硬件）五年保存期满"}>
                        {getFieldDecorator('operateEnvironment.sampleQuantity.toHandle', {
                            rules: [{ required: true, message: '请选择！'}],
                        })(
                            <RadioGroup name={"处理手段"} disabled={this.props.disable}>
                                <Radio value={"由本实验室销毁"}/>由本实验室销毁
                                <Radio value={"退还给我们"}/>退还给我们
                            </RadioGroup>
                        )}
                    </FormItem>
                </FormItem>

                <FormItem {...formItemLayout} label={"希望测试完成的时间"}>/*这边做一个时间选择器？*/
                    {getFieldDecorator('operateEnvironment.sampleQuantity.comTimeWish', {
                        rules: [{ required: true, message: '请正确输入时间！',
                            pattern:"^[1-9]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\\s+(20|21|22|23|[0-1]\\d):[0-5]\\d:[0-5]\\d$"
                        }],
                    })(
                        <DatePicker showTime format="YYYY-MM-DD" disabled={this.props.disable}/>
                    )}
                </FormItem>

                {/*以下第三部分*/}
                <FormItem
                    label="委托单位信息"
                    {...formItemLayout}
                >
                    {getFieldDecorator('consignUnitMessage', {
                        rules: [{ required: true, message: '请输入委托单位信息！'}],
                    })(
                        <span className="ant-form-text"></span>
                    )}

                </FormItem>

                <FormItem
                    label="电话"
                    {...formItemLayout}
                >
                    {getFieldDecorator('consignUnittelephone', {
                        rules: [{ required: true, message: '请输入委托单位信息！'}],
                    })(
                        <Input placeholder="请输入电话号码" />
                    )}
                </FormItem>

                <FormItem
                    label="传真"
                    {...formItemLayout}
                >
                    {getFieldDecorator('consignUnitFax', {
                        rules: [{ required: true, message: '请输入传真号！'}],
                    })(
                        <Input placeholder="请输入传真号" />
                    )}

                </FormItem>

                <FormItem
                    label="地址"
                    {...formItemLayout}
                >
                    {getFieldDecorator('consignUnitaddress', {
                        rules: [{ required: true, message: '请输入地址！'}],
                    })(
                        <Input placeholder="请输入地址" />
                    )}
                </FormItem>

                <FormItem
                    label="邮编"
                    {...formItemLayout}
                >
                    {getFieldDecorator('consignUnitEmailnumber', {
                        rules: [{ required: true, message: '请输入邮编！'}],
                    })(
                        <Input placeholder="请输入邮编" />
                    )}
                </FormItem>

                <FormItem
                    label="联系人"
                    {...formItemLayout}
                >
                    {getFieldDecorator('consignUnitpeople', {
                        rules: [{ required: true, message: '请输入联系人！'}],
                    })(
                        <Input placeholder="请输入联系人" />
                    )}
                </FormItem>

                <FormItem
                    label="手机"
                    {...formItemLayout}
                >
                    {getFieldDecorator('consignUnitcellphonenumber', {
                        rules: [{ required: true, message: '请输入手机号码！'}],
                    })(
                        <Input placeholder="请输入手机号" />
                    )}
                </FormItem>

                <FormItem
                    label="E-mail"
                    {...formItemLayout}
                >
                    {getFieldDecorator('consignUnitEmail', {
                        rules: [{ required: true, message: '请输入E-mail！'}],
                    })(
                        <Input placeholder="请输入邮箱地址" />
                    )}
                </FormItem>

                <FormItem
                    label="网址"
                    {...formItemLayout}
                >
                    {getFieldDecorator('consignUniturl', {
                        rules: [{ required: true, message: '请输入网址！'}],
                    })(
                        <Input placeholder="请输入网址" />
                    )}
                </FormItem>

                <FormItem
                    label="国家重点实验室联系方式"
                    {...formItemLayout}
                >
                    <span className="ant-form-text"></span>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="单位地址"
                >
                    <span className="ant-form-text">南京市栖霞区仙林大道163号</span>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="邮政编码"
                >
                    <span className="ant-form-text">210046</span>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="电话"
                >
                    <span className="ant-form-text">86-25-89683467, 86-25-89683670</span>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="传真"
                >
                    <span className="ant-form-text">86-25-89686596</span>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="网址"
                >
                  <span className="ant-form-text">http://keysoftlab.nju.edu.cn
                  </span>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Email"
                >
                  <span className="ant-form-text">keysoftlab@nju.edu.cn
                  </span>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="密级"
                >
                    {getFieldDecorator('securitylevel', {
                        rules: [{ required: true, message: '请选择！'}],
                    })(
                        <RadioGroup name={"密级:"} disabled={this.props.disable}>
                            <Radio value="a">无密级</Radio>
                            <Radio value="b">秘密</Radio>
                            <Radio value="c">机密</Radio>
                        </RadioGroup>

                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="查杀病毒"
                >
                    {getFieldDecorator('killingvirus', {
                        rules: [{ required: true, message: '请选择！'}],
                    })(
                        <RadioGroup name={"查杀病毒:"} disabled={this.props.disable}>
                            <Radio value="a">已完成</Radio>
                            <Radio value="b">无法完成</Radio>
                            <Input placeholder="所用查杀工具" />
                        </RadioGroup>

                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="材料检查："
                >
                  <span className="ant-form-text">
                  </span>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="测试样品："
                >
                    {getFieldDecorator('testingprodu', {
                        rules: [{ required: true, message: '请选择至少一项测试样品！'}],
                    })(
                        <Checkbox.Group disabled={this.props.disable}>
                            <Checkbox>源代码</Checkbox>
                            <Checkbox>可执行文件</Checkbox>
                        </Checkbox.Group>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="需求文档："
                >
                    {getFieldDecorator('Requirementsdocument', {
                        rules: [{ required: true, message: '请选择至少一项需求文档！'}],
                    })(
                        <Checkbox.Group disabled={this.props.disable}>
                            <Checkbox>项目计划任务书</Checkbox>
                            <Checkbox>需求分析报告</Checkbox>
                            <Checkbox>合同</Checkbox>
                        </Checkbox.Group>

                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="用户文档："
                >
                    {getFieldDecorator('Userdocument', {
                        rules: [{ required: true, message: '请选择至少一项用户文档！'}],
                    })(
                        <Checkbox.Group disabled={this.props.disable}>
                            <Checkbox>用户手册</Checkbox>
                            <Checkbox>用户指南</Checkbox>
                        </Checkbox.Group>
                    )}
                </FormItem>

                <FormItem

                    {...formItemLayout}
                    label="操作文档："
                >
                    {getFieldDecorator('Oprationdocument', {
                        rules: [{ required: true, message: '请选择至少一项操作文档！'}],
                    })(
                        <Checkbox.Group disabled={this.props.disable}>
                            <Checkbox>操作员手册</Checkbox>
                            <Checkbox>安装手册</Checkbox>
                            <Checkbox>诊断手册</Checkbox>
                            <Checkbox>支持手册</Checkbox>
                        </Checkbox.Group>
                    )}
                </FormItem>

                <FormItem
                    label="其他"
                    {...formItemLayout}
                >
                    {getFieldDecorator('else', {
                        rules: [{ required: true, message: '请输入！'}],
                    })(
                        <Input placeholder="请输入" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="确认意见："
                >
                    {getFieldDecorator('Confirmation', {
                        rules: [{ required: true, message: '请选择确认意见！'}],
                    })(
                        <RadioGroup name={"确认意见:"} disabled={this.props.disable}>
                            <Radio value="a">测试所需材料不全，未达到受理条件。</Radio>
                            <Radio value="b">属依据国家标准或自编非标规范进行的常规检测，有资质、能力和资源满足委托方要求。</Radio>
                            <Radio value="c">无国家标准和规范依据，或实验室缺乏检测设备和工具，无法完成检测。</Radio>
                            <Radio value="d">超出实验室能力和资质范围，无法完成检测。</Radio>
                        </RadioGroup>

                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="受理意见："
                >
                    {getFieldDecorator('Admissibility', {
                        rules: [{ required: true, message: '请选择受理意见！'}],
                    })(
                        <RadioGroup name={"受理意见:"} disabled={this.props.disable}>
                            <Radio value="a">受理-进入项目立项和合同评审流程。</Radio>
                            <Radio value="b">不受理</Radio>
                            <Radio value="c">进一步联系</Radio>
                        </RadioGroup>

                    )}
                </FormItem>

                <FormItem
                    label="测试项目编号"
                    {...formItemLayout}
                >
                    {getFieldDecorator('testingnumber', {
                        rules: [{ required: true, message: '请输入测试项目编号！'}],
                    })(
                        <Input placeholder="请输入测试项目编号" />
                    )}
                </FormItem>

                <FormItem
                    label="备注"
                    {...formItemLayout}
                >
                    {getFieldDecorator('Remarks', {
                        rules: [{ required: true, message: '请输入备注！'}],
                    })(
                        <TextArea rows={4} />
                    )}
                </FormItem>

                <FormItem
                    label="受理人（签字）"
                    {...formItemLayout}
                >

                    <span className="ant-form-text"></span>
                </FormItem>

                <FormItem
                    label="日期"
                    {...formItemLayout}
                >
                    <span className="ant-form-text"></span>
                </FormItem>

                <FormItem
                    label="委托人填写"
                    {...formItemLayout}
                >
                    <TextArea rows={4} />
                </FormItem>

                <FormItem
                    label="委托人（签字）"
                    {...formItemLayout}
                >
                    <span className="ant-form-text"></span>

                </FormItem>

                <FormItem
                    label="日期"
                    {...formItemLayout}
                >
                    <span className="ant-form-text"></span>
                </FormItem>

                <FormItem {...buttonItemLayout}>
                    <Button type="primary" htmlType={"submit"}>提交</Button>
                </FormItem>

                {/* footer buttons */}
                <FormItem {...formItemLayout}>
                    {this.props.buttons.map((button, index) =>
                        <Button onClick={this.onClick(index)}
                                key={button.content}>
                            {button.content}
                        </Button>)}
                </FormItem>
            </Form>
        );
    }
}
export default Form.create()(ConsignContentComponent);
