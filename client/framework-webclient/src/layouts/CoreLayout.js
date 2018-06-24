import React, { Component, PropTypes } from 'react'
import 'STYLES/antd.min.css'
import 'STYLES/core.scss'
import './CoreLayout.scss'

import { Layout, Menu, Modal, Input, Icon, Row, Tabs, message, Form, Affix, Button, Dropdown } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

import {ProjectView} from "ROUTES/Project";

import tabsMap from "../routes/tabsMap";

class CoreLayout extends Component
{
    state = {
        visible:false,
    };

    constructor(props) {
        super(props);
    };

    static propTypes = {
        sider: PropTypes.object.isRequired,
        sysUser: PropTypes.object.isRequired,
        panes: PropTypes.array.isRequired,
        activeKey: PropTypes.string,
        addTab: PropTypes.func.isRequired,
        removeTab: PropTypes.func.isRequired,
        switchTab: PropTypes.func.isRequired
    };

    handleMenuClick = (e) =>{
        if(e.key==="logout"){
            sessionStorage.removeItem('sysUser');
            sessionStorage.removeItem('authData');
            message.info('退出成功，正在跳转');
            this.props.router.replace('/login');
        }
        else if(e.key==="resetPassword"){
            this.setState({
                ...this.state,
                visible: true,
            });
        }
    };

    onCancel = () => {
        this.setState({
            ...this.state,
            visible:false,
        });
    };

    onOk = () => {
        this.props.form.validateFields((err, values) => {
            this.setState({
                ...this.state,
                visible:false,
            });
        });
    };

    onClick = (e) => {
        const page = this.props.sider[e.key];
        this.props.addTab(page.key,page.name,tabsMap[page.key]);
    };

    onEdit = (targetKey) => {
        this.props.removeTab(targetKey);
    };

    onChange = (activeKey) => {
        this.props.switchTab(activeKey);
    };

    handleMessage = () => {};

    logMenu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="logout">退出登录</Menu.Item>
            <Menu.Item key="resetPassword">修改密码</Menu.Item>
        </Menu>
    );

    messageMenu = (
        <Menu onClick={this.handleMessage}>
            <Menu.Item key="logout">message</Menu.Item>
        </Menu>
    );

    render(){
        const formItemLayout = {
                labelCol: { span: 3 },
                wrapperCol: { span: 20 },
            };
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout style = {{ minHeight: '100vh' }}>
                <Sider width={200} style={{ background: '#000' }}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.onClick}>
                        <Menu.Item key="1" disabled={this.props.sider["1"].disable}>
                            <Icon type="pie-chart" />
                            <span>流程</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>委托</span></span>}
                        >
                            <Menu.Item key="2" disabled={this.props.sider["2"].disable}>委托列表</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>合同</span></span>}
                        >
                            <Menu.Item key="3" disabled={this.props.sider["3"].disable}>测试合同书</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={<span><Icon type="copy" /><span>测试</span></span>}
                        >
                            <Menu.Item key="4" disabled={this.props.sider["4"].disable}>测试方案书</Menu.Item>
                            <Menu.Item key="5" disabled={this.props.sider["5"].disable}>测试用例表</Menu.Item>
                            <Menu.Item key="6" disabled={this.props.sider["6"].disable}>测试记录表</Menu.Item>
                            <Menu.Item key="7" disabled={this.props.sider["7"].disable}>测试问题清单</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={<span><Icon type="appstore-o" /><span>报告</span></span>}
                        >
                            <Menu.Item key="8" disabled={this.props.sider["8"].disable}>测试报告书</Menu.Item>
                            <Menu.Item key="9" disabled={this.props.sider["9"].disable}>测试报告检查表</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub5"
                            title={<span><Icon type="smile-o" /><span>结项</span></span>}
                        >
                            <Menu.Item key="10" disabled={this.props.sider["10"].disable}>测试工作检查表</Menu.Item>
                            <Menu.Item key="11" disabled={this.props.sider["11"].disable}>满意度调查表</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Affix offsetTop={0}>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <div className='userMenu'>
                                <Dropdown overlay={this.messageMenu}>
                                    <Button style={{ marginLeft: 8 }}>
                                        <Icon type="mail"/>消息通知<Icon type="down" />
                                    </Button>
                                </Dropdown>
                                <Dropdown overlay={this.logMenu}>
                                    <Button style={{ marginLeft: 8 }}>
                                        <Icon type="user"/> {this.props.sysUser.username} <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </div>
                            <Modal visible={this.state.visible} title="修改密码" onCancel={this.onCancel} onOk={this.onOk}>
                                <Form layout="vertical">
                                    <FormItem {...formItemLayout} label="原密码">
                                        {getFieldDecorator('password', {})(<Input />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="新密码">
                                        {getFieldDecorator('newPassword', {})(<Input />)}
                                    </FormItem>
                                </Form>
                            </Modal>
                        </Header>
                    </Affix>
                    <Content style={{ margin: '0px 16px', padding: 24, background: '#fff', minHeight: 800 }}>
                        <Tabs
                            className="contentTab"
                            type="editable-card"
                            onChange={this.onChange}
                            onEdit={this.onEdit}
                            hideAdd="true"
                            activeKey={this.props.activeKey}>
                            {this.props.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                        </Tabs>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        出品：南京大学计算机系15级软工在线业务组
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Form.create()(CoreLayout);
