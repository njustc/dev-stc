import React, {Component, PropTypes} from 'react';

import {getStore} from 'STORE/globalStore';
import {setModules} from 'layouts/store/CoreLayoutStore';

import './Blank.scss';

export default class Blank extends Component
{
	constructor(props)
	{
		super(props);
	}

	componentWillMount()
	{
		getStore().dispatch(setModules([
		{
			code: "U-C",
			id: "0",
			menuIcon: "idcard",
			menuPath: "/user_list",
			name: "委托列表(客户)"
		},
		{
			code: "U-C",
			id: "1",
			menuIcon: "idcard",
			menuPath: "/user_content",
			name: "委托内容(客户)"
		},
		{
			code: "C-C",
			id: "2",
			menuIcon: "idcard",
			menuPath: "/admin_list",
			name: "委托列表(工作人员)"
		},
		{
			code: "C-C",
			id: "3",
			menuIcon: "idcard",
			menuPath: "/admin_content",
			name: "委托内容(工作人员)"
		}
		]));
		this.props.router.replace('/index');
	}

	render()
	{
		return(
            <div className="blank">
				{ this.props.children }
			</div>
		);
	}
}