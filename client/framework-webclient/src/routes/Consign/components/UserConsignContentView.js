import React, {Component, PropTypes} from 'react';

import {Row, Col, Card, Tabs, Select, Button, Layout, Form, Input,Radio,Checkbox} from 'antd';

const FormItem=Form.Item;

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
export default class UserConsignContentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
        };
    }
    handleFormLayoutChange = (e) => {
        this.setState({ formLayout: e.target.value });
    };
    render() {


        const { formLayout } = this.state;
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        const buttonItemLayout =  {
            wrapperCol: { span: 14, offset: 4 },
        } ;
        return (
            <div>
                <Form className={"ant-form-horizontal"} layout={formLayout}>
                    <div className="ant-form-item">
                        <label><h1>软件项目委托测试申请书</h1></label>
                        <label>请用✓选择：○——单选； ◻——多选。</label>
                    </div>

                    <div className="ant-form-item ant-form-item-compact">
                        <label><br/>测试类型:
                            <Checkbox value={"软件确认测试"}>软件确认测试 </Checkbox>
                            <Checkbox value={"成果/技术鉴定测试"}>成果/技术鉴定测试</Checkbox>
                            <Checkbox value={"专项资金验收测试"}>专项资金验收测试 </Checkbox>
                            <Checkbox value={"其他"}>其他：</Checkbox>
                        </label>
                    </div>

                    <div className="ant-form-item">
                        <label><br/>软件名称:
                            <div><Input id="software_name"/></div>
                        </label>
                    </div>

                    <div className="ant-form-item">
                        <label><br/>版本号:
                            <div><Input id="version"/></div>
                        </label>
                    </div>


                    <div className="ant-form-item ant-form-inline">
                        <br/>
                        <div>功能列表</div>
                        <div>
                            <br/>模块编号 M1
                            <label> </label><label> 模块名称 <input id="M1_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M1_f"/></label>
                        </div>

                        <div>
                            <br/>模块编号 M2
                            <label> 模块名称 <input id="M2_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M2_f"/></label>
                        </div>

                        <div>
                            <br/>模块编号 M3
                            <label> 模块名称 <input id="M3_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M3_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M4
                            <label> 模块名称 <input id="M4_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M4_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M5
                            <label> 模块名称 <input id="M5_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M5_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M6
                            <label> 模块名称 <input id="M6_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M6_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M7
                            <label> 模块名称 <input id="M7_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M7_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M8
                            <label> 模块名称 <input id="M8_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M8_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M9
                            <label> 模块名称 <input id="M9_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M9_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M10
                            <label> 模块名称 <input size={"19"} id="M10_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M10_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M11
                            <label> 模块名称 <input size={"19"} id="M11_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M11_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M12
                            <label> 模块名称 <input size={"19"} id="M12_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M12_f"/></label>
                        </div>

                        <div>
                            <br/>模块编号 M13
                            <label> 模块名称 <input size={"19"} id="M13_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M13_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M14
                            <label> 模块名称 <input size={"19"} id="M14_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M14_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M15
                            <label> 模块名称 <input size={"19"} id="M15_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M15_f"/></label>
                        </div>
                        <div>
                            <br/>模块编号 M16
                            <label> 模块名称 <input size={"19"} id="M16_n"/></label>
                            <label> 功能简述 <input size={"70"} id="M16_f"/></label>
                        </div>
                        <div><br/>注：1.软件功能说明按树型结构方式描述。软件功能项目栏中应列出软件产品的所有功能（包括各级子功能）。具体可见样例。
                            2.功能说明栏目应填写功能项目概述等信息。
                        </div>
                    </div>

                    <div className="ant-form-item">
                        <label><br/>委托单位(中文):
                            <div><Input id="name_cn"/></div>
                        </label>
                    </div>


                    <div className="ant-form-item">
                        <label><br/>委托单位(英文):
                            <div><Input id="name_en"/></div>
                        </label>
                    </div>


                    <div className="ant-form-item">
                        <label><br/>开发单位:
                            <div><Input id="pro_unit"/></div>
                        </label>
                    </div>

                    <div className="ant-form-item ant-form-item-compact">
                        <label>单位性质:</label>
                        <RadioGroup>
                            <Radio value={"内资企业"}>内资企业</Radio>
                            <Radio value={"外(合)资企业"}>外(合)资企业</Radio>
                            <Radio value={"港澳台(合)资企业"}>港澳台(合)资企业</Radio>
                            <Radio value={"科研院校"}>科研院校</Radio>
                            <Radio value={"政府事业团体"}>政府事业团体</Radio>
                            <Radio value={"其它"}>其它</Radio>
                        </RadioGroup>
                    </div>

                    <div className="ant-form-item">
                        <label><br/>软件用户对象描述:
                            <div><Input id="object_des"/></div>
                        </label>
                    </div>

                    <div className="ant-form-item">
                        <label><br/>主要功能及用途简介（限200字）：
                            <div><Input id="main_func"/></div>
                        </label>
                    </div>

                    <div className="ant-form-item ant-form-item-compact">
                        <label><br/>测试依据:</label>
                        <div>
                            <Checkbox value={"GB/T 25000.51-2016"}/>GB/T 25000.51-2016
                            <Checkbox value={"GB/T 25000.10-2016"}/>GB/T 25000.10-2016
                            <Checkbox value={"GB/T 28452-2012"}/>GB/T 28452-2012
                            <Checkbox value={"GB/T 30961-2014"}/>GB/T 30961-2014
                            <Checkbox value={"NST-03-WI12-2011"}/>NST-03-WI12-2011
                            <Checkbox value={"NST-03-WI13-2011"}/>NST-03-WI13-2011
                            <Checkbox value={"NST-03-WI22-2014"}/>NST-03-WI22-2014
                            <Checkbox value={"其它"}/>其它
                        </div>
                    </div>

                    <div className="ant-form-item ant-form-item-compact">
                        <label><br/>需要测试的技术指标:</label>
                        <div>
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
                        </div>
                    </div>
                    <FormItem
                        label="委托单位信息"
                        {...formItemLayout}
                    >
                        <span className="ant-form-text"></span>
                    </FormItem>
                    <FormItem
                        label="电话"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入电话号码" />
                    </FormItem>
                    <FormItem
                        label="传真"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入传真号" />
                    </FormItem>
                    <FormItem
                        label="地址"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入地址" />
                    </FormItem>
                    <FormItem
                        label="邮编"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入邮编" />
                    </FormItem>
                    <FormItem
                        label="联系人"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入联系人" />
                    </FormItem>
                    <FormItem
                        label="手机"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入手机号" />
                    </FormItem>
                    <FormItem
                        label="E-mail"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入邮箱地址" />
                    </FormItem>
                    <FormItem
                        label="网址"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入网址" />
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
                        {<RadioGroup>
                            <Radio value="a">无密级</Radio>
                            <Radio value="b">秘密</Radio>
                            <Radio value="c">机密</Radio>
                        </RadioGroup>
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="查杀病毒"
                    >
                        {<RadioGroup>
                            <Radio value="a">已完成</Radio>
                            <Radio value="b">无法完成</Radio>
                            <Input placeholder="所用查杀工具" />

                        </RadioGroup>
                        }
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
                        <Checkbox>源代码</Checkbox>
                        <Checkbox>可执行文件</Checkbox>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="需求文档："
                    >
                        <Checkbox>项目计划任务书</Checkbox>
                        <Checkbox>需求分析报告</Checkbox>
                        <Checkbox>合同</Checkbox>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="用户文档："
                    >
                        <Checkbox>用户手册</Checkbox>
                        <Checkbox>用户指南</Checkbox>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="操作文档："
                    >
                        <Checkbox>操作员手册</Checkbox>
                        <Checkbox>安装手册</Checkbox>
                        <Checkbox>诊断手册</Checkbox>
                        <Checkbox>支持手册</Checkbox>
                    </FormItem>
                    <FormItem
                        label="其他"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入" />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="确认意见："
                    >
                        {<RadioGroup>
                            <Radio value="a">测试所需材料不全，未达到受理条件。</Radio>
                            <Radio value="b">属依据国家标准或自编非标规范进行的常规检测，有资质、能力和资源满足委托方要求。</Radio>
                            <Radio value="c">无国家标准和规范依据，或实验室缺乏检测设备和工具，无法完成检测。</Radio>
                            <Radio value="c">超出实验室能力和资质范围，无法完成检测。</Radio>
                        </RadioGroup>
                        }
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="受理意见："
                    >
                        {<RadioGroup>
                            <Radio value="a">受理-进入项目立项和合同评审流程。</Radio>
                            <Radio value="b">不受理</Radio>
                            <Radio value="c">进一步联系</Radio>

                        </RadioGroup>
                        }
                    </FormItem>

                    <FormItem
                        label="测试项目编号"
                        {...formItemLayout}
                    >
                        <Input placeholder="请输入测试项目编号" />
                    </FormItem>

                    <FormItem
                        label="备注"
                        {...formItemLayout}
                    >
                        <TextArea rows={4} />
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
                        <Button type="primary">提交</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
