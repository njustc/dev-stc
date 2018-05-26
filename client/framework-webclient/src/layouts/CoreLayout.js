import React, { Component, PropTypes } from 'react'
import 'STYLES/antd.min.css'
import 'STYLES/core.scss'
import './CoreLayout.scss'

import { Layout, Menu, Icon, Row, Tabs, message, Form, Affix, Button, Dropdown } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

import {sysFetch} from '../utils/FetchUtil';
import {ProjectView} from "ROUTES/Project";

export const mainKey = 'projectList';

export default class CoreLayout extends Component
{
	constructor(props) {
		super(props);
	};

	static propTypes = {
	    sysUser: PropTypes.object.isRequired,
		panes: PropTypes.array.isRequired,
        activeKey: PropTypes.string.isRequired,
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
    };

    onEdit = (targetKey) => {
        this.props.removeTab(targetKey);
    };

    onChange = (activeKey) => {
        this.props.switchTab(activeKey);
    };

    mainPane = (
        <TabPane tab={<span><Icon type="database" />项目管理</span>} key={mainKey} closable={false}>
            {React.createElement(ProjectView)}
        </TabPane>
    )

    menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="logout">退出登录</Menu.Item>
        </Menu>
    );

	render(){
		return (
            <Layout style = {{ minHeight: '100vh' }}>
                <Sider>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>User</span></span>}
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>Team</span></span>}
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Affix offsetTop={0}>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Dropdown overlay={this.menu}>
                                <Button style={{ marginLeft: 8 }}>
                                    <Icon type="user"/> {this.props.sysUser.username} <Icon type="down" />
                                </Button>
                            </Dropdown>
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
                            {this.mainPane}
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
