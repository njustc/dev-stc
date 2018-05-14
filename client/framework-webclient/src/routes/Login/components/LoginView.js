import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import { Button, Form, Input, message, Checkbox, Icon, Row, Col } from 'antd';
const FormItem = Form.Item;
import {} from 'UTILS/FetchUtil';
import './LoginView.scss';
import Logo from '../assets/logo-fav.png';
import {httpPost} from "UTILS/FetchUtil";

class LoginView extends React.Component {
    constructor(props) {
        super(props);
    };

    static propTypes = {
        SetSysUser: PropTypes.func.isRequired,
        SetModules: PropTypes.func.isRequired
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                //这里用values获取到用户的sysUser和module，数据结构见modules/ducks/system
                //
                let url = "http://127.0.0.1:8000/login";
                let data = {
                    username: values.userName,
                    password: values.password,
                };
                httpPost(url, data, (result) => {
                    if (result.status == 'SUCCESS') {
                        let sysUser = {
                            ...values,
                            clientDigest: result.data.clientDigest,
                        };
                        this.props.SetSysUser(sysUser);
                        if(values.userName === 'marketing'){
                            this.props.SetModules([{
                                "code": "U-C",
                                "id": "1",
                                "menuIcon": "idcard",
                                "menuPath": "/admin_list",
                                "name": "委托管理"
                            }]);
                            this.props.router.replace('/index');
                        }
                        else if(values.userName === 'customer1'){
                            this.props.SetModules([{
                                "code": "U-C",
                                "id": "1",
                                "menuIcon": "idcard",
                                "menuPath": "/user_list",
                                "name": "委托管理"
                            }]);
                            this.props.router.replace('/index');
                        }
                    }
                    else {
                        message.error('登录失败，请重试');
                    }
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-background">
                <div className="login-component">
                    <div className="login-title">
                        <img src={Logo} className="login-logo "></img>
                        <span><h2 style={{fontSize:'18px',color:'#666666'}}>南大测试</h2></span>
                    </div>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            或 <a href="">现在注册!</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(LoginView);
