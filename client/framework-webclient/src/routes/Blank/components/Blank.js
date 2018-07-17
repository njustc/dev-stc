import React, {Component, PropTypes} from 'react';

import {setAuthData, setSiderData, setSysUser} from "../../../modules/ducks/System";

import './Blank.scss';
import {connect} from "react-redux";

/**
 * @module Blank
 */
/**
 * 空白页面组件，用于页面跳转控制
 * @extends Component
 */
class BlankComponent extends Component {
	constructor(props) {
		super(props);
	}

    static propTypes = {
        SetUser: PropTypes.func.isRequired,
        SetAuthData: PropTypes.func.isRequired,
        SetSider: PropTypes.func.isRequired
    };

    /**
	 * 组件渲染之前执行，如果sessionStorage存在系统用户登录信息则跳转到主页面，否则跳转到登录页面
	 * @function
     */
	componentWillMount() {
		const curUserString = sessionStorage.getItem('sysUser');
		const curAuthDataString = sessionStorage.getItem('authData');
		const curSiderString = sessionStorage.getItem('sider');
		const curUser = JSON.parse(curUserString);
		const curAuthData = JSON.parse(curAuthDataString);
		const curSider = JSON.parse(curSiderString);
		if(curUserString && curUserString !== 'null' && curAuthData && curAuthDataString !== 'null'){
            this.props.SetUser(curUser);
            this.props.SetAuthData(curAuthData);
            this.props.SetSider(curSider);
		    this.props.router.replace('/index');
		}
		else {
			this.props.router.replace('/login');
		}
	}

	render() {
		// const curUser = sessionStorage.getItem('sysUser');
		// const curAuthData = sessionStorage.getItem('authData');
		// console.log(curUser);
		// console.log(curAuthData);
		return(
			<div className="blank">
				{ this.props.children }
			</div>
		);
	}
}

/**
 * 把登录信息设置相关的dispatch方法分发给BlankComponent
 * @param dispatch
 * @returns {{SetUser: (function(*=): *), SetAuthData: (function(*): *), SetSider: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
	return {
		SetUser: (sysUser) => dispatch(setSysUser(sysUser)),
		SetAuthData: (authData) => dispatch(setAuthData((authData))),
        SetSider: (sider) => dispatch(setSiderData(sider))
	}
}

export default connect(null, mapDispatchToProps)(BlankComponent);
