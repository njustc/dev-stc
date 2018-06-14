import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider, Modal, message, Badge, Steps,Layout,Menu,List,Timeline} from 'antd';
import {STATE} from "../../../services/common"

const Search = Input.Search;
const confirm = Modal.confirm;
const InputGroup = Input.Group;
const Option = Select.Option;
const Step = Steps.Step;
const { SubMenu } = Menu;
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

export default class ProjectContentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*TODO:current应该放到props里面*/
            current: 4,
        };
    }

    static propTypes = {
        setContentFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        //deleteProject: PropTypes.func,
        //getProjectContent: PropTypes.func,
    };

    /*componentDidMount() {
        //this.props.getProjectList();
    }*/
    componentWillMount() {
        //     this.curID = this.props.curKey;
        //     // console.log(this.curID);
        this.props.getValues(this.props.projectData.id);
        //     // console.log(this.values);
    };


    steps = [{
        title: '委托',
        description: "委托已通过",
        //content: 'First-content',
    }, {
        title: '合同',
        description: "合同已确认",
        //content: 'Second-content',
    }, {
        title: '测试',
        description: "测试已完成",
        //content: 'Last-content',
    }, {
        title: '报告',
        description: "测试报告已确认",
        //content: 'Last-content',
    }, {
        title: '结项',
        description: "满意度调查表待提交",
        //content: 'Last-content',
    }];

    data = [
        {index:1,name:'委托申请表'},
        {index:2,name:'测试合同书'},
        //'合同评审表',
        {index:3,name:'测试方案书'},
        {index:4,name:'测试用例表'},
        {index:5,name:'测试记录表'},
        {index:6,name:'测试问题清单'},
        {index:7,name:'测试报告书'},
        {index:8,name:'测试报告检查表'},
        {index:9,name:'测试工作检查表'},
        {index:10,name:'满意度调查表'}
    ];

    onTitle() {
      return (
          <div>流程当前状态为：满意度调查表待提交</div>
      );
    };
    /*查看详情*/
    viewContent = (item) => () => {
        //console.log(this.props.id);
        this.props.showContent(item,this.props.id);
    };

    render() {
        return (
            <div>
                {/*<Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>*/}
                    <Layout style={{ background: '#fff' }}>
                <h3>流程详情</h3>
                        <Card title="流程进度"
                              hoverable
                              //bordered={false}
                        >
                            <Steps current={this.state.current}>
                                {this.steps.map(item => <Step key={item.title} title={item.title} description={item.description} />)}
                            </Steps>
                        </Card>
                        <br />

                        <Content style={{ background: '#fff' }} >
                        <Row gutter={16}>
                            {/*<Col span={3}>
                               <Card
                                    //title="文档"
                                      //bordered={false}
                                >
                                    <a href="javascript:void(0);"
                                    >委托申请表</a>
                                    <Divider />
                                    <a href="javascript:void(0);"
                                    >测试合同书</a>
                                    <Divider />
                                    <a href="javascript:void(0);"
                                    >合同评审表</a>
                                    <Divider />
                                    <a href="javascript:void(0);"
                                    >测试方案书</a>
                                    <Divider />
                                    <a href="javascript:void(0);"
                                    >测试用例表</a>
                                    <Divider />
                                    <a href="javascript:void(0);"
                                    >测试记录表</a>
                                    <Divider />
                                    <a href="javascript:void(0);"
                                    >测试问题清单</a>
                                    <Divider />
                                    <a href="javascript:void(0);"
                                    >测试报告书</a>
                                    <Divider />
                                    <a href="javascript:void(0);"
                                    >测试报告检查表</a>
                                    <Divider />
                                    <a href="javascript:void(0);"
                                    >测试工作检查表</a>
                                    <Divider />
                                    <a href="javascript:void(0);"
                                    >满意度调查表</a>
                                </Card>
                            </Col>*/}
                            <Col span={3}>
                                <List
                                    size="small"
                                    header={<div>文档</div>}
                                    //footer={<div>Footer</div>}
                                    bordered
                                    //loadMore={loadMore}
                                    dataSource={this.data}
                                    renderItem={item => (<List.Item><a href="javascript:void(0);" onClick={this.viewContent(item)}>{item.name}</a></List.Item>)}
                                    /*renderItem={item => (
                                            <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                                                <List.Item.Meta
                                                    //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                />
                                                <div>content</div>
                                            </List.Item>
                                        )}*/
                                />
                            </Col>
                            <Col span={6}>
                                <Card title='流程摘要信息' hoverable >
                                    <div>流程ID：{this.props.id}</div>
                                    <br/>
                                    <div>项目名称：快乐星球小杨杰</div>
                                    <br/>
                                    <div>委托人ID：15120140</div>
                                    <br/>
                                    <div>委托人用户名：快乐星球小杨杰</div>
                                    <br/>
                                    <div>测试人：小猪佩奇</div>
                                    <br/>
                                    <div>项目价格：¥0.5</div>
                                    <br/>
                                    <div>备注：感谢曹老板指导,给曹老板打call</div>
                                </Card>
                            </Col>
                            <Col span={15}>
                                <Card title={this.onTitle()}
                                      hoverable
                                      //bordered={false}
                                >
                                    <div>您现在可以：<a>提交满意度调查表</a></div>
                                    <Divider/>
                                    <Timeline>
                                        <Timeline.Item color="green">委托通过评审 2015-09-01</Timeline.Item>
                                        <Timeline.Item color="green">测试样品已提交 2015-09-01</Timeline.Item>
                                        <Timeline.Item color="green">合同通过确认 2015-09-01</Timeline.Item>
                                        <Timeline.Item color="green">测试方案通过评审 2015-09-01</Timeline.Item>
                                        <Timeline.Item color="green">测试报告通过确认 2015-09-01</Timeline.Item>
                                        <Timeline.Item color="blue">满意度调查表待提交 2015-09-01</Timeline.Item>
                                    </Timeline>
                                </Card>
                            </Col>

                        </Row>
                </Content>
                        {/*TODO: 取消流程*/
                            /*<Footer style={{ background: '#fff' }}>
                            <TextArea rows={4} />
                            <Button>
                                取消
                            </Button>
                        </Footer>*/}
                </Layout>

            </div>
        );
    }
}