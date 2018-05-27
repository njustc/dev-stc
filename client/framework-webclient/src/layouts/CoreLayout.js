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
        sider: PropTypes.object.isRequired,
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

    onClick = (e) => {
        if(e.key === "1")
            this.props.switchTab(mainKey);
        else{
            const page = this.props.sider[e.key];
            this.props.addTab(page.key,page.name,page.component);
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
    );

    menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="logout">退出登录</Menu.Item>
        </Menu>
    );

    render(){
        console.log(this.props.sider);
        return (
            <Layout style = {{ minHeight: '100vh' }}>
                <Affix offsetTop={0}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Dropdown overlay={this.menu}>
                            <Button style={{ marginLeft: 8 }}>
                                <Icon type="user"/> {this.props.sysUser.username} <Icon type="down" />
                            </Button>
                        </Dropdown>
                    </Header>
                </Affix>
                <Content>
                    <Layout>
                        <Sider width={200} style={{ background: '#000' }}>
                            <div className="logo" />
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.onClick}>
                                <Menu.Item key={this.props.sider["1"].key} disabled={this.props.sider["1"].disable}>
                                    <Icon type="pie-chart" />
                                    <span>流程</span>
                                </Menu.Item>
                                <SubMenu
                                    key="sub1"
                                    title={<span><Icon type="user" /><span>委托</span></span>}
                                >
                                    <Menu.Item key={this.props.sider["2"].key} disabled={this.props.sider["2"].disable}>委托列表</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={<span><Icon type="team" /><span>合同</span></span>}
                                >
                                    <Menu.Item key={this.props.sider["3"].key} disabled={this.props.sider["3"].disable}>测试合同书</Menu.Item>
                                    <Menu.Item key={this.props.sider["4"].key} disabled={this.props.sider["4"].disable}>合同评审表</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={<span><Icon type="copy" /><span>测试</span></span>}
                                >
                                    <Menu.Item key={this.props.sider["5"].key} disabled={this.props.sider["5"].disable}>测试方案书</Menu.Item>
                                    <Menu.Item key={this.props.sider["6"].key} disabled={this.props.sider["6"].disable}>测试用例表</Menu.Item>
                                    <Menu.Item key={this.props.sider["7"].key} disabled={this.props.sider["7"].disable}>测试记录表</Menu.Item>
                                    <Menu.Item key={this.props.sider["8"].key} disabled={this.props.sider["8"].disable}>测试问题清单</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub4"
                                    title={<span><Icon type="appstore-o" /><span>报告</span></span>}
                                >
                                    <Menu.Item key={this.props.sider["9"].key} disabled={this.props.sider["9"].disable}>测试报告书</Menu.Item>
                                    <Menu.Item key={this.props.sider["10"].key} disabled={this.props.sider["10"].disable}>测试报告检查表</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub5"
                                    title={<span><Icon type="smile-o" /><span>报告</span></span>}
                                >
                                    <Menu.Item key={this.props.sider["11"].key} disabled={this.props.sider["11"].disable}>测试工作检查表</Menu.Item>
                                    <Menu.Item key={this.props.sider["12"].key} disabled={this.props.sider["12"].disable}>满意度调查表</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout>
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
                        </Layout>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    出品：南京大学计算机系15级软工在线业务组
                </Footer>
            </Layout>
        );
    }
}
