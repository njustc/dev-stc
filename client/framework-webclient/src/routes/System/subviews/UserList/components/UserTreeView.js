import React, {Component, PropTypes} from 'react';

import {getStore} from 'store/globalStore';

import {Row, Col, Card, Tabs, Select, Button, Layout, Form, Input} from 'antd';
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
let isDisabled = false;

export default class UserTreeView extends Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			organizationId: '',
			name: 'name',
			ID: 'ID'
		}

		this.getData=this.getData.bind(this);
		this.setData=this.setData.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

	}

	setOrganizationId = (organizationId) =>
	{
		this.setState(
		{
			organizationId: organizationId
		});
	}

	handleChange(e) {
		this.setState({name: e.target.value});
	  }
	

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
				debugger
				this.setState({ID:res.id})
				// debugger
			})
			
	}

	handleClick(){
		let obj = {
			entrustString: this.state.name,
			id: this.state.ID
		};
  
		fetch('http://127.0.0.1:8000/entrust', 
		{  
 			method: 'PUT',  
 			headers: {},  
			 // body: formData, 
			body: JSON.stringify(obj) 
			

		})

		.then((response) => 
		{  
			//debugger
 			if (response.ok) {  
     			//return response.json();  
 			}  
		})
		.then((json) => 
		{  
 			// alert(JSON.stringify(json));  
		}).catch((error) => 
		{  
 			console.error(error);  
		});  
	}

	setData(){
		// let formData = new FormData();  
		// formData.append("entrustString","Peppa pig");  
		// formData.append("id","STC_00001");  

		let obj = {
			entrustString: "Peppa Pig",
			id: "1"
		};

		// debugger
  
		fetch('http://127.0.0.1:8000/entrust', 
		{  
 			method: 'PUT',  
 			headers: {},  
			 // body: formData, 
			body: JSON.stringify(obj) 
			

		})

		.then((response) => 
		{  
			//debugger
 			if (response.ok) {  
     			//return response.json();  
 			}  
		})
		.then((json) => 
		{  
 			// alert(JSON.stringify(json));  
		}).catch((error) => 
		{  
 			console.error(error);  
		});  
			
	}

	componentDidMount()
	{
		// debugger
		//this.setData();
		var res = this.getData();
		res.then((json) => {
		});
	}

	// debugger

	render(){
			return(
			
				<Form layout='vertical'>
					<Card title = "委托信息" >
						<Row>
						<Col span={12}>
							<FormItem label="委托名称">
								<Input
									value={this.state.name}
									onChange={this.handleChange}
								/>
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
								<Col span={6} offset={2}><Button type="primary" disabled={isDisabled} onClick={this.handleClick}>提交</Button></Col>
								<Col span={6}><Button htmlType="deny" disabled={isDisabled} onClick={this.handleClick}>保存</Button></Col>
								<Col span={6}></Col>
							</Row>
						</div>
					</FormItem>
				</Form>
			); //this.renderForm(formItems);
		}

	/*render()
	{
		const minHeight = '850px';

		const userStoreName = 'user';
		const _UserListView = SubItemContainer(userStoreName, UserListView);			
		render(
			<Row gutter={16}>
				<Col span={8}>
					<Card title='委托单位' style={{minHeight: minHeight}}>
						<OrganizationTreeContainer setParentId={(organizationId) => this.setOrganizationId(organizationId)}/>
					</Card>
				</Col>
				<Col span={16}>
					<Card title='联系电话' style={{minHeight: minHeight}}>
						<_UserListView storeName={userStoreName} parentId={this.state.organizationId} />
					</Card>
				</Col>
			</Row>
		);
	}*/
}

