//组件导入区
import React, {Component, PropTypes} from 'react';

import {Row, Col, Card, Tabs, Select, Button, Layout, Form} from 'antd';
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

//控制按钮状态
/*TODO*///委托的状态如何确定？由后台发消息？
let isDisabled = false;//const isDisabled = false;


//核心代码区
export default class OrganizationTreeView extends Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			parentId: '',
			name: 'name',
			ID: 'ID'
		}

		this.getData=this.getData.bind(this);
	}

	setParentId = (parentId) =>
	{
		this.setState(
		{
			parentId: parentId
		})
	}
	//设定props默认值，可以用来接受后台消息
	/*
	getDefaultProps() {
		return {
			name:'xyz',
			ID:'151220134'
		}
	}
	*/
	// static defaultStates = {
	// 	name:'xyz',
	// 	ID:'151220134',
	// 	isWTSubmitted:true,
	// }

	getData(){
		return fetch('http://127.0.0.1:8000/entrust', 
			{
				method: "GET"
			})
			.then((res) => 
			{
				if(res.ok)
				{
					return res.json();
				}
				else
				{
					return Promise.reject();
				}
			})
			.then(res=>
			{
				this.setState({name:res.entrustString})
				this.setState({ID:res.id})
				// debugger
			})
			
	}

	componentDidMount()
	{
		//debugger
		var res = this.getData();
		res.then((json) => {
		});
	}


	render(){
		//const standard = this.props.item;//获取的消息？
			/*const formItemLayout =
				{
					labelCol: { span: 6 },
					wrapperCol: { span: 14 },
				};//设置加载tailFormItemLayout（输入框，单选按钮，多选框，进度条）的样式
			*/
    //const isDisabled=(props.weituo);

			return(
				<Form layout='vertical'>
					<Card title='委托信息'>
						<Row>
						<Col span={12}>
							<FormItem label="委托名称">
								{this.state.name}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="委托ID">
								{this.state.ID}
							</FormItem>
						</Col>
						</Row>
					</Card>
					<FormItem>
					</FormItem>
					<FormItem>
						<div>
							<Row gutter={16}>
								<Col span={6}></Col>
								<Col span={6} offset={2}><Button type="primary" disabled={!this.props.isWTSubmitted}>通过</Button></Col>
								<Col span={6}><Button htmlType="deny" disabled={!this.props.isWTSubmitted}>否决</Button></Col>
								<Col span={6}></Col>
							</Row>
						</div>
					</FormItem>
				</Form>
			); //this.renderForm(formItems);
		}
	/*render()//主要改这个里面的内容，react的语法，怎么插入按钮、文本框？
	{
		const minHeight = '850px';

		const subOrganizationStoreName = 'subOrganization';
		const _OrganizationListView = SubItemContainer(subOrganizationStoreName, OrganizationListView);

		return(
			<Row gutter={16}>
				<Col span={8}>
					<Card title='组织结构' style={{minHeight: minHeight}}>
						<OrganizationTreeContainer setParentId={(parentId) => this.setParentId(parentId)}/>
					</Card>
				</Col>
				<Col span={16}>
					<Card title='下级组织列表' style={{minHeight: minHeight}}>
						<_OrganizationListView storeName={subOrganizationStoreName} parentId={this.state.parentId} />
					</Card>
				</Col>
			</Row>
		);
	}*/
}

//组件样式区

//注册启动区
