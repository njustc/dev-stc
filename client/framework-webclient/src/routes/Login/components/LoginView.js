import React, { Component } from 'react';
import { Button, Form, Input, message, Checkbox, Icon, Row, Col } from 'antd';
const FormItem = Form.Item;

import {getStore} from 'STORE/globalStore';
import {setSysUser, setModules} from 'modules/ducks/System';
import {loginService} from 'services';

import './LoginView.scss';
import Logo from '../assets/logo-fav.png';

import {sysFetch} from 'utils/FetchUtil';

class LoginView extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.loginPath = loginService;
        this.state =
        {
            loading: false,
            loginText: '登录'
        };
    }

    handleSubmit = (e) => 
    {
        e.preventDefault();
        this.props.form.validateFields((err, values) => 
        {
            if (!err) 
            {
                this.login(values);
            }
        });
    };

    login = (values) =>
    {
        this.setState(
            {
                loading: true,
                loginText: '登录中，请稍候...'
            });

        message.success("登录成功，正在跳转...");
        this.props.router.replace('/index');
    };

    render() 
    {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-background">
                <div className="login-component">
                    <div className="login-title">
                        <img src={Logo} className="login-logo "></img>
                        <span><h2 style={{fontSize:'18px',color:'#666666'}}>SINOSTEEL信息系统框架</h2></span>
                    </div>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                        {
                            getFieldDecorator('username', 
                            {
                                rules: [{ required: true, message: '请输入您的用户名' }],
                            })(
                                <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
                            )
                        }
                        </FormItem>

                        <FormItem>
                        {
                            getFieldDecorator('password', 
                            {
                                rules: [{ required: true, message: '请输入您的密码' }],
                            })(
                                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
                            )
                        }
                        </FormItem>

                        <FormItem>
                        {
                            getFieldDecorator('remember', 
                            {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住用户名和密码</Checkbox>
                            )
                        }
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                                {this.state.loginText}
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(LoginView);