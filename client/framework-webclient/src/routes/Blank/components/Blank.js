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
			menuPath: "/user_pannel",
			name: "委托(客户)"
		},
		{
			code: "C-C",
			id: "1",
			menuIcon: "idcard",
			menuPath: "/admin_pannel",
			name: "委托(工作人员)"
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